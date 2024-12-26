import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Menu, X } from "lucide-react";
import axios from "axios";
import swal from "sweetalert";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = localStorage.getItem("auth_token");
    const userType = localStorage.getItem("user_type"); // Get the user type

    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/logout").then((response) => {
            if (response.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_type"); // Remove user type on logout
                swal({
                    title: "Success",
                    text: response.data.message,
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                }).then(() => {
                    window.location.reload();
                });
            } else {
                swal("Error", response.data.message, "error");
            }
        });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <Package className="h-8 w-8 text-blue-600" />
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        TrackMate
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-600">
                        {isMenuOpen ? (
                            <X className="h-7 w-7" />
                        ) : (
                            <Menu className="h-7 w-7" />
                        )}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav
                    className={`
          ${isMenuOpen ? "block" : "hidden"} 
          md:block absolute md:relative top-full left-0 right-0 
          bg-white md:bg-transparent shadow-md md:shadow-none
        `}
                >
                    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 p-5 md:p-0">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Home
                                </Link>
                                {userType === "admin" && (
                                    <Link
                                        to="/parcels"
                                        className="text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <Link
                                    to="/packages"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    My Packages
                                </Link>
                                {userType === "admin" && (
                                    <Link
                                        to="/parcels/add"
                                        className="text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        Add Parcel
                                    </Link>
                                )}
                                <button
                                    onClick={logoutSubmit}
                                    className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
