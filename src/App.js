import {Route, Routes} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import AdminPanel from "./pages/Admin_Panel";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/AdminPanel" element={<AdminPanel />} />
            </Routes>
        </div>
    );
}

export default App;
