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

  const onReset = () => {
    axios.get("https://aircall-job.herokuapp.com/reset");
    window.location.reload(true);
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
            .filter((c) => {
              if (c.is_archived == false) {
                console.log("Calls",c)
                return c;
              }
            })
            .map(c => {
              console.log("Calling",c)
              return  <Inbox key={c.id} calls={c} /> ;
            })}
        </div>
      ) : (
        <div>
          {activities
            .filter((c) => {
              if (c.is_archived === true) {
                return c;
              }
            })
            .map(c => {
              return (
                
              <div>  <Inbox key={c.id} calls={c} /> </div>) ;
            })}
        </div>
      )}
    </div>
  );
};

export default Activity;
