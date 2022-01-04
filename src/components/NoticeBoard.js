import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import firebase from "../config/FirebaseConfig";

function NoticeBoard() {
    // Variable Declaration

    // Main Redux State
    var classDB = useSelector((state) => state);
    const [GroupData, setGroupData] = useState("master_program")
    const [editorState, setEditorState] = useState(classDB.NoticeDB[GroupData].notice)

    const handleGroupData = (e) => {
        console.log(e.target.value)
        setGroupData(e.target.value)
        setEditorState(classDB.NoticeDB[e.target.value].notice)
    }

    const handleEditor = (html) => {
        setEditorState(html)
        console.log(html)
    }

    const SaveNotice = () => {
        const child = firebase.database().ref("NoticeDB").child(GroupData);

        const data = {
            group: GroupData,
            notice: editorState
        };
        child.update(data);
        window.alert("Notice Saved")
    }

    // React Quill Data
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    return (
        <div className="dash_div">
            <div className="dash_container">
                <h2>Change Group Notice</h2>
                <form className="dash_form">
                    {/* Group Field */}
                    <label htmlFor="group">Group</label>
                    <select
                        id="group"
                        name="group"
                        value={GroupData}
                        onChange={handleGroupData}
                    >
                        {classDB.groupList.map((i) => (
                            <option key={i.groupURL} value={i.groupURL}>{i.groupName}</option>
                        ))}
                    </select>
                </form>
                <p style={{ color: "cyan", marginTop: "2rem" }}>Notice</p>
                <ReactQuill style={{ marginTop: "1rem", color: "black", backgroundColor: "white", borderColor: "black" }} formats={formats} modules={modules} theme="bubble" value={editorState}
                    onChange={handleEditor} />
                <button className="submit-btn" onClick={SaveNotice}>Save Notice</button>
            </div>
        </div>
    )
}

export default NoticeBoard
