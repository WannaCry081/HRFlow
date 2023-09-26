import { useFormik } from "formik";
import * as Yup from "yup";
import HRFlowLogo_Dark from "assets/svg/HRFlowLogo_Light.svg";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "services/authService.js";

const RegisterPage = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues : {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : ""
        },
        onSubmit : (values) => {
            const Register = async () => {
                try {
                    const response = await RegisterUser(values);
                    sessionStorage.setItem("token", response);
                    navigate("/dashboard", {replace : true});
                } catch (error) {
                    console.log(error.response);
                }
            };
            Register();
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
            confirmPassword : Yup.string().required("Confirm Password is required.")
                        .oneOf([Yup.ref("password"), null], "Passwords do not match.")
        })
    });

    return (
        <section className="h-screen w-screen">
            <div className="flex justify-between">
                <div className="relative block h-screen w-1/2 bg-slate-900">
                    
                </div>
                <div className="relative h-screen w-1/2">
                    <div className="mx-28 flex flex-col h-full">
                        <header className="py-8">
                            <Link to="/">
                                <img
                                    src={HRFlowLogo_Dark}
                                    alt="HR Flow Logo"
                                    className="h-14"
                                />
                            </Link>
                        </header>
                        <section className="mx-32 flex-grow">
                            <div className="flex flex-col h-full justify-center">
                                <div className="text-center mb-12">
                                    <h1 className="text-5xl my-4 font-extrabold font-lato">Create Account</h1>
                                    <p className="font-poppins text-xl">Register to start your journey with HR Flow.</p>
                                </div>
                                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">

                                    <div className="flex justify-between gap-4">
                                        <div className="inline flex-grow">
                                            <label htmlFor="firstName" className="block mb-1 font-poppins">First Name</label>
                                            <input type="text" 
                                                    id="firstName"
                                                    name="firstName"
                                                    value = {formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="border border-gray-200 bg-gray-100 text-lg w-full p-3 rounded-md focus:border focus:border-gray-400 focus:outline-none"
                                                    />
                                            <div className="text-start text-red-500">
                                                {formik.errors.firstName && formik.touched.firstName && formik.errors.firstName }
                                            </div>
                                        </div>
                                        <div className="inline flex-grow">
                                            <label htmlFor="lastName" className="block mb-1 font-poppins">Last Name</label>
                                            <input type="text" 
                                                    id="lastName"
                                                    name="lastName"
                                                    value = {formik.values.lastName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="border border-gray-200 bg-gray-100 text-lg w-full p-3 rounded-md focus:border focus:border-gray-400 focus:outline-none"
                                                    />
                                            <div className="text-start text-red-500">
                                                {formik.errors.lastName && formik.touched.lastName && formik.errors.lastName}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="inline-block mb-1 font-poppins">Email</label>
                                        <input type="text" 
                                                id="email"
                                                name="email"
                                                value = {formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border border-gray-200 bg-gray-100 text-lg w-full p-3 rounded-md focus:border focus:border-gray-400 focus:outline-none"
                                                />
                                        <div className="text-start text-red-500">
                                            {formik.errors.email && formik.touched.email && formik.errors.email}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="inline-block mb-1 font-poppins ">Password</label>
                                        <input type="password" 
                                                id="password"
                                                name="password"
                                                value = {formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border border-gray-200 bg-gray-100 text-lg w-full p-3 rounded-md focus:border focus:border-gray-400 focus:outline-none"
                                                />
                                        <div className="text-start text-red-500">
                                            {formik.errors.password && formik.touched.password && formik.errors.password}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="inline-block mb-1 font-poppins">Confirm Password</label>
                                        <input type="password" 
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value = {formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border border-gray-200 bg-gray-100 text-lg w-full p-3 rounded-md focus:border focus:border-gray-400 focus:outline-none"
                                                />
                                        <div className="text-start text-red-500">
                                            {formik.errors.confirmPassword && formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        </div>
                                    </div>
                                
                                    <button type="submit" className="bg-primary-light p-4 rounded-lg text-xl font-semibold text-white hover:bg-primary-dark shadow-md">Sign Up</button>

                                    <p className="font-poppins self-center">
                                        Already have an account? 
                                        <Link to="/auth/login" className="text-secondary-light font-semibold text-md pl-1">
                                            Sign In
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </section>
                        <footer className="p-4 my-4 text-sm font-poppins text-gray-600 font-medium">
                            @DevKings 2023
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;