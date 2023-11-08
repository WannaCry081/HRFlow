import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, SubmitButton } from "@Components/FormInput";
import { ProgressBar, CircularProgressBar } from "@Components/Loading";
import Team from "@Pages/Team";
import useToggle from "@Hooks/useToggle";
import useRegister from "@Hooks/useRegister";

const Register = () => {
  const navigate = useNavigate();
  const [loading, onSetLoading] = useToggle();
  const [
    isSubmit,
    isRegistered,
    { errors, touched, values, handleSubmit, handleBlur, handleChange },
  ] = useRegister();

  return (
    <div className="mx-auto max-w-[24rem]">
      {loading && (
        <ProgressBar
          duration={0.4}
          onAnimationComplete={() => navigate("/auth/login")}
        />
      )}

      {isRegistered && <Team />}

      <div className="flex flex-col items-center">
        <header className="text-center mb-8">
          <h1 className="text-lato text-4xl font-bold my-2 sm:text-5xl">
            Create Account!
          </h1>
          <p className="text-poppins text-sm text-gray-600 sm:text-lg">
            Register to start your journey with HR Flow.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex gap-4">
            <TextInput
              nameId="firstName"
              name="First Name"
              type="text"
              placeholder="Johnny"
              minLength={2}
              maxLength={50}
              onBlur={handleBlur}
              errors={errors.firstName}
              touched={touched.firstName}
              onChange={handleChange}
              value={values.firstName}
              required
            />

            <TextInput
              nameId="lastName"
              name="Last Name"
              type="text"
              placeholder="Doe"
              minLength={2}
              maxLength={50}
              onBlur={handleBlur}
              errors={errors.lastName}
              touched={touched.lastName}
              onChange={handleChange}
              value={values.lastName}
              required
            />
          </div>

          <TextInput
            nameId="email"
            name="Email"
            type="email"
            minLength={5}
            maxLength={100}
            placeholder="JohnDoe@example.com"
            errors={errors.email}
            onBlur={handleBlur}
            touched={touched.email}
            onChange={handleChange}
            value={values.email}
            required
          />

          <PasswordInput
            nameId="password"
            name="Password"
            minLength={8}
            maxLength={100}
            type="password"
            placeholder="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            errors={errors.password}
            touched={touched.password}
            value={values.password}
          />

          <PasswordInput
            nameId="confirmPassword"
            name="Confirm Password"
            minLength={8}
            maxLength={100}
            type="password"
            placeholder="Re-enter Password"
            onBlur={handleBlur}
            onChange={handleChange}
            errors={errors.confirmPassword}
            touched={touched.confirmPassword}
            value={values.confirmPassword}
          />

          <SubmitButton>
            {isSubmit ? (
              <CircularProgressBar>
                <p className="ml-2 text-poppins text-white">Loading...</p>
              </CircularProgressBar>
            ) : (
              <p className="text-poppins text-white">Submit</p>
            )}
          </SubmitButton>
        </form>
        <p className="mt-4 font-poppins text-sm text-gray-600">
          {"Already have an account? "}
          <span
            className="font-semibold text-secondary-light active-secondary cursor-pointer"
            onClick={onSetLoading}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
