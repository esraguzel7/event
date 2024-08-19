import React from "react";
import {
    useParams
} from "react-router-dom";

import Api from "../Components/Api";
import ShowMessages from "../Components/ShowMessages";

var api = new Api();

function EventDetail() {
    let { id } = useParams();

    var event = api.getSingleEvent(id)

    return (
        <React.StrictMode>
            <div class="container my-5">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <div class="card">
                            <div class="card-header text-white">
                                <h3 class="card-title">Event Details</h3>
                            </div>
                            <div class="card-body">
                                <h4 id="event-title" class="mb-3">{event.title}</h4>

                                <p id="event-description">
                                    {event.description}
                                </p>

                                <p><strong>Date:</strong> <span id="event-date">{(new Date(event.start_date)).toDateString()}</span></p>

                                <p><strong>Location:</strong> <a href={event.location_url} id="event-location-url" target="_blank" rel="noreferrer">Event Location</a></p>

                                <p><strong>Participant Count:</strong> <span id="event-participant-limit">{event.participant_count}</span></p>
                                <p><strong>Participant Limit:</strong> <span id="event-participant-limit">{event.participant_limit}</span></p>

                                <p><strong>Price:</strong> $<span id="event-price">{event.price}</span></p>

                                {(event.participant_count >= event.participant_limit) ? (
                                    <div class="text-center">
                                        <div class="alert alert-danger">Sorry, we are full for this event</div>
                                    </div>
                                ) : (
                                    <div class="text-center">
                                        <form onSubmit={(e) => joinEventHandler(e)} method="post">
                                            <input type="hidden" name="eventid" value={event.id} />
                                            <button type="submit" class="btn btn-primary btn-lg">Join Event</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                            <div class="card-footer text-muted">
                                Last updated on <span id="event-updated-at">{event.updated_at ? (new Date(event.updated_at)).toDateString() : '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

async function joinEventHandler(e) {
    e.preventDefault();

    var body = {
        userid: api.getUserInfo().id,
        eventid: e.target.querySelector('input[name=eventid]').value
    }

    try {
        const response = await fetch('http://localhost:5001/join-event', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        const data = await response.json();
        var result = data;

        let message = null;

        if (result.status === false) {
            message = ShowMessages.ShowErrorMessage(result.message);
        } else {
            message = ShowMessages.ShowSuccessMessage(result.message);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }

        e.target.insertBefore(message, e.target.querySelector('button[type=submit]'));
        setTimeout(() => {
            message.remove()
        }, 2500);

    } catch (error) {
        console.error('Error:', error);
    }
}

export default EventDetail;
