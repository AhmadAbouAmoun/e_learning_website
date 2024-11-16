import {useState} from "react";
import Input from "../components/Input";
import SiginButton from "../components/SigininButton";

const Signin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    return (
        <div>
            <form id="signupForm" class="form_container">
                <div className="logo_container">
                    <img src="logo.png" alt="" />
                </div>
                <div className="title_container">
                    <p className="title">Login to your Accounr</p>
                    <span className="subtitle">
                        Get started with our app, just create an account and enjoy the experience.
                    </span>
                </div>
                <Input value="Email" input={email} setInput={setEmail} />
                <Input value="Password" input={password} setInput={setPassword} />
                <SiginButton email={email} password={password} />
                <button title="Sign In" type="submit" className="sign-in_btn" onClick={() => {}}>
                    <span>Do not have an account? Sign up</span>
                </button>
            </form>
        </div>
    );
};
export default Signin;
