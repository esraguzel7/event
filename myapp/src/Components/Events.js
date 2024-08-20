import React from "react";
import Api from "./Api";

var api = new Api();

export const SmallEvent = (args) => {
    if (!('id' in args))
        return;

    var event = undefined;
    if ('obj' in args) {
        event = args.obj;
    } else {
        event = api.getSingleEvent(args.id)
    }

    var userInfo = api.getUserInfo();

    var eventLink = (<a href={"/event/" + event.id} class="event-link">&#127881; Join the Event</a>);
    if ('isEditable' in args) {
        eventLink = (
            <React.StrictMode>
                <a href={"/my-events/edit/" + event.id} class="btn event-link">Edit Event</a>
                <a href="/" class="btn btn-outline-danger event-delete-link" data-eventid={event.id} onClick={deleteEventHandler}>Del</a>
            </React.StrictMode>
        );
    } else if (userInfo && userInfo.role === 'admin') {

        eventLink = (
            <React.StrictMode>
                <a href={"/event/" + event.id} class="event-link">&#127881; Join the Event</a>
                <a href="/" class="btn btn-outline-danger event-delete-link" data-eventid={event.id} onClick={deleteEventHandler}>Del</a>
            </React.StrictMode>
        );

    }

    return (
        <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative event event-small">
            <div class="col p-4 d-flex flex-column position-static">
                <strong class="event-category">{event.category.name}</strong>
                <h3 class="event-title">{event.title}</h3>
                <div class="event-date">&#128293; Starts on <span>{(new Date(event.start_date)).toDateString()}</span></div>
                <p class="card-text mb-auto">{event.description.substr(0, 80)}...</p>
                <div>
                    {eventLink}
                </div>
            </div>
            <div class="col-auto d-none d-lg-block">
                <img src="https://picsum.photos/200/250" alt='Event' />
            </div>
        </div>
    )
}

export const ParticipatedEvents = (args) => {
    if (!('id' in args) || !('obj' in args))
        return;

    var data = args.obj;

    var adminLink = (
        <a href="/" class="btn btn-outline-danger event-cancel-link" data-eventid={data.event_id} onClick={cancelEventHandler}>Cancel</a>
    );
    if ('isAdmin' in args)
        adminLink = (
            <a href="/" class="btn btn-outline-danger event-cancel-link" data-eventid={data.event_id} data-userid={data.user_id} onClick={cancelEventAdminHandler}>Cancel</a>
        );

    return (
        <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative event event-small">
            <div class="col p-4 d-flex flex-column position-static">
                <h3 class="event-title">
                    {data.title}
                    <span class="text-small text-muted" style={{ fontSize: '.7em' }}> - Starts on {(new Date(data.start_date)).toDateString()}</span>
                </h3>

                <p class="card-text mb-auto">{data.description.substr(0, 80)}...</p>
                {adminLink}
            </div>
            <div class="col-auto d-none d-lg-block">
                <img src="https://picsum.photos/100/100" alt='Event' />
            </div>
        </div>
    )
}

async function deleteEventHandler(e) {
    e.preventDefault();

    const body = {
        user: api.getUserInfo().id,
        eventid: e.target.getAttribute('data-eventid')
    }

    try {
        const response = await fetch('http://localhost:5001/delete-event', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        const data = await response.json();
        var result = data;

        let message = result.message;

        if (result.status === true)
            setTimeout(() => {
                window.location.reload();
            }, 2500);

        e.target.innerText = message;

    } catch (error) {
        console.error('Error:', error);
    }
}

async function cancelEventHandler(e) {
    e.preventDefault();

    const body = {
        user: api.getUserInfo().id,
        event: e.target.getAttribute('data-eventid')
    }

    try {
        const response = await fetch('http://localhost:5001/cancel-joined-event', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        const data = await response.json();
        var result = data;

        let message = result.message;

        if (result.status === true)
            setTimeout(() => {
                window.location.reload();
            }, 2500);

        e.target.innerText = message;

    } catch (error) {
        console.error('Error:', error);
    }
}

async function cancelEventAdminHandler(e) {
    e.preventDefault();

    const body = {
        user: e.target.getAttribute('data-userid'),
        event: e.target.getAttribute('data-eventid')
    }

    try {
        const response = await fetch('http://localhost:5001/cancel-joined-event', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        const data = await response.json();
        var result = data;

        let message = result.message;

        if (result.status === true)
            setTimeout(() => {
                window.location.reload();
            }, 2500);

        e.target.innerText = message;

    } catch (error) {
        console.error('Error:', error);
    }
}

