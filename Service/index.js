const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log(process.env.DB_DATABASE + ' db in MySQL is ' + connection.state);
})

/**
 * print service status
 */
app.get('/', (request, response) => {
    return response.json({ 'status': 'Service is up!' })
})

/**
 * get all event categories
 */
app.get('/event-categories', (request, response) => {
    const sql = "SELECT name, url FROM event_categories";
    connection.query(sql, (err, data) => {
        if (err) return response.json(err);

        return response.json(data);
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log('Service is up!');
})