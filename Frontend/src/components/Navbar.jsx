import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname.toLowerCase();
  //const token = localStorage.getItem("token") || null;
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token && path !== "/login" && path !== "/register") {
      navigate("/login", { replace: true });
    }
  }, [token, path, navigate]);

  const logout = () => {
    dispatch(logout());
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
                <Link to="/appointment">Appointments</Link>
              </li>
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
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
