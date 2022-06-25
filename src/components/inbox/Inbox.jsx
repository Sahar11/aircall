import React from "react";
import { useState, useEffect } from "react";
import { BsArchive } from "react-icons/bs";
import { BsTelephoneOutbound } from "react-icons/bs";
import {BsTelephoneInbound} from "react-icons/bs";
import "../../css/style.css";
import axios from "axios";

const Inbox = () => {
  const [archive, setArchive] = useState([]);
  const [activities, setActivities] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    axios
      .get(" https://aircall-job.herokuapp.com/activities")
      .then(res => {
        console.log(res.data);
        setActivities(res.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  // toggle Tabs
  const toggleTab = (e) => {
    e.preventDefault();
    setTab(e.target.id);
  };
  // to archive all calls
  
  const archiveAll = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    activities.forEach((activity) => {
      const headers = {
        method: "POST",
        url: `https://aircall-job.herokuapp.com/activities/${activity.id}`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_archived: true }),
      };

      fetch(
        `https://aircall-job.herokuapp.com/activities/${activity.id}`,
        headers
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          history.go(0);
        });
    });
  }


  return (
    <section className="background">
      <div className="tabs">
        <button id={0} className={tab == 0 ? "active" : ""} onClick={toggleTab}>
          Inbox
        </button>
        <button id={1} className={tab == 1 ? "active" : ""} onClick={toggleTab}>
          Archive
        </button>
      </div>

      <button className="archiveAll" onClick={archiveAll}>
        <BsArchive className="archiveIcon" /> &nbsp;&nbsp;Archive all calls
      </button>

      {activities.length > 0 ? (
        activities.map((call) => {
          return (
            <div className="block btn btn-outline" key={call.id}>
            
             
                {call.direction == "inbound" ? (
                  <BsTelephoneInbound className="inbound" />
                ) : (
                  <BsTelephoneOutbound className="outbound"/>
                )}
              
              <div>{call.from} </div>
              <div> {call.created_at} </div>
            
            </div>
          );
        })
      ) : (
        <div>All calls are archived</div>
      )}
    </section>
  );
};

export default Inbox;
