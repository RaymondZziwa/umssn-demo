import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/authentication/login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TeacherDashboard from './components/teacher/teacher_dashboard';
import ImportMarkSheetForm from './components/teacher/import_marksheet/import_marksheet';
import StudentDashboard from './components/student/student_dashboard';
import StudentMarkSheet from './components/student/student_marksheet/student_marksheet';
import NewParentRegistration from './components/authentication/parent_registration/parentRegistration';
import StudentAcademicRecords from './components/student/student_marksheet/studentacademicrecords';
import ClassEvents from './components/student/class_events/school_class_events';
import SaveSchoolEvents from './components/admin/school_events/saveschoolevents';
import StudentRegistration from './components/admin/user_registration/student_registration';
import TeacherRegistration from './components/admin/user_registration/teacher_registration';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <NewParentRegistration />,
  },
  {
    path: "/teacherdashboard",
    element: <TeacherDashboard />
  },
  {
    path: "/importmarksheet",
    element: <ImportMarkSheetForm />
  },
  {
    path: "/studentdashboard",
    element: <StudentDashboard />
  },
  {
    path: "/studentmarksheet",
    element: <StudentMarkSheet />
  },
  {
    path: "/studentacademicrecords",
    element: <StudentAcademicRecords />
  },
  {
    path: "/schoolclassevents",
    element: <ClassEvents />
  },
  {
    path: "/saveschoolevents",
    element: <SaveSchoolEvents />
  },
  {
    path: "/studentregistration",
    element: <StudentRegistration />
  },
  {
    path: "/teacherregistration",
    element: <TeacherRegistration />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
