import Person from "/src/assets/svg/icons/Person.svg";
import Alert from "/src/assets/svg/icons/Bell.svg";
import Bin from "/src/assets/svg/icons/Bin.svg";
import React, { useState, useEffect } from 'react';
import { GetNotificationApi, UpdateNotificationApi, DeleteNotificationApi } from "/src/services/notificationService.js";
import { useFormik } from "formik";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [hoveredNotification, setHoveredNotification] = useState(null);
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);
    const token = sessionStorage.getItem("token");

    const fetchNotifications = async () => {
        const response = await GetNotificationApi(token);
        if (response.status === 200) {
            setNotifications(response.data);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const readFormik = useFormik({
        initialValues: {
            notificationId: selectedNotificationId,
            patch: [
                {
                    path: "/isRead",
                    op: "replace",
                    value: true
                }
            ]
        },
        onSubmit: async (values) => {
            const token = sessionStorage.getItem("token");
            const { status } = await UpdateNotificationApi(token, values.notificationId, values.patch);
            if (status === 200) {
                fetchNotifications();
            }
        },
    });

    const deleteFormik = useFormik({
        initialValues: {
            notificationId: selectedNotificationId,
        },
        onSubmit: async (values) => {
            const token = sessionStorage.getItem("token");
            const { status } = await DeleteNotificationApi(token, values.notificationId);
            if (status === 200) {
                fetchNotifications();
            }
        },
    });

    return (
        <div className="flex items-center">
            <div className="bg-white h-[47rem] rounded-md shadow-lg p-6 m-4 w-[full] lg:w-3/4 lg:max-w-lg">
                <div className="mb-3 border-b border-gray-200 pb-5">
                    <h1 className="text-jetblack font-bold">Notifications</h1>
                </div>
                <div className="overflow-y-auto h-[40rem]">
                    {notifications.filter(notification => notification.image === 'person').map(notification => (
                        <div
                            key={notification.id}
                            className="flex mt-4 my-4 hover:bg-lilac-pale transition-colors duration-200 relative"
                            onMouseEnter={() => setHoveredNotification(notification.id)}
                            onMouseLeave={() => setHoveredNotification(null)}
                        >
                            <div className="w-9 h-10 mr-3">
                                <img src={notification.image === 'person' ? Person : Alert} className="rounded-full" />
                            </div>
                            <div className="w-96">
                                <p
                                    className={`text-gray-800 ${!notification.isRead ? 'text-lilac font-bold cursor-pointer' : ''}`}
                                    onClick={() => {
                                        readFormik.setFieldValue('notificationId', notification.id);
                                        readFormik.handleSubmit();
                                    }}
                                >
                                    {notification.subject}
                                </p>
                                <p className="text-gray-600 break-words">{notification.message}</p>
                            </div>
                            {hoveredNotification === notification.id && (
                                <div className="flex items-center cursor-pointer justify-center">
                                    <img 
                                    src={Bin} 
                                    className="rounded-full" 
                                    onClick={() => {
                                        deleteFormik.setFieldValue('notificationId', notification.id);
                                        deleteFormik.handleSubmit();
                                    }}
                                    />
                                    
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white h-[47rem] rounded-md shadow-lg p-6 m-4 w-[full] lg:w-3/4 lg:max-w-lg">
                <div className="mb-3 border-b border-gray-200 pb-5">
                    <h1 className="text-jetblack font-bold">Alerts</h1>
                </div>
                <div className="overflow-y-auto h-[40rem]">
                    {notifications.filter(notification => notification.image === 'alert').map(notification => (
                        <div
                            key={notification.id}
                            className="flex mt-4 my-4 hover:bg-lilac-pale transition-colors duration-200 relative"
                            onMouseEnter={() => setHoveredNotification(notification.id)}
                            onMouseLeave={() => setHoveredNotification(null)}
                        >
                            <div className="w-9 h-10 mr-3">
                                <img src={notification.image === 'person' ? Person : Alert} className="rounded-full" />
                            </div>
                            <div className="w-96">
                                <p
                                    className={`text-jetblack ${!notification.isRead ? 'text-lilac font-bold cursor-pointer' : ''}`}
                                    onClick={() => {
                                        readFormik.setFieldValue('notificationId', notification.id);
                                        readFormik.handleSubmit();
                                    }}
                                >
                                    {notification.subject}
                                </p>
                                <p className="text-gray-600 break-words">{notification.message}</p>
                            </div>
                            {hoveredNotification === notification.id && (
                                <div className="flex items-center cursor-pointer justify-center">
                                    <img 
                                    src={Bin} 
                                    className="rounded-full" 
                                    onClick={() => {
                                        deleteFormik.setFieldValue('notificationId', notification.id);
                                        deleteFormik.handleSubmit();
                                    }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;