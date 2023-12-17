import useToggle from "/src/hooks/useToggle";
import AddEmployeeForm from "./Views/AddEmployee";
import EmployeeTable from "./Views/EmployeeTable";

const EmployeeRecord = () => {

    const [addEmployee, onSetAddEmployee] = useToggle();
    return (
        <div className="flex h-full">
            { addEmployee
                ? <AddEmployeeForm onSetAddEmployee={onSetAddEmployee} />
                : <EmployeeTable addEmployee={addEmployee} onSetAddEmployee={onSetAddEmployee} />
            }
        </div>
    );
};

export default EmployeeRecord;

