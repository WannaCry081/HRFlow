import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ModalBox } from "@Components/ModalBox";
import useToggle from "@Hooks/useToggle";
import EmailSection from "./sections/EmailSection";
import { VerifyCodeApi, ForgotPasswordApi } from "@Services/authService.js";
import VerificationSection from "./sections/VerificationSection";

const ForgotPassword = (prop) => {  
    const navigate = useNavigate();

    const [verifyCode, onSetVerifyCode] = useToggle(); 
    const [submit, onSetSubmit] = useToggle(); 

    const formik = useFormik({
        initialValues: {
            email : "",
            code: "" 
        },
        onSubmit: async (values) => {
            onSetSubmit();
            if (!verifyCode) {
                const { status, data } = await ForgotPasswordApi(
                    {"email" : values.email}
                ); 

                if (status === 200) {
                    onSetVerifyCode();
                    onSetSubmit();
                } else if (status === 404) {
                    formik.setErrors({ email : data });
                } else {
                    navigate("/error");
                }
            } else {
                const { status, data } = await VerifyCodeApi(values);
                setTimeout(() => {
                    if (status === 200) {
                        sessionStorage.setItem("token", data);
                        navigate("/dashboard/home", { replace : true });
                        onSetSubmit();
                    } else if (status === 401 || status === 404) {
                        formik.setErrors({ code : data });
                    } else {
                        navigate("/error");
                    }
                }, 1000); 
            }
        },
        validationSchema: Yup.object({
            email :Yup.string().required("Email Address is required.")
                .email("Invalid Email Address")
                .min(5, "Email Address must be at least 5 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            code: Yup.string().min(6, "Invalid Verification Code. Please enter again.")
        })
    });
    
    return (
        <ModalBox onCancel={prop.onCancel}> 
            {(verifyCode) ? (
                <VerificationSection 
                    submit={submit}
                    formik={formik}/>
            ) : (
                <EmailSection 
                    submit={submit}
                    formik={formik}/>
            )}
        </ModalBox>
    );
};

export default ForgotPassword;