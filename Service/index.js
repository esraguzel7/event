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

/**
 * singup user
 */
app.post('/singup', (request, response) => {
    if (!(
        'email' in request.body &&
        'name' in request.body &&
        'surname' in request.body &&
        'password' in request.body
    ))
        return response.json({ 'status': false, 'message': 'Make sure you fill in all fields' })

    const sql = "INSERT INTO user (name, surname, email, password) VALUES (?, ?, ?, ?)";
    const values = [request.body.name, request.body.surname, request.body.email, request.body.password];

    connection.query(sql, values, function (err, result) {
        if (err) return response.json({ 'status': false, 'message': 'An error has occurred. Please make sure you have entered your details correctly' });
        return response.json({ 'status': true, 'message': 'Welcome aboard' });
    });
})

app.listen(process.env.APP_PORT, () => {
    console.log('Service is up!');
})