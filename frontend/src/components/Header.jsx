import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between items-center">
                {/* Logo/Brand Name */}
                <div className="text-xl font-bold">
                    <Link to="/">Delivery Tracker</Link>
                </div>

                {/* Navigation Links */}
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-400">
                        Home
                    </Link>
                    <Link to="/login" className="hover:text-gray-400">
                        Login
                    </Link>
                    <Link to="/register" className="hover:text-gray-400">
                        Register
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
