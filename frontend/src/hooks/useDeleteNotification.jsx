import { useNavigate } from "react-router-dom";
import { DeleteNotificationApi } from "/src/services/notificationService";
import useToggle from "/src/hooks/useToggle";

const useDeleteNotification = (selectNotification, onSetCreateNotification, onSetSelectNotification) => {
    const navigate = useNavigate();
    const [toast, onSetToast] = useToggle();
    const [confirmModal, onSetConfirmModal] = useToggle();

    const deleteNotification = async () => {
        const token = sessionStorage.getItem("token");
        const response = await DeleteNotificationApi(
            token,
            selectNotification.id
        );
        setTimeout(() => {
            switch (response.status) {
                case 200:
                    onSetToast();
                    onSetConfirmModal();
                    setTimeout(() => {
                        onSetCreateNotification(true);
                        onSetSelectNotification(null);
                        onSetToast();
                    }, 1200);
                    break;
                case 404:
                case 400:
                default:
                    navigate("/error");
                    break;
            }
        }, 1000);
    }

    return [deleteNotification, toast, confirmModal, onSetConfirmModal];
};

export default useDeleteNotification;
