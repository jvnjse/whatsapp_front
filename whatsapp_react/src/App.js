import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
// import config from "./config";
// import axios from "axios";
import loading from "./Icons/loading.png";
import AdminPage from "./Admin/AdminPage";
import AdminUser from "./Admin/User/Users";
import PrivateRoutes from "./Routes/PrivateRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import DistributorRoutes from "./Routes/DistributorRoutes";
import DistributorPage from "./Distributor/DistributorPage";
import UsersDistributor from "./Distributor/UserDistributor/UsersDistributor";
import AdminMessages from "./Admin/AdminMessages";
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
  // const [isvalid, setIsValid] = useState();

  // function Validate() {
  //   console.log("first");
  //   if (!accessToken) {
  //     setIsValid(false);
  //     return;
  //   }

  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + accessToken,
  //   };

  //   const data = {};
  //   axios
  //     .post(`${config.baseUrl}validate-access-token/`, data, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       setIsValid(response.data.valid);
  //     })
  //     .catch((error) => {
  //       setIsValid(false);
  //     });
  // }

  // useEffect(() => {
  //   Validate();
  // }, [accessToken, isvalid]);

  return (
    <div className=" flex justify-center">
      <Suspense
        fallback={
          <div className=" w-11/12 bg-[#ECE5DD] flex justify-center items-center h-screen  rounded-2xl overflow-x-auto">
            <img className="animate-spin" src={loading}></img>
          </div>
        }
      >
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<AdminRoutes />}>
                <Route path="/admin/messages" element={<AdminPage />} />
                <Route path="/admin/users" element={<AdminUser />} />
                <Route path="/admin/contact" element={<AdminMessages />} />
              </Route>

              <Route element={<DistributorRoutes />}>
                {/* <Route path="/distributor" element={<DistributorPage />} /> */}
                <Route
                  path="/distributor/users"
                  element={<UsersDistributor />}
                />
                {/* <Route path="/admin/users" element={<AdminUser />} /> */}
              </Route>
              <Route path="/messages" element={<Message />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/template" element={<Template />} />
              <Route path="/manage" element={<Manage />} />
              <Route path="/users" element={<Users />} />
              {/* <Route
                path="/"
                element={<Landing accessToken={true} isvalid={true} />}
              /> */}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={<Landing accessToken={accessToken} isvalid={false} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
