import React from "react";

import Api from "../Components/Api";
import Return502 from "./error502";
import ShowMessages from "../Components/ShowMessages";
import SmallEvent from "../Components/Events";

var api = new Api();

function MyEvents() {
    if (!api.isLogined()) {
        return (
            <Return502 />
        )
    }

    var userInfo = api.getUserInfo();

    return (
        <React.StrictMode>
            <div class='container'>
                <h2 class="py-2 pl-3">Hello, {userInfo.name} &#128075;</h2>
                <hr />
                <h3 class="mb-3">Create New Event</h3>
                <form method="post" onSubmit={(e) => createNewEventHandler(e)}>
                    <div class="mb-3 mw-350">
                        <label for="___newevent_category" class="form-label">Category</label>
                        <select id="___newevent_category" name="category" class="form-control" required>
                            <option>Select Category</option>
                            {api.getEventCategories().map((data, index) => (
                                <option value={data.id}>{data.name}</option>
                            ))}
                        </select>
                    </div>
                    <div class="mb-3 mw-350">
                        <label for="___newevent_title" class="form-label">Event Title</label>
                        <input type="text" name="title" class="form-control" id="___newevent_title" placeholder="Event Title" />
                    </div>
                    <div class="mb-3 mw-350">
                        <label for="___newevent_price" class="form-label">Date</label>
                        <input type="date" name="start_date" class="form-control" id="___newevent_price" placeholder="Price" />
                    </div>
                    <div class="mb-3">
                        <label for="___newevent_description" class="form-label">Description</label>
                        <textarea name="description" class="form-control" for="___newevent_description" placeholder="Enter event description"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="___newevent_location_url" class="form-label">Map Url</label>
                        <input type="text" name="location_url" class="form-control" id="___newevent_location_url" placeholder="Map Url (https://maps.google.com...)" />
                    </div>
                    <div class="mb-3 mw-350">
                        <label for="___newevent_participant_limit" class="form-label">Participant Limit</label>
                        <input type="number" name="participant_limit" min="2" step="1" class="form-control" id="___newevent_participant_limit" placeholder="Participant Limit" />
                    </div>
                    <div class="mb-3 mw-350">
                        <label for="___newevent_price" class="form-label">Price</label>
                        <input type="number" min="0" step="0.01" name="price" class="form-control" id="___newevent_price" placeholder="Price" />
                    </div>
                    <button type="submit" class="btn btn-success mb-3">Create Event</button>
                </form>

                <hr />

                <h3 class="mb-3">Your Events</h3>

                <div class="row">
                    {api.getUserEvents().map((data, index) => (
                        <div class="col-md-6">
                            <SmallEvent id={data.id} obj={data} isEditable />
                        </div>
                    ))}
                </div>
            </div>
        </React.StrictMode>
    );
}

async function createNewEventHandler(e) {
    e.preventDefault();

    var body = {
        user: api.getUserInfo().id,
        category: e.target.querySelector('select[name=category]').value,
        title: e.target.querySelector('input[name=title]').value,
        description: e.target.querySelector('textarea[name=description]').value,
        location_url: e.target.querySelector('input[name=location_url]').value,
        participant_limit: e.target.querySelector('input[name=participant_limit]').value,
        price: e.target.querySelector('input[name=price]').value,
        start_date: e.target.querySelector('input[name=start_date]').value
    }

    try {
        const response = await fetch('http://localhost:5001/create-event', {
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

export default MyEvents;
