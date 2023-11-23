import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteDepartmentApi } from "/src/services/departmentService";
import useToggle from "/src/hooks/useToggle";
import Position from "../Position";
import { PiPlusBold } from "react-icons/pi";
import TeamsCard from "./Components/TeamsCard";
import useDepartments from "/src/hooks/useDepartments";
import useEmployees from "/src/hooks/useEmployees";
import CreateDepartment from "./Components/CreateDepartment";
import Toast from "/src/components/Toast";
import ConfirmModalBox from "/src/components/ConfirmModalBox";

const Department = () => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const [viewDepartment, onSetViewDepartment] = useToggle();

    const [submit, onSetSubmit] = useToggle();
    const [positionSubmit, onSetPositionSubmit] = useToggle();

    const departments = useDepartments(submit, positionSubmit);
    const employees = useEmployees(submit);

    const [createDepartment, onSetCreateDepartment] = useState(false);

    const [openModal, onSetOpenModal] = useToggle();
    const [confirmModal, onSetConfirmModal] = useToggle();

    const [toast, onSetToast] = useToggle();

    const [selectedDepartment, onSetSelectedDepartment] = useState(null);

    const employeesInDepartment = (employees, departmentId) => {
        return employees.filter((employee) => employee.departmentId === departmentId);
    }

    const deleteDepartment = async () => {
        try {
            const { status, data } = await DeleteDepartmentApi(
                token,
                selectedDepartment.id,
            );

            setTimeout(() => {
                if (status === 200) {
                    onSetToast();
                    console.log("Deletion successful!");
                    setTimeout(() => {
                        onSetToast();
                    }, 1000);

                } else if (status === 400) {
                    formik.setErrors({
                        title: data
                    });
                } else {
                    navigate("/error");
                }
                onSetConfirmModal();
                onSetSubmit();
                onSetPositionSubmit();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div className="flex h-full">
            <section className="w-full h-full bg-lilac-pale rounded-t-[2.5rem] p-8 flex flex-col">
                {toast && <Toast message="Department successfullly deleted!" />}

                {openModal && <CreateDepartment
                    selectedDepartment={selectedDepartment}
                    addDepartment={createDepartment}
                    onSetOpenModal={onSetOpenModal}
                    onSetSubmit={onSetSubmit}
                    submit={submit}
                    onCancel={() => {
                        onSetOpenModal(false);
                        onSetCreateDepartment(false);
                    }} />}

                {confirmModal && <ConfirmModalBox
                    onCancel={onSetConfirmModal}
                    header="Confirm Delete Department"
                    operation="delete"
                    title={selectedDepartment.name}
                    option="Delete"
                    submit={deleteDepartment}
                />}

                {
                    viewDepartment ? (
                        <Position 
                            submit={submit}
                            selectedDepartment={selectedDepartment}
                            positionSubmit={positionSubmit}
                            onSetPositionSubmit={onSetPositionSubmit}
                            onSetViewDepartment={onSetViewDepartment}
                        
                        />
                    ) : (
                        <>
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
                                            selectedDepartment={selectedDepartment}
                                            onSetConfirmModal={onSetConfirmModal}
                                            employeeCount={employeesInDepartment(employees, department.id).length}
                                            positionCount={department.positions.length}
                                            onSelectDepartment={() => onSetSelectedDepartment(department)}
                                            onSetOpenModal={() => {
                                                onSetOpenModal(true);
                                                onSetCreateDepartment(false);
                                            }}
                                            onSelect={(department) => {
                                                onSetSelectedDepartment(department);
                                                onSetViewDepartment()
                                            }}
                                        />
                                    ))}
                            </div>
                        </>
                    )
                }
            </section>

        </div>
    );
}

export default Department;