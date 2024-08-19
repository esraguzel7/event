const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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
    const sql = "SELECT id, name, url FROM event_categories";
    connection.query(sql, (err, data) => {
        if (err) return response.json(err);

        return response.json(data);
    })
})

/**
 * signup user
 */
app.post('/signup', (request, response) => {
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

/**
 * login user
 */
app.post('/login', (request, response) => {
    if (!(
        'email' in request.body &&
        'password' in request.body
    ))
        return response.json({ 'status': false, 'message': 'Make sure you fill in all fields' })

    const sql = "SELECT * FROM user WHERE email=? AND password=? LIMIT 1";
    const values = [request.body.email, request.body.password];

    connection.query(sql, values, function (err, result) {
        if (err) return response.json({ 'status': false, 'message': 'Incorrect entry' });

        if (result.length !== 1)
            return response.json({ 'status': false, 'message': 'Incorrect entry' });

        let user = result[0]
        let token = jwt.sign({
            'id': user.id,
            'name': user.name,
            'surname': user.surname,
            'email': user.email
        }, process.env.JWT_SECRET, { expiresIn: '6h' })
        return response.json({ 'status': true, 'message': 'Welcome back', 'token': token });
    });
})

/**
 * get user events
 */
app.get('/user-events', (request, response) => {
    const sql = "SELECT * FROM events WHERE user = ?";
    const categorySql = "SELECT id, name, url FROM event_categories WHERE id = ?";
    const userSql = "SELECT name, surname, email FROM user WHERE id = ?";

    connection.query(sql, [request.query.user], async (err, events) => {
        if (err) return response.json(err);

        if (events.length === 0) {
            return response.status(404).json({ error: 'No events found for the user' });
        }

        const updatedEvents = await Promise.all(events.map(event => {
            return new Promise((resolve, reject) => {
                connection.query(categorySql, [event.category], (_err, categoryData) => {
                    if (_err) return reject(_err);

                    event.category = categoryData.length > 0 ? JSON.parse(JSON.stringify(categoryData[0])) : undefined;

                    connection.query(userSql, [event.user], (userErr, userData) => {
                        if (userErr) return reject(userErr);

                        event.user = userData.length > 0 ? JSON.parse(JSON.stringify(userData[0])) : undefined;

                        resolve(event);
                    });
                });
            });
        }));

        return response.json(updatedEvents);
    });
});


/**
 * create new event
 */
app.post('/create-event', (request, response) => {
    if (!(
        'user' in request.body &&
        'category' in request.body &&
        'title' in request.body &&
        'description' in request.body &&
        'location_url' in request.body &&
        'participant_limit' in request.body &&
        'price' in request.body &&
        'start_date' in request.body
    ))
        return response.json({ 'status': false, 'message': 'Make sure you fill in all fields' })

    const sql = "INSERT INTO events (user, category, title, description, location_url, participant_limit, price, start_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        request.body.user,
        request.body.category,
        request.body.title,
        request.body.description,
        request.body.location_url,
        request.body.participant_limit,
        request.body.price,
        request.body.start_date
    ];

    connection.query(sql, values, function (err, result) {
        if (err) return response.json({ 'status': false, 'message': 'An error has occurred. Please make sure you have entered your details correctly', 'err': err });
        return response.json({ 'status': true, 'message': 'Your event is published' });
    });
})

/**
 * get single event
 */
app.get('/get-event', (request, response) => {
    const sql = "SELECT * FROM events WHERE id = ?";
    const categorySql = "SELECT id, name, url FROM event_categories WHERE id = ?";
    const userSql = "SELECT name, surname, email FROM user WHERE id = ?";
    const participantsSql = "SELECT COUNT(*) AS participant_count FROM participants WHERE event = ?";

    connection.query(sql, [request.query.id], (err, data) => {
        if (err) return response.json(err);

        let result = JSON.parse(JSON.stringify(data[0]));

        connection.query(categorySql, [result['category']], (_err, _data) => {
            if (_err) {
                return response.json(_err);
            }

            result['category'] = _data.length > 0 ? JSON.parse(JSON.stringify(_data[0])) : undefined;

            connection.query(userSql, [result['user']], (userErr, userData) => {
                if (userErr) return response.json(userErr);

                result['user'] = userData.length > 0 ? JSON.parse(JSON.stringify(userData[0])) : undefined;

                connection.query(participantsSql, [request.query.id], (participantErr, participantData) => {
                    if (participantErr) return response.json(participantErr);

                    // Katılımcı sayısını result'a ekle
                    result['participant_count'] = participantData[0].participant_count;

                    return response.json(result);
                });
            });
        });
    });
});

/**
 * get events
 */
app.get('/get-events', (request, response) => {
    let sql = "SELECT * FROM events";
    const sqlParams = [];

    if (request.query.category) {
        sql += " WHERE category = ?";
        sqlParams.push(request.query.category);
    }

    if (request.query.limit) {
        sql += " LIMIT ?";
        sqlParams.push(parseInt(request.query.limit));
    }

    connection.query(sql, sqlParams, async (err, events) => {
        if (err) return response.json(err);

        if (events.length === 0) {
            return response.status(404).json({ error: 'No events found' });
        }

        const updatedEvents = await Promise.all(events.map(event => {
            return new Promise((resolve, reject) => {
                const categorySql = "SELECT id, name, url FROM event_categories WHERE id = ?";
                const userSql = "SELECT name, surname, email FROM user WHERE id = ?";

                connection.query(categorySql, [event.category], (_err, categoryData) => {
                    if (_err) return reject(_err);

                    event.category = categoryData.length > 0 ? JSON.parse(JSON.stringify(categoryData[0])) : undefined;

                    connection.query(userSql, [event.user], (userErr, userData) => {
                        if (userErr) return reject(userErr);

                        event.user = userData.length > 0 ? JSON.parse(JSON.stringify(userData[0])) : undefined;

                        resolve(event);
                    });
                });
            });
        }));

        return response.json(updatedEvents);
    });
});


app.listen(process.env.APP_PORT, () => {
    console.log('Service is up!');
})