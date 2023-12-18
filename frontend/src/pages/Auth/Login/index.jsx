import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  TextInput,
  PasswordInput,
  SubmitButton,
} from "/src/components/FormInput";
import { ProgressBar, CircularProgressBar } from "/src/components/Loading";
import { useLogin, useToggle } from "/src/hooks";
import { ForgotPassword } from "/src/pages/Auth";

const Login = () => {
  const navigate = useNavigate();

  const [forgotPassword, onSetForgotPassword] = useToggle();
  const [loading, onSetLoading] = useToggle();

  const [
    isSubmit,
    { errors, touched, values, handleSubmit, handleBlur, handleChange },
  ] = useLogin();

  return (
    <div className="mx-auto max-w-[24rem]">
      {loading && (
        <ProgressBar
          duration={0.4}
          onAnimationComplete={() => navigate("/auth/register")}
        />
      )}

      {forgotPassword && <ForgotPassword onCancel={onSetForgotPassword} />}

      <div className="flex flex-col items-center">
        <header className="text-center mb-8">
          <h1 className="text-lato text-4xl font-bold my-2 sm:text-6xl">
            Welcome!
          </h1>
          <p className="text-poppins text-sm text-gray-600 sm:text-lg">
            Log in to your HR Flow account to continue.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <TextInput
            nameId="email"
            name="Email"
            type="email"
            placeholder="JohnDoe@example.com"
            minLength={5}
            maxLength={100}
            errors={errors.email}
            touched={touched.email}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            required
          />

          <div className="mb-2">
            <PasswordInput
              nameId="password"
              name="Password"
              type="password"
              placeholder="Password"
              minLength={8}
              maxLength={100}
              errors={errors.password}
              touched={touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            <div className="mt-2 text-end float-right">
              <p
                className="font-poppins text-sm font-semibold text-blush cursor-pointer active-secondary"
                onClick={onSetForgotPassword}
              >
                Forgot Password?
              </p>
            </div>
          </div>

          <SubmitButton>
            {isSubmit ? (
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

          <button
            className="bg-gray-100 rounded-full h-14 text-poppin font-semibold flex items-center justify-center gap-2"
            onClick={(e) => e.preventDefault()}
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </form>

        <p className="mt-4 font-poppins text-sm text-gray-600">
          {"Don't have an account yet? "}
          <span
            className="font-semibold text-blush active-blush cursor-pointer"
            onClick={onSetLoading}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
