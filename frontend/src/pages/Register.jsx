import React from "react";
import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function signUp() {
        let item = { name, email, password };
        console.warn(item);

        let result = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        result = await result.json();

        console.log(result);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={signUp}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
