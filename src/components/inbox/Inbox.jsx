import React from "react";
import { useState, useEffect } from "react";
import { BsArchive } from "react-icons/bs";
import { BsTelephoneOutbound } from "react-icons/bs";
import {BsTelephoneInbound} from "react-icons/bs";
import "../../css/style.css";
import axios from "axios";

const Inbox = (calls) => {
 
  // to archive all calls
  const id = calls.id;
  console.log("callsP",calls.id)
  //const stringId = id.toString();

  const archiveAll = (e) => {
   
      axios.post(`https://aircall-job.herokuapp.com/activities/${id}`,{
       is_archived:true,
      });
      window.location.reload();
  }

  const unarchive = () => {

     axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: false,
    });
    window.location.reload();
}


  return (
    <section className="background">
      
            <div className="block btn btn-outline" >
            <div>
                    <div className="archive" id={"store"+id}> Archive</div>
                    <div className="unarchive" id={"discard"+id}> Unarchive</div>
                </div>
             
                {calls.direction == "inbound" ? (
                  <BsTelephoneInbound className="inbound" />
                ) : (
                  <BsTelephoneOutbound className="outbound"/>
                )}
              
              <div>from:{calls.from} </div>
              <div> {calls.created_at} </div>
            
            </div>
      
    </section>
  );
};

export default Inbox;
