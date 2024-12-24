import React from "react";
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6">
                {/* Company Info */}
                <div>
                    <h3 className="font-bold mb-4">TrackMate Lanka</h3>
                    <p className="text-sm text-gray-300">
                        Reliable parcel tracking solutions across Sri Lanka
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-blue-400">
                                Track Parcel
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-400">
                                Supported Carriers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-400">
                                Shipping Rates
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-400">
                                Help Center
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-semibold mb-4">Contact Us</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>+94 11 234 5678</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>support@trackmate.lk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>Colombo 07, Sri Lanka</span>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div>
                    <h4 className="font-semibold mb-4">Connect With Us</h4>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-blue-500 hover:text-blue-400"
                        >
                            <Facebook className="h-6 w-6" />
                        </a>
                        <a
                            href="#"
                            className="text-pink-500 hover:text-pink-400"
                        >
                            <Instagram className="h-6 w-6" />
                        </a>
                        <a
                            href="#"
                            className="text-blue-400 hover:text-blue-300"
                        >
                            <Twitter className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-6 pt-4 text-center text-sm text-gray-400">
                © 2024 TrackMate Lanka. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
