import React from "react";
import { useState, useEffect } from "react";
import './inbox.css';
import axios from "axios";

const Content = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get(" https://aircall-job.herokuapp.com/activities")
      .then((res) => {
        console.log("response", res.data);
        setState(res.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return (
    <section>
      {state.length === 0 ? (
        <div>No response </div>
      ) : (
        state.map((call) => {
          return (
            <div key={call.id}>
              <div>{call.from} </div>
              <div> {call.direction} </div>
              <div> {call.created_at} </div>
            </div>
          );
        })
      )}
    </section>
  );
};

export default Content;
