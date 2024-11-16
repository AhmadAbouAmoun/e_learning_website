import {useState} from "react";
import Input from "../components/Input";
import SiginButton from "../components/SigininButton";
import "../styles/form.css";
import {useNavigate} from "react-router-dom";
import "../assets/logo.jpg";
import SelectUser from "../components/SelectUser";
const Signin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [usertype, setUserType] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <form class="form_container">
                <div className="logo_container">
                    <img src="assets/logo.jpg" alt="" />
                </div>
                <div className="title_container">
                    <p className="title">Login to your Account</p>
                    <span className="subtitle">Get started with our app</span>
                </div>
                <Input value="Email" input={email} setInput={setEmail} />
                <Input value="Password" input={password} setInput={setPassword} />
                <SelectUser type={usertype} setType={setUserType} />
                <SiginButton email={email} password={password} type={usertype} />
                <button
                    title="Sign In"
                    type="submit"
                    className="sign-in_btn"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <span>Do not have an account? Sign up</span>
                </button>
            </form>
        </div>
    );
};
export default Signin;
