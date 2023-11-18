import { ModalBox } from "/src/components/ModalBox";
import { useForgotPassword } from "/src/hooks";

const ForgotPassword = (prop) => {
  const [isSubmit, isVerified, formik] = useForgotPassword();
  const EmailSection = import("./sections/EmailSection");
  const VerificationSection = import("./sections/VerificationSection");

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
