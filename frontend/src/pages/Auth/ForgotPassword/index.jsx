import { ModalBox } from "/src/components/ModalBox";
import EmailSection from "./sections/EmailSection";
import VerificationSection from "./sections/VerificationSection";
import { useForgotPassword } from "/src/hooks";

const ForgotPassword = (prop) => {
  const [isSubmit, isVerified, formik] = useForgotPassword();

  return (
    <ModalBox onCancel={prop.onCancel}>
      {isVerified ? (
        <VerificationSection isSubmit={isSubmit} formik={formik} />
      ) : (
        <EmailSection isSubmit={isSubmit} formik={formik} />
      )}
    </ModalBox>
  );
};

export default ForgotPassword;