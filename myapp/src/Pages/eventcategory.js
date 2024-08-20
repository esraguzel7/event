import React from "react";
import {
    useParams
} from "react-router-dom";

import { SmallEvent } from "../Components/Events";
import Api from "../Components/Api";

var api = new Api();

function EventCategory() {
    let { id } = useParams();

    var event = api.getEvents(id)

    return (
        <React.StrictMode>
            <div class='container'>
                <div class='row pt-2'>
                    {event.map((data, index) => (
                        <div class="col-md-6">
                            <SmallEvent id={data.id} obj={data} />
                        </div>
                    ))}
                </div>
            </div>
        </React.StrictMode>
    );
}

export default EventCategory;
