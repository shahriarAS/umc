import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import firebase from "../config/FirebaseConfig";

function CourseProgress() {
    // Variable Declaration

    // Main Redux State
    var classDB = useSelector((state) => state);
    const [groupData, setgroupData] = useState("master_program")
    const [partData, setpartData] = useState("1")

    const handleGroup = (e) => {
        setgroupData(e.target.value)
    }

    const handlePart = (e) => {
        setpartData(e.target.value)
    }

    return (
        <section className="classSection" id="class" style={{ paddingTop: "2rem" }}>
            <div className="dash_container" style={{ marginBottom: "2rem", paddingTop: "2rem" }}>
                <h2 style={{ color: "white", marginBottom: "2rem" }}>Check Course Progress</h2>
                <form className="dash_form">
                    {/* Group Field */}
                    <label style={{color: "white"}} htmlFor="group">Group</label>
                    <select
                        id="group"
                        name="group"
                        value={groupData}
                        onChange={(e) => handleGroup(e)}
                    >
                        {classDB.groupList.map((i) => (
                            <option key={i.groupURL} value={i.groupURL}>{i.groupName}</option>
                        ))}
                    </select>
                    {/* Part Field */}
                    <label style={{color: "white"}} htmlFor="part">Part</label>
                    <select
                        id="part"
                        name="part"
                        value={partData}
                        onChange={(e) => handlePart(e)}
                    >
                        <option value="1">Part 1</option>
                        <option value="2">Part 2</option>
                    </select>
                </form>
            </div>
            <div className="class_table class_table_course_progress">
                <p className="class_table_item class_table_heading">Chapter</p>
                <p className="class_table_item class_table_heading">Progress</p>
                {
                    classDB.g_p_c
                        .filter(
                            (x) =>
                                x[1].group == groupData &&
                                x[1].part == partData
                        )
                        .map((x) => (
                            <>
                                <p className="class_table_item class_item_classNo">
                                    Chapter {x[1].chap}{" "}
                                </p>
                                <p className="class_table_item">
                                    <span className={`chap_status_${x[1].status}`}>
                                        ( {x[1].status} )
                          </span>
                                </p>
                            </>
                        ))}
            </div>
        </section>
    )
}

export default CourseProgress
