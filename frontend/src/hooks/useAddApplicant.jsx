import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateApplicantApi } from "../services/applicantService";
import useToggle from "/src/hooks/useToggle";

const useAddApplicant = ( onSetAddApplicant ) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [toast, onSetToast] = useToggle();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            age: "",
            birthdate: "",
            sex: "",
            email: "",
            mobileNumber: "",
            landlineNumber: "",
            status: ""
        },
        onSubmit: async (values) => {
            setLoading(true);
            const token = sessionStorage.getItem("token");

            const response = await CreateApplicantApi(token, values);
            setTimeout(() => {
                switch (response.status) {
                    case 200:
                        onSetToast();
                        setTimeout(() => {
                            onSetToast();
                            onSetAddApplicant();
                        }, 1200);
                        break;
                    case 404:
                    case 400:
                        formik.setErrors({ email: response.data });
                        break;
                    default:
                        navigate("/error");
                        break;
                }
                setLoading(false);
            }, 1000);
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name is required.")
                .min(2, "First Name must be at least 2 characters.")
                .max(50, "First Name can be at most 50 characters."),
            middleName: Yup.string()
                .min(2, "Middle Name must be at least 2 characters.")
                .max(50, "Middle Name can be at most 50 characters."),
            lastName: Yup.string().required("Last Name is required.")
                .min(2, "Last Name must be at least 2 characters.")
                .max(50, "Last Name can be at most 50 characters."),
            suffix: Yup.string()
                .min(1, "Suffix must be at least 1 characters.")
                .max(5, "Suffix can be at most 5 characters."),
            age: Yup.number()
                .integer("Age must be an number.")
                .min(1, "Age must be greater than 0")
                .max(100, "Age can be at most 100 years."),
            email: Yup.string().required("Personal Email Address is required.")
                .email("Invalid Email Address")
                .min(5, "Email Address must be at least 5 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            mobileNumber: Yup.string().required("Mobile Number is required.")
                .matches(/^[0-9]+$/, "Mobile Number must contain only numbers.")
                .min(11, "Mobile Number must at least 11 digits.")
                .max(13, "Mobile Number can be at most 13 digits."),
            landlineNumber: Yup.string()
                .matches(/^[0-9]+$/, "Landline Number must contain only numbers.")
                .min(3, "Landline Number must at least 3 digits.")
                .max(13, "Landline Number can be at most 13 digits."),
            status: Yup.string().required("Status is required."),
        })
    });

    return [isLoading, formik, toast];
};

export default useAddApplicant;