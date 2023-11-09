import { motion } from "framer-motion";
import { TextInput, SubmitButton } from "@Components/FormInput";
import { CircularProgressBar } from "@Components/Loading";
import { useCreateTeam } from "@Hooks";

const CreateTeamSection = () => {
  const [
    isSubmit,
    { errors, values, touched, handleBlur, handleSubmit, handleChange },
  ] = useCreateTeam();

  return (
    <motion.div initial={{ translateX: 20 }} animate={{ translateX: 0 }}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <TextInput
          nameId="name"
          name="Team Name"
          type="text"
          placeholder="HR Flow"
          minLength={2}
          maxLength={50}
          errors={errors.name}
          touched={touched.name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
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

export default CreateTeamSection;
