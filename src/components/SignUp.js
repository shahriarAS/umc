// Package Import
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useFormik } from "formik";

// Component Import
import UMCReducer from "../redux/umcReducer";
import ClassSection from "./ClassSection";
import firebase from "../config/FirebaseConfig";

// CSS Import
import "../assets/css/login.css";

// Image Import
import img_avatar from "../assets/img/img_avatar2.png";

function SignUp() {
  // Variable Declaration

  // Main Redux State
  var classDB = useSelector((state) => state);

  // Redux Dispatch
  const dispatch = useDispatch(UMCReducer);

  // Login Function By Formic
  const SignUpForm = useFormik({
    // Login Form Initial Value
    initialValues: {
      email: "",
      pass: "",
    },

    onSubmit: (values) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          values.email,
          values.pass
        )
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });

      console.log("SIGNED");
    },
  });

  return (
    <div>
      <form onSubmit={SignUpForm.handleSubmit}>
        <input
          name="email"
          type="email"
          value={SignUpForm.values.email}
          onChange={SignUpForm.handleChange}
        />

        <input
          name="pass"
          type="text"
          value={SignUpForm.values.pass}
          onChange={SignUpForm.handleChange}
        />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;
