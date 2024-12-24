// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";

// function Register() {
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const navigate = useNavigate();

//     const handleSignUp = (e) => {
//         e.preventDefault();

//         const data = {
//             name: name,
//             email: email,
//             password: password,
//         };

//         axios.get("/sanctum/csrf-cookie").then((response) => {
//             axios
//                 .post("http://localhost:8000/api/register", data)
//                 .then((response) => {
//                     console.log(response);
//                     if (response.data.status === 200) {
//                         localStorage.setItem("auth_token", response.data.token);
//                         localStorage.setItem("user_name", response.data.name);
//                         swal("Success", response.data.message, "success");
//                         navigate("/home");
//                     } else {
//                         swal("Error", response.data.message, "error");
//                     }
//                 });
//         });
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//                 <div className="mb-4">
//                     <label
//                         htmlFor="username"
//                         className="block text-gray-700 font-bold mb-2"
//                     >
//                         Username:
//                     </label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label
//                         htmlFor="email"
//                         className="block text-gray-700 font-bold mb-2"
//                     >
//                         Email:
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label
//                         htmlFor="password"
//                         className="block text-gray-700 font-bold mb-2"
//                     >
//                         Password:
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded"
//                     />
//                 </div>
//                 <div>
//                     <button
//                         type="submit"
//                         onClick={handleSignUp}
//                         className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//                     >
//                         Register
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Register;

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
