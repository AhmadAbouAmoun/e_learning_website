import {useNavigate} from "react-router-dom";

const SiginButton = ({password, email, type}) => {
    const navigate = useNavigate();
    return (
        <div>
            <button title="Sign In" type="button" className="sign-in_btn" onClick={() => navigate("/homePage")}>
                <span>Sign In</span>
            </button>
            <p className="note">Terms of use &amp; Conditions</p>
        </div>
    );
};
export default SiginButton;
