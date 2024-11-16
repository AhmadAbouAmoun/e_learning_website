import {useNavigate} from "react-router-dom";
import Input from "../components/Input";
import SignupButton from "../components/SignupButton";

const Signup = () => {
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
                <Input />
                <Input />
                <Input />
                <SignupButton />
                <button
                    title="Sign In"
                    type="submit"
                    className="sign-in_btn"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    <span>Alreay have an account? Login</span>
                </button>
            </form>
        </div>
    );
};
export default Signup;
