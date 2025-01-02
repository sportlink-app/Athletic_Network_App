// This object contains message templates for different notification types.
export const notificationMessages = {
  // Team invite notification
  team_invite: (sender, teamName) =>
    `${sender.username} has invited you to join ${teamName}`,
  // Response to team invite notification
  team_invite_response: (sender, teamName) =>
    `${sender.username} has accepted your invite to join ${teamName}`,
  // Request to join a team notification
  team_join: (sender, teamName) =>
    `${sender.username} has requested you to join ${teamName}`,
  // Response to team join request notification
  team_join_response: (sender, teamName) =>
    `${sender.username} has accepted your request to join ${teamName}`,
  // Team completion notification
  team_completion: (teamName) => `${teamName} is completed now!`,
};

// Function to retrieve the appropriate notification message based on the notification type
export const getNotificationMessage = (type, sender, teamName) => {
  const messageFunction = notificationMessages[type];

  if (messageFunction) {
    // If the message function expects only one argument (teamName), use that
    return messageFunction.length === 1
      ? messageFunction(teamName)
      : messageFunction(sender, teamName);
  }

  // Default message when the type does not exist in the predefined messages
  return "You have a new notification";
};
