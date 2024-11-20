import {useNavigate} from "react-router-dom";

const SiginButton = ({password, email, type}) => {
    const navigate = useNavigate();
    return (
        <div>
            <button
                title="Sign In"
                type="button"
                className="sign-in_btn"
                onClick={() =>
                    fetch("http://localhost/e-learning-website/server/checkUser.php", {
                        method: "POST",
                        body: {
                            password: password,
                            type: type,
                            email: email,
                        },
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        localStorage.setItem("token", data.token);
                        navigate("/homePage");
                    })
                    .catch((e) => console.log(e))
                }
            >
                <span>Sign In</span>
            </button>
            <p className="note">Terms of use &amp; Conditions</p>
        </div>
    );
};
export default SiginButton;
