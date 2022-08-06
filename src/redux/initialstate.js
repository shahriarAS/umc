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
      groupName: "Uzzal Math club  Engg. + Varsity admission for HSC’22 Batch",
      groupURL: "umc_engg_versity_22",
    },
    {
      groupName: "UMC Math CQ & MCQ Board Questions Solve for HSC’22 (Free Course)",
      groupURL: "umc_math_cq_mcq_board_22_free",
    },
  ],
  ScheduleDB: [],
};
