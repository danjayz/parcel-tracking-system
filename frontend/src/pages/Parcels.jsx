import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Edit, Trash2, Eye, Package } from "lucide-react";

const Parcels = () => {
    const [parcelList, setParcelList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/parcels")
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    setParcelList(response.data.data.parcels);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching parcels:", error);
                setLoading(false);
                toast.error("Failed to load parcels");
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
                <div className="text-center">
                    <Package className="mx-auto h-16 w-16 text-blue-600 animate-pulse" />
                    <p className="mt-4 text-xl font-semibold text-gray-700">
                        Loading Parcels...
                    </p>
                </div>
            </div>
        );
    }

    const handleEdit = (parcelId, newState) => {
        axios
            .put(`http://localhost:8000/api/parcels/${parcelId}`, {
                state: newState,
            })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Parcel status updated successfully");
                    setParcelList((prevList) =>
                        prevList.map((parcel) =>
                            parcel.id === parcelId
                                ? { ...parcel, state: newState }
                                : parcel
                        )
                    );
                } else {
                    toast.error("Failed to update parcel status");
                }
            })
            .catch((error) => {
                console.error("Error updating parcel status:", error);
                toast.error("Failed to update parcel status");
            });
    };

    const handleDelete = (e, parcelId) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8000/api/parcels/${parcelId}`)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Parcel deleted successfully");
                    setParcelList((prevList) =>
                        prevList.filter((parcel) => parcel.id !== parcelId)
                    );
                } else {
                    toast.error("Failed to delete parcel");
                }
            });
    };

    const handleView = (parcelId) => {
        navigate(`/parcels/${parcelId}`);
    };

    // Status color mapping
    const getStatusColor = (status) => {
        const statusColors = {
            Delivered: "bg-green-100 text-green-800",
            "In Transit": "bg-blue-100 text-blue-800",
            Pending: "bg-yellow-100 text-yellow-800",
            Returned: "bg-red-100 text-red-800",
            Exception: "bg-purple-100 text-purple-800",
            "Out for Delivery": "bg-indigo-100 text-indigo-800",
        };
        return statusColors[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-8 shadow-lg">
                <h2 className="text-4xl font-bold text-white text-center flex items-center justify-center">
                    <Package className="mr-4 h-10 w-10" /> Parcels Management
                </h2>
            </div>

            <div className="mx-auto px-4 py-8">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        {" "}
                        <table className="w-full text-sm whitespace-nowrap">
                            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                                <tr>
                                    {[
                                        "Added Date",
                                        "Tracking Number",
                                        "Address",
                                        "City",
                                        "District",
                                        "Status",
                                        "Actions",
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            className="px-6 py-4 text-left uppercase font-medium"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {parcelList
                                    .slice()
                                    .sort(
                                        (a, b) =>
                                            new Date(b.created_at) -
                                            new Date(a.created_at)
                                    )
                                    // Sorting the parcels by the 'created_at' date in descending order
                                    .map((parcel, index) => (
                                        <tr
                                            key={parcel.id}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-gray-50"
                                                    : "bg-white"
                                            } hover:bg-blue-50 transition-colors`}
                                        >
                                            <td className="px-6 py-4">
                                                {
                                                    new Date(parcel.created_at)
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {parcel.tracking_number}
                                            </td>
                                            <td className="px-6 py-4">
                                                {parcel.address_line1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {parcel.city}
                                            </td>
                                            <td className="px-6 py-4">
                                                {parcel.district}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                        parcel.state
                                                    )}`}
                                                >
                                                    {parcel.state}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <select
                                                        value={parcel.state}
                                                        onChange={(e) => {
                                                            const newState =
                                                                e.target.value;
                                                            setParcelList(
                                                                (prevList) =>
                                                                    prevList.map(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id ===
                                                                            parcel.id
                                                                                ? {
                                                                                      ...item,
                                                                                      state: newState,
                                                                                  }
                                                                                : item
                                                                    )
                                                            );
                                                        }}
                                                        className="w-36 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        {[
                                                            "In Transit",
                                                            "Delivered",
                                                            "Pending",
                                                            "Returned",
                                                            "Tracking Created",
                                                            "Label Printed",
                                                            "Picked Up",
                                                            "At Origin Facility",
                                                            "At Destination Facility",
                                                            "Out for Delivery",
                                                            "Attempted Delivery",
                                                            "Held at Facility",
                                                            "Exception",
                                                            "Returned to Sender",
                                                            "Lost",
                                                            "Delayed",
                                                        ].map((status) => (
                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                parcel.id,
                                                                parcel.state
                                                            )
                                                        }
                                                        className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) =>
                                                            handleDelete(
                                                                e,
                                                                parcel.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:bg-red-100 p-2 rounded-full transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleView(
                                                                parcel.tracking_number
                                                            )
                                                        }
                                                        className="text-green-600 hover:bg-green-100 p-2 rounded-full transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>{" "}
                </div>
            </div>
        </div>
    );
};

export default Parcels;
