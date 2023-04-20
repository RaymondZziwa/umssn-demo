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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
