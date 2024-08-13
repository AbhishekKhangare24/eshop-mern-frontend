import { Link } from "react-router-dom";
// import {
//   FaSearch,
//   FaShoppingBag,
//   FaSignInAlt,
//   FaUser,
//   FaSignOutAlt,
// } from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import toast from "react-hot-toast";
import SignOutButton from "./signout-button";
import { useAppContext } from "../contexts/AppContext";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAppContext();

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

  // const logoutHandler = async () => {
  //   try {
  //     await signOut(auth);
  //     toast.success("Sign Out Successfully");
  //     setIsOpen(false);
  //   } catch (error) {
  //     toast.error("Sign Out Fail");
  //   }
  // };

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        HOME
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        {/* <FaSearch /> */}
        SEARCH
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        {/* <FaShoppingBag /> */}
        CART
      </Link>

      {user?.role === "admin" && (
        <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
          Admin
        </Link>
      )}

      {user?._id ? (
        <>
          <button
            style={{
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "20px",
              padding: "5px",
              borderRadius: "5px",
              background: "#006888",
              color: "white",
            }}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {loggedUser && initials()}
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  Admin
                </Link>
              )}

              <Link to={"/profile"} onClick={() => setIsOpen(false)}>
                Profile
              </Link>

              <Link onClick={() => setIsOpen(false)} to="/orders">
                Orders
              </Link>
              <button>
                <SignOutButton />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to="/sign-in" style={{ fontWeight: "500" }}>
          SIGN IN
        </Link>
      )}

      {/* {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  Admin
                </Link>
              )}

              <Link onClick={() => setIsOpen(false)} to="/orders">
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )} */}
    </nav>
  );
};

export default Header;
