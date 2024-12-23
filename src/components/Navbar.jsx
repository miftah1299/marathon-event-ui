import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Navbar = () => {
    const { user, signoutUser } = useAuth();

    const handleSignout = () => {
        signoutUser()
            .then(() => {
                toast.success("Signed out successfully");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `tab ${isActive ? "text-primary" : "hover:text-primary"}`
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/marathons"
                className={({ isActive }) =>
                    `tab ${isActive ? "text-primary" : "hover:text-primary"}`
                }
            >
                Marathons
            </NavLink>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `tab ${isActive ? "text-primary" : "hover:text-primary"}`
                }
            >
                Dashboard
            </NavLink>
        </>
    );

    return (
        <div className="navbar bg-gray-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <Link
                    to="/"
                    className="text-2xl font-bold flex items-center gap-2"
                >
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                    OnYourMark
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end">
                <div>
                    {user && user?.email ? (
                        <div className=" flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <img
                                    src={
                                        user?.photoURL ||
                                        "https://i.ibb.co.com/P1n2z8D/profile-icon-design-free-vector.jpg"
                                    }
                                    alt="user"
                                    className="w-10 h-10 rounded-full"
                                />
                                <p className="text-sm">{user?.displayName}</p>
                            </div>

                            <button
                                onClick={handleSignout}
                                className="btn btn-outline text-accent"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className=" flex items-center gap-4">
                            <Link
                                to="/auth/register"
                                className="btn btn-outline text-accent"
                            >
                                Register
                            </Link>

                            <Link
                                to="/auth/signin"
                                className="btn btn-outline text-accent"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
