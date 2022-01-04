import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

// Component Import
import firebase from "../config/FirebaseConfig";
import EditSch from "./EditSch";

function Schedule() {

    // Main Redux State
    var classDB = useSelector((state) => state);

    const [modalStatus, setmodalStatus] = useState(false);
    const [editValues, seteditValues] = useState();

    const ModalFunction = () => {
        if (modalStatus == true) {
            setmodalStatus(false);
        } else {
            setmodalStatus(true);
        }
    };

    const EditSchedule = (i) => {
        if (modalStatus == false) {
            setmodalStatus(true);
            seteditValues({
                date: i[1].date,
                topic: i[1].topic,
                time: i[1].time,
                group: i[1].group,
                edit_id: i[0]
            });
        } else {
            setmodalStatus(false);
        }
    }

    const DeleteSchedule = (i) => {
        var DeleteAns = window.confirm("Are you sure want to delete ?");
        if (DeleteAns == true) {
            const child = firebase.database().ref("ScheduleDB").child(i[0]);
            child.remove();
        }
    };

    function formatHour(time) {
        var date = new Date(time);
        var options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        var timeString = date.toLocaleString('en-US', options);
        return timeString
    }

    if (classDB.ScheduleDB != null) {
        var ScheduleDB = Object.entries(classDB.ScheduleDB)
        ScheduleDB = ScheduleDB.sort(function (first, second) { return new Date(first[1].date) - new Date(second[1].date) }).reverse()

        return (
            <>
                {modalStatus ? (
                    <div className="modal">
                        <div className="dash_div">
                            <p className="close_modal" onClick={ModalFunction}>
                                &times;
                </p>
                            <EditSch
                                props_date={editValues.date}
                                props_topic={editValues.topic}
                                props_time={editValues.time}
                                props_group={editValues.group}
                                edit_id={editValues.edit_id}
                                closeModal={setmodalStatus}
                            />
                        </div>
                    </div>
                ) : (
                        ""
                    )}
                <section className="classSection" id="class">
                    {/* Class Section Heading */}
                    <div className="class-title">
                        <h1>Daily Schedule</h1>
                    </div>
                    <div className="class_table class_table_schedule">
                        <p className="class_table_item class_table_heading">Date</p>
                        <p className="class_table_item class_table_heading">Topic</p>
                        <p className="class_table_item class_table_heading">Time</p>
                        {
                            ScheduleDB.map(i => (
                                <><p className="class_table_item class_item_classNo">
                                    {
                                        i[1].date.split("-").reverse().join("-")
                                    }
                                </p>
                                    <p className="class_table_item class_item_classNo">
                                        {
                                            i[1].topic
                                        }
                                    </p>
                                    <p className="class_table_item class_item_classNo">

                                        {classDB.user == true ? (
                                            <div className="class-dropdown">
                                                {/* <img className="class-dropbtn" src={dots} alt="3 Dots" /> */}
                                                <i className="fa fa-ellipsis-v class-dropbtn"></i>
                                                <div className="class-dropdown-content">
                                                    {/* Edit Class Button */}
                                                    <button
                                                        className="class-drop-con-btn"
                                                        onClick={() => EditSchedule(i)}
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    {/* Delete Class Button */}
                                                    <button
                                                        className="class-drop-con-btn"
                                                        onClick={() => DeleteSchedule(i)}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                                ""
                                            )}
                                        {
                                            formatHour(`October 21, 2003 ${i[1].time}:00`)
                                        }
                                    </p>
                                </>
                            )
                            )
                        }

                    </div>
                </section>
            </>
        )
    }
    else {
        return (
            <section className="classSection">
                <h1 className="class-title">NO Data At All !!</h1>
            </section>
        );
    }


}

export default Schedule
