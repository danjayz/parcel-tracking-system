import React, { useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";

function GetNotification() {
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Request permission to show notifications
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission === "denied") {
                    setError("Notification permission denied.");
                }
            });
        }

        const fetchUserId = async () => {
            try {
                const userRes = await axios.get(
                    `http://localhost:8000/api/user_id`,
                    {
                        withCredentials: true,
                    }
                );
                setUserId(userRes.data.user_id);
            } catch (error) {
                setError("Failed to fetch user ID");
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId !== null) {
            const pusher = new Pusher("671ad5339784ae9a4a72", {
                cluster: "ap2",
                encrypted: true,
            });

            const channelName = `user.${userId}`;
            const channel = pusher.subscribe(channelName);

            channel.bind("my-event", (data) => {
                console.log("--------------------");
                console.log(data.parcel.state);

                // Send a browser notification instead of using alert
                if (Notification.permission === "granted") {
                    new Notification(`Your parcel ${data.parcel.state}`);
                }
            });

            setConnected(true);

            return () => {
                pusher.unsubscribe(channelName);
                pusher.disconnect();
                setConnected(false);
            };
        }
    }, [userId]);
}

export default GetNotification;
