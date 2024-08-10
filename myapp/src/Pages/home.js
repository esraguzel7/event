import React from "react";

import Slider from "../Components/Slider";
import SmallEvent from "../Components/Events";

function Home() {
  return (
    <React.StrictMode>
      <Slider />

      <div class='container'>
        <div class='row pt-2'>
          <div class="col-md-6">
            <SmallEvent />
          </div>
          <div class="col-md-6">
            <SmallEvent />
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default Home;
