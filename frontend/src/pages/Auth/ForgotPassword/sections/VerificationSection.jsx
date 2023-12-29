import { LuMessagesSquare } from "react-icons/lu";
import { CodeInput, SubmitButton } from "/src/components/FormInput";
import { CircularProgressBar } from "/src/components/Loading";
import { motion } from "framer-motion";

const VerficationSection = (prop) => {
  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue} =
    prop.formik;

  const handleCodeChange = (index, value) => {
    const newCode =
      values.code.slice(0, index) + value + values.code.slice(index + 1);
    setFieldValue("code", newCode);
  };

  const codeInputs = Array.from({ length: 6 }, (_, index) => (
    <CodeInput
      key={index}
      nameId={`code${index + 1}`}
      maxLength={1}
      minLength={1}
      onBlur={handleBlur}
      value={values.code[index] || ""}
      onChange={(e) => handleCodeChange(index, e.target.value)}
    />
  ));

  return (
    <motion.div initial={{ translateX: 20 }} animate={{ translateX: 0 }}>
      <header className="mb-6">
        <span className="flex items-center gap-2">
          <LuMessagesSquare size={26} className="stroke-lilac" />
          <h1 className="text-3xl font-lato font-extrabold text-lilac ">
            Confirm your Email
          </h1>
        </span>
        <p className="font-poppins text-sm text-gray-600 mt-2">
          We've sent a confirmation code to your email. Input the code to
          proceed.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <span>
          <div className="flex items-center gap-2 sm:px-6">{codeInputs}</div>
          <div className="text-sm text-start text-red-500 font-semibold mt-2 sm:ml-7 ">
            {errors.code && touched.code && errors.code}
          </div>
        </span>

        <div className="w-full sm:w-44 self-end">
          <SubmitButton>
            {prop.submit ? (
              <CircularProgressBar>
                <p className="ml-2 text-poppins text-white">Loading...</p>
              </CircularProgressBar>
            ) : (
              <p className="text-poppins text-white">Submit</p>
            )}
          </SubmitButton>
        </div>
      </form>
    </motion.div>
  );
};

export default VerficationSection;
