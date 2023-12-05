import { Suspense, lazy, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import config from "./config";
import axios from "axios";
import Loading from "./Loading/Loading";
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
  // console.log(accessToken);
  return (
    <div className=" flex justify-center">
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {accessToken && isvalid ? (
              <>
                <Route
                  path="/"
                  element={
                    <Landing accessToken={accessToken} isvalid={isvalid} />
                  }
                />
                <Route path="/messages" element={<Message />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/template" element={<Template />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/login" element={<Login />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <Landing accessToken={accessToken} isvalid={isvalid} />
                  }
                />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
