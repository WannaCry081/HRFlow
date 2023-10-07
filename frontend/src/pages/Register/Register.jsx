import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextInput, PasswordInput } from "@Components/FormInput";
import Group from "@Pages/Group";
import * as Yup from "yup";

const Register = () => { 
    const [registerUser, setRegisterUser] = useState(false);
    const onSetRegisterUser = () => setRegisterUser(!registerUser);
    const formik = useFormik({
        initialValues : {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : ""
        },
        onSubmit : (values) => {
            onSetRegisterUser();
        },
        validationSchema : Yup.object({
            firstName : Yup.string().required("First Name is required.")
                .min(2, "First Name must be at least 2 characters.")
                .max(50, "First Name can be at most 50 characters."),
            lastName : Yup.string().required("Last Name is required.")
                .min(2, "Last Name must be at least 2 characters.")
                .max(50, "Last Name can be at most 50 characters."),
            email : Yup.string().required("Email Address is required.")
                .email("Invalid Email Address")
                .min(4, "Email Address must be at least 4 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            password : Yup.string().required("Password is required.")
                .min(8, "Password must be at least 8 characters.")
                .max(150, "Password can be at most 150 characters."),
            confirmPassword : Yup.string().required("Confirm Password is required.").oneOf([Yup.ref("password"), null], "Passwords do not match.")
        })
    });

    return (
        <div className="mx-auto max-w-[24rem]">
            {registerUser && <Group onCancel={onSetRegisterUser}/>}
            <div className="flex flex-col items-center">
                <header className="text-center mb-6">
                    <h1 className="text-lato text-4xl font-bold my-2 sm:text-5xl">Create Account!</h1>
                    <p className="text-poppins text-sm text-gray-600 sm:text-lg">Register to start your journey with HR Flow.</p>
                </header>
                <form onSubmit={formik.handleSubmit}
                    className="w-full flex flex-col gap-5">
                    <div className="flex gap-5">
                        <TextInput nameId="firstName"
                                    name="First Name"
                                    type="text"
                                    placeholder="Johnny"
                                    maxLength={100}
                                    errors={formik.errors.firstName}
                                    touched={formik.touched.firstName}
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}/>
                        
                        <TextInput nameId="lastName"
                                    name="Last Name"
                                    type="text"
                                    placeholder="Doe"
                                    maxLength={100}
                                    errors={formik.errors.lastName}
                                    touched={formik.touched.lastName}
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}/>
                    </div>

                    <TextInput nameId="email"
                                name="Email"
                                type="email"
                                maxLength={150}
                                placeholder="JohnDoe@example.com"
                                errors={formik.errors.email}
                                touched={formik.touched.email}
                                onChange={formik.handleChange}
                                value={formik.values.email}/>

                    <PasswordInput nameId="password"
                                name="Password"
                                maxLength={150}
                                type="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                errors={formik.errors.password}
                                touched={formik.touched.password}
                                value={formik.values.password}/>
                    
                    <PasswordInput nameId="confirmPassword"
                                name="Confirm Password"
                                maxLength={150}
                                type="password"
                                placeholder="Re-enter Password"
                                onChange={formik.handleChange}
                                errors={formik.errors.confirmPassword}
                                touched={formik.touched.confirmPassword}
                                value={formik.values.confirmPassword}/>

                    <button type="submit"
                        className="mt-2 bg-primary-light rounded-full h-14 text-poppins text-white font-semibold shadow-primary">
                        Submit
                    </button>

                </form>
                <p className="mt-4 font-poppins text-sm text-gray-600">
                    Already have an account?
                    <Link to="/auth/login" className="font-semibold text-secondary-light active-secondary"> Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;