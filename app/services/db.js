import dotenv from 'dotenv';
import mysql from 'mysql';

// get config vars
dotenv.config();

var connection;

function connectToDB() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            setTimeout(connectToDB(), 2000);
        }
    
        console.log('connected as id ' + connection.threadId);
        connection.on('error', err => {
            console.log('ERROR ', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                // db error reconnect
                connectToDB();
            } else {
                throw err;
            }
        });
    });
}

connectToDB();

export default connection;