import { createBrowserRouter } from "react-router-dom";

import User from "./pages/User"


const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <User /> },
  

]);

export default router;