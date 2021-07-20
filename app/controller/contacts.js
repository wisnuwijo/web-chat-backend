import connection from '../services/db.js';
import util from 'util';
import validateRequest from '../services/validateRequest.js';

const query = util.promisify(connection.query).bind(connection);

var contacts = {
    store: async function (req, res) {
        const senderId = req.user.id;
        var validateReq = validateRequest(req, [
            'user_id_contact'
        ]);

        if (validateReq.isValid) {
            const sqlQuery = `INSERT 
                INTO contacts (
                    user_id,
                    user_id_contact
                ) VALUES (
                    ?,
                    ?
                );
            `;

            const rows = await query(sqlQuery, [senderId, req.body.user_id_contact]);

            // create chat rooms
            // [1] check if there's chat room exist between users
            const checkChatRoomQuery = `SELECT chat_rooms_id FROM chat_participants WHERE user_id = ?`;
            const checkChatParticipantQuery = `SELECT * FROM chat_participants WHERE chat_rooms_id IN (${checkChatRoomQuery}) AND user_id = ?`;
            const checkChatParticipant = await query(checkChatParticipantQuery, [senderId, req.body.user_id_contact]);

            let chatRoomId = 0;
            
            // [2] if there's no chat room yet then create new chat room between user
            if (checkChatParticipant.length == 0) {
                const insertChatRoomQuery = `INSERT 
                    INTO chat_rooms (
                        created_at
                    ) VALUES (
                        current_timestamp()
                    );
                `;

                const insertChatParticipantQuery = `INSERT 
                    INTO chat_participants (
                        chat_rooms_id,
                        user_id
                    ) VALUES (
                        ?,
                        ?
                    );
                `;

                const insertChatRoom = await query(insertChatRoomQuery);
                
                await query(insertChatParticipantQuery, [insertChatRoom.insertId, senderId]);
                await query(insertChatParticipantQuery, [insertChatRoom.insertId, req.body.user_id_contact]);
                
                chatRoomId = insertChatRoom.insertId;
            } else {
                chatRoomId = checkChatParticipant[0].chat_rooms_id;
            }

            return res.send({
                data: {
                    chat_rooms_id: chatRoomId
                }
            });
        } else {
            return res.send({
                message: validateReq.requiredField + ' is required'
            });
        }
    },
    find: async function (req, res) {
        var validateReq = validateRequest(req, [
            'pin'
        ]);
        
        // find contacts using pin
        if (validateReq.isValid) {
            const sqlQuery = `SELECT
                a.id,
                a.username,
                a.name,
                b.id as is_contact
            FROM users a
            LEFT JOIN contacts b ON a.id = b.user_id_contact
            WHERE pin = ?
            `;

            const rows = await query(sqlQuery, req.query.pin);
            return res.send({
                data: rows
            });
        } else {
            return res.send({
                message: validateReq.requiredField + ' is required'
            });
        }
    },
    load: async function (req, res) {
        const senderId = req.user.id;
        const sqlQuery = `SELECT
            a.*,
            b.name,
            (
                SELECT
                    chat_rooms_id
                FROM chat_participants
                WHERE
                    user_id = ? OR user_id = a.user_id_contact
                GROUP BY chat_rooms_id
                HAVING COUNT(chat_rooms_id) > 1
            ) as chat_rooms_id
        FROM contacts a
        LEFT JOIN users b ON a.user_id_contact = b.id
        WHERE user_id = ?
        ORDER BY a.id DESC`;

        const rows = await query(sqlQuery, [senderId, senderId]);
        return res.send({
            data: rows
        });
    }
}

export default contacts;