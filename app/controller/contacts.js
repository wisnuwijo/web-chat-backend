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
            return res.send({
                data: rows
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
            LEFT JOIN contacts b ON a.id = b.user_id
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
            b.name
        FROM contacts a
        LEFT JOIN users b ON a.user_id_contact = b.id
        WHERE user_id = ?
        `;

        const rows = await query(sqlQuery, senderId);
        return res.send({
            data: rows
        });
    }
}

export default contacts;