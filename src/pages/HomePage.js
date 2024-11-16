import "../styles/navbar.css";
const HomePage = () => {
    return (
        <nav className="navbar">
            <h3>Website Name</h3>

            <ul>
                <li>
                    <button>Home</button>
                </li>
                <li>
                    <button>About Us</button>
                </li>
                <li>
                    <button>Profile</button>
                </li>
            </ul>

            <button class="primary-bg">Login</button>
        </nav>
    );
};
export default HomePage;
