import * as React from "react";
import Store from "./Store";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
        <Store>
            <Dashboard/>
        </Store>
    </div>
  );
}

export default App;
