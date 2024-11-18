import {useNavigate} from "react-router-dom";

const SignupButton = ({name, password, email, type}) => {
    const navigate = useNavigate();
    return (
        <div>
            <button
                title="Sign Up"
                type="button"
                className="sign-in_btn"
                onClick={() => {
                    fetch("http://localhost/e-learning-website/server/CreateUser.php", {
                        method: "POST",
                        body: new URLSearchParams({
                            name: name,
                            password: password,
                            type: type,
                            email: email,
                        }),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        localStorage.setItem("token", data.token);
                        navigate("/homePage");
                    });
                }}
            >
                <span>Sign Up</span>
            </button>
            <p className="note">Terms of use &amp; Conditions</p>
        </div>
    );
};
export default SignupButton;
