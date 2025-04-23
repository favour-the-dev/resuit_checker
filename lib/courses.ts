// Course status types
type CourseStatus =
  | "registered"
  | "not-registered"
  | "completed"
  | "in-progress";

// Course interface
interface Course {
  code: string;
  title: string;
  creditUnits: number;
  lecturer: string;
  status: CourseStatus;
  description: string;
  prerequisites?: string[];
}

// Semester courses interface
interface SemesterCourses {
  semester: string;
  courses: Course[];
}

// Level courses interface
interface LevelCourses {
  level: string;
  semesters: SemesterCourses[];
}

// Sample course data
export const coursesData: LevelCourses[] = [
  {
    level: "100",
    semesters: [
      {
        semester: "1st Semester",
        courses: [
          {
            code: "CSC101",
            title: "Introduction to Computer Science",
            creditUnits: 3,
            lecturer: "Dr. Johnson",
            status: "completed",
            description:
              "Basic concepts of computer science, including algorithms, programming, and computer architecture.",
          },
          {
            code: "CSC103",
            title: "Introduction to Programming",
            creditUnits: 3,
            lecturer: "Prof. Williams",
            status: "completed",
            description:
              "Introduction to programming concepts using a high-level language.",
          },
          {
            code: "MTH101",
            title: "Elementary Mathematics I",
            creditUnits: 3,
            lecturer: "Dr. Smith",
            status: "completed",
            description:
              "Basic mathematical concepts including algebra, trigonometry, and calculus.",
          },
          {
            code: "PHY101",
            title: "General Physics I",
            creditUnits: 3,
            lecturer: "Prof. Brown",
            status: "completed",
            description:
              "Introduction to mechanics, properties of matter, and thermodynamics.",
          },
          {
            code: "GST101",
            title: "Use of English I",
            creditUnits: 2,
            lecturer: "Dr. Davis",
            status: "completed",
            description:
              "Development of English language skills for academic and professional purposes.",
          },
        ],
      },
      {
        semester: "2nd Semester",
        courses: [
          {
            code: "CSC102",
            title: "Introduction to Computer Systems",
            creditUnits: 3,
            lecturer: "Dr. Johnson",
            status: "completed",
            description:
              "Introduction to computer hardware, software, and operating systems.",
          },
          {
            code: "CSC104",
            title: "Data Structures",
            creditUnits: 3,
            lecturer: "Prof. Williams",
            status: "completed",
            description:
              "Basic data structures including arrays, linked lists, stacks, and queues.",
          },
          {
            code: "MTH102",
            title: "Elementary Mathematics II",
            creditUnits: 3,
            lecturer: "Dr. Smith",
            status: "completed",
            description:
              "Continuation of MTH101, covering linear algebra and differential equations.",
          },
          {
            code: "PHY102",
            title: "General Physics II",
            creditUnits: 3,
            lecturer: "Prof. Brown",
            status: "completed",
            description:
              "Introduction to electricity, magnetism, and modern physics.",
          },
          {
            code: "GST102",
            title: "Use of English II",
            creditUnits: 2,
            lecturer: "Dr. Davis",
            status: "completed",
            description:
              "Advanced English language skills for academic and professional purposes.",
          },
        ],
      },
    ],
  },
  {
    level: "200",
    semesters: [
      {
        semester: "1st Semester",
        courses: [
          {
            code: "CSC201",
            title: "Computer Programming I",
            creditUnits: 3,
            lecturer: "Dr. Johnson",
            status: "completed",
            description: "Advanced programming concepts and techniques.",
            prerequisites: ["CSC103", "CSC104"],
          },
          {
            code: "CSC203",
            title: "Discrete Structures",
            creditUnits: 3,
            lecturer: "Prof. Williams",
            status: "completed",
            description:
              "Mathematical structures for computer science, including sets, relations, and graph theory.",
          },
          {
            code: "CSC205",
            title: "Operating Systems I",
            creditUnits: 3,
            lecturer: "Dr. Smith",
            status: "completed",
            description:
              "Introduction to operating system concepts and design.",
          },
          {
            code: "MTH201",
            title: "Mathematical Methods",
            creditUnits: 3,
            lecturer: "Prof. Brown",
            status: "completed",
            description:
              "Mathematical methods for computer science and engineering.",
          },
          {
            code: "GST201",
            title: "Philosophy and Logic",
            creditUnits: 2,
            lecturer: "Dr. Davis",
            status: "completed",
            description:
              "Introduction to philosophical concepts and logical reasoning.",
          },
        ],
      },
      {
        semester: "2nd Semester",
        courses: [
          {
            code: "CSC202",
            title: "Computer Programming II",
            creditUnits: 3,
            lecturer: "Dr. Johnson",
            status: "completed",
            description: "Advanced programming paradigms and applications.",
            prerequisites: ["CSC201"],
          },
          {
            code: "CSC204",
            title: "Computer Architecture",
            creditUnits: 3,
            lecturer: "Prof. Williams",
            status: "completed",
            description:
              "Computer organization, architecture, and assembly language programming.",
          },
          {
            code: "CSC206",
            title: "Database Systems",
            creditUnits: 3,
            lecturer: "Dr. Smith",
            status: "completed",
            description:
              "Introduction to database concepts, design, and implementation.",
          },
          {
            code: "MTH202",
            title: "Numerical Analysis",
            creditUnits: 3,
            lecturer: "Prof. Brown",
            status: "completed",
            description: "Numerical methods for solving mathematical problems.",
          },
          {
            code: "GST202",
            title: "Nigerian People and Culture",
            creditUnits: 2,
            lecturer: "Dr. Davis",
            status: "completed",
            description: "Study of Nigerian cultural heritage and diversity.",
          },
        ],
      },
    ],
  },
  {
    level: "300",
    semesters: [
      {
        semester: "1st Semester",
        courses: [
          {
            code: "CSC301",
            title: "Data Structures and Algorithms",
            creditUnits: 3,
            lecturer: "Dr. Johnson",
            status: "in-progress",
            description: "Advanced data structures and algorithm analysis.",
            prerequisites: ["CSC104", "CSC202"],
          },
          {
            code: "CSC303",
            title: "Object-Oriented Programming",
            creditUnits: 3,
            lecturer: "Prof. Williams",
            status: "in-progress",
            description:
              "Object-oriented programming concepts and applications.",
          },
          {
            code: "CSC305",
            title: "Operating Systems II",
            creditUnits: 3,
            lecturer: "Dr. Smith",
            status: "in-progress",
            description:
              "Advanced operating system concepts and implementation.",
            prerequisites: ["CSC205"],
          },
          {
            code: "CSC307",
            title: "Database Management Systems",
            creditUnits: 3,
            lecturer: "Prof. Brown",
            status: "in-progress",
            description:
              "Advanced database management concepts and techniques.",
            prerequisites: ["CSC206"],
          },
          {
            code: "CSC309",
            title: "Computer Networks",
            creditUnits: 3,
            lecturer: "Dr. Davis",
            status: "in-progress",
            description:
              "Introduction to computer networking concepts and protocols.",
          },
        ],
      },
      {
        semester: "2nd Semester",
        courses: [
          {
            code: "CSC302",
            title: "Software Engineering",
            creditUnits: 3,
            lecturer: "Dr. Johnson",
            status: "not-registered",
            description: "Software development methodologies and practices.",
          },
          {
            code: "CSC304",
            title: "Artificial Intelligence",
            creditUnits: 3,
            lecturer: "Prof. Williams",
            status: "not-registered",
            description:
              "Introduction to artificial intelligence concepts and applications.",
          },
          {
            code: "CSC306",
            title: "Web Development",
            creditUnits: 3,
            lecturer: "Dr. Smith",
            status: "not-registered",
            description:
              "Web technologies, frameworks, and development practices.",
          },
          {
            code: "CSC308",
            title: "Computer Graphics",
            creditUnits: 3,
            lecturer: "Prof. Brown",
            status: "not-registered",
            description:
              "Computer graphics concepts, algorithms, and applications.",
          },
          {
            code: "CSC310",
            title: "Human-Computer Interaction",
            creditUnits: 3,
            lecturer: "Dr. Davis",
            status: "not-registered",
            description:
              "Principles of human-computer interaction and user interface design.",
          },
        ],
      },
    ],
  },
  {
    level: "400",
    semesters: [
      {
        semester: "1st Semester",
        courses: [
          {
            code: "CSC401",
            title: "Compiler Construction",
            creditUnits: 3,
            lecturer: "Dr. Johnson",
            status: "not-registered",
            description:
              "Principles and techniques of compiler design and implementation.",
          },
          {
            code: "CSC403",
            title: "Computer Security",
            creditUnits: 3,
            lecturer: "Prof. Williams",
            status: "not-registered",
            description:
              "Computer and network security concepts and practices.",
          },
          {
            code: "CSC405",
            title: "Machine Learning",
            creditUnits: 3,
            lecturer: "Dr. Smith",
            status: "not-registered",
            description: "Machine learning algorithms and applications.",
          },
          {
            code: "CSC407",
            title: "Project Management",
            creditUnits: 3,
            lecturer: "Prof. Brown",
            status: "not-registered",
            description:
              "Software project management principles and practices.",
          },
          {
            code: "CSC409",
            title: "Research Methodology",
            creditUnits: 2,
            lecturer: "Dr. Davis",
            status: "not-registered",
            description:
              "Research methods and techniques for computer science.",
          },
        ],
      },
      {
        semester: "2nd Semester",
        courses: [
          {
            code: "CSC402",
            title: "Final Year Project",
            creditUnits: 6,
            lecturer: "Various Supervisors",
            status: "not-registered",
            description: "Independent research project in computer science.",
          },
          {
            code: "CSC404",
            title: "Cloud Computing",
            creditUnits: 3,
            lecturer: "Prof. Williams",
            status: "not-registered",
            description:
              "Cloud computing concepts, architectures, and services.",
          },
          {
            code: "CSC406",
            title: "Mobile Application Development",
            creditUnits: 3,
            lecturer: "Dr. Smith",
            status: "not-registered",
            description:
              "Mobile application development platforms and techniques.",
          },
          {
            code: "CSC408",
            title: "Distributed Systems",
            creditUnits: 3,
            lecturer: "Prof. Brown",
            status: "not-registered",
            description: "Distributed computing concepts and systems.",
          },
        ],
      },
    ],
  },
];