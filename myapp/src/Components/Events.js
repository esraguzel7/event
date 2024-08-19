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

    var eventLink = (<a href={"/event/" + event.id} class="event-link">&#127881; Join the Event</a>);
    if ('isEditable' in args) {
        eventLink = (<a href={"/my-events/edit/" + event.id} class="event-link">Edit Event</a>);
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

export default SmallEvent;