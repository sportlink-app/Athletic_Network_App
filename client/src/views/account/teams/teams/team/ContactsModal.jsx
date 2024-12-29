import { Button, Modal, Tag } from "antd";
import { UnorderedListOutlined, PhoneOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useState } from "react";
import ProfileAvatar from "../../../../../components/dynamic/Avatar";
import Card from "../../../../../components/static/Card";
import { getRandomColor } from "../../../../../components/utils/randomColor";
import { Link } from "react-router-dom";

export default function ContactsModal({ members, ownerUsername }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filteredMembers = members.filter(
    (member) => member.username !== ownerUsername
  );

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        shape="round"
        size="large"
        className="w-fit !bg-green disabled:bg-green hover:!bg-green hover:brightness-105 self-end"
        icon={<UnorderedListOutlined size={16} />}
      >
        Contacts
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="!w-fit"
      >
        <div className="p-4">
          <h1 className="text-slate-800 text-lg text-center">
            Your Team Contacts
          </h1>
          <div className="max-h-[60vh] overflow-y-auto mt-4 xl:mt-6">
            <div className="flex flex-col md:flex-row flex-wrap max-w-5xl gap-4 md:gap-5">
              {filteredMembers.map((member) => (
                <Card
                  key={member.username}
                  className="h-full rounded-2xl p-6 flex items-center gap-4 lg:gap-5"
                >
                  <Link
                    to={`/user/${member.username}`}
                    className="w-fit cursor-pointer leading-[.5rem]"
                  >
                    <ProfileAvatar
                      username={member.username}
                      gender={member.gender}
                      size={62}
                      bgColor={getRandomColor(member.username, member.gender)}
                    />
                  </Link>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm lg:text-base font-medium text-gray-700 capitalize">
                      {member.username}
                    </h3>
                    <a href={`tel:${member.tel}`}>
                      <Tag
                        bordered={false}
                        color="success"
                        className="w-fit rounded-full text-sm py-1 md:py-2 px-3 md:px-4 hover:!border-green duration-200"
                      >
                        <PhoneOutlined />
                        <span className="ml-1">{member.tel}</span>
                      </Tag>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

ContactsModal.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      gender: PropTypes.string,
      tel: PropTypes.string.isRequired,
    })
  ).isRequired,
  ownerUsername: PropTypes.string.isRequired,
};
