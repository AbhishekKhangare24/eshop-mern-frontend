import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../redux/api/api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducer/userReducer";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      let loggedUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;
      dispatch(userExist(loggedUser));

      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="sign-in_container" onSubmit={onSubmit}>
      <div className="sub_container">
        {/* <img
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        /> */}
        <h2>Sign in to your account</h2>
      </div>

      <div className="sign_in-1">
        <div className="sign_in-2">
          <form>
            <div>
              <label htmlFor="email" className="sign_in-3">
                Email addresss
              </label>

              <div className="sign_in-4">
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="sign_in-5"
                  {...register("email", { required: "This field is required" })}
                ></input>
                {errors.email && (
                  <span className="sign_in-6">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="sign_in-7">
              <label htmlFor="password" className="sign_in-8">
                Password
              </label>
              <div className="sign_in-4">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
                  className="sign_in-5"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                ></input>
                {errors.password && (
                  <span className="sign_in-6">{errors.password.message}</span>
                )}
              </div>
            </div>
            <div className="sign_in-11">
              <div className="sign_in-12">
                Not Registered?
                <Link to="/register" className="sign_in-13">
                  Create an Account Here
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <span className="sign_in-14">
                <button type="submit" className="sign_in-15">
                  Sign in
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
