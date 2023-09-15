import "./App.css";
import ContainerBox from "./ContainerBox";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./Login/Login";
import Cookies from "js-cookie";

function App() {
  const accessToken = Cookies.get("accessToken");

  return (
    <div className="bg-[#363636] h-screen flex justify-center items-center">
      <Router>
        <Routes>
          {accessToken ? (
            <Route path="/" element={<ContainerBox />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
