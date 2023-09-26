import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { LoginUser } from "services/authService.js";
import HRFlowLogo_Dark from "assets/svg/HRFlowLogo_Dark.svg";

const LoginPage = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues : {
            email : "",
            password : ""
        },
        onSubmit : (values) => {
            const Login = async () => {
                try {
                    const response = await LoginUser(values);
                    sessionStorage.setItem("token", response);
                    navigate("/dashboard", {replace : true});
                } catch (error) {
                    console.log(error.response);
                }
            };
            Login();
        },
        validationSchema : Yup.object({
            email : Yup.string().required("Email Address is required.")
                    .email("Invalid Email Address")
                    .min(4, "Email Address must be at least 4 characters.")
                    .max(150, "Email Address can be at most 150 characters."),
            password : Yup.string().required("Password is required.")
                    .min(8, "Password must be at least 8 characters.")
                    .max(150, "Password can be at most 150 characters."),
        })
    }); 

    return (
        <section className="h-screen w-screen">
            <div className="flex justify-between">
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
                                    <h1 className="text-6xl my-4 font-lato font-extrabold">Welcome back!</h1>
                                    <p className="font-poppins text-xl">Log in to your HR Flow account to continue.</p>
                                </div>
                                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">

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
                                        <label htmlFor="password" className="inline-block mb-1 font-poppins">Password</label>
                                        <input type="password" 
                                                id="password"
                                                name="password"
                                                value = {formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border border-gray-200 bg-gray-100 w-full p-3 text-lg rounded-md focus:border focus:border-gray-400 focus:outline-none"
                                                />
                                        <div className="text-start text-red-500">
                                            {formik.errors.password && formik.touched.password && formik.errors.password}
                                        </div>
                                        
                                        <p className="mt-2 text-end text-md text-gray-600 font-poppins">
                                            <Link to="/auth/forgot-password">Forgot Password?</Link>
                                        </p>

                                    </div>
                                
                                    <div className=" flex flex-col gap-4">
                                        <button type="submit" className="bg-primary-light p-4 rounded-lg text-xl font-semibold text-white hover:bg-primary-dark shadow-md">Log In</button>
                                        <button className="bg-primary-pastel p-4 rounded-lg text-xl font-semibold text-primary-light flex items-center justify-center shadow-md">
                                            <FcGoogle size={28} className="mr-2" />
                                            Continue with Google
                                        </button>
                                    </div>

                                    <p className="font-poppins self-center">
                                        Don't have an account? 
                                        <Link to="/auth/register" className="text-secondary-light font-semibold text-md pl-1">
                                            Sign Up
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
                <div className="relative block h-screen w-1/2 bg-slate-900">
                    
                </div>
            </div>
        </section>
    );
};

export default LoginPage;