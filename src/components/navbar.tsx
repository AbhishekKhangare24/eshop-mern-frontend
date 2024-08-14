import { useState } from "react";
import { User } from "../types/types";
import { Link } from "react-router-dom";
import SignOutButton from "./signout-button";
import Tooltip from "./tooltip";

interface PropsType {
  user: User | null;
}

const Navbar = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let loggedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <nav className="navbar">
      <div className="navbar__container">
        <a href="#" className="navbar__logo">
          eShop
        </a>
        <div className="navbar__toggle" onClick={toggleMenu}>
          <div className={`navbar__hamburger ${isOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul className={`navbar__menu ${isOpen ? "navbar__menu--active" : ""}`}>
          <li className="navbar__item">
            <Link
              onClick={() => setIsOpen(false)}
              className="navbar__link"
              to={"/"}
            >
              HOME
            </Link>
          </li>

          <li className="navbar__item">
            <Link
              onClick={() => setIsOpen(false)}
              className="navbar__link"
              to={"/search"}
            >
              SEARCH
            </Link>
          </li>

          <li className="navbar__item">
            <Link
              onClick={() => setIsOpen(false)}
              className="navbar__link"
              to={"/cart"}
            >
              CART
            </Link>
          </li>

          {user?.role === "admin" && (
            <li className="navbar__item">
              <Link
                onClick={() => setIsOpen(false)}
                className="navbar__link"
                to="/admin/dashboard"
              >
                ADMIN
              </Link>
            </li>
          )}

          {user?._id ? (
            <>
              <li className="navbar__item">
                <Link
                  onClick={() => setIsOpen(false)}
                  className="navbar__link"
                  to="/orders"
                >
                  ORDERS
                </Link>
              </li>

              <li className="navbar__item">
                <Tooltip text="profile">
                  <Link
                    onClick={() => setIsOpen(false)}
                    to={"/profile"}
                    className="navbar__link"
                  >
                    {loggedUser && initials()}
                  </Link>
                </Tooltip>
              </li>
              <li onClick={() => setIsOpen(false)} className="navbar__item">
                <SignOutButton />
              </li>
            </>
          ) : (
            <li className="navbar__item">
              <Link
                className="navbar__button"
                to="/sign-in"
                onClick={() => setIsOpen(false)}
                style={{ fontWeight: "500" }}
              >
                SIGN UP
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
