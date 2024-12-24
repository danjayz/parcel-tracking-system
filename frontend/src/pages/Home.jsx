import React, { useState } from "react";
import { Search, Package, Truck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Home = () => {
    const [trackingId, setTrackingId] = useState("");
    const navigate = useNavigate();

    const handleTrack = () => {
        // check if tracking number available in the database using axios
        axios
            .get(`http://localhost:8000/api/parcels/${trackingId}`)
            .then((res) => {
                if (res.status == 200) {
                    navigate(`/parcels/${trackingId}`);
                } else {
                    toast.error("Tracking number not found.");
                }
            })
            .catch((err) => {
                toast.error("Tracking number not found.");
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex flex-col">
            <main className="mt-20 container mx-auto px-4 py-8 flex items-center justify-center">
                <div className="max-w-xl w-full">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500">
                            Track Your Parcel
                        </h1>
                        <p className="text-md md:text-lg text-gray-600">
                            Fast, precise, and reliable tracking across multiple
                            carriers
                        </p>
                    </div>

                    <div className="bg-white shadow-2xl rounded-xl p-1 flex items-center border border-gray-200 mb-8">
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                placeholder="Enter Tracking Number"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                className="w-full px-4 py-3 pl-10 rounded-l-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <button
                            onClick={handleTrack}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-r-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                            Track
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            {
                                Icon: Truck,
                                color: "text-blue-600",
                                title: "Real-time Tracking",
                            },
                            {
                                Icon: MapPin,
                                color: "text-green-600",
                                title: "Precise Location",
                            },
                            {
                                Icon: Package,
                                color: "text-purple-600",
                                title: "Multi-Carrier",
                            },
                        ].map(({ Icon, color, title }) => (
                            <div
                                key={title}
                                className="bg-white border border-gray-100 rounded-xl p-4 shadow-md text-center transform transition hover:scale-105 hover:shadow-xl"
                            >
                                <Icon
                                    className={`mx-auto h-8 w-8 ${color} mb-3`}
                                />
                                <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                                    {title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
