import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddPositionApi, UpdatePositionPropertyApi } from "/src/services/positionService.js";
import useToggle from "/src/hooks/useToggle";

const useUpsertPosition = (selectedDepartment, selectedPosition, createPosition, onSetCreatePosition, onSetConfirmModal) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [toast, onSetToast] = useToggle();
    const formik = useFormik({
        initialValues: {
            title: createPosition ? "" : selectedPosition?.title
        },
        onSubmit: async (values) => {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            const response = createPosition
                ? await AddPositionApi(token, selectedDepartment.id, values)
                : await UpdatePositionPropertyApi(
                    token,
                    selectedDepartment.id,
                    selectedPosition.id,
                    [{
                        path: "/title",
                        op: "replace",
                        value: values.title
                    }]
                );

            setTimeout(() => {
                switch (response.status) {
                    case 200:
                        onSetToast();
                        setTimeout(() => {
                            onSetToast();
                            onSetCreatePosition();
                            onSetConfirmModal();
                        }, 1200);
                        break;
                    case 404:
                    case 400:
                        formik.setErrors({ title: response.data });
                        break;
                    default:
                        navigate("/error");
                        break;
                }
                setLoading(false);
            }, 1000);
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Position Title is required.")
                .min(2, "Position Title must be at least 2 characters.")
                .max(50, "Position Title can be at most 50 characters.")
        }),
    });

    return [isLoading, formik, toast];
};

export default useUpsertPosition;
