// Package Import
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";

// Component Import
import firebase from "../config/FirebaseConfig";

function AddSchedule() {
    var classDB = useSelector((state) => state);

    // AddSchedule function for formic
    const AddSchedule = useFormik({
        initialValues: {
            date: "",
            topic: "",
            time: "",
            // group: "master_group"
        },
        onSubmit: (values) => {
            const child = firebase.database().ref("ScheduleDB");

            const data = {
                date: values.date,
                topic: values.topic,
                time: values.time,
                // group: values.group
            }

            child.push(data);

            alert(
                `Added Schedule: ${values.topic}, date:${values.date}, time:${values.time} on group:${values.group}`
            );
            AddSchedule.resetForm();
        },
    });

    return (
        <>
            <h2>Add Schedule Status</h2>
            <form className="dash_form" onSubmit={AddSchedule.handleSubmit}>
                {/* Date Field */}
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={AddSchedule.values.date} onChange={AddSchedule.handleChange}></input>

                {/* Time Field */}
                <label htmlFor="time">Time</label>
                <input type="time" id="time" name="time" value={AddSchedule.values.time} onChange={AddSchedule.handleChange}></input>

                {/* Topic Field */}
                <label htmlFor="topic">Topic</label>
                <input type="text" id="topic" name="topic" value={AddSchedule.values.topic} onChange={AddSchedule.handleChange}></input>

                {/* Schedule Group Field */}
                {/* <label htmlFor="group">Group</label>
                <select
                    id="group"
                    name="group"
                    value={AddSchedule.values.group}
                    onChange={AddSchedule.handleChange}
                >
                    <option value='master_group'>Master Group</option>
                    <option value='short_syllabus'>Short Syllabus</option>
                </select> */}

                <input type="submit" value="Set Status"></input>
            </form>
        </>
    );
}

export default AddSchedule;
