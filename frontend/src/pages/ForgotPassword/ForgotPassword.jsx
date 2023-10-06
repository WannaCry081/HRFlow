import { useState } from "react";
import { ModalBox } from "@Components/ModalBox";
import { TextInput, CodeInput } from "@Components/FormInput";
import { useFormik } from "formik";
import { LuMessagesSquare } from "react-icons/lu";
import * as Yup from "yup";

const ForgotPassword = (prop) => {  
    
    const [currentSection, setCurrentSection] = useState(1);
    const onSectionChange = (value) => setCurrentSection(value);

    return (
        <ModalBox onCancel={prop.onCancel}> 
            {(currentSection === 1) ? (
                <FPEmailSection onSubmit={onSectionChange} />
            ) : (
                <FPCodeSection onSubmit={onSectionChange}/>
            )}
        </ModalBox>
    );
};

const FPCodeSection = (prop) => {
    const formik = useFormik({
        initialValues: {
            code: "" 
        },
        onSubmit: (values) => {

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
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
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

                <button type="submit"
                    className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold shadow-primary">
                    Submit
                </button>
            </form>
        </>
    );
};



const FPEmailSection = (prop) => {
    const formik = useFormik({
        initialValues : {
            email : ""
        }, 
        onSubmit : (values) => {
            prop.onSubmit(2)
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
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 ">
                <TextInput nameId="email"
                    name="Email"
                    type="email"
                    placeholder="JohnDoe@example.com"
                    maxLength={150}
                    errors={formik.errors.email}
                    touched={formik.touched.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}/>

                <button type="submit"
                    className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold shadow-primary">
                    Proceed
                </button>
            </form>
        </>
    );
};





export default ForgotPassword;