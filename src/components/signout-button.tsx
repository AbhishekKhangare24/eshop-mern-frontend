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

  let loggedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const initials = () => {
    const name: string = loggedUser?.name;
    const nameParts: string[] = name.split(" ");

    if (nameParts.length > 1) {
      const firstLastName: string =
        nameParts[0][0] + nameParts[nameParts.length - 1][0];
      return firstLastName;
    } else {
      return nameParts[0][0];
    }
  };

  return (
    <>
      <Link
        style={{
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "20px",
          padding: "3px 5px",
          borderRadius: "50%",
          background: "#006888",
          color: "white",
        }}
        to={"/profile"}
      >
        {loggedUser && initials()}
      </Link>
      <button
        onClick={handleClick}
        className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
      >
        Sign Out
      </button>
    </>
  );
};

export default SignOutButton;
