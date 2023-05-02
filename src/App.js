import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Notfound from "./Components/Notfound/Notfound";
import Products from "./Components/Products/Products";
import Profile from "./Components/Profile/Profile";
import Register from "./Components/Register/Register";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import "./App.css";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Category from "./Components/SecSlider/Category";
import { CategoryContextProvider } from "./SharedData/CategoryContext";
import { CartContextProvider } from "./SharedData/CartContext";

import CartDetails from "./Components/CartDetails/CartDetails";

function App() {
  
  let [userdata, setuserdata] = useState(null);
  function saveuser(data) {
    setuserdata(data);
  }
  function logout(){
    setuserdata(null)
    localStorage.removeItem("token")
    console.log("button pressed")
    return <Navigate to="/login"/>
  }
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      let token = localStorage.getItem("token");
      console.log(token);
      let data = jwt_decode(token);
      console.log(data);
      saveuser(data);
    }
  }, []);
  function ProtectedRouting(props) {
    if(localStorage.getItem("token")){
      return props.children
    }
    else{
      return <Navigate to="/register" />
    }

  }

  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout userdata={userdata} logout={logout}/>,
      children: [
        { path: "home", element:<ProtectedRouting> <Home/></ProtectedRouting>  },
        { path: "login", element: <Login saveuser={saveuser} /> },
      
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "products/:id", element: <ProtectedRouting><Products /> </ProtectedRouting>},
        { path: "category", element: <ProtectedRouting><Category/> </ProtectedRouting>},
        { path: "cart", element: <ProtectedRouting><CartDetails/> </ProtectedRouting>},
        { path: "profile", element:  <ProtectedRouting><Profile userdata={userdata} />  </ProtectedRouting>},
        { path: "register", element: <Register /> },
      ],
    },
  ]);
  return(
 <CartContextProvider>
    <CategoryContextProvider>
  <RouterProvider router={routes} />
  </CategoryContextProvider>
  </CartContextProvider>
  )
}

export default App;
