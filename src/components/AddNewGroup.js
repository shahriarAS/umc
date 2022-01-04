import { useFormik } from "formik";
import React from "react";

import firebase from "../config/FirebaseConfig";

function AddNewGroup() {
  const AddGroupData = useFormik({
    initialValues: {
      groupName: "",
    },
    onSubmit: (values) => {
      // Writing Data on Firebase DB
      const ref = firebase.database().ref("GroupList");

      const data = {
        groupName: values.groupName,
        groupURL: values.groupName.replace(/\s+/g, "_").toLowerCase()
      };
      ref.push(data);
      alert(`Added New Group: ${values.groupName}`);
      AddGroupData.resetForm();
    },
  });

  return (
    <>
      <h2>Add New Group</h2>
      <form  className="dash_form" onSubmit={AddGroupData.handleSubmit}>
        {/* Group Name Field */}
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          id="groupName"
          name="groupName"
          placeholder="Group Name .."
          onChange={AddGroupData.handleChange}
          value={AddGroupData.values.groupName}
        />

        <input type="submit" value="Add Class" />
      </form>
    </>
  );
}

export default AddNewGroup;
