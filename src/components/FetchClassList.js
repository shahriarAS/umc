// Package Import
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Component Import
import UMCReducer from "../redux/umcReducer";
import firebase from "../config/FirebaseConfig";

function FetchClassList() {
  // Variable Declaration

  // Redux Dispatch
  const dispatch = useDispatch(UMCReducer);

  // Function To Fetch All Class from DB
  const FetchAllClass = () => {
    // Dispatch Started For Loading Screen
    dispatch({
      type: "started",
    });
    console.log("Started");

    // Reading Data From DB To Redux
    var ref = firebase.database().ref("ClassListDB");

    ref.on("value", (snapshot) => {
      // Dispatch Data to Redux
      dispatch({
        type: "populate",
        payload: snapshot.val(),
      });
      console.log("Populated");
    });
  };

  const GrabGPC = () => {
    var ref = firebase.database().ref("g_p_c");
    ref.on("value", (snapshot) => {
      // Dispatch Data to Redux
      dispatch({
        type: "g_p_c",
        payload: snapshot.val(),
      });
      // Dispatch Finished For Loading Screen
      // dispatch({
      //   type: "finished",
      // });
    });
  };

  const GrabSchedule = () => {
    console.log("She")
    var ref = firebase.database().ref("ScheduleDB");
    ref.on("value", (snapshot) => {
      dispatch({
        type: "PopulateSchedule",
        payload: snapshot.val(),
      })
      console.log("Scheduling")
    })
  }

  const GrabNotice = () => {
    var ref = firebase.database().ref("NoticeDB");
    ref.on("value", (snapshot) => {
      // Dispatch Data to Redux
      dispatch({
        type: "PopulateNotice",
        payload: snapshot.val()
      })
      // Dispatch Finished For Loading Screen
      dispatch({
        type: "finished",
      });
    })

  }

  // const GrabGroupName = () => {
  //   var ref = firebase.database().ref("GroupList");
  //   ref.on("value", (snapshot) => {
  //     // Dispatch Data to Redux
  //     console.log(Object.values(snapshot.val()))
  //     dispatch({
  //       type: "AddGroup",
  //       payload: Object.values(snapshot.val()),
  //     });
  //     // Dispatch Finished For Loading Screen
  //     dispatch({
  //       type: "finished",
  //     });
  //   });
  // };

  // const SaveUserInfo = () => {
  //   fetch(
  //     "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => dispatch({ type: "getUserDetails", payload: Object.entries(data) }));
  // };

  useEffect(() => {
    // Fetch For Only One Time
    // SaveUserInfo();1
    FetchAllClass();
    GrabGPC();
    GrabSchedule();
    GrabNotice();
  }, []);
  return <div></div>;
}

export default FetchClassList;
