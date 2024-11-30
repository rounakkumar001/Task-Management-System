import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/login and signup/Login";
import Signup from "./components/login and signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import CreateTask from "./components/create task/CreateTask";
import Tasks from "./components/view tasks/Tasks";
import Manage from "./components/manage/Manage";
import ProtectedRoute from "./components/global/ProtectedRoute";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Signup />
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>,
        children: [
            {
                path: "",
                element: <Navigate to={'view-task'} replace='true' />
            }
            ,
            {
                path: 'create-task',
                element: <CreateTask />
            }
            ,
            {
                path: 'view-task',
                element: <Tasks />
            }
            ,
            {
                path: 'manage',
                element: <Manage />
            }

        ]
    }
])

export default router;