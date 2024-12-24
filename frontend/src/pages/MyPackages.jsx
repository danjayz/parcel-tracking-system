import React, { useState } from "react";
import { Package, X, Trash2, Plus } from "lucide-react";

const MyPackages = () => {
    const [packages, setPackages] = useState([
        {
            id: 1,
            tracking_number: "TRK123456789",
            carrier: "FedEx",
            state: "Out for Delivery",
            created_at: "2024-12-01T10:00:00Z",
        },
        {
            id: 2,
            tracking_number: "TRK987654321",
            carrier: "UPS",
            state: "In Transit",
            created_at: "2024-12-02T14:30:00Z",
        },
    ]);

    const [isAddingPackage, setIsAddingPackage] = useState(false);
    const [newPackage, setNewPackage] = useState({
        tracking_number: "",
        carrier: "FedEx",
    });

    const getStatusColor = (status) => {
        const statusColors = {
            Delivered: "bg-green-100 text-green-800",
            "In Transit": "bg-blue-100 text-blue-800",
            Pending: "bg-yellow-100 text-yellow-800",
            "Out for Delivery": "bg-indigo-100 text-indigo-800",
            Exception: "bg-red-100 text-red-800",
        };
        return statusColors[status] || "bg-gray-100 text-gray-800";
    };

    const handleDeletePackage = (packageId) => {
        setPackages((prevPackages) =>
            prevPackages.filter((pkg) => pkg.id !== packageId)
        );
    };

    const handleAddPackage = () => {
        if (newPackage.tracking_number && newPackage.carrier) {
            setPackages((prevPackages) => [
                ...prevPackages,
                {
                    ...newPackage,
                    id: Date.now(),
                    state: "Pending",
                    created_at: new Date().toISOString(),
                },
            ]);
            setIsAddingPackage(false);
            setNewPackage({
                tracking_number: "",
                carrier: "FedEx",
            });
        }
    };

    const renderMobilePackageCard = (pkg) => (
        <div key={pkg.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        pkg.state
                    )}`}
                >
                    {pkg.state}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-red-600 hover:bg-red-100 p-1 rounded-full"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Carrier:</span>
                    <span className="text-gray-900">{pkg.carrier}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                        Tracking Number:
                    </span>
                    <span className="text-gray-900">{pkg.tracking_number}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Added:</span>
                    <span className="text-gray-900">
                        {new Date(pkg.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-4 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <Package className="mr-2 h-6 w-6" /> My Packages
                    </h2>
                    <button
                        onClick={() => setIsAddingPackage(true)}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-blue-50 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Track Package
                    </button>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="max-w-7xl mx-auto">
                <div className="hidden md:block px-4 py-8">
                    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Added Date
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Carrier
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Tracking Number
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left">
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
                                        <td className="px-6 py-4">
                                            {new Date(
                                                pkg.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {pkg.carrier}
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {pkg.tracking_number}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    pkg.state
                                                )}`}
                                            >
                                                {pkg.state}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() =>
                                                    handleDeletePackage(pkg.id)
                                                }
                                                className="text-red-600 hover:bg-red-100 p-2 rounded-full transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden p-4">
                {packages.map(renderMobilePackageCard)}
            </div>

            {/* Add Package Modal */}
            {isAddingPackage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">
                                Track a Package
                            </h3>
                            <button
                                onClick={() => setIsAddingPackage(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Carrier
                                </label>
                                <select
                                    value={newPackage.carrier}
                                    onChange={(e) =>
                                        setNewPackage({
                                            ...newPackage,
                                            carrier: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option>FedEx</option>
                                    <option>UPS</option>
                                    <option>USPS</option>
                                    <option>DHL</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tracking Number
                                </label>
                                <input
                                    type="text"
                                    value={newPackage.tracking_number}
                                    onChange={(e) =>
                                        setNewPackage({
                                            ...newPackage,
                                            tracking_number: e.target.value,
                                        })
                                    }
                                    placeholder="Enter tracking number"
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setIsAddingPackage(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddPackage}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
