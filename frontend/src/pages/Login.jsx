import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login() {
        let item = { email, password };
        let result = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        result = await result.json();
        console.log(result);

        if (result.email) {
            navigate("/home");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    onClick={login}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
