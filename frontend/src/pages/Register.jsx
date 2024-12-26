import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { User, Mail, Lock, UserPlus } from "lucide-react";

function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("http://localhost:8000/api/register", data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status === 200) {
                        localStorage.setItem("auth_token", response.data.token);
                        localStorage.setItem("user_name", response.data.name);
                        swal("Success", response.data.message, "success");
                        navigate("/");
                    } else {
                        swal("Error", response.data.message, "error");
                    }
                });
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-500">Sign up to get started</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Username"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                            <UserPlus className="mr-2" /> Sign Up
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-600">
                        Already have an account?
                        <a
                            href="/login"
                            className="text-blue-600 hover:underline ml-1"
                        >
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
