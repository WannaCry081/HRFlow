import { useNavigate } from "react-router-dom";
import { DeleteDepartmentApi } from "/src/services/departmentService";
import useToggle from "/src/hooks/useToggle";

const useDeleteDepartment = (selectedDepartment, onCreateDepartment) => {
    const navigate = useNavigate();
    const [toast, onSetToast] = useToggle();
    const [confirmModal, onSetConfirmModal] = useToggle();
    
    const deleteDepartment = async () => {
        const token = sessionStorage.getItem("token");
        const response = await DeleteDepartmentApi(
            token,
            selectedDepartment.id
        );
        setTimeout(() => {
            switch (response.status) {
                case 200:
                    onSetToast();
                    onSetConfirmModal();
                    setTimeout(() => {
                        onCreateDepartment();
                        onSetToast();
                    }, 1200);
                    break;
                case 404:
                case 400:
                default:
                    navigate("/error");
                    break;
            }
        }, 1000);
    }

    return [deleteDepartment, toast, confirmModal, onSetConfirmModal];
};

export default useDeleteDepartment;
