import React, { useState } from "react";
import axios from "axios";
import {
    ClipboardDocumentIcon,
    TruckIcon,
    UserIcon,
    MapPinIcon,
    ScaleIcon,
    RectangleStackIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

function AddParcel() {
    const districts = [
        "Colombo",
        "Gampaha",
        "Kalutara",
        "Kandy",
        "Matale",
        "Nuwara Eliya",
        "Galle",
        "Matara",
        "Hambantota",
        "Jaffna",
        "Kilinochchi",
        "Mannar",
        "Vavuniya",
        "Mullaitivu",
        "Batticaloa",
        "Ampara",
        "Trincomalee",
        "Kurunegala",
        "Puttalam",
        "Anuradhapura",
        "Polonnaruwa",
        "Badulla",
        "Moneragala",
        "Ratnapura",
        "Kegalle",
    ];

    const [formData, setFormData] = useState({
        tracking_number: "",
        address_line1: "",
        city: "",
        district: "",
        weight: "",
        dimensions: "",
        description: "",
        sender_name: "",
        receiver_name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Parcel Data Submitted:", formData);

        axios
            .post("http://localhost:8000/api/parcels/addParcel", formData)
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    toast.success("Parcel data submitted successfully");

                    setFormData({
                        tracking_number: "",
                        address_line1: "",
                        city: "",
                        district: "",
                        weight: "",
                        dimensions: "",
                        description: "",
                        sender_name: "",
                        receiver_name: "",
                    });
                } else {
                    toast.error(
                        "Failed to submit parcel data. Please try again."
                    );
                }
            })
            .catch((error) => {
                console.error("Error occurred:", error);
                toast.error("Failed to submit parcel data. Please try again.");
            });
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <TruckIcon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Add New Parcel
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Enter complete parcel shipping details
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="tracking_number"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <ClipboardDocumentIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Tracking Number
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="tracking_number"
                                    name="tracking_number"
                                    value={formData.tracking_number}
                                    onChange={handleChange}
                                    placeholder="Enter tracking number"
                                    required
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="sender_name"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Sender's Name
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="sender_name"
                                    name="sender_name"
                                    value={formData.sender_name}
                                    onChange={handleChange}
                                    placeholder="Enter sender's name"
                                    required
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="receiver_name"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Receiver's Name
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="receiver_name"
                                    name="receiver_name"
                                    value={formData.receiver_name}
                                    onChange={handleChange}
                                    placeholder="Enter receiver's name"
                                    required
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="address_line1"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Address Line 1
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="address_line1"
                                    name="address_line1"
                                    value={formData.address_line1}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                    required
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="city"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    City
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    required
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="district"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    District
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    id="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900
                                    "
                                >
                                    <option value="" disabled>
                                        Select a district
                                    </option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="weight"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <ScaleIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Weight (kg)
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="Enter weight"
                                    required
                                    step="0.01"
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="dimensions"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <RectangleStackIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Dimensions (L x W x H in cm)
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="dimensions"
                                    name="dimensions"
                                    value={formData.dimensions}
                                    onChange={handleChange}
                                    placeholder="e.g., 30x20x15"
                                    required
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="pickup_location"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Pickup Location
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="pickup_location"
                                    name="pickup_location"
                                    value={formData.pickup_location}
                                    onChange={handleChange}
                                    placeholder="Enter Pickup Location"
                                    required
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="md:col-span-3">
                                <label
                                    htmlFor="description"
                                    className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
                                >
                                    <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Description
                                    <span className="text-gray-500 ml-2 text-xs">
                                        (Optional)
                                    </span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Add an optional description about the parcel"
                                    className="
                                        block w-full px-3 py-2 
                                        border border-gray-300 
                                        rounded-lg 
                                        shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        transition duration-200 
                                        text-gray-900 
                                        placeholder-gray-400
                                    "
                                />
                            </div>

                            <div className="md:col-span-3 mt-4">
                                <button
                                    type="submit"
                                    className="
                                        w-full 
                                        bg-gradient-to-r from-blue-600 to-indigo-700 
                                        text-white 
                                        py-3 
                                        rounded-lg 
                                        shadow-lg 
                                        hover:shadow-xl 
                                        transition duration-300 
                                        ease-in-out 
                                        transform hover:-translate-y-1 
                                        focus:outline-none 
                                        focus:ring-4 
                                        focus:ring-blue-300
                                    "
                                >
                                    Submit Parcel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddParcel;
