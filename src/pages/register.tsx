import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../redux/api/api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

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
    <form className="flex flex-col gap-5 sign-in" onSubmit={onSubmit}>
      <div>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Full Name
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("name", { required: "This field is required" })}
            ></input>
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </label>
          {/* <label className="text-gray-700 text-sm font-bold flex-1">
            Photo
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("photo", { required: "This field is required" })}
            ></input>
            {errors.photo && (
              <span className="text-red-500">{errors.photo.message}</span>
            )}
          </label> */}
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("email", { required: "This field is required" })}
            ></input>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Gender
            <select
              {...register("gender", { required: "This field is required" })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            DOB
            <input
              type="date"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("dob", { required: "This field is required" })}
            ></input>
            {errors.dob && (
              <span className="text-red-500">{errors.dob.message}</span>
            )}
          </label>
        </div>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Create Account
          </button>
        </span>
      </div>
    </form>
  );
};

export default Register;
