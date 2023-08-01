import { useNavigate } from "react-router-dom";
import localForage, { key } from "localforage";
import { useSWRConfig } from "swr";
export default function useExit() {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const handleExit = async () => {
    mutate(
      key,
      undefined,
      { revalidate: false }
    );
    await localForage.clear();
    navigate("/login");
  };
  return handleExit;
}
