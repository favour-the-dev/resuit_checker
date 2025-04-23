type Semester = {
    name: string; // e.g., "First Semester"
    code: string; // e.g., "100-1"
  };
  
  type LevelSemesters = {
    level: string; // e.g., "100"
    semesters: Semester[];
  };
  
  export const availableSemesters: LevelSemesters[] = [
    {
      level: "100",
      semesters: [
        { name: "First Semester", code: "100" },
        { name: "Second Semester", code: "100" },
      ],
    },
    {
      level: "200",
      semesters: [
        { name: "First Semester", code: "200" },
        { name: "Second Semester", code: "200" },
      ],
    },
    {
      level: "300",
      semesters: [
        { name: "First Semester", code: "300" },
        { name: "Second Semester", code: "300" },
      ],
    },
    {
      level: "400",
      semesters: [
        { name: "First Semester", code: "400" },
        { name: "Second Semester", code: "400" },
      ],
    },
  ];