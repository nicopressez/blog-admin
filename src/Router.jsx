import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Homepage from "./components/Homepage";
import Form from "./components/Form";
import Login from "./components/Login";

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
                    path: '/edit',
                    element: <Form />
                },
                {
                    path: '/login',
                    element: <Login />,
                }
            ]
        }
    ]);
    return <RouterProvider router={router} />
};

export default Router