import connection from '../services/db.js';
import util from 'util';
import validateRequest from '../services/validateRequest.js';

const query = util.promisify(connection.query).bind(connection);

var chats = {
    loadChatHistory: async function (req, res) {
        const userId = req.user.id;

        const sqlQuery = `SELECT
            a.id as chat_rooms_id,
            a.last_chat,
            a.last_chat_timestamp,
            (SELECT
                c.id
            FROM chat_participants b
            JOIN users c ON b.user_id = c.id
            WHERE
                b.chat_rooms_id = a.id AND
                b.user_id != ?
            ) as user_id_contact,
            (SELECT
                c.name
            FROM chat_participants b
            JOIN users c ON b.user_id = c.id
            WHERE
                b.chat_rooms_id = a.id AND
                b.user_id != ?
            ) as name
        FROM chat_rooms a
        WHERE
            a.id IN (SELECT chat_rooms_id FROM chat_participants WHERE user_id = ?)
        ORDER BY a.last_chat_timestamp DESC`;

        const rows = await query(sqlQuery, [userId, userId, userId]);
        
        return res.send({
            data: rows
        });
    },
    replyChat: async function (req, res) {
        const senderId = req.user.id;

        const validateReq = validateRequest(req, [
            'chat_rooms_id',
            'message'
        ]);

        if (validateReq.isValid) {
            const sqlQuery = `INSERT 
                INTO chats (
                    chat_rooms_id,
                    sender_user_id,
                    message
                ) VALUES (
                    ?,
                    ?,
                    ?
                );
            `;

            const rows = await query(sqlQuery, [req.body.chat_rooms_id, senderId, req.body.message]);

            return res.send({
                data: rows
            });
        } else {
            return res.send({
                message: validateReq.requiredField + ' is required'
            });
        }
    },
    loadSpecificChat: async function (req, res) {
        const chatRoomId = req.params.chatRoomId;

        const sqlQuery = `SELECT
            a.*,
            b.name as sender_user_nane
        FROM chats a
        LEFT JOIN users b ON a.sender_user_id = b.id
        WHERE a.chat_rooms_id = ?
        `;

        const rows = await query(sqlQuery, chatRoomId);
        return res.send({
            data: rows
        });
    },
    storeChat: async function (chatRoomsId, senderId, message) {
        const sqlQuery = `INSERT 
            INTO chats (
                chat_rooms_id,
                sender_user_id,
                message
            ) VALUES (
                ?,
                ?,
                ?
            );
        `;

        const updateChatRoomLastChatQuery = `UPDATE chat_rooms
            SET last_chat = ?, last_chat_timestamp = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        await query(updateChatRoomLastChatQuery, [message, chatRoomsId]);

        const rows = await query(sqlQuery, [chatRoomsId, senderId, message]);
        return rows;
    }
}

export default chats;