import React, { FunctionComponent } from "react";
import "./App.css";
import WeekSummariesContainer from "./WeekSummariesContainer";

const App: FunctionComponent = () => {
  return (
    <div className={"vt-app"}>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Activity reports</h1>
          </div>
        </div>
      </section>
      <section className={"vt-main"}>
        <h1 className={"title"}>
          List of filters/selection criteria List of reports
        </h1>
        <WeekSummariesContainer />
      </section>
    </div>
  );
};

export default App;
