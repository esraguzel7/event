import React from "react";
import {
    useParams
} from "react-router-dom";

import Api from "../Components/Api";

var api = new Api();

function EventDetail() {
    let { id } = useParams();

    var event = api.getSingleEvent(id)
    console.log(event);


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

                                <p><strong>Location:</strong> <a href={event.location_url} id="event-location-url" target="_blank">Event Location</a></p>

                                <p><strong>Participant Count:</strong> <span id="event-participant-limit">{event.participant_count}</span></p>
                                <p><strong>Participant Limit:</strong> <span id="event-participant-limit">{event.participant_limit}</span></p>

                                <p><strong>Price:</strong> $<span id="event-price">{event.price}</span></p>

                                {(event.participant_count >= event.participant_limit) ? (
                                    <div class="text-center">
                                        <div class="alert alert-danger">Sorry, we are full for this event</div>
                                    </div>
                                ) : (
                                    <div class="text-center">
                                        <button id="join-event-btn" class="btn btn-primary btn-lg">Join Event</button>
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

export default EventDetail;
