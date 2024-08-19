import React from "react";

import Slider from "../Components/Slider";
import SmallEvent from "../Components/Events";
import Api from "../Components/Api";

var api = new Api();

function Home() {
  return (
    <React.StrictMode>
      <Slider />

      <div class='container'>
        <div class='row pt-2'>
          {api.getEvents(undefined, 6).map((data, index) => (
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
