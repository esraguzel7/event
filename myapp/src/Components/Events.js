import React from "react";
import Api from "./Api";

var api = new Api();

function SmallEvent(args) {
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
                <a href="/" class="btn btn-outline-danger event-delete-link" data-eventid={event.id} onClick={deleteEventHangler}>Del</a>
            </React.StrictMode>
        );
    } else if (userInfo && userInfo.role === 'admin') {

        eventLink = (
            <React.StrictMode>
                <a href={"/event/" + event.id} class="event-link">&#127881; Join the Event</a>
                <a href="/" class="btn btn-outline-danger event-delete-link" data-eventid={event.id} onClick={deleteEventHangler}>Del</a>
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

async function deleteEventHangler(e) {
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

export default SmallEvent;