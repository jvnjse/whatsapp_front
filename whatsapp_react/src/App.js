import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Cookies from "js-cookie";
import Message from "./Message/Message";
import Upload from "./Message/Upload";
import Template from "./Message/Template";
import Mange from "./Input/Mange";
import Users from "./Users/Users";
import Landing from "./Landing";
import NotFound from "./NotFound/NotFound";
import config from "./config";
import axios from "axios";

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
      console.log(response.data);
      setIsValid(response.data.valid);
    })
    .catch((error) => {
      setIsValid(false);
      // console.log(error);
    });
  return (
    <div className=" flex justify-center">
      <Router>
        <Routes>
          {accessToken && isvalid ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/template" element={<Template />} />
              <Route path="/manage" element={<Mange />} />
              <Route path="/users" element={<Users />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
