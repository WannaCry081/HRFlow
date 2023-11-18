import { motion } from "framer-motion";
import { TextInput, SubmitButton } from "/src/components/FormInput";
import { CircularProgressBar } from "/src/components/Loading";
import { useJoinTeam } from "/src/hooks";

const JoinTeamSection = () => {
  const [
    isSubmit,
    { errors, touched, values, handleSubmit, handleBlur, handleChange },
  ] = useJoinTeam();

  return (
    <motion.div initial={{ translateX: 20 }} animate={{ translateX: 0 }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          nameId="code"
          name="Team Code"
          type="text"
          placeholder="7HX7J800"
          maxLength={8}
          errors={errors.code}
          touched={touched.code}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.code}
        />

        <div className="w-full sm:w-44 self-end">
          <SubmitButton>
            {isSubmit ? (
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

export default JoinTeamSection;
