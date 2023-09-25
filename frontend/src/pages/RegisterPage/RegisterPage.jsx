import HRFlowLogo_Dark from "assets/svg/HRFlowLogo_Light.svg";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterPage = () => {
    const formik = useFormik({
        initialValues : {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : ""
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
                <div className="relative block h-screen w-1/2 bg-slate-900">
                    
                </div>
                <div className="relative h-screen w-1/2">
                    <div className="mx-28 flex flex-col h-full">
                        <header className="py-8">
                            <img
                                src={HRFlowLogo_Dark}
                                alt="HR Flow Logo"
                                className="h-12"
                            />
                        </header>
                        <section className="mx-32 flex-grow">
                            <div className="flex flex-col h-full justify-center">
                                <div className="text-center mb-8">
                                    <h1 className="text-5xl my-4">Sign Up</h1>
                                    <p>Lorem ipsum dolor sit amet adipiscing elit.</p>
                                </div>
                                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">

                                    <div className="flex justify-between gap-8">
                                        <div className="inline flex-grow">
                                            <label htmlFor="firstName" className="block mb-2">First Name</label>
                                            <input type="text" 
                                                    id="firstName"
                                                    name="firstName"
                                                    value = {formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="border w-full border-black p-2"
                                                    />
                                        </div>
                                        <div className="inline flex-grow">
                                            <label htmlFor="lastName" className="block mb-2">Last Name</label>
                                            <input type="text" 
                                                    id="lastName"
                                                    name="lastName"
                                                    value = {formik.values.lastName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="border w-full border-black p-2"
                                                    />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="inline-block mb-2">Email</label>
                                        <input type="text" 
                                                id="email"
                                                name="email"
                                                value = {formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border border-black w-full p-2"
                                                />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="inline-block mb-2">Password</label>
                                        <input type="password" 
                                                id="password"
                                                name="password"
                                                value = {formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border border-black w-full p-2"
                                                />
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="inline-block mb-2">Confirm Password</label>
                                        <input type="password" 
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value = {formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border border-black w-full p-2"
                                                />
                                    </div>
                                
                                    <button className="bg-green-500 p-4 rounded-lg">Submit</button>

                                    <p>Hello world</p>
                                </form>
                            </div>
                        </section>
                        <footer className="p-4">
                            hello
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;