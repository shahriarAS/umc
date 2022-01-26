// Package Import
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// Component Import
import UMCReducer from "../../redux/umcReducer";
import firebase from "../../config/FirebaseConfig";

// CSS Import
import "../../assets/css/header.css";

function Header(props) {
  const { isGroup, isDashboard } = props;
  // Variable Declaration

  // Main Redux State
  var classDB = useSelector((state) => state);

  // Redux Dispatch
  const dispatch = useDispatch(UMCReducer);

  // Navbar Menu State for Mobile View
  const [menuStatus, setmenuStatus] = useState(false);

  // Dropdown Stat for nav
  const [dropStatus, setdropStatus] = useState();

  // Navbar Toggle Menu for Mobile View
  const toggleMenu = () => {
    if (menuStatus == true) {
      // Run If Hamburger Bar clicked for Close
      setdropStatus("close");
      setmenuStatus(false);
    } else {
      // Run If Hamburger Bar clicked for Open
      setmenuStatus(true);
    }
  };

  // Dropdown Stat for nav Function
  const toggleDrop = (dropPaper) => {
    if ((dropPaper == "first") & (dropStatus != "first")) {
      // Run If Hamburger Bar clicked for Close
      setdropStatus("first");
    } else if ((dropPaper == "second") & (dropStatus != "second")) {
      // Run If Hamburger Bar clicked for Open
      setdropStatus("second");
    } else {
      setmenuStatus("close");
      setdropStatus("close");
    }
  };

  // Function To Select Paper & Chapter
  const sendData = (part, chap) => {
    setmenuStatus(false);
    dispatch({
      type: "part_select",
      payload: {
        part,
      },
    });
    dispatch({
      type: "chap_select",
      payload: {
        chap,
      },
    });
  };

  const SelectGroup = (group_name) => {
    dispatch({
      type: "group_select",
      payload: {
        group: group_name,
      },
    });
  };

  // Function To Logging Out
  const Logout = () => {
    setmenuStatus(false);
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          alert("Logged OUT Successfully :)");
        },
        function (error) {}
      );
    dispatch({
      type: "logout",
    });
  };

  // console.log(classDB.g_p_c)

  return (
    <>
      {/* Home Button */}
      <Link to="/" className="btn btn-home">
        <i className="fa fa-home"></i>
      </Link>
      {/* Open/Close Menu Button */}
      <div
        className={menuStatus ? "btn btn-menu click" : "btn btn-menu"}
        onClick={toggleMenu}
      >
        {/* {menuStatus ? <p>Close Chap</p> : <p>Open Chap</p>} */}
        {menuStatus ? (
          <i className="fa fa-times"></i>
        ) : (
          <i className="fa fa-bars"></i>
        )}
      </div>
      {/* Navbar Menu */}
      <nav className={menuStatus ? "sidebar show" : "sidebar"}>
        {/* Navbar Menu Heading */}
        <div className="heading">
          <Link to="/">UMC</Link>
        </div>
        <ul>
          {/* Navbar Menu Item */}
          {isGroup == true ? (
            <>
              {classDB.groupList.map((i) => (
                <li>
                  <Link
                    to={`/${i.groupURL}`}
                    className="first-btn group-btn"
                    onClick={() => SelectGroup(i.groupURL)}
                  >
                    <i className="fa fa-book"></i>
                    <p>{i.groupName}</p>
                  </Link>
                </li>
              ))}
              <li>
                <Link className="nav-link" onClick={toggleMenu} to="/schedule">
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  Class & Exam Schedule
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link"
                  onClick={toggleMenu}
                  to="/course_progress"
                >
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  Course Progress
                </Link>
              </li>
            </>
          ) : isDashboard == true ? (
            <>
              {classDB.groupList.map((i) => (
                <li>
                  <a
                    href="#"
                    className="first-btn group-btn"
                    onClick={() => SelectGroup(i.groupURL)}
                  >
                    <i className="fa fa-book"></i>
                    <p>{i.groupName}</p>
                  </a>
                </li>
              ))}

              <li>
                {/* Navbar Menu Dropdown Button */}
                <a
                  href="#"
                  className="first-btn paper-btn"
                  onClick={() => toggleDrop("first")}
                >
                  <i className="fa fa-book"></i>
                  1st Paper
                  <span
                    className={
                      dropStatus == "first"
                        ? "fa fa-caret-down first rotate"
                        : "fa fa-caret-down first"
                    }
                  ></span>
                </a>
                {/* Navbar Menu Dropdown Content */}
                <ul
                  className={
                    dropStatus == "first" ? "first-show show" : "first-show"
                  }
                >
                  {classDB.g_p_c
                    .filter(
                      (x) =>
                        x[1].group == classDB.SelectedChap.group &&
                        x[1].part == 1
                    )
                    .map((x) => (
                      <li
                        className="li_chapter"
                        onClick={() => sendData(1, x[1].chap)}
                      >
                        <HashLink smooth to="#class">
                          Chapter {x[1].chap}{" "}
                          <span className={`chap_status_${x[1].status}`}>
                            ( {x[1].status} )
                          </span>
                        </HashLink>
                        {/* <a href="#">Chapter 1</a> */}
                      </li>
                    ))}
                </ul>
              </li>
              {/* Navbar Menu Item */}
              <li>
                {/* Navbar Menu Dropdown Button */}
                <a
                  href="#"
                  className="second-btn paper-btn"
                  onClick={() => toggleDrop("second")}
                >
                  <i className="fa fa-book"></i>
                  2nd Paper
                  <span
                    className={
                      dropStatus == "second"
                        ? "fa fa-caret-down second rotate"
                        : "fa fa-caret-down second"
                    }
                  ></span>
                </a>
                {/* Navbar Menu Dropdown Content */}
                <ul
                  className={
                    dropStatus == "second" ? "second-show show1" : "second-show"
                  }
                >
                  {/* Navbar Menu Dropdown Content Item */}
                  {classDB.g_p_c
                    .filter(
                      (x) =>
                        x[1].group == classDB.SelectedChap.group &&
                        x[1].part == 2
                    )
                    .map((x) => (
                      <li
                        className="li_chapter"
                        onClick={() => sendData(2, x[1].chap)}
                      >
                        <HashLink smooth to="#class">
                          Chapter {x[1].chap}{" "}
                          <span className={`chap_status_${x[1].status}`}>
                            ( {x[1].status} )
                          </span>
                        </HashLink>
                        {/* <a href="#">Chapter 1</a> */}
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                <Link className="nav-link" onClick={toggleMenu} to="/schedule">
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  Class & Exam Schedule
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link"
                  onClick={toggleMenu}
                  to="/course_progress"
                >
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  Course Progress
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                {/* Navbar Menu Dropdown Button */}
                <a
                  href="#"
                  className="first-btn paper-btn"
                  onClick={() => toggleDrop("first")}
                >
                  <i className="fa fa-book"></i>
                  1st Paper
                  <span
                    className={
                      dropStatus == "first"
                        ? "fa fa-caret-down first rotate"
                        : "fa fa-caret-down first"
                    }
                  ></span>
                </a>
                {/* Navbar Menu Dropdown Content */}
                <ul
                  className={
                    dropStatus == "first" ? "first-show show" : "first-show"
                  }
                >
                  {/* Navbar Menu Dropdown Content Item */}
                  {classDB.g_p_c
                    .filter(
                      (x) =>
                        x[1].group == classDB.SelectedChap.group &&
                        x[1].part == 1
                    )
                    .map((x) => (
                      <li
                        className="li_chapter"
                        onClick={() => sendData(1, x[1].chap)}
                      >
                        <HashLink smooth to="#class">
                          Chapter {x[1].chap}{" "}
                          <span className={`chap_status_${x[1].status}`}>
                            ( {x[1].status} )
                          </span>
                        </HashLink>
                        {/* <a href="#">Chapter 1</a> */}
                      </li>
                    ))}
                </ul>
              </li>
              {/* Navbar Menu Item */}
              <li>
                {/* Navbar Menu Dropdown Button */}
                <a
                  href="#"
                  className="second-btn paper-btn"
                  onClick={() => toggleDrop("second")}
                >
                  <i className="fa fa-book"></i>
                  2nd Paper
                  <span
                    className={
                      dropStatus == "second"
                        ? "fa fa-caret-down second rotate"
                        : "fa fa-caret-down second"
                    }
                  ></span>
                </a>
                {/* Navbar Menu Dropdown Content */}
                <ul
                  className={
                    dropStatus == "second" ? "second-show show1" : "second-show"
                  }
                >
                  {/* Navbar Menu Dropdown Content Item */}
                  {classDB.g_p_c
                    .filter(
                      (x) =>
                        x[1].group == classDB.SelectedChap.group &&
                        x[1].part == 2
                    )
                    .map((x) => (
                      <li
                        className="li_chapter"
                        onClick={() => sendData(2, x[1].chap)}
                      >
                        <HashLink smooth to="#class">
                          Chapter {x[1].chap}{" "}
                          <span className={`chap_status_${x[1].status}`}>
                            ( {x[1].status} )
                          </span>
                        </HashLink>
                        {/* <a href="#">Chapter 1</a> */}
                      </li>
                    ))}
                </ul>
              </li>
            </>
          )}
          {/* Condition To Check If Logged In or Not */}
          {classDB.user == true ? (
            <>
              {/* Show Dashboard & Logout Button if Logged In */}
              <li>
                <Link className="nav-link" onClick={toggleMenu} to="/dashboard">
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  className="nav-link"
                  onClick={toggleMenu}
                  to="/noticeboard"
                >
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  Notice Board
                </Link>
              </li>
              <li>
                <a className="nav-link nav-btn" href="#" onClick={Logout}>
                  <i className="fa fa-sign-out"></i>
                  Logout
                </a>
              </li>
            </>
          ) : (
            // Do Nothing if Logged Out
            <br />
          )}
        </ul>
      </nav>
    </>
  );
}

export default Header;
