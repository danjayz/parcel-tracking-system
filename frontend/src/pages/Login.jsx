import React from "react";

function Login() {
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
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500">
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
