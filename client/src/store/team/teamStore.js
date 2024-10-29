import axios from "axios";
import { create } from "zustand";
import authStore from "../user/authStore";

const teamStore = create(() => ({
  teamInvite: async (teamId, userId) => {
    try {
      await axios.post(
        `/team/invite?team_id=${teamId}`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("User has already been invited");
      } else {
        throw new Error(
          "Failed to invite user, please refresh the page or try again later"
        );
      }
    }
  },
  inviteRespond: async (referenceId, action) => {
    try {
      await axios.post(
        `/team/invite/response?reference_id=${referenceId}`,
        { action: action },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error(
        "Failed to respond to invitation, please try again later"
      );
    }
  },
}));

export default teamStore;
