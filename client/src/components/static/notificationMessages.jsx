export const notificationMessages = {
  team_invite: (sender, teamName) =>
    `${sender.username} has invited you to join ${teamName}`,
  team_invite_response: (sender, teamName) =>
    `${sender.username} has accepted your invite to join ${teamName}`,
  team_join: (sender, teamName) =>
    `${sender.username} has requested you to join ${teamName}`,
  team_join_response: (sender, teamName) =>
    `${sender.username} has accepted your request to join ${teamName}`,
  team_completion: (teamName) => `${teamName} is completed now!`,
};

export const getNotificationMessage = (type, sender, teamName) => {
  const messageFunction = notificationMessages[type];

  if (messageFunction) {
    // Check if the message function expects only one argument (teamName only)
    return messageFunction.length === 1
      ? messageFunction(teamName)
      : messageFunction(sender, teamName);
  }

  return "You have a new notification";
};
