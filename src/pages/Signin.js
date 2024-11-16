import Input from "../components/Input";
import SiginButton from "../components/SigininButton";

const Signin = () => {
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
                <Input />
                <Input />
                <SiginButton />
                <button title="Sign In" type="submit" className="sign-in_btn" onClick={() => {}}>
                    <span>Do not have an account? Sign up</span>
                </button>
            </form>
        </div>
    );
};
export default Signin;
