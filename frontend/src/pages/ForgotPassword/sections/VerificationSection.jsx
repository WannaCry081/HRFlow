import * as Yup from "yup";
import { useFormik } from "formik";
import { LuMessagesSquare } from "react-icons/lu";
import { CodeInput, SubmitButton } from "@Components/FormInput";
import { CircularProgressBar } from "@Components/Loading";
import { VerifyCodeApi } from "@Services/authService.js";
import useToggle from "@Hooks/useToggle";

const VerficationSection = (prop) => {

    const [submit, onSetSubmit] = useToggle();

    const formik = useFormik({
        initialValues: {
            email : prop.email,
            code: "" 
        },
        onSubmit: async (values) => {
            onSetSubmit();
            const {status, data} = await VerifyCodeApi(values);
            
            setTimeout(() => {
                if (status === 200) {
                    sessionStorage.setItem("token", data);
                    navigate("/dashboard/home", { replace: true });
                } else if (status === 401 || status === 404) {
                    formik.setErrors({ password: "Invalid Email Address. Please try again." });
                } else {
                    prop.navigate("/error", { replace : true });
                }
                onSetSubmit();
            }, 1000);
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Code is required.")
                .min(6, "Invalid Verification Code. Please enter again.")
        })
    });

    const handleCodeChange = (index, value) => {
        const newCode = formik.values.code.slice(0, index) + value + formik.values.code.slice(index + 1);
        formik.setFieldValue("code", newCode);
    };

    const codeInputs = Array.from({ length: 6 }, (_, index) => (
        <CodeInput
            key={index}
            nameId={`code${index + 1}`}
            maxLength={1}
            minLength={1}
            onBlur={formik.handleBlur}
            value={formik.values.code[index] || ""}
            onChange={(e) => handleCodeChange(index, e.target.value)}
        />
    ));

    return (
        <>
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <LuMessagesSquare size={26} className="stroke-primary-light"/>
                    <h1 className="text-3xl font-lato font-extrabold text-primary-light ">Confirm your Email</h1>
                </span>
                <p className="font-poppins text-sm text-gray-600 mt-2">We've sent a confirmation code to your email. Input the code to proceed.</p>
            </header>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <span>
                    <div className="flex items-center gap-2 sm:px-6">
                        {codeInputs}
                    </div>
                    <div className="text-sm text-start text-red-500 font-semibold mt-2 sm:ml-7 ">
                        {formik.errors.code && formik.touched.code && formik.errors.code }
                    </div>
                </span>

                <p className="font-poppins text-sm font-semibold text-secondary-light cursor-pointer max-w-max active-secondary">
                    Resend Verification
                </p>

                <div className="w-full sm:w-44 self-end">
                    <SubmitButton>
                        {(submit) ? (
                            <CircularProgressBar>
                                <p className="ml-2 text-poppins text-white">Loading...</p>
                            </CircularProgressBar>
                        ) : (
                            <p className="text-poppins text-white">Submit</p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </>
    );
};

export default VerficationSection;