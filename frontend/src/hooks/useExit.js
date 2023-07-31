import { useNavigate } from "react-router-dom";
import localForage from "localforage";
export default function useExit() {
  const navigate = useNavigate();
  const handleExit = async () => {
    await localForage.clear();
    navigate("/login");
  };
  return handleExit;
}
