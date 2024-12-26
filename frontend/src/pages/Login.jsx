import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn } from "lucide-react";
import swal from "sweetalert";

function Login() {
    const navigate = useNavigate();
    const [logInput, setLogInput] = useState({
        email: "",
        password: "",
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogInput({ ...logInput, [e.target.name]: e.target.value });
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: logInput.email,
            password: logInput.password,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("http://localhost:8000/api/login", data)
                .then((response) => {
                    if (response.data.status === 200) {
                        console.log(response.data);
                        localStorage.setItem("auth_token", response.data.token);
                        localStorage.setItem(
                            "user_type",
                            response.data.user_type
                        );
                        swal({
                            title: "Success",
                            text: response.data.message,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                        }).then(() => {
                            navigate("/", { replace: true });
                            window.location.reload();
                        });
                    } else if (response.data.status === 401) {
                        swal("Error", response.data.message, "error");
                    } else {
                        setLogInput({
                            ...logInput,
                            error_list: response.data.validation_error,
                        });
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
                            Welcome Back
                        </h2>
                        <p className="text-gray-500">Sign in to continue</p>
                    </div>

                    <form onSubmit={loginSubmit} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                onChange={handleInput}
                                value={logInput.email}
                                placeholder="Email Address"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                required
                                onChange={handleInput}
                                value={logInput.password}
                                placeholder="Password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                            <LogIn className="mr-2" /> Sign In
                        </button>
                    </form>

                    <div className="text-center">
                        <a
                            href="/forgot-password"
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
