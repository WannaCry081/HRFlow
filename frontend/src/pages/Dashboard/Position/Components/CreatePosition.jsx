import { useUpsertPosition } from "/src/hooks";
import UpsertModalBox from "/src/components/UpsertModalBox";

const CreatePosition = (prop) => {
    const [
        submit,
        { errors, values, touched, handleBlur, handleSubmit, handleChange },
        toast
    ] = useUpsertPosition(prop.selectedDepartment, prop.selectedPosition, prop.createPosition, prop.onSetCreatePosition, prop.onSetOpenModal);
    
    return (
        <UpsertModalBox
            department={false}
            create={prop.createPosition}
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

export default CreatePosition;
