export const initialState = {
  // For Selecting Paper & Chap
  SelectedChap: {
    part: 0,
    chap: 0,
    group: "None",
  },
  // Class Info List
  classList: [],
  // IF Logged in or not
  user: false,
  // Data Fetching Status for Loading
  status: "",
  g_p_c: [],
  groupList: [
    {
      groupName: "UMC Master group for basic class",
      groupURL: "master_program",
    },
    {
      groupName:
        "UMC Short Syllabus for Mathematics | HSC 21 & 22",
      groupURL: "short_syllabus",
    },
    {
      groupName: "Zero to infinity chapter wise course",
      groupURL: "zero_to_infinity",
    },
    {
      groupName: "UMC Master group | 1st year | HSC 23",
      groupURL: "master_hsc_23",
    },
    {
      groupName: "UMC Admission'21 Math Program for Engineering & Varsity Ka admission",
      groupURL: "umc_admission_21",
    },
  ],
  ScheduleDB: [],
};
