import React, {FunctionComponent} from "react";
import "./App.css";
import WeekSummariesContainer from "./WeekSummariesContainer";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        Activity reports
      </header>
      <article>
        List of filters/selection criteria
        List of reports
        <WeekSummariesContainer />
      </article>
    </div>
  );
};

export default App;
