import React from "react";

import Slider from "../Components/Slider";
import { SmallEvent } from "../Components/Events";
import Api from "../Components/Api";
import { useSearchParams } from "react-router-dom";

var api = new Api();

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  var eventList = [];
  var searchText = searchParams.get('search');

  if (searchText) {
    let result = api.searchEvent(searchText)
    if (result.status === true)
      eventList = result.data
  } else {
    eventList = api.getEvents(undefined, 6)
  }

  return (
    <React.StrictMode>
      <Slider />

      <div class='container'>
        <div class='py-3'>
          <form method="get">
            <label for="___search_content" class="form-label">Search In Events</label>
            <input class="form-control" name="search" id="___search_content" placeholder="Type to search..." />
          </form>
        </div>

        <div class='row pt-2' id="eventResults">
          {eventList.map((data, index) => (
            <div class="col-md-6">
              <SmallEvent id={data.id} obj={data} />
            </div>
          ))}
        </div>
      </div>
    </React.StrictMode>
  );
}

export default Home;
