import connection from '../services/db.js';
import util from 'util';
import validateRequest from '../services/validateRequest.js';

const query = util.promisify(connection.query).bind(connection);

var chats = {
    loadChatHistory: async function (req, res) {
        const userId = req.user.id;

        const sqlQuery = `SELECT
            a.id,
            a.last_chat,
            a.last_chat_timestamp,
            c.read,
            c.sender_user_id,
            e.name as contact_name
        FROM chat_rooms a
        LEFT JOIN chat_participants b ON a.id = b.chat_rooms_id
        LEFT JOIN chats c ON a.id = c.chat_rooms_id AND c.id = (
            SELECT MAX(id)
            FROM chats d
            WHERE d.chat_rooms_id = a.id
        )
        LEFT JOIN users e ON c.sender_user_id = e.id
        WHERE b.user_id = ?
        GROUP BY id
        ORDER BY a.id  DESC`;

        const rows = await query(sqlQuery, userId);
        
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
        const userId = req.user.id;

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
    }
}

export default chats;