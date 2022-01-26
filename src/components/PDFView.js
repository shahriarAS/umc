// Package Import
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// CSS Import
import "../assets/css/classSection.css";

// Component Import
import firebase from "../config/FirebaseConfig";
import EditComp from "./EditComp";
import UMCReducer from "../redux/umcReducer";

function PdfView(props) {

    const { pdfList } = props

    // console.log(pdfList)

    // Variable Declaration

    const [modalStatus, setmodalStatus] = useState(false);
    const [editValues, seteditValues] = useState();

    // Main Redux State
    var classDB = useSelector((state) => state);

    const dispatch = useDispatch(UMCReducer);
    return (
        <>
            <section className="classSection" id="class" style={{padding: "0"}}>
                {/* Class Section Heading */}
                <div className="class-title">
                    <h1>
                        PDF Document
                    </h1>
                </div>
                <div className="class_table class_table_pdfview">
                    <p className="class_table_item class_table_heading">Topic</p>
                    <p className="class_table_item class_table_heading">PDF</p>
                    {pdfList.map((i, index) => (
                        <>
                            <p className="class_table_item">
                                {i.title}

                            </p>
                            <p className="class_table_item ">
                                <a
                                    href={i.link}
                                    target="_blank"
                                >
                                    <i className="fa fa-chain"></i>
                                </a>
                            </p>
                        </>
                    ))}
                </div>
            </section>
        </>
    );
}

export default PdfView;
