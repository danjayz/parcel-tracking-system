import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    PackageIcon,
    MapPinIcon,
    UserIcon,
    TagIcon,
    LocateIcon,
    TruckIcon,
    CheckCircleIcon,
    AlertTriangleIcon,
    XCircleIcon,
    ClockIcon,
    RotateCcwIcon,
    PrinterIcon,
    ArchiveIcon,
    HomeIcon,
    SendIcon,
    CornerDownRightIcon,
    StopCircleIcon,
    AlertOctagonIcon,
} from "lucide-react";

// Status configurations (same as previous implementation)
const STATUS_CONFIG = {
    "In Transit": {
        color: "bg-blue-100 text-blue-800",
        icon: TruckIcon,
    },
    Delivered: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircleIcon,
    },
    Pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: ClockIcon,
    },
    Returned: {
        color: "bg-orange-100 text-orange-800",
        icon: RotateCcwIcon,
    },
    "Tracking Created": {
        color: "bg-gray-100 text-gray-800",
        icon: TagIcon,
    },
    "Label Printed": {
        color: "bg-indigo-100 text-indigo-800",
        icon: PrinterIcon,
    },
    "Picked Up": {
        color: "bg-purple-100 text-purple-800",
        icon: CornerDownRightIcon,
    },
    "At Origin Facility": {
        color: "bg-blue-200 text-blue-900",
        icon: HomeIcon,
    },
    "At Destination Facility": {
        color: "bg-green-200 text-green-900",
        icon: LocateIcon,
    },
    "Out for Delivery": {
        color: "bg-teal-100 text-teal-800",
        icon: SendIcon,
    },
    "Attempted Delivery": {
        color: "bg-yellow-200 text-yellow-900",
        icon: AlertTriangleIcon,
    },
    "Held at Facility": {
        color: "bg-orange-200 text-orange-900",
        icon: StopCircleIcon,
    },
    Exception: {
        color: "bg-red-100 text-red-800",
        icon: AlertOctagonIcon,
    },
    "Returned to Sender": {
        color: "bg-red-200 text-red-900",
        icon: ArchiveIcon,
    },
    Lost: {
        color: "bg-gray-200 text-gray-900",
        icon: XCircleIcon,
    },
    Delayed: {
        color: "bg-amber-100 text-amber-800",
        icon: ClockIcon,
    },
};

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${period}`;
}

function ViewParcelDetails() {
    const { parcelId } = useParams();
    const [parcelData, setParcelData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/parcels/${parcelId}`)
            .then((response) => {
                setParcelData(response.data.data.parcel);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching parcel details:", error);
                setError("Failed to load parcel details");
                setLoading(false);
            });
    }, [parcelId]);

    const StatusBadge = ({ status }) => {
        const config = STATUS_CONFIG[status] || {};
        const StatusIcon = config.icon || TagIcon;

        return (
            <div className="flex items-center space-x-4">
                <StatusIcon className="w-10 h-10 text-gray-700" />
                <span
                    className={`px-5 py-2 rounded-full text-lg font-semibold ${config.color || "bg-gray-100 text-gray-800"}`}
                >
                    {status}
                </span>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-5 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-xl font-medium text-gray-700">
                        Loading Parcel Details...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-red-50 px-6">
                <div className="text-center max-w-md">
                    <PackageIcon className="w-20 h-20 mx-auto text-red-600 mb-6" />
                    <p className="text-2xl font-semibold text-red-800 mb-4">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto max-w-6xl">
                {/* Full-Width Header */}
                <div className="bg-white shadow-xl rounded-t-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <PackageIcon className="w-12 h-12 text-white" />
                            <h1 className="text-3xl font-bold text-white">
                                Parcel Tracking Details
                            </h1>
                        </div>
                        <div className="text-white">
                            <p className="text-lg font-semibold">
                                Tracking Number
                            </p>
                            <p className="text-xl tracking-wider">
                                {parcelData.tracking_number}
                            </p>
                        </div>
                    </div>

                    {/* Status and Key Information */}
                    <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 border-b">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                Current Status
                            </h3>
                            <StatusBadge status={parcelData.state} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                Sender Details
                            </h3>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <p className="text-xl font-medium text-gray-900">
                                    {parcelData.sender_name}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {parcelData.pickup_location}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                Receiver Details
                            </h3>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <p className="text-xl font-medium text-gray-900">
                                    {parcelData.receiver_name}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {parcelData.city}, {parcelData.district}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                    {/* Left Column */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                            <LocateIcon className="w-8 h-8 mr-3 text-blue-600" />
                            Delivery Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Pickup Location
                                </p>
                                <p className="text-xl font-medium text-gray-900">
                                    {parcelData.pickup_location}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Destination
                                </p>
                                <p className="text-xl font-medium text-gray-900">
                                    {parcelData.city}, {parcelData.district}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Delivery Address
                                </p>
                                <p className="text-lg text-gray-700">
                                    {parcelData.address_line1}
                                </p>
                                <p className="text-lg text-gray-700">
                                    {parcelData.city}
                                </p>
                                <p className="text-lg text-gray-700">
                                    {parcelData.district}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                            <PackageIcon className="w-8 h-8 mr-3 text-blue-600" />
                            Parcel Details
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Weight
                                </p>
                                <p className="text-xl font-medium text-gray-900">
                                    {parcelData.weight} Kg
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Last Updated
                                </p>
                                <p className="text-lg text-gray-700">
                                    {formatDate(parcelData.updated_at)}
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <p className="text-sm text-gray-500 mb-1">
                                    Estimated Delivery
                                </p>
                                <p className="text-xl font-semibold text-blue-600">
                                    {/* You might want to add this from your backend */}
                                    Pending Confirmation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewParcelDetails;
