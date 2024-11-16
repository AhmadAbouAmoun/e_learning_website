import {Route, Routes} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route>
                    <Route path="/" element={<Signin />} />
                    <Route path="/login" element={<Signup />} />
                    <Route path="/money" element={<HomePage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
