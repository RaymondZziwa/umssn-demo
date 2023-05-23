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
import StaffContacts from './components/student/staff_contacts/staff_contacts';
import AdminDashboard from './components/admin/admin_dashboard';
import TeacherActivation from './components/authentication/teacher_registration/teacherRegistration';
import StudentProfiles from './components/teacher/student_profiles/student_profiles';
import StudentAcademicAnalysis from './components/teacher/student_academic_analysis/student_academic_analysis';
import { useRef, useEffect } from 'react';

function App() {
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
    },
    {
      path: "/admindashboard",
      element: <AdminDashboard />
    },
    {
      path: "/staffcontactlist",
      element: <StaffContacts />
    },
    {
      path: "/teacheractivation",
      element: <TeacherActivation />
    },
    {
      path: "/studentprofiles",
      element: <StudentProfiles />
    },
    {
      path: "/studentacademicanalysis",
      element: <StudentAcademicAnalysis />
    }
  ]);

  const logoutTimerIdRef = useRef(null);

  useEffect(() => {
    const logoutUser = () => {
      localStorage.clear()
    }
    const autoLogout = () => {
      if (document.visibilityState === 'hidden') {
        const timeOutId = window.setTimeout(logoutUser, 5 * 60 * 1000);
        logoutTimerIdRef.current = timeOutId;
      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };
  
    document.addEventListener('visibilitychange', autoLogout);
  
    return () => {
      document.removeEventListener('visibilitychange', autoLogout);
    };
  }, []);

  return (
      <div className="App">
          <RouterProvider router={router}/>
      </div>
  )
}

export default App
