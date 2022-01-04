// Package Import
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";

// Component Import
import firebase from "../config/FirebaseConfig";

function SetChapterStatus() {
  var classDB = useSelector((state) => state);

  // AddChapStatus function for formic
  const AddChapStatus = useFormik({
    initialValues: {
      group: "master_program",
      part: "1",
      chap: 1,
      status: "upcoming",
    },
    onSubmit: (values) => {
      const key = classDB.g_p_c.find(
        (i) =>
          i[1].group == values.group &&
          i[1].part == values.part &&
          i[1].chap == values.chap
      );

      const child = firebase.database().ref("g_p_c").child(key[0]);

      const data = {
        status: values.status,
      };
      child.update(data);

      alert(
        `Updated group: ${values.group}, part:${values.part}, chap:${values.chap}s status to "${values.status}"`
      );
      AddChapStatus.resetForm();
    },
  });

  return (
    <>
      <h2>Set Chapter Status</h2>
      <form className="dash_form" onSubmit={AddChapStatus.handleSubmit}>
        {/* Group Field */}
        <label htmlFor="group">Group</label>
        <select
          id="group"
          name="group"
          value={AddChapStatus.values.group}
          onChange={AddChapStatus.handleChange}
        >
          {classDB.groupList.map((i) => (
            <option value={i.groupURL}>{i.groupName}</option>
          ))}
        </select>

        {/* Class Paper Field */}
        <label htmlFor="part">Math Paper</label>
        <select
          id="part"
          name="part"
          value={AddChapStatus.values.part}
          onChange={AddChapStatus.handleChange}
        >
          <option value={1}>First</option>
          <option value={2}>Second</option>
        </select>

        {/* Class Chapter Field */}
        <label htmlFor="chap">Chapter</label>
        <select
          id="chap"
          name="chap"
          value={AddChapStatus.values.chap}
          onChange={AddChapStatus.handleChange}
        >
          <option value={1}>Chapter 1</option>
          <option value={2}>Chapter 2</option>
          <option value={3}>Chapter 3</option>
          <option value={4}>Chapter 4</option>
          <option value={5}>Chapter 5</option>
          <option value={6}>Chapter 6</option>
          <option value={7}>Chapter 7</option>
          <option value={8}>Chapter 8</option>
          <option value={9}>Chapter 9</option>
          <option value={10}>Chapter 10</option>
        </select>

        {/* Select Status */}
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={AddChapStatus.values.status}
          onChange={AddChapStatus.handleChange}
        >
          <option value="completed">Completed</option>
          <option value="running">Running</option>
          <option value="upcoming">Upcoming</option>
        </select>

        <input type="submit" value="Set Status"></input>
      </form>
    </>
  );
}

export default SetChapterStatus;
