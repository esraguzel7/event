import React from "react";

function SmallEvent() {
    return (
        <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative event event-small">
            <div class="col p-4 d-flex flex-column position-static">
                <strong class="event-category">Category</strong>
                <h3 class="event-title">Event Title</h3>
                <div class="event-date">&#128293; Starts on <span>Nov 12</span></div>
                <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                <div>
                    <a href="/" class="event-link">&#127881; Join the Event</a>
                </div>
            </div>
            <div class="col-auto d-none d-lg-block">
                <img src="https://picsum.photos/200/250" alt='Demo' />
            </div>
        </div>
    )
}

export default SmallEvent;