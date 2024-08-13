import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { getUser } from "../redux/api/userAPI";
import { User } from "../types/types";
import { useEffect, useState } from "react";

const Profile = () => {
  const [data, setData] = useState<User | undefined>(undefined);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const getProfile = async (user: User | null) => {
    if (!user) return null;
    const data = await getUser(user?._id);
    setData(data?.user);
  };

  console.log(data);
  useEffect(() => {
    getProfile(user);
  }, []);

  function calculateAge(birthDateString: string | undefined): number {
    if (!birthDateString) return 0;
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className="user-profile">
      <div className="content">
        <h3 className="title">User Profile</h3>
        <dl className="info-list">
          <div className="info-item">
            <dt className="info-title">Full name</dt>
            <dd className="info-detail">{data?.name}</dd>
          </div>
          <div className="info-item">
            <dt className="info-title">Email address</dt>
            <dd className="info-detail">{user?.email}</dd>
          </div>
          <div className="info-item">
            <dt className="info-title">Age</dt>
            <dd className="info-detail">{calculateAge(user?.dob)}</dd>
          </div>
          <div className="info-item">
            <dt className="info-title">Gender</dt>
            <dd className="info-detail">{user?.gender}</dd>
          </div>
          <div className="info-item">
            <dt className="info-title">Role</dt>
            <dd className="info-detail">{user?.role}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
