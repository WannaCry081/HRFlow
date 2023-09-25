import HRFlowLogo_Dark from "assets/svg/HRFlowLogo_Light.svg";
import { useFormik } from "formik";
import * as Yup from "yup";

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
                                className="h-12"
                            />
                        </header>
                        <section className="mx-32 flex-grow">
                            <div className="flex flex-col h-full justify-center">
                                <div className="text-center mb-8">
                                    <h1 className="text-5xl my-4">Log in</h1>
                                    <p>Lorem ipsum dolor sit amet adipiscing elit.</p>
                                </div>
                                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">

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
                                        <p className="mt-2 text-end">Forgot Password?</p>
                                    </div>
                                
                                    <div className=" flex flex-col gap-4">
                                        <button className="bg-green-500 p-4 rounded-lg">Submit</button>
                                        <button className="bg-green-500 p-4 rounded-lg">Submit</button>
                                    </div>

                                    <p>Hello world</p>
                                </form>
                            </div>
                        </section>
                        <footer className="p-4">
                            hello
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