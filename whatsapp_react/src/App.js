import { Suspense, lazy, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import config from "./config";
import axios from "axios";
import loading from "./Icons/loading.png";
import { jwtDecode } from "jwt-decode";
import AdminPage from "./Admin/AdminPage";
import AdminUser from "./Admin/User/Users";
// import Loading from "./Loading/Loading";
const Login = lazy(() => import("./Login/Login"));
const Message = lazy(() => import("./Message/Message"));
const Upload = lazy(() => import("./Message/Upload"));
const Template = lazy(() => import("./Message/Template"));
const Manage = lazy(() => import("./Input/Mange"));
const Users = lazy(() => import("./Users/Users"));
const Landing = lazy(() => import("./Landing"));
const NotFound = lazy(() => import("./NotFound/NotFound"));

function App() {
  const accessToken = Cookies.get("accessToken");
  const [isvalid, setIsValid] = useState();

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  };

  const data = {};
  axios
    .post(`${config.baseUrl}validate-access-token/`, data, { headers: headers })
    .then((response) => {
      // console.log(response.data);
      setIsValid(response.data.valid);
    })
    .catch((error) => {
      setIsValid(false);
      // console.log(error);
    });

  return (
    <div className=" flex justify-center">
      <Router>
        <Suspense
          fallback={
            <div className=" w-11/12 bg-[#ECE5DD] flex justify-center items-center h-screen  rounded-2xl overflow-x-auto">
              <img className="animate-spin" src={loading}></img>
            </div>
          }
        >
          <Routes>
            {accessToken || isvalid ? (
              <>
                <Route
                  path="/"
                  element={
                    <Landing accessToken={accessToken} isvalid={isvalid} />
                  }
                />

                <Route path="/admin/messages" element={<AdminPage />} />
                <Route path="/admin/users" element={<AdminUser />} />
                <Route path="/messages" element={<Message />} />
                <Route path="/messages" element={<Message />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/template" element={<Template />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={<Landing accessToken={true} isvalid={true} />}
                />
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={<Landing accessToken={false} isvalid={false} />}
                />
              </>
            )}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
