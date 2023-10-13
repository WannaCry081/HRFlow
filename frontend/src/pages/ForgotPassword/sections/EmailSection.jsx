import * as Yup from "yup";
import { useFormik } from "formik";
import { LuMessagesSquare } from "react-icons/lu";
import { TextInput, SubmitButton } from "@Components/FormInput";
import { CircularProgressBar } from "@Components/Loading";
import { ForgotPasswordApi } from "@Services/authService.js";
import useToggle from "@Hooks/useToggle";

const EmailSection = (prop) => {

    const [ submit, onSetSubmit ] = useToggle();
    const formik = useFormik({
        initialValues : {
            email : ""
        }, 
        onSubmit : async (values) => {
            onSetSubmit();
            const { status, data } = await ForgotPasswordApi(values);

            if (status === 200) {
                prop.onSetEmail(values.email);
                prop.onNextPage();
            } else if (status === 404) {
                formik.setErrors({ email : data});
            } else {
                prop.navigate("/error", { replace : true });
            }
            onSetSubmit();
        }, 
        validationSchema : Yup.object({
            email :Yup.string().required("Email Address is required.")
                .email("Invalid Email Address")
                .min(4, "Email Address must be at least 4 characters.")
                .max(150, "Email Address can be at most 150 characters."),
        })
    });

    return (
        <>
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <LuMessagesSquare size={26} className="stroke-primary-light"/>
                    <h1 className="text-2xl sm:text-3xl font-lato font-extrabold text-primary-light ">Forgot your password?</h1>
                </span>
                <p className="font-poppins text-sm text-gray-600 mt-2">Don't worry, we just need your Email Address for confirmation.</p>
            </header>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 ">
                <TextInput nameId="email"
                    name="Email"
                    type="email"
                    placeholder="JohnDoe@example.com"
                    maxLength={150}
                    onBlur={formik.handleBlur}
                    errors={formik.errors.email}
                    touched={formik.touched.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}/>

                <div className="self-end w-full sm:w-44 ">
                    <SubmitButton>
                        {(submit) ? (
                            <CircularProgressBar>
                                <p className="ml-2 text-poppins text-white">Loading...</p>
                            </CircularProgressBar>
                        ) : (
                            <p className="text-poppins text-white">Proceed</p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </>
    );
};

export default EmailSection;