import { useState, useEffect } from "react";
import { useDeleteNotification, useNotifications } from "/src/hooks";
import { Separator } from "/src/components/ui/separator"
import { PiTrashBold } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import Toast from "/src/components/Toast";
import CreateNotification from "./Components/CreateNotification";
import Arrow from "/src/assets/svg/Arrow.svg";
import ConfirmModalBox from "/src/components/ConfirmModalBox";
import { GetUserProfileApi } from "/src/services/userService";


const Notifications = () => {

    const [createNotification, onSetCreateNotification] = useState(false);
    const notifications = useNotifications(createNotification);
    
    const [openModal, onSetOpenModal] = useState(false);
    const [selectNotification, onSetSelectNotification] = useState(null);
    const [userData, setUserData] = useState({});

    const [deleteNotification, toast, confirmModal, onSetConfirmModal] =
        useDeleteNotification(selectNotification, onSetCreateNotification, onSetSelectNotification);

    const formattedDate = new Date(selectNotification?.updatedAt).toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });


    useEffect(() => {
        const token = sessionStorage.getItem("token");

        const getUserProfile = async () => {
            const { status, data } = await GetUserProfileApi(token);
            setUserData(data);
        };
        getUserProfile();
    }, []);

    return (
        <section className="bg-lilac-pale h-full flex gap-5 p-8 rounded-t-[2.5rem]">
            {toast && <Toast message="Notification successfullly deleted!" />}
            {openModal && <CreateNotification
                createNotification={createNotification}
                selectNotification={selectNotification}
                onSetOpenModal={onSetOpenModal}
                onSetCreateNotification={onSetCreateNotification}
                onCancel={() => {
                    onSetOpenModal(false);
                    onSetCreateNotification(false)
                }}
            />}

            {confirmModal && <ConfirmModalBox
                onCancel={onSetConfirmModal}
                header="Confirm Delete Notification"
                operation="delete"
                title={selectNotification.subject}
                option="Delete"
                submit={deleteNotification}
            />}
            <div className="flex flex-col min-w-[30rem] max-w-[30rem] py-4">
                <div className="flex justify-between mb-8">
                    <h1 className="text-4xl font-bold font-lato text-lilac">Notifications</h1>
                    {userData.role === "Human Resource" && (
                        <div
                            onClick={() => {
                                onSetOpenModal(true);
                                onSetCreateNotification(true);
                            }}
                            className="px-6 gap-2 bg-lilac flex items-center rounded-lg justify-center py-3 hover:bg-lilac-dark h-full cursor-pointer"
                        >
                            <IoMdAdd size={24} className="fill-white" />
                            <p className="hidden lg:block text-white font-poppins font-semibold">
                                Add notification
                            </p>
                        </div>
                    )}
                </div>
                <div className="h-[34rem] overflow-scroll">
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            onClick={(notification) => { onSetSelectNotification(notification) }}
                            notification={notification}
                            dateTime={notification.updatedAt}
                            subject={notification.subject}
                            message={notification.message}
                        />
                    ))}
                </div>
            </div>
            {/* Notification Full Preview */}
            <div className="w-full h-full bg-white rounded-2xl py-12 px-8 flex flex-col">
                {selectNotification || createNotification
                    ? (
                        <>
                            <div className="flex justify-between items-center">
                                <h1 className="text-lg font-poppins text-gray-500">
                                    {formattedDate}
                                </h1>
                                <div className="flex gap-2">
                                    <div onClick={() => {
                                        onSetOpenModal(true);
                                        onSetCreateNotification(false)
                                    }}
                                        className="rounded-full flex items-center justify-center bg-gray-200 hover:bg-pink-100 group p-3 h-14 w-14 cursor-pointer">
                                        <FiEdit3 size={26} className="stroke-gray-500 group-hover:stroke-pink-500" />
                                    </div>
                                    <div onClick={() => onSetConfirmModal(true)}
                                        className="rounded-full bg-gray-200 hover:bg-red-200 h-14 w-14 p-3 group cursor-pointer flex items-center justify-center">
                                        <PiTrashBold size={26} className="fill-gray-500 group-hover:fill-red-500" />
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-lilac text-[2.5rem] font-bold my-4 leading-tight">
                                {selectNotification?.subject}
                            </h1>
                            <p className="text-gray-800 py-2 text-lg">{selectNotification?.message}</p>
                        </>
                    ) : (
                        <>
                            <div className="h-full flex items-center justify-center flex-col">
                                <img src={Arrow} alt="Arrow" className="h-20" />
                                <h1 className="pt-4 text-2xl text-center text-rustic font-lato font-semibold">
                                    No selected notification yet.
                                </h1>
                                <p className="text-lg font-poppins text-gray-500 text-center">
                                    Click a notification to view content.
                                </p>
                            </div>
                        </>
                    )}
            </div>
        </section>
    );
};

export default Notifications;


export const NotificationItem = (prop) => {
    const formatDateTime = (dateTimeString) => {
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        return new Date(dateTimeString).toLocaleTimeString(undefined, options);
    };
    return (
        <>
            <div onClick={() => prop.onClick(prop.notification)}
                className="flex w-full bg-gray-50 rounded-sm hover:bg-gray-100 py-2 relative max-w-1/3 cursor-pointer">
                <div className="truncate w-full ml-2">
                    <div className="w-1 h-full absolute rounded-tl-sm rounded-bl-sm top-0 left-0 bg-lilac" />
                    <div className="flex flex-col justify-center h-full gap-1 ml-1">
                        <h1 className="font-semibold text-lg">
                            {prop.subject}
                        </h1>
                        <div className="flex justify-between">
                            <p className="text-gray-500 truncate">
                                {prop.message}
                            </p>
                            <p className="ml-5 mr-2">{formatDateTime(prop.dateTime)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="my-2" />
        </>
    );
}
