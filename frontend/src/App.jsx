// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import Parcels from "./pages/Parcels";
// import AddParcel from "./pages/AddParcel"; // Make sure this component exists
// import ViewParcelDetails from "./pages/ViewParcelDetails";
// import DriverView from "./pages/MyPackages";
// import { Toaster } from "react-hot-toast";
// import axios from "axios";
// import Footer from "./components/Footer";
// import MyPackages from "./pages/MyPackages";

// axios.defaults.withCredentials = true;
// axios.interceptors.request.use(function (config) {
//     const token = localStorage.getItem("auth_token");
//     config.headers.Authorization = token ? `Bearer ${token}` : "";
//     return config;
// });

// function App() {
//     return (
//         <div>
//             <Toaster position="top-center" reverseOrder={false} />
//             <Router>
//                 <Header />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="login" element={<Login />} />
//                     <Route path="register" element={<Register />} />
//                     <Route path="parcels" element={<Parcels />} />
//                     <Route path="packages" element={<MyPackages />} />
//                     <Route path="parcels/add" element={<AddParcel />} />
//                     <Route
//                         path="parcels/:parcelId"
//                         element={<ViewParcelDetails />}
//                     />
//                 </Routes>
//                 <Footer />
//             </Router>
//         </div>
//     );
// }

// export default App;

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Parcels from "./pages/Parcels";
import AddParcel from "./pages/AddParcel"; // Make sure this component exists
import ViewParcelDetails from "./pages/ViewParcelDetails";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Footer from "./components/Footer";
import MyPackages from "./pages/MyPackages";
import GetNotification from "./components/GetNotification";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

function App() {
    const userType = localStorage.getItem("user_type");

    // Protected Route for regular users (Only Home and MyPackages accessible)
    const ProtectedRoute = ({ element, allowedUserTypes }) => {
        return allowedUserTypes.includes(userType) ? (
            element
        ) : (
            <Navigate to="/" />
        );
    };

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Router>
                <GetNotification />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                        path="parcels"
                        element={
                            <ProtectedRoute
                                element={<Parcels />}
                                allowedUserTypes={["admin"]}
                            />
                        }
                    />
                    <Route
                        path="packages"
                        element={
                            <ProtectedRoute
                                element={<MyPackages />}
                                allowedUserTypes={["user", "admin"]}
                            />
                        }
                    />
                    <Route
                        path="parcels/add"
                        element={
                            <ProtectedRoute
                                element={<AddParcel />}
                                allowedUserTypes={["admin"]}
                            />
                        }
                    />
                    <Route
                        path="parcels/:parcelId"
                        element={
                            <ProtectedRoute
                                element={<ViewParcelDetails />}
                                allowedUserTypes={["user", "admin"]}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
