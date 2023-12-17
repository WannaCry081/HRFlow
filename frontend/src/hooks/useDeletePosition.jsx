import { useNavigate } from "react-router-dom";
import { DeletePositionApi } from "/src/services/positionService";
import useToggle from "/src/hooks/useToggle";

const useDeletePosition = (selectedDepartment, selectedPosition, onCreatePosition) => {
    const navigate = useNavigate();
    const [toast, onSetToast] = useToggle();
    const [confirmModal, onSetConfirmModal] = useToggle();

    const deletePosition = async () => {
      try{
          const token = sessionStorage.getItem("token");
          const response = await DeletePositionApi(
              token,
              selectedDepartment.id,
              selectedPosition.id
          );
          setTimeout(() => {
              switch (response.status) {
                  case 200:
                      onSetToast();
                      onSetConfirmModal();
                      setTimeout(() => {
                          onCreatePosition(true);
                          onSetToast();
                      }, 1200);
                      break;
                  case 404:
                    console.log(response.data);
                    break;
                  case 400:
                  default:
                      navigate("/error");
                      break;
              }
          }, 1000);
      } catch (error){
        console.log(error);
      }
    }
    return [deletePosition, toast, confirmModal, onSetConfirmModal];
};

export default useDeletePosition;
