// Component Import
import firebase from "../config/FirebaseConfig";
import { initialState } from "./initialstate";

function UMCReducer(state = initialState, action) {
  switch (action.type) {
    // For selecting Chpater & Paper
    case "chap_select":
      return {
        ...state,
        SelectedChap: {
          ...state.SelectedChap,
          chap: action.payload.chap,
        },
      };
    case "part_select":
      return {
        ...state,
        SelectedChap: {
          ...state.SelectedChap,
          part: action.payload.part,
        },
      };
    case "group_select":
      return {
        ...state,
        SelectedChap: {
          ...state.SelectedChap,
          group: action.payload.group,
        },
      };
    // Fetch and store in Redux all Data
    case "populate":
      return { ...state, classList: action.payload };
    // Make Login Status True
    case "login":
      return { ...state, user: true };
    // Make Login Status False
    case "logout":
      return { ...state, user: false };
    // Data Fetching started and loading
    case "started":
      return { ...state, status: "loading" };
    // Data Fetching finished and loading finished
    case "finished":
      return { ...state, status: "finished" };
    // Add Log
    case "changeLog":
      const ref = firebase.database().ref("logStore");
      ref.push(action.payload);
    case "g_p_c":
      return { ...state, g_p_c: Object.entries(action.payload) };
    case "AddGroup":
      return { ...state, groupList: action.payload };
    case "PopulateNotice":
      return { ...state, NoticeDB: action.payload }
    case "PopulateSchedule":
      return { ...state, ScheduleDB: action.payload }
    // For other case
    default:
      return state;
  }
}

export default UMCReducer;
