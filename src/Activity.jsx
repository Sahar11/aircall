import React, { useState, useEffect } from "react";
import Inbox from "./components/inbox/Inbox.jsx";
import axios from "axios";
import "./css/style.css";

const Activity = () => {
  const [tab, setTab] = useState(0);
  const [archive, setArchive] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(" https://aircall-job.herokuapp.com/activities")
      .then((res) => {
        console.log(res.data);
        setActivities(res.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  const Reset = () => {
    axios.get("https://aircall-job.herokuapp.com/reset");
   // window.location.reload(true);
  };
  // toggle Tabs
  const toggleTab = (e) => {
    e.preventDefault();
    setTab(e.target.id);
  };

  return (
    <div>
      <div className="tabs">
        <button id={0} className={tab == 0 ? "active" : ""} onClick={toggleTab}>
          Inbox
        </button>
        <button id={1} className={tab == 1 ? "active" : ""} onClick={toggleTab}>
          Archive
        </button>
      </div>

      {tab == 0 ? (
        <div>
          {activities
            .filter((call) => {
              if (call.is_archived == false) {
                console.log("Calls",call)
                return call;
              }
            })
            .map(call => {
              console.log("Calling",call)
              return  <Inbox key={call.id} calls={call} /> ;
            })}
        </div>
      ) : (
        <div>
          {activities
            .filter((call) => {
              if (call.is_archived === true) {
                return call;
              }
            })
            .map(c => {
              return (
                
              <div>  <Inbox key={c.id} calls={c} /> </div>) ;
            })}
        </div>
      )}

      <button className="resetBtn " onClick={Reset}>Reset</button>
    </div>
  );
};

export default Activity;
