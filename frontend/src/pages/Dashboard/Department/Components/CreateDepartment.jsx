import { useUpsertDepartment } from "/src/hooks";
import UpsertModalBox from "/src/components/UpsertModalBox";

const CreateDepartment = (prop) => {
    const [
        submit,
        { errors, values, touched, handleBlur, handleSubmit, handleChange },
        toast
    ] = useUpsertDepartment(prop.selectedDepartment, prop.createDepartment, prop.onSetCreateDepartment, prop.onSetOpenModal);

    return (
        <UpsertModalBox 
            department={true}
            create={prop.createDepartment}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            submit={submit}
            toast={toast}
            onCancel={prop.onCancel}
        />
    );
}

export default CreateDepartment;