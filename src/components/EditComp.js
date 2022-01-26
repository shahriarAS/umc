import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../assets/css/classSection.css";

// Component Import
import firebase from "../config/FirebaseConfig";
import UMCReducer from "../redux/umcReducer";

function EditComp(props) {
  const dispatch = useDispatch(UMCReducer);

  var classDB = useSelector((state) => state);

  const {
    props_part,
    props_chap,
    props_classLink,
    props_classNo,
    props_classTitle,
    props_group,
    props_examTitle,
    props_examLink,
    props_pdfList,
    edit_id,
    closeModal,
  } = props;

  // console.log(props_pdfList)

  const [pdfList, setpdfList] = useState(props_pdfList ? props_pdfList : [])

  // console.log(pdfList)

  const handleChange = (e, index) => {
    const list = [...pdfList]
    list[index][e.target.name] = e.target.value
    setpdfList(list)
  }

  const handleRemoveClick = (index) => {
    const list = [...pdfList];
    list.splice(index, 1);
    setpdfList(list);
  }

  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault()
    setpdfList([...pdfList, { title: "", link: "" }]);
  };

  const EditData = useFormik({
    // // Form Initial Data
    initialValues: {
      part: props_part,
      chap: props_chap,
      classNo: props_classNo,
      classLink: props_classLink,
      classTitle: props_classTitle,
      group: props_group,
      examTitle: props_examTitle,
      examLink: props_examLink,
      pdfList: pdfList,
    },

    onSubmit: (values) => {
      // Run On Form Submit

      // Writing Data on Firebase DB
      const child = firebase.database().ref("ClassListDB").child(edit_id);

      const data = {
        part: EditData.values.part,
        chap: EditData.values.chap,
        classNo: EditData.values.classNo,
        classLink: EditData.values.classLink,
        classTitle: EditData.values.classTitle,
        group: EditData.values.group,
        examTitle: EditData.values.examTitle,
        examLink: EditData.values.examLink,
        pdfList: pdfList,
      };
      child.update(data);


      closeModal(false);
      // Reset Form Field
      EditData.resetForm();
    },
  });
  return (
    <div className="dash_container">
      <h2>Update Class</h2>
      {/* Adding Class Form */}
      <form className="dash_form" onSubmit={EditData.handleSubmit}>
        {/* Group Field */}
        <label htmlFor="group">Group</label>
        <select
          id="group"
          name="group"
          value={EditData.values.group}
          onChange={EditData.handleChange}
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
          value={EditData.values.part}
          onChange={EditData.handleChange}
        >
          <option value={1}>First</option>
          <option value={2}>Second</option>
        </select>

        {/* Class Chapter Field */}
        <label htmlFor="chap">Chapter</label>
        <select
          id="chap"
          name="chap"
          value={EditData.values.chap}
          onChange={EditData.handleChange}
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

        {/* Class Number Field */}
        <label htmlFor="classNo">Class Number</label>
        <input
          type="text"
          id="classNo"
          name="classNo"
          placeholder="Class Number .."
          onChange={EditData.handleChange}
          value={EditData.values.classNo}
          min={1}
          required
        />

        {/* Class Title Field */}
        <label htmlFor="classTitle">Class Title</label>
        <input
          type="text"
          id="classTitle"
          name="classTitle"
          placeholder="Class Title .."
          onChange={EditData.handleChange}
          value={EditData.values.classTitle}
          required
        />

        {/* Class Link Field */}
        <label htmlFor="classLink">Class Link</label>
        <input
          type="url"
          id="classLink"
          name="classLink"
          placeholder="Class Link with (http or https) "
          onChange={EditData.handleChange}
          value={EditData.values.classLink}
        />

        {
          pdfList && pdfList.map((item, index) => (
            <div key={index}>
              <label htmlFor="title">PDF Title</label>
              <input type="text" id="title" name="title" value={item.title} onChange={e => handleChange(e, index)}></input>

              <label htmlFor="link">PDF Link</label>
              <input type="url" id="link" name="link" value={item.link} onChange={e => handleChange(e, index)}></input>
              <button class="submit-btn" onClick={() => handleRemoveClick(index)}>Remove PDF Field</button>
              <hr />
            </div>
          ))
        }
        <button class="submit-btn" style={{ display: "block" }} onClick={(e) => handleAddClick(e)}>Add PDF Field</button>

        {/* exam Title Field */}
        <label htmlFor="examTitle">Exam Title</label>
        <input
          type="text"
          id="examTitle"
          name="examTitle"
          placeholder="Exam Title .."
          onChange={EditData.handleChange}
          value={EditData.values.examTitle}
        />

        {/* EXAM Link Field */}
        <label htmlFor="examLink">Exam Link</label>
        <input
          type="url"
          id="examLink"
          name="examLink"
          placeholder="Exam Link with (http or https) "
          onChange={EditData.handleChange}
          value={EditData.values.examLink}
        />

        <input type="submit" value="Update Class" />
      </form>
    </div>
  );
}

export default EditComp;
