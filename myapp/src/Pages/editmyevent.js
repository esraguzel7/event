import React from "react";
import {
    useParams
} from "react-router-dom";

import Api from "../Components/Api";
import Return502 from "./error502";
import ShowMessages from "../Components/ShowMessages";

var api = new Api();

function EditMyEvents() {
    let { id } = useParams();

    if (!api.isLogined()) {
        return (
            <Return502 />
        )
    }

    var userInfo = api.getUserInfo();
    var event = api.getSingleEvent(id)

    return (
        <React.StrictMode>
            <div className="container">
                <h2 className="py-2 pl-3">Hello, {userInfo.name} &#128075;</h2>
                <hr />
                <h3 className="mb-3">Update Event</h3>
                <form method="post" onSubmit={(e) => updateEventHandler(e)}>
                    <input type="hidden" name="eventid" value={event.id} />
                    <div className="mb-3 mw-350">
                        <label htmlFor="___newevent_category" className="form-label">Category</label>
                        <select
                            id="___newevent_category"
                            name="category"
                            className="form-control"
                            required
                            defaultValue={event.category?.id}
                        >
                            <option>Select Category</option>
                            {api.getEventCategories().map((data, index) => (
                                <option key={index} value={data.id}>
                                    {data.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 mw-350">
                        <label htmlFor="___newevent_title" className="form-label">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            id="___newevent_title"
                            placeholder="Event Title"
                            defaultValue={event.title}
                        />
                    </div>
                    <div className="mb-3 mw-350">
                        <label htmlFor="___newevent_date" className="form-label">Date</label>
                        <input
                            type="date"
                            name="start_date"
                            className="form-control"
                            id="___newevent_date"
                            placeholder="Date"
                            defaultValue={event.start_date?.split('T')[0]}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="___newevent_description" className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            id="___newevent_description"
                            placeholder="Enter event description"
                            defaultValue={event.description}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="___newevent_location_url" className="form-label">Map Url</label>
                        <input
                            type="text"
                            name="location_url"
                            className="form-control"
                            id="___newevent_location_url"
                            placeholder="Map Url (https://maps.google.com...)"
                            defaultValue={event.location_url}
                        />
                    </div>
                    <div className="mb-3 mw-350">
                        <label htmlFor="___newevent_participant_limit" className="form-label">Participant Limit</label>
                        <input
                            type="number"
                            name="participant_limit"
                            min="2"
                            step="1"
                            className="form-control"
                            id="___newevent_participant_limit"
                            placeholder="Participant Limit"
                            defaultValue={event.participant_limit}
                        />
                    </div>
                    <div className="mb-3 mw-350">
                        <label htmlFor="___newevent_price" className="form-label">Price</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            name="price"
                            className="form-control"
                            id="___newevent_price"
                            placeholder="Price"
                            defaultValue={event.price}
                        />
                    </div>
                    <button type="submit" className="btn btn-success mb-3">Update Event</button>
                </form>
            </div>
        </React.StrictMode>);
}

async function updateEventHandler(e) {
    e.preventDefault();

    var body = {
        user: api.getUserInfo().id,
        eventid:e.target.querySelector('input[name=eventid]').value,
        category: e.target.querySelector('select[name=category]').value,
        title: e.target.querySelector('input[name=title]').value,
        description: e.target.querySelector('textarea[name=description]').value,
        location_url: e.target.querySelector('input[name=location_url]').value,
        participant_limit: e.target.querySelector('input[name=participant_limit]').value,
        price: e.target.querySelector('input[name=price]').value,
        start_date: e.target.querySelector('input[name=start_date]').value
    }

    try {
        const response = await fetch('http://localhost:5001/update-event', {
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
                window.location = '/my-events';
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

export default EditMyEvents;
