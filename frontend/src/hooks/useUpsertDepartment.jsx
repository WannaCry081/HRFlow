import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddDepartmentApi, UpdateDepartmentPropertyApi } from "/src/services/departmentService.js";
import useToggle from "/src/hooks/useToggle";

const useUpsertDepartment = (selectedDepartment, createDepartment, onCreateDepartment, onSetConfirmModal) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [toast, onSetToast] = useToggle();

    const formik = useFormik({
        initialValues: {
            name: createDepartment ? "" : selectedDepartment.name
        },
        onSubmit: async (values) => {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            const response = createDepartment
                ? await AddDepartmentApi(token, values)
                : await UpdateDepartmentPropertyApi(
                    token,
                    selectedDepartment.id,
                    [{
                        path: "/name",
                        op: "replace",
                        value: values.name
                    }]
                );

            setTimeout(() => {
                switch (response.status) {
                    case 200:
                        onSetToast();
                        setTimeout(() => {
                            onSetToast();
                            onCreateDepartment();
                            onSetConfirmModal();
                        }, 1200);
                        break;
                    case 404:
                    case 400:
                        formik.setErrors({ name: response.data});
                        break;
                    default:
                        navigate("/error");
                        break;
                }
                setLoading(false);
            }, 1000);
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Department Name is required.")
                .min(2, "Department Name must be at least 2 characters.")
                .max(50, "Department Name can be at most 50 characters."),
        }),
    });

    return [isLoading, formik, toast];
};

export default useUpsertDepartment;
