import { useState, useEffect } from "react";
import { GetNotificationsApi } from "/src/services/notificationService";

const useNotifications = (createNotification) => {
    
    const token = sessionStorage.getItem("token");
    const [ notifications, setNotifications ] = useState([]);

    useEffect(() => {
        const getNotifications  = async () => {
            const response = await GetNotificationsApi(token);
            setNotifications(response.data);
        };

        getNotifications();
    }, [createNotification]);

    return notifications;
}

export default useNotifications;