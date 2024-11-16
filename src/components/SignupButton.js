import {useNavigate} from "react-router-dom";

const SignupButton = ({name, password, email}) => {
    const navigate = useNavigate();
    return (
        <div>
            <button title="Sign In" type="button" className="sign-in_btn" onClick={() => navigate("/homePage")}>
                <span>Sign Up</span>
            </button>
            <p className="note">Terms of use &amp; Conditions</p>
        </div>
    );
};
export default SignupButton;
