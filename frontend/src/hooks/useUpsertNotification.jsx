import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToggle from "/src/hooks/useToggle";
import { CreateNotificationApi, UpdateNotificationApi } from "/src/services/notificationService";

const useUpsertNotification = (createNotification, selectNotification, onSetCreateNotification, onSetConfirmModal) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [toast, onSetToast] =  useToggle();

    const formik = useFormik({
        initialValues: {
            subject: createNotification ? "" : selectNotification?.subject,
            message: createNotification ? "" : selectNotification?.message,
        },
        onSubmit: async (values) => {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            const response = createNotification
                ? await CreateNotificationApi(token, values)
                : await UpdateNotificationApi(token, selectNotification.id, values);

            setTimeout(() => {
                switch (response.status) {
                    case 200: 
                        onSetToast();
                        setTimeout(() => {
                            onSetToast();
                            onSetCreateNotification();
                            onSetConfirmModal();
                        }, 1200);
                        break;
                    case 404:
                    case 400:
                        formik.setErrors({subject : response.data});
                        break;
                    default:
                        navigate("/error");
                        break;
                }
                setLoading(false);
            }, 1000);
        },
        validationSchema: Yup.object({
            subject: Yup.string().required("Subject is required.")
                .min(2, "Subject must be at least 2 characters.")
                .max(50, "Subject can be at most 50 characters."),
            message: Yup.string().required("Message is required.")
                .min(2, "Message must be at least 2 characters.")
                .max(500, "Message can be at most 500 characters."),
        })
    });

    return [isLoading, formik, toast];
}

export default useUpsertNotification;