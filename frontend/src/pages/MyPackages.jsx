import React, { useEffect, useState } from "react";
import { Package, X, Trash2, Plus, Eye } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingPackage, setIsAddingPackage] = useState(false);
    const [trackingId, setTrackingId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = () => {
        axios
            .get(`http://localhost:8000/api/userParcels`)
            .then((res) => {
                if (res.status === 200) {
                    setPackages(res.data.parcels);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to load packages");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getStatusColor = (status) => {
        const statusColors = {
            Delivered: "bg-emerald-100 text-emerald-800",
            "In Transit": "bg-sky-100 text-sky-800",
            Pending: "bg-amber-100 text-amber-800",
            Returned: "bg-rose-100 text-rose-800",
            Exception: "bg-purple-100 text-purple-800",
            "Out for Delivery": "bg-indigo-100 text-indigo-800",
        };
        return statusColors[status] || "bg-slate-100 text-slate-800";
    };

    const handleDeletePackage = async (packageId) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/userParcel/${packageId}`
            );
            fetchPackages();
            toast.success("Package removed successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove package");
        }
    };

    const handleView = (parcelId) => {
        navigate(`/parcels/${parcelId}`);
    };

    const handleAddPackage = async () => {
        try {
            const parcelRes = await axios.get(
                `http://localhost:8000/api/parcels/${trackingId}`
            );

            if (parcelRes.status === 200) {
                const parcelId = parcelRes.data.data.parcel.id;
                const userRes = await axios.get(
                    `http://localhost:8000/api/user_id`,
                    {
                        withCredentials: true,
                    }
                );
                const userId = userRes.data.user_id;

                await axios.post(`http://localhost:8000/api/addParcelToUser`, {
                    user_id: userId,
                    parcel_id: parcelId,
                });

                toast.success("Package added successfully");
                setTrackingId("");
                setIsAddingPackage(false);
                fetchPackages();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add package");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
                <div className="text-center">
                    <Package className="mx-auto h-16 w-16 text-blue-600 animate-pulse" />
                    <p className="mt-4 text-xl font-semibold text-gray-700">
                        Loading Packages...
                    </p>
                </div>
            </div>
        );
    }

    const renderMobilePackageCard = (pkg) => (
        <div
            key={pkg.id}
            className="bg-white shadow-lg rounded-xl p-6 mb-4 transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
        >
            <div className="flex justify-between items-center mb-4">
                <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                        pkg.state
                    )}`}
                >
                    {pkg.state}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleView(pkg.tracking_number)}
                        className="text-emerald-600 hover:bg-emerald-100 p-2 rounded-full transition-colors"
                    >
                        <Eye className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-rose-600 hover:bg-rose-100 p-2 rounded-full transition-colors"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Tracking Number:
                    </span>
                    <span className="text-gray-900 font-semibold">
                        {pkg.tracking_number}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Added:</span>
                    <span className="text-gray-900">
                        {new Date(pkg.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No packages added
            </h3>
            <p className="text-gray-600 mb-6">
                Click "Track Package" to add your first package
            </p>
            <button
                onClick={() => setIsAddingPackage(true)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg flex items-center shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
                <Plus className="h-5 w-5 mr-2" /> Track Package
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-6 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <Package className="mr-3 h-8 w-8" /> My Packages
                        </h2>
                        <button
                            onClick={() => setIsAddingPackage(true)}
                            className="bg-white text-blue-600 px-6 py-2.5 rounded-lg flex items-center shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                        >
                            <Plus className="h-5 w-5 mr-2" /> Track Package
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {packages.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <div className="hidden md:block">
                            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                Added Date
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                Tracking Number
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {packages.map((pkg, index) => (
                                            <tr
                                                key={pkg.id}
                                                className={`${
                                                    index % 2 === 0
                                                        ? "bg-gray-50"
                                                        : "bg-white"
                                                } hover:bg-blue-50 transition-colors`}
                                            >
                                                <td className="px-6 py-4 text-gray-900">
                                                    {new Date(
                                                        pkg.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {pkg.tracking_number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                            pkg.state
                                                        )}`}
                                                    >
                                                        {pkg.state}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                handleView(
                                                                    pkg.tracking_number
                                                                )
                                                            }
                                                            className="text-emerald-600 hover:bg-emerald-100 p-2 rounded-full transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeletePackage(
                                                                    pkg.id
                                                                )
                                                            }
                                                            className="text-rose-600 hover:bg-rose-100 p-2 rounded-full transition-colors"
                                                            title="Remove Package"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="md:hidden space-y-4">
                            {packages.map(renderMobilePackageCard)}
                        </div>
                    </>
                )}
            </div>

            {isAddingPackage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                Track a Package
                            </h3>
                            <button
                                onClick={() => setIsAddingPackage(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tracking Number
                                </label>
                                <input
                                    type="text"
                                    value={trackingId}
                                    onChange={(e) =>
                                        setTrackingId(e.target.value)
                                    }
                                    placeholder="Enter tracking number"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setIsAddingPackage(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddPackage}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Track Package
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPackages;
