// Package Import
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useFormik } from "formik";

// Style Import
import "../assets/css/dashboard.css";

// Component Import
import firebase from "../config/FirebaseConfig";
import ClassSection from "./ClassSection";
import UMCReducer from "../redux/umcReducer";
import SetChapterStatus from "./SetChapterStatus";
import AddNewGroup from "./AddNewGroup";
import AddSchedule from "./AddSchedule";
import { useState } from "react";

function Dashboard() {
  // Variable Declaration

  // Main Redux State
  var classDB = useSelector((state) => state);

  const [pdfList, setpdfList] = useState([]);

  const dispatch = useDispatch(UMCReducer);

  // Adding Class Function by Formic
  const AddData = useFormik({
    // Form Initial Data
    initialValues: {
      part: "1",
      chap: "1",
      classNo: "",
      classLink: "",
      classTitle: "",
      group: "master_program",
      pdfTitle: "",
      pdfLink: "",
      examTitle: "",
      examLink: "",
      pdfList: pdfList
    },

    onSubmit: (values) => {
      // Run On Form Submit

      // Writing Data on Firebase DB
      const ref = firebase.database().ref("ClassListDB");

      const data = {
        part: AddData.values.part,
        chap: AddData.values.chap,
        classNo: AddData.values.classNo,
        classLink: AddData.values.classLink,
        classTitle: AddData.values.classTitle,
        group: AddData.values.group,
        pdfTitle: AddData.values.pdfTitle,
        pdfLink: AddData.values.pdfLink,
        examTitle: AddData.values.examTitle,
        examLink: AddData.values.examLink,
        pdfList: pdfList
      };

      // console.log(pdfList)

      ref.push(data);

      alert(
        `Added Class Successfully`
      );

      // Reset Form Field
      setpdfList([])
      AddData.resetForm();
    },
  });

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
  const handleAddClick = () => {
    setpdfList([...pdfList, { title: "", link: "" }]);
  };

  // Condition To Check is logged in or not
  if (classDB.user == true) {
    // If logged in
    return (
      <>
        <div className="dash_div">
          <div className="dash_container">
            <h2>Add New Class</h2>
            {/* Adding Class Form */}
            <form className="dash_form" onSubmit={AddData.handleSubmit}>
              {/* Group Field */}
              <label htmlFor="group">Group</label>
              <select
                id="group"
                name="group"
                value={AddData.values.group}
                onChange={AddData.handleChange}
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
                value={AddData.values.part}
                onChange={AddData.handleChange}
              >
                <option value={1}>First</option>
                <option value={2}>Second</option>
              </select>

              {/* Class Chapter Field */}
              <label htmlFor="chap">Chapter</label>
              <select
                id="chap"
                name="chap"
                value={AddData.values.chap}
                onChange={AddData.handleChange}
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
                onChange={AddData.handleChange}
                value={AddData.values.classNo}
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
                onChange={AddData.handleChange}
                value={AddData.values.classTitle}
                required
              />

              {/* Class Link Field */}
              <label htmlFor="classLink">Class Link</label>
              <input
                type="url"
                id="classLink"
                name="classLink"
                placeholder="Class Link with (http or https) "
                onChange={AddData.handleChange}
                value={AddData.values.classLink}
              />

              {
                pdfList.length > 0 && pdfList.map((item, index) => (
                  <div key={index}>
                    <label htmlFor="title">PDF Title</label>
                    <input type="text" id="title" name="title" value={item.title} onChange={e => handleChange(e, index)}></input>

                    <label htmlFor="link">PDF Link</label>
                    <input type="url" id="link" name="link" value={item.link} onChange={e => handleChange(e, index)}></input>
                    <button class="submit-btn" onClick={() => handleRemoveClick(index)}>Remove Field</button>
                    <hr />
                  </div>
                ))
              }
              <button class="submit-btn" style={{ display: "block" }} onClick={handleAddClick}>Add Field</button>

              {/* exam Title Field */}
              <label htmlFor="PDFTitle">Exam Title</label>
              <input
                type="text"
                id="examTitle"
                name="examTitle"
                placeholder="Exam Title .."
                onChange={AddData.handleChange}
                value={AddData.values.examTitle}
              />

              {/* EXAM Link Field */}
              <label htmlFor="examLink">Exam Link</label>
              <input
                type="url"
                id="examLink"
                name="examLink"
                placeholder="Exam Link with (http or https) "
                onChange={AddData.handleChange}
                value={AddData.values.examLink}
              />

              <input type="submit" value="Add Class" />
            </form>
            <SetChapterStatus />
            <AddSchedule />
            {/* <AddNewGroup /> */}
          </div>
          <ClassSection />
        </div>
      </>
    );
  } else {
    // Redirect To Login Page if not logged in
    return <Redirect to="/login" />;
  }
}

export default Dashboard;