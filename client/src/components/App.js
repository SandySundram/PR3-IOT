import React, { Component } from "react";

import Events from "./Events/Events";
import EventAdded from "./EventAdded/EventAdded";
import CreateEvent from "./CreateEvent/CreateEvent";
import Feeds from "./Feeds/Feeds.js";

class App extends Component {
  render() {
    return (
      <div>
        <EventAdded />
        <CreateEvent />
        <Events />
        <Feeds />
      </div>
    );
  }
}

export default App;
