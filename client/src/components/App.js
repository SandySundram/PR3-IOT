import React, { Component } from "react";

import Events from "./Events/Events";
import EventAdded from "./EventAdded/EventAdded";
import CreateEvent from "./CreateEvent/CreateEvent";

class App extends Component {
  render() {
    return (
      <div>
        <EventAdded />
        <CreateEvent />
        <Events />
      </div>
    );
  }
}

export default App;
