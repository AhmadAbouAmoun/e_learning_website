import {useNavigate} from "react-router-dom";

const SignupButton = ({name, password, email}) => {
    const navigate = useNavigate();

    return (
        <div>
            <button
                title="Sign Up"
                type="button"
                className="sign-in_btn"
                onClick={async () => {
                    try {
                        const response = await fetch("http://localhost/e-learning-website/server/CreateUser.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: name,
                                password: password,
                                email: email,
                            }),
                        });

                        const data = await response.json();

                        if (data) {
                            localStorage.setItem("token", data.token);
                            navigate("/homePage");
                        } else {
                            console.error(data.message);
                        }
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }}
            >
                <span>Sign Up</span>
            </button>
            <p className="note">Terms of use &amp; Conditions</p>
        </div>
    );
};
export default SignupButton;
