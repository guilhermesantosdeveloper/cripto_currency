import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { NotFound } from "./pages/notFound";
import { Detail } from "./pages/detail";



const router = createBrowserRouter([
    {
        children: [
            {
                path: '/',
                element: <Home/>
            }
        ]
    }
])

export {router}