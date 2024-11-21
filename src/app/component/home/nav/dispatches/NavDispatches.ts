// NavDispatches.ts
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { currentNav, setCurrentState } from "@/redux/features/navSlice";

export function useNavDispatches(currentState: string) {
  const navstate = useSelector(currentNav);
  const dispatch = useDispatch();

  const dispatchCurrentState = () => {
    dispatch(setCurrentState(`${currentState === navstate.current ? "" : currentState}`));
  };

  return { dispatchCurrentState };
}
