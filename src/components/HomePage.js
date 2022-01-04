// Package Import
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


// Component Import
import Hero from "./Hero";
import ClassSection from "./ClassSection";
import UMCReducer from "../redux/umcReducer";
import firebase from "../config/FirebaseConfig";
import Schedule from "./Schedule";
import CourseProgress from "./CourseProgress";

function HomePage(props) {
  const { group, schedule, course_progress } = props;

  // Redux Dispatch
  const dispatch = useDispatch(UMCReducer);



  const GroupUpdateOnRefresh = () => {
    if (group) {
      dispatch({
        type: "group_select",
        payload: {
          group
        },
      });
    }
  }

  useEffect(() => {
    GroupUpdateOnRefresh()
  }, [])

  console.log(group)

  return (
    <>
      {/* Hero Component */}
      {group ? (
        <>
          <Hero group={group} />
          <ClassSection group={group.groupURL} />
        </>
      ) : schedule ? (
        <Schedule />
      ) : course_progress ? (
        <CourseProgress />
      ) : (
              <Hero />
            )}
      {/* Class Section Component */}
    </>
  );
}

export default HomePage;
