import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  }
])
