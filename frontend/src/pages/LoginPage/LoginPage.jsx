import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import HRFlowLogo_Dark from "assets/svg/HRFlowLogo_Dark.svg";

const LoginPage = () => {
    const formik = useFormik({
        initialValues : {
            email : "",
            password : ""
        },
        onSubmit : (values) => {
            alert(values.email);
        },
        validationSchema : Yup.object({
            
        })
    });

    return (
        <section className="h-screen w-screen">
            <div className="flex justify-between">
                <div className="relative h-screen w-1/2">
                    <div className="mx-28 flex flex-col h-full">
                        <header className="py-8">
                            <img
                                src={HRFlowLogo_Dark}
                                alt="HR Flow Logo"
                                className="h-14"
                            />
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
                                        <p className="mt-2 text-end text-lg text-gray-600 font-poppins">Forgot Password?</p>
                                    </div>
                                
                                    <div className=" flex flex-col gap-4">
                                        <button className="bg-primary-light p-4 rounded-lg text-xl font-semibold text-white hover:bg-primary-dark shadow-md">Submit</button>
                                        <button className="bg-primary-pastel p-4 rounded-lg text-xl font-semibold text-primary-light flex items-center justify-center shadow-md">
                                            <FcGoogle size={28} />
                                            Sign in with Google
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