import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../redux/api/api-client";
import { useAppContext } from "../contexts/AppContext";
import { useDispatch } from "react-redux";
import { userNotExist } from "../redux/reducer/userReducer";
import { Link } from "react-router-dom";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const dispatch = useDispatch();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      dispatch(userNotExist());
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <Link to={"/"} onClick={handleClick} className="navbar__button">
      SIGN OUT
    </Link>
  );
};

export default SignOutButton;
