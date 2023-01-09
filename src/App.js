import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./assets/css/root.css";
import "./assets/css/style.css";
import Dashboard from "./components/Dashboard";
import DashManual from "./components/DashManual";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";
import Login from "./components/Login";
import NoticeBoard from "./components/NoticeBoard";
import Footer from "./components/root/Footer";
import Header from "./components/root/Header";
import firebase from "./config/FirebaseConfig";
import UMCReducer from "./redux/umcReducer";

// import Error from "./components/Error";

function App() {
  var classDB = useSelector((state) => state);

  // Redux Dispatch
  const dispatch = useDispatch(UMCReducer);

  const checkUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "login",
        });
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  // console.log(classDB.groupList);

  return (
    <>
      {classDB.status == "finished" ? (
        <Switch>
          {/* <Error/> */}
          <Route path="/" exact>
            <div className="main_app">
              <Header isGroup={true} />
              <HomePage />
              <Footer />
            </div>
          </Route>
          <Route path="/dashboard" exact>
            <div className="main_app">
              <Header isDashboard={true} />
              <Dashboard />
              <Footer />
            </div>
          </Route>
          <Route path="/schedule" exact>
            <div className="main_app">
              <Header isGroup={true} />
              <HomePage schedule={true} />
              <Footer />
            </div>
          </Route>
          <Route path="/course_progress" exact>
            <div className="main_app">
              <Header isGroup={true} />
              <HomePage course_progress={true} />
              <Footer />
            </div>
          </Route>
          <Route path="/login" exact>
            <div className="main_app">
              <Header />
              <Login />
              <Footer />
            </div>
          </Route>
          <Route path="/noticeboard" exact>
            <div className="main_app">
              <Header />
              <NoticeBoard />
              <Footer />
            </div>
          </Route>
          {classDB.groupList.length > 0
            ? classDB.groupList.map((i) => (
              <Route path={`/${i.groupURL}`} exact>
                <div className="main_app">
                  <Header />
                  <HomePage group={i} />
                  <Footer />
                </div>
              </Route>
            ))
            : ""}
          <Route path="/manual" exact>
            <div className="main_app">
              <Header />
              <DashManual />
              <Footer />
            </div>
          </Route>
          {/* <Route path="/signup" exact>
            <div className="main_app">
            <Header isGroup={true} />
              <SignUp/>
              <Footer />
            </div>
          </Route> */}
          <Route path="*" exact>
            <div className="main_app">
              <Header isGroup={true} />
              <HomePage />
              <Footer />
            </div>
          </Route>
        </Switch>
      ) : (
          <Loading />
        )}
    </>
  );
}

export default App;
