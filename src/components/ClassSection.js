// Package Import
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// CSS Import
import "../assets/css/classSection.css";
// Component Import
import firebase from "../config/FirebaseConfig";
import UMCReducer from "../redux/umcReducer";
import EditComp from "./EditComp";
import PdfView from "./PDFView";



function ClassSection(props) {
  const { group } = props;

  // Variable Declaration

  const [modalStatus, setmodalStatus] = useState(false);
  const [PDFStatus, setPDFStatus] = useState(false);
  const [PDFValues, setPDFValues] = useState();
  const [editValues, seteditValues] = useState();

  // Main Redux State
  var classDB = useSelector((state) => state);

  const dispatch = useDispatch(UMCReducer);

  const ModalFunction = () => {
    if (modalStatus == true) {
      setmodalStatus(false);
    } else {
      setmodalStatus(true);
    }
  };

  const PDFFunction = () => {
    if (PDFStatus == true) {
      setPDFStatus(false);
    } else {
      setPDFStatus(true);
    }
  };

  const OpenPDF = (pdfArray) => {
    if (PDFStatus == true) {
      setPDFStatus(false);
    } else {
      setPDFStatus(true);
      setPDFValues(pdfArray);
    }
  };

  // Class Edit Function
  const EditClass = (id) => {
    if (modalStatus == false) {
      setmodalStatus(true);
      seteditValues({
        group: id[1].group,
        part: id[1].part,
        chap: id[1].chap,
        classNo: String(id[1].classNo),
        classLink: id[1].classLink,
        classTitle: id[1].classTitle,
        edit_id: String(id[0]),
        examTitle: id[1].examTitle,
        examLink: id[1].examLink,
        pdfList: id[1].pdfList,
      });
    } else {
      setmodalStatus(false);
    }
  };

  const DeleteFunc = (id) => {
    var DeleteAns = window.confirm("Are you sure want to delete ?");
    if (DeleteAns == true) {
      const child = firebase.database().ref("ClassListDB").child(id[0]);
      child.remove();
    }
  };

  // Checking Is ClassList empty or not
  if (classDB.classList != null) {
    // ClassList Key As A Variable
    var classList = Object.entries(classDB.classList);

    // Filtering ClassList Key according to selected Paper & Chapter
    classList = classList.filter(
      (i) =>
        (i[1].chap == classDB.SelectedChap.chap) &
        (i[1].part == classDB.SelectedChap.part) &
        (i[1].group == classDB.SelectedChap.group)
    );

    classList = classList.sort(function (a, b) {
      return a[1].classNo - b[1].classNo;
    });

    // Checking Is Paper & Chap selected or not & classList is empty or not
    if (
      (classDB.SelectedChap.chap > 0) &
      (classDB.SelectedChap.part > 0) &
      (classList.length != 0)
    ) {
      return (
        <>
          {modalStatus ? (
            <div className="modal">
              <div className="dash_div">
                <p className="close_modal" onClick={ModalFunction}>
                  &times;
                </p>
                <EditComp
                  props_part={editValues.part}
                  props_chap={editValues.chap}
                  props_classLink={editValues.classLink}
                  props_classNo={editValues.classNo}
                  props_classTitle={editValues.classTitle}
                  props_group={editValues.group}
                  props_examTitle={editValues.examTitle}
                  props_examLink={editValues.examLink}
                  props_pdfList={editValues.pdfList}
                  edit_id={editValues.edit_id}
                  closeModal={setmodalStatus}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {PDFStatus ? (
            <div className="modal">
              <div className="dash_div">
                <p className="close_modal" onClick={PDFFunction}>
                  &times;
                </p>
                <PdfView pdfList={PDFValues} />
              </div>
            </div>
          ) : (
            ""
          )}

          <section className="classSection" id="class">
            {/* Class Section Heading */}
            <div className="class-title">
              {classDB.SelectedChap.group == "master_program" ? (
                <p>UMC Master group for basic class</p>
              ) : classDB.SelectedChap.group == "short_syllabus" ? (
                <p>UMC Short Syllabus for Mathematics | HSC 21 & 22</p>
              ) : classDB.SelectedChap.group == "zero_to_infinity" ? (
                <p>Zero to infinity chapter wise course</p>
              ) : classDB.SelectedChap.group == "master_hsc_23" ? (
                <p>UMC Master group | 1st year | HSC 23</p>
              ) : classDB.SelectedChap.group == "umc_engg_versity_22" ? (
                <p>
                  Uzzal Math club  Engg. + Varsity admission for HSC’22 Batch
                </p>
              ) : classDB.SelectedChap.group == "umc_math_cq_mcq_board_22_free" ? (
                <p>
                  UMC Math CQ & MCQ Board Questions Solve for HSC’22 (Free Course)
                </p>
              ) : (
                <p>UMC</p>
              )}
              <h1>
                Math {classDB.SelectedChap.part} Paper | Chapter{" "}
                {classDB.SelectedChap.chap}
              </h1>
            </div>
            <div className="border-2 border-cyan-500 w-full md:w-2/3 text-cyan-500" style={{ "background": "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))" }}>
              <div className="head-row flex w-full justify-around p-2 bg-gray-800 border-b-2 border-cyan-500">
                <p className="text-center w-24">Class NO</p>
                <p className="">Class</p>
                <p className="">PDF</p>
                <p className="">Exam</p>
                {classDB.user == true ? (
                  <p className=""></p>
                ) : (
                  ""
                )}
              </div>
              <div className="main-row flex flex-col w-full">
                {classList.map((i, index) => (
                  <div className="class-row flex w-full justify-around items-center p-2 border-b-2 border-cyan-500 text-center">
                    <p className="text-center w-24 block">
                      Lecture {i[1].classNo}
                    </p>
                    <p className="">
                      {i[1].classLink.length > 0 ? (
                        <a
                          href={i[1].classLink}
                          data-tooltip={i[1].classTitle}
                          target="_blank"
                        >
                          <i className="fa fa-chain"></i>
                        </a>
                      ) : (
                        <p data-tooltip={i[1].classTitle}>
                          <i className="fa fa-chain"></i>
                        </p>
                      )}
                    </p>
                    {i[1].pdfList && i[1].pdfList.length > 0 ? (
                      <p className="">
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa fa-chain"
                          onClick={() => OpenPDF(i[1].pdfList)}
                        ></i>
                      </p>
                    ) : (
                      <p className=" ">N/A</p>
                    )}
                    <div className="flex items-center gap-2">
                      {i[1].examLink ? (
                        <a
                          target="_blank"
                          href={i[1].examLink}
                          data-tooltip={i[1].examTitle}
                          data-tooltip-location="left"
                        >
                          <i className="fa fa-chain"></i>
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </div>
                    {classDB.user == true ? (
                      <div className="flex gap-2 w-2">
                        <button
                          className="class-drop-con-btn"
                          onClick={() => EditClass(i)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="class-drop-con-btn"
                          onClick={() => DeleteFunc(i)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      );
      // Checking Is Paper & Chap selected or not & classList is empty or not
    } else if (
      (classDB.SelectedChap.chap > 0) &
      (classDB.SelectedChap.part > 0) &
      (classList.length == 0)
    ) {
      return (
        <section className="classSection" id="class">
          {/* Class Section Heading */}
          <div className="class-title">
            {classDB.SelectedChap.group == "master_program" ? (
              <p>UMC Master group for basic class</p>
            ) : classDB.SelectedChap.group == "short_syllabus" ? (
              <p>UMC Short Syllabus for Mathematics | HSC 21 & 22</p>
            ) : classDB.SelectedChap.group == "zero_to_infinity" ? (
              <p>Zero to infinity chapter wise course</p>
            ) : classDB.SelectedChap.group == "master_hsc_23" ? (
              <p>UMC Master group | 1st year | HSC 23</p>
            ) : classDB.SelectedChap.group == "umc_engg_versity_22" ? (
              <p>
                Uzzal Math club  Engg. + Varsity admission for HSC’22 Batch
              </p>
            ) : classDB.SelectedChap.group == "umc_math_cq_mcq_board_22_free" ? (
              <p>
                UMC Math CQ & MCQ Board Questions Solve for HSC’22 (Free Course)
              </p>
            ) : (
              <p>UMC</p>
            )}
            <h1>
              Math {classDB.SelectedChap.part} Paper | Chapter{" "}
              {classDB.SelectedChap.chap}
            </h1>
          </div>
          <div className="no_class_declaration">
            {/* Class Section Table Heading */}
            <h1>There are no class in this chapter yet 😪</h1>
          </div>
        </section>
      );
    } else {
      // If No Chap & Paper selected
      return (
        <section className="classSection">
          <h1 className="class-title">Please Select A Paper & Chapter 😀</h1>
        </section>
      );
    }
  } else {
    // IF No Class In Database
    return (
      <section className="classSection">
        <h1 className="class-title">NO Data At All !!</h1>
      </section>
    );
  }
}

export default ClassSection;
