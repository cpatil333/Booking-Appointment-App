import { useNavigate, useLocation, Link } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const token = localStorage.getItem("token") || null;

  if (!token && path !== "/login" && path !== "/register") {
    navigate("/login");
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Multiple User Website</h2>
        <ul>
          {token ? (
            <>
              <li>
                <Link to="/">Users</Link>
              </li>
              <li>
                <Link>Appointments</Link>
              </li>
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link>Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
