import {useNavigate} from "react-router-dom";

const SiginButton = ({password, email, type}) => {
    const navigate = useNavigate();
    return (
        <div>
            <button
                title="Sign In"
                type="button"
                className="sign-in_btn"
                onClick={async () => {
                    try {
                        const response = await fetch("http://localhost/e-learning-website/server/checkUser.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                type: type,
                                password: password,
                                email: email,
                            }),
                        });

                        const data = await response.json();

                        if (data) {
                            if (data[0].status === "success") {
                                localStorage.setItem("token", data[0].token);
                                if (data[0].redirectUrl === "homePage") navigate(`/homePage`);
                                else {
                                    navigate(`/adminPanel`);
                                }
                            }
                        }
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }}
            >
                <span>Sign In</span>
            </button>
            <p className="note">Terms of use &amp; Conditions</p>
        </div>
    );
};
export default SiginButton;
