import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getRandomColor } from "../../../../components/utils/randomColor";
import usersStore from "../../../../store/user/usersStore";
import userInfoStore from "../../../../store/user/userInfoStore";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import Footer from "../../../../components/Footer";

function UserProfile() {
  const { username } = useParams();
  const { getUser, gender, bio, sports, city } = usersStore((state) => ({
    getUser: state.getUser,
    gender: state.gender,
    bio: state.bio,
    sports: state.sports,
    city: state.city,
  }));
  const { getAvailability, availability } = userInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (username) {
          await getUser(username);
          await getAvailability(username);
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/404");
      }
    };

    fetchProfileData();
  }, [username, getUser, navigate, availability, getAvailability]);

  const coverBgColor = getRandomColor(username);

  return (
    <>
      <section>
        <div
          style={{ backgroundColor: coverBgColor }}
          className="w-full h-28 md:h-32 xl:h-40 flex justify-center items-end"
        >
          <div className="w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl h-10 relative">
            <Button
              type="default"
              shape="round"
              size="large"
              onClick={() => navigate(-1)}
              icon={<ArrowLeftOutlined size={16} />}
              className="absolute top-5 left-2 sm:left-4 "
            >
              Back
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-10 lg:mt-14 xl:mt-16 w-full flex items-center flex-col">
          <ProfileHeader
            username={username}
            gender={gender}
            availability={availability}
          />
          <ProfileContent bio={bio} sports={sports} city={city} />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UserProfile;
