import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteDepartmentApi } from "/src/services/departmentService";
import { PiPlusBold } from "react-icons/pi";
import TeamsCard from "../Components/TeamsCard";
import CreateDepartment from "../Components/CreateDepartment";
import Toast from "/src/components/Toast";
import ConfirmModalBox from "/src/components/ConfirmModalBox";
import { useToggle,
        useDepartments,
        useEmployees } from "/src/hooks";

const DepartmentListView = (prop) => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const [createDepartment, onSetCreateDepartment] = useState(false);
    const [positionSubmit, onSetPositionSubmit] = useToggle();

    const departments = useDepartments(createDepartment, positionSubmit);
    const employees = useEmployees(createDepartment);
    
    const [openModal, onSetOpenModal] = useToggle();
    const [confirmModal, onSetConfirmModal] = useToggle();
    
    const [toast, onSetToast] = useToggle();


    const employeesInDepartment = (employees, departmentId) => {
        return employees.filter((employee) => employee.departmentId === departmentId);
    }

    const deleteDepartment = async () => {
        try {
            const { status, data } = await DeleteDepartmentApi(
                token,
                prop.selectedDepartment.id,
            );

            setTimeout(() => {
                if (status === 200) {
                    onSetToast();
                    console.log("Deletion successful!");
                    setTimeout(() => {
                        onSetToast();
                    }, 1200);
                } else if (status === 400) {
                    formik.setErrors({
                        title: data
                    });
                } else {
                    navigate("/error");
                }
                onSetConfirmModal();
                onSetCreateDepartment();
                onSetPositionSubmit();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            {toast && <Toast message="Department successfullly deleted!" />}

            {openModal && <CreateDepartment
                selectedDepartment={prop.selectedDepartment}
                createDepartment={createDepartment}
                onSetCreateDepartment={onSetCreateDepartment}
                onSetOpenModal={onSetOpenModal}
                onCancel={() => {
                    onSetOpenModal(false);
                    onSetCreateDepartment(false);
                }} />}

            {confirmModal && <ConfirmModalBox
                onCancel={onSetConfirmModal}
                header="Confirm Delete Department"
                operation="delete"
                title={prop.selectedDepartment.name}
                option="Delete"
                submit={deleteDepartment}
            />}

            <div className="flex justify-between py-4">
                <h1 className="text-4xl font-semibold font-lato">Department</h1>
                <div onClick={() => {
                    onSetOpenModal(true);
                    onSetCreateDepartment(true)
                }}
                    className="w-1/5 lg:w-56 gap-2 bg-lilac hover:bg-lilac-dark flex items-center rounded-lg justify-center hover-bg-primary-dark h-12 cursor-pointer">
                    <PiPlusBold size={24} className="fill-white" />
                    <p className="text-white font-poppins font-semibold cursor-pointer">
                        Add Department
                    </p>
                </div>
            </div>
            <div className=" pt-4 grid grid-cols-4 gap-4 pb-4 overflow-y-auto">
                {departments.map((department) => (
                    <TeamsCard
                        key={department.id}
                        name={department.name}
                        department={department}
                        selectedDepartment={prop.selectedDepartment}
                        onSetConfirmModal={onSetConfirmModal}
                        employeeCount={employeesInDepartment(employees, department.id).length}
                        positionCount={department.positions.length}
                        onSelectDepartment={() => prop.onSetSelectedDepartment(department)}
                        onSetOpenModal={() => {
                            onSetOpenModal(true);
                            onSetCreateDepartment(false)}}
                        onSelect={(department) => {
                            prop.onSetSelectedDepartment(department);
                            prop.onSetViewDepartment()
                        }}
                    />
                ))}
            </div>
        </>
    );
}

export default DepartmentListView;