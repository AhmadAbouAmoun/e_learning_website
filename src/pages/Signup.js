import {useNavigate} from "react-router-dom";
import Input from "../components/Input";
import SignupButton from "../components/SignupButton";
import {useState} from "react";
import "../styles/form.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <form id="signupForm" class="form_container">
                <div className="logo_container">
                    <img src="logo.png" alt="" />
                </div>
                <div className="title_container">
                    <p className="title">Create new Account</p>
                    <span className="subtitle">
                        Get started with our app, just create an account and enjoy the experience.
                    </span>
                </div>
                <Input value="Name" input={name} setInput={setName} />
                <Input value="Email" input={email} setInput={setEmail} />
                <Input value="Password" input={password} setInput={setPassword} />
                <SignupButton name={name} email={email} password={password} />
                <button
                    title="Sign In"
                    type="submit"
                    className="sign-in_btn"
                    onClick={() => {
                        navigate("/Signin");
                    }}
                >
                    <span>Alreay have an account? Login</span>
                </button>
            </form>
        </div>
    );
};
export default Signup;
