import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../redux/api/api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: "user";
  dob: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("data ==>", data);
    mutation.mutate({ ...data, photo: "dummyPhoto" });
  });

  return (
    <div className="register_1">
      <div className="register_2">
        <div className="sub_container">
          {/* <img
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        /> */}
          <h2>Create New Account</h2>
        </div>

        <form onSubmit={onSubmit}>
          <div className="register_3">
            <label htmlFor="name" className="register_4">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              className="register_5"
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && (
              <span className="register_6">{errors.name.message}</span>
            )}
            {/* <label className="text-gray-700 text-sm font-bold flex-1">
            Photo
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("photo", { required: "This field is required" })}
            ></input>
            {errors.photo && (
              <span className="register_6">{errors.photo.message}</span>
            )}
          </label> */}
          </div>
          <div className="register_3">
            <label htmlFor="email" className="register_4">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="register_5"
              {...register("email", { required: "This field is required" })}
            ></input>
            {errors.email && (
              <span className="register_6">{errors.email.message}</span>
            )}
          </div>

          <div className="register_8">
            <div className="register_7">
              <div className="register_3">
                <label htmlFor="date" className="register_4">
                  DOB
                </label>
                <input
                  type="date"
                  className="register_5"
                  {...register("dob", { required: "This field is required" })}
                ></input>
                {errors.dob && (
                  <span className="register_6">{errors.dob.message}</span>
                )}
              </div>
            </div>
            <div className="register_7">
              <div className="register_3">
                <label htmlFor="time" className="register_4">
                  Gender
                </label>
                <select
                  className="register_5"
                  {...register("gender", {
                    required: "This field is required",
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <span className="register_6">{errors.gender.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="register_3">
            <label htmlFor="phone" className="register_4">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="register_5"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="register_6">{errors.password.message}</span>
            )}
          </div>
          <div className="register_3">
            <label htmlFor="phone" className="register_4">
              Confirm Password
            </label>
            <input
              type="password"
              id="phone"
              placeholder="Confirm Your Password"
              className="register_5"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="register_6">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="sign_in-11">
            <div className="sign_in-12">
              Allready have a account?
              <Link to="/sign-in" className="sign_in-13">
                {" "}
                Go to Sign-in
              </Link>
            </div>
          </div>
          <div>
            <button type="submit" className="register_9">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
