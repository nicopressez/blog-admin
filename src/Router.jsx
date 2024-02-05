import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Homepage from "./components/Homepage";
import Form from "./components/Form";
import Login from "./components/Login";
import Edit from "./components/Edit";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children:  [
                {
                    index: true,
                    element: <Homepage />,
                },
                {
                    path: '/create',
                    element: <Form />
                },
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/edit/:id',
                    element: <Edit />
                }
            ]
        }
    ]);
    return <RouterProvider router={router} />
};

export default Router