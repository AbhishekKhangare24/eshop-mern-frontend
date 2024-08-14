import { useEffect } from "react";
// import toast from "react-hot-toast";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

// type Style = {
//   position: string;
//   top: string;
//   right: string;
//   padding: string;
//   borderRadius: string;
//   backgroundColor: string;
//   color: string;
// };

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  // const styles =
  //   type === "SUCCESS"
  //     ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
  //     : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div
      // className={styles}
      style={{
        position: "fixed",
        bottom: "10px",
        left: "46%",
        zIndex: 50,
        padding: "5px 10px 5px 10px",
        borderRadius: "5px",
        backgroundColor: type === "SUCCESS" ? "green" : "red",
        color: "white",
      }}
    >
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
