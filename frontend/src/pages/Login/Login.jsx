import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TextInput, PasswordInput, SubmitButton } from "@Components/FormInput";
import { ProgressBar, CircularProgressBar } from "@Components/Loading";
import ForgotPassword from "@Pages/ForgotPassword";
import useToggle from "@Hooks/useToggle";

const Login = () => { 
    document.title = "HR Flow | Sign In";

    const navigate = useNavigate();

    const [ forgotPassword, onSetForgotPassword ] = useToggle();
    const [ loading, onSetLoading ] = useToggle();
    const [ submit, onSetSubmit ] = useToggle();

    const formik = useFormik({
        initialValues : {
            email : "",
            password : ""
        },
        onSubmit : (values) => {
            onSetSubmit();
            navigate("/dashboard/home", { replace : true});
            onSetSubmit();
        },
        validationSchema : Yup.object({
            email :Yup.string().required("Email Address is required.")
                .email("Invalid Email Address")
                .min(4, "Email Address must be at least 4 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            password : Yup.string().required("Password is required.")
                .min(8, "Password must be at least 8 characters.")
                .max(150, "Password can be at most 150 characters."),
        })
    });

    return (
        <div className="mx-auto max-w-[24rem]">
            {loading && 
                <ProgressBar duration={.4} 
                    onAnimationComplete={() => navigate("/auth/register")}/>}

            {forgotPassword && 
                <ForgotPassword onCancel={onSetForgotPassword} />}

            <div className="flex flex-col items-center">
                <header className="text-center mb-6">
                    <h1 className="text-lato text-4xl font-bold my-2 sm:text-6xl">Welcome!</h1>
                    <p className="text-poppins text-sm text-gray-600 sm:text-lg">Log in to your HR Flow account to continue.</p>
                </header>
                <form onSubmit={formik.handleSubmit}
                    className="w-full flex flex-col gap-4">
                    <TextInput nameId="email"
                        name="Email"
                        type="email"
                        placeholder="JohnDoe@example.com"
                        maxLength={150}
                        errors={formik.errors.email}
                        touched={formik.touched.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}/>

                    <div className="mb-2">
                        <PasswordInput nameId="password"
                            name="Password" 
                            type="password"
                            placeholder="Password"
                            maxLength={150}
                            errors={formik.errors.password}
                            touched={formik.touched.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}/>
                
                        <div className="mt-2 text-end float-right">
                            <p className="font-poppins text-sm font-semibold text-secondary-light cursor-pointer active-secondary" onClick={onSetForgotPassword}>
                                Forgot Password?
                            </p>
                        </div>
                    </div>

                    <SubmitButton>
                        {(submit) ? (
                            <CircularProgressBar>
                                <p className="ml-2 text-poppins text-white">Loading...</p>
                            </CircularProgressBar>
                        ) : (
                            <p className="text-poppins text-white">Sign In</p>
                        )}
                    </SubmitButton>
                    
                    <p className="flex items-center text-center text-black">
                        <span className="flex-grow h-[1px] rounded-full bg-gray-200"></span>
                        <span className="px-2 font-lato text-gray-600 text-sm">or</span>
                        <span className="flex-grow h-[1px] rounded-full bg-gray-200"></span>
                    </p>

                    <button className="bg-gray-100 rounded-full h-14 text-poppin font-semibold flex items-center justify-center gap-2" onClick={(e) => e.preventDefault()}>
                        <FcGoogle size={24}/>
                        Continue with Google
                    </button>
                </form>
                
                <p className="mt-4 font-poppins text-sm text-gray-600">
                    {"Don't have an account yet? "}
                    <span className="font-semibold text-secondary-light active-secondary cursor-pointer" onClick={onSetLoading}>Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;