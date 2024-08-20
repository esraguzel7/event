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
            'role': user.role,
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


/**
 * Join event
 */
app.post('/join-event', (request, response) => {
    const { userid, eventid } = request.body;

    if (!userid || !eventid) {
        return response.status(400).json({ status: false, message: "userid and eventid are required" });
    }

    const checkEventSql = "SELECT participant_limit FROM events WHERE id = ?";
    const countParticipantsSql = "SELECT COUNT(*) AS current_participants FROM participants WHERE event = ?";
    const checkDuplicateSql = "SELECT COUNT(*) AS existing_participation FROM participants WHERE event = ? AND user = ?";
    const insertParticipantSql = "INSERT INTO participants (user, event) VALUES (?, ?)";

    connection.query(checkEventSql, [eventid], (err, eventData) => {
        if (err) return response.status(500).json({ status: false, message: "Something went wrong" });

        if (eventData.length === 0) {
            return response.status(404).json({ status: false, message: "Event not found" });
        }

        const participantLimit = eventData[0].participant_limit;

        connection.query(checkDuplicateSql, [eventid, userid], (duplicateErr, duplicateData) => {
            if (duplicateErr) return response.status(500).json({ status: false, message: "Something went wrong" });

            if (duplicateData[0].existing_participation > 0) {
                return response.status(400).json({ status: false, message: "User has already joined this event" });
            }

            connection.query(countParticipantsSql, [eventid], (countErr, countData) => {
                if (countErr) return response.status(500).json({ status: false, message: "Something went wrong" });

                const currentParticipants = countData[0].current_participants;

                if (currentParticipants >= participantLimit) {
                    return response.status(400).json({ status: false, message: "The event is full. No more participants can join." });
                }

                connection.query(insertParticipantSql, [userid, eventid], (insertErr) => {
                    if (insertErr) return response.status(500).json({ status: false, message: "Something went wrong" });

                    return response.status(200).json({ status: true, message: "Successfully joined the event!" });
                });
            });
        });
    });
});


/**
 * Update event
 */
app.post('/update-event', (request, response) => {
    const { user, eventid, category, title, description, location_url, participant_limit, price, start_date } = request.body;

    // Check if all required fields are provided
    if (!user || !eventid || !category || !title || !description || !location_url || !start_date) {
        return response.json({ status: false, message: 'All fields are required' });
    }

    const sqlCheckEvent = "SELECT * FROM events WHERE id = ? AND user = ?";
    const sqlUpdateEvent = `
        UPDATE events
        SET category = ?, title = ?, description = ?, location_url = ?, participant_limit = ?, price = ?, start_date = ?, updated_at = NOW()
        WHERE id = ? AND user = ?
    `;

    // Check if the event exists and belongs to the user
    connection.query(sqlCheckEvent, [eventid, user], (err, data) => {
        if (err) {
            return response.json({ status: false, message: 'Database error: ' + err.message });
        }

        if (data.length === 0) {
            return response.json({ status: false, message: 'Event not found or you do not have permission to update this event' });
        }

        // Proceed to update the event
        connection.query(sqlUpdateEvent, [category, title, description, location_url, participant_limit, price, start_date, eventid, user], (updateErr, updateResult) => {
            if (updateErr) {
                return response.json({ status: false, message: 'Failed to update event: ' + updateErr.message });
            }

            if (updateResult.affectedRows > 0) {
                return response.json({ status: true, message: 'Event updated successfully' });
            } else {
                return response.json({ status: false, message: 'No changes made to the event' });
            }
        });
    });
});


/**
 * Search in all events
 */
app.get('/search-event', (request, response) => {
    const searchTerm = request.query.query;

    if (!searchTerm || searchTerm.trim() === '') {
        return response.json({ status: false, message: 'Search term cannot be empty.' });
    }

    const sqlParams = [];

    let sql = "SELECT * FROM events WHERE title LIKE ? OR title LIKE ? OR title LIKE ?";
    sqlParams.push(`%${searchTerm}%`);
    sqlParams.push(`${searchTerm}%`);
    sqlParams.push(`%${searchTerm}`);

    if (request.query.limit) {
        sql += " LIMIT ?";
        sqlParams.push(parseInt(request.query.limit));
    }

    connection.query(sql, sqlParams, (err, data) => {
        if (err) {
            return response.json({ status: false, message: 'Error occurred while searching events.' });
        }

        if (data.length > 0) {
            return response.json({ status: true, message: 'Events found.', data: data });
        } else {
            return response.json({ status: true, message: 'No events found matching the search term.', data: [] });
        }
    });
});


/**
 * Delete Event
 */
app.post('/delete-event', (request, response) => {
    const { user, eventid } = request.body;

    if (!user || !eventid) {
        return response.json({
            status: false,
            message: 'User ID and Event ID are required.'
        });
    }

    const roleSql = "SELECT role FROM user WHERE id = ?";
    connection.query(roleSql, [user], (roleErr, roleData) => {
        if (roleErr) {
            return response.json({
                status: false,
                message: 'Error while checking user role: ' + roleErr.message
            });
        }

        if (roleData.length === 0) {
            return response.json({
                status: false,
                message: 'User not found.'
            });
        }

        const userRole = roleData[0].role;

        let sql;
        let params;

        if (userRole === 'admin') {
            sql = "DELETE FROM events WHERE id = ?";
            params = [eventid];
        } else {
            sql = "DELETE FROM events WHERE id = ? AND user = ?";
            params = [eventid, user];
        }

        connection.query(sql, params, (err, result) => {
            if (err) {
                return response.json({
                    status: false,
                    message: 'Error while deleting the event: ' + err.message
                });
            }

            if (result.affectedRows === 0) {
                return response.json({
                    status: false,
                    message: 'Event not found or user not authorized.'
                });
            }

            return response.json({
                status: true,
                message: 'Event successfully deleted.'
            });
        });
    });
});

app.get('/get-joined-events', (request, response) => {
    const userId = request.query.user_id;

    if (!userId) {
        return response.json({ 'status': false, 'message': 'User ID is required' });
    }

    const sql = `
        SELECT 
            p.id AS participation_id, 
            p.created_at, 
            u.id AS user_id, 
            e.id AS event_id,
            u.name, 
            u.surname, 
            u.email, 
            e.title, 
            e.description, 
            e.location_url, 
            e.price, 
            e.start_date 
        FROM 
            participants p 
        JOIN 
            user u ON p.user = u.id 
        JOIN 
            events e ON p.event = e.id 
        WHERE 
            p.user = ?
    `;

    connection.query(sql, [userId], (err, results) => {
        if (err) {
            return response.json({ 'status': false, 'message': err.message });
        }

        console.log(results);
        

        return response.json({ 
            'status': true, 
            'message': 'Joined events retrieved successfully', 
            'data': results 
        });
    });
});

app.get('/get-admin-joined-events', (request, response) => {
    const userId = request.query.user_id;

    if (!userId) {
        return response.json({ 'status': false, 'message': 'User ID is required' });
    }

    const roleCheckSql = "SELECT role FROM user WHERE id = ?";
    
    connection.query(roleCheckSql, [userId], (err, roleResults) => {
        if (err) {
            return response.json({ 'status': false, 'message': err.message });
        }

        if (roleResults.length === 0) {
            return response.json({ 'status': false, 'message': 'User not found' });
        }

        const userRole = roleResults[0].role;

        let sql;
        let params;

        if (userRole === 'admin') {
            sql = `
                SELECT 
                    p.id AS participation_id, 
                    p.created_at, 
                    e.id AS event_id, 
                    u.id AS user_id, 
                    u.name, 
                    u.surname, 
                    u.email, 
                    e.title, 
                    e.description, 
                    e.location_url, 
                    e.price, 
                    e.start_date 
                FROM 
                    participants p 
                JOIN 
                    user u ON p.user = u.id 
                JOIN 
                    events e ON p.event = e.id
            `;
            params = [];
        } else {
            return response.json({ 'status': false, 'message': 'You do not have sufficient authorizations for this area' });
        }

        connection.query(sql, params, (err, results) => {
            if (err) {
                return response.json({ 'status': false, 'message': err.message });
            }

            console.log(results);

            return response.json({ 
                'status': true, 
                'message': 'Joined events retrieved successfully', 
                'data': results 
            });
        });
    });
});


app.post('/cancel-joined-event', (request, response) => {
    const { user, event } = request.body;

    if (!(user && event)) {
        return response.json({ 'status': false, 'message': 'User ID and Event ID are required' });
    }

    console.log(user);
    console.log(event);
    

    const sql = "DELETE FROM participants WHERE user = ? AND event = ?";

    connection.query(sql, [user, event], (err, result) => {
        if (err) {
            return response.json({ 'status': false, 'message': err.message });
        }

        if (result.affectedRows > 0) {
            return response.json({ 'status': true, 'message': 'Event participation cancelled successfully' });
        } else {
            return response.json({ 'status': false, 'message': 'No matching participation found' });
        }
    });
});


app.listen(process.env.APP_PORT, () => {
    console.log('Service is up!');
})