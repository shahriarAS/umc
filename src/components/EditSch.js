import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "../assets/css/classSection.css";
import "../assets/css/dashboard.css";

// Component Import
import firebase from "../config/FirebaseConfig";
import UMCReducer from "../redux/umcReducer";

function EditSch(props) {
    const dispatch = useDispatch(UMCReducer);

    var classDB = useSelector((state) => state);

    const {
        props_date,
        props_topic,
        props_time,
        // props_group,
        edit_id,
        closeModal,
    } = props;

    const EditData = useFormik({
        // // Form Initial Data
        initialValues: {
            date: props_date,
            topic: props_topic,
            time: props_time,
            // group: props_group,
        },

        onSubmit: (values) => {
            // Run On Form Submit

            // Writing Data on Firebase DB
            console.log("Before Update")
            const child = firebase.database().ref("ScheduleDB").child(edit_id);

            const data = {
                date: EditData.values.date,
                topic: EditData.values.topic,
                time: EditData.values.time,
                // group: EditData.values.group
            };
            child.update(data);

            closeModal(false);
            // Reset Form Field
            EditData.resetForm();
        },
    });
    return (
        <div className="dash_container">
            <h2>Update Schedule</h2>
            {/* Adding Class Form */}
            <form className="dash_form" onSubmit={EditData.handleSubmit}>
                {/* Date Field */}
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={EditData.values.date} onChange={EditData.handleChange}></input>

                {/* Time Field */}
                <label htmlFor="time">Time</label>
                <input type="time" id="time" name="time" value={EditData.values.time} onChange={EditData.handleChange}></input>

                {/* Topic Field */}
                <label htmlFor="topic">Topic</label>
                <input type="text" id="topic" name="topic" value={EditData.values.topic} onChange={EditData.handleChange}></input>

                {/* Schedule Group Field */}
                {/* <label htmlFor="group">Group</label>
                <select
                    id="group"
                    name="group"
                    value={EditData.values.group}
                    onChange={EditData.handleChange}
                >
                    <option value='master_group'>Master Group</option>
                    <option value='short_syllabus'>Short Syllabus</option>
                </select> */}

                <input type="submit" value="Set Status"></input>

            </form>
        </div>
    );
}

export default EditSch;
