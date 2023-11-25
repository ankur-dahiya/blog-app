import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Notfound from "./pages/Notfound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";

const Layout = ()=>{
  return <>
  <Navbar></Navbar>
  <Outlet></Outlet>
  <Footer></Footer>
  </>
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/single",
    element: <Single></Single>,
  },
  {
    path: "/write",
    element: <Write></Write>,
  },
  {
    path:"*",
    element: <Notfound></Notfound>
  }
]);


function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
