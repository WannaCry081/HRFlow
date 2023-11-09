import { LuMessagesSquare } from "react-icons/lu";
import { TextInput, SubmitButton } from "@Components/FormInput";
import { CircularProgressBar } from "@Components/Loading";

const EmailSection = (prop) => {
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    prop.formik;

  return (
    <>
      <header className="mb-6">
        <span className="flex items-center gap-2">
          <LuMessagesSquare size={26} className="stroke-primary-light" />
          <h1 className="text-2xl sm:text-3xl font-lato font-extrabold text-primary-light ">
            Forgot your password?
          </h1>
        </span>
        <p className="font-poppins text-sm text-gray-600 mt-2">
          Don't worry, we just need your Email Address for confirmation.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <TextInput
          nameId="email"
          name="Email"
          type="email"
          placeholder="JohnDoe@example.com"
          minLength={5}
          maxLength={100}
          onBlur={handleBlur}
          errors={errors.email}
          touched={touched.email}
          onChange={handleChange}
          value={values.email}
        />

        <div className="self-end w-full sm:w-44 ">
          <SubmitButton>
            {prop.isSubmit ? (
              <CircularProgressBar>
                <p className="ml-2 text-poppins text-white">Loading...</p>
              </CircularProgressBar>
            ) : (
              <p className="text-poppins text-white">Proceed</p>
            )}
          </SubmitButton>
        </div>
      </form>
    </>
  );
};

export default EmailSection;
