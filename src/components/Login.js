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

function Login() {
  // Variable Declaration

  // Main Redux State
  var classDB = useSelector((state) => state);

  // Redux Dispatch
  const dispatch = useDispatch(UMCReducer);

  // Login Function By Formic
  const Login = useFormik({
    // Login Form Initial Value
    initialValues: {
      email: "",
      pass: "",
    },

    onSubmit: (values) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.pass)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          dispatch({
            type: "login",
          });

          // dispatch({
          //   type: "changeLog",
          //   payload: `Logged in from ${classDB.userDetails.map(
          //     (i) => `${i[0]}: ${i[1]}`
          //   )} at ${Date()}`,
          // });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode == "auth/wrong-password") {
            alert("Wrong Password. Try again");
            // dispatch({
            //   type: "changeLog",
            //   payload: `Tried to logged in with wrong password but failed from ${classDB.userDetails.map(
            //     (i) => `${i[0]}: ${i[1]}`
            //   )} at ${Date()}`,
            // });
          } else if (errorCode == "auth/user-not-found") {
            alert("Your Email is invalid. Please try again");
            // dispatch({
            //   type: "changeLog",
            //   payload: `Tried to logged in with wrong email but failed from ${classDB.userDetails.map(
            //     (i) => `${i[0]}: ${i[1]}`
            //   )} at ${Date()}`,
            // });
          }
        });
    },
  });
  // Check if logged in or not
  if (classDB.user == true) {
    // If logged in
    return (
      <>
        <Redirect to="/dashboard" />
      </>
    );
  } else {
    return (
      // If not logged in
      <>
        <div className="login_container">
          <div className="login_div">
            <h2>Login Form</h2>

            {/* Login Form */}
            <form onSubmit={Login.handleSubmit}>
              {/* Login Form Image */}
              <div className="img_container">
                <img src={img_avatar} alt="Avatar" className="avatar" />
              </div>

              <div className="form_container">
                {/* Email Field */}
                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={Login.handleChange}
                  value={Login.values.email}
                />

                {/* Password Field */}
                <label htmlFor="pass">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="pass"
                  onChange={Login.handleChange}
                  value={Login.values.pass}
                />

                {/* Login Button */}
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
          {/* Class Section Component */}
          <ClassSection />
        </div>
      </>
    );
  }
}

export default Login;
