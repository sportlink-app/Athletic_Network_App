# SportLink: The Ultimate Sports Networking Platform

#### Visit the web app [here](https://sportlink.onrender.com/).

![SportLink Web App GIF](https://res.cloudinary.com/depztpide/image/upload/v1736025194/ScreenRecording2568-01-04at22.02.52-ezgif.com-video-to-gif-converter_swmdgd.gif)

## 💡 Overview

SportLink is a dynamic web app for sports enthusiasts to connect, collaborate, and elevate their athletic experience intelligent matchmaking based on interests and location. Users can create profiles, organize activities, join or form teams, and track progress in real-time.

---

## ⚡️ Core Features

### 👤 **User Profiles**

- **Auto-Generated Avatar**: An avatar is automatically generated based on the user's username and gender for a personalized touch.
- **Dynamic Profile Management**: Users can edit their profiles, updating details like username, email, bio, phone, location, and sports interests.
- **Availability Control**: Toggle your profile between Available or Unavailable to manage event participation and visibility.
- **Activity Tracking**: Users can view statistics like the number of teams created, teams joined, and blog posts.
- **Content Management**: Users can preview, edit, or delete their blog posts and content at any time.
- **Availability Control**: Toggle your profile between Available or Unavailable to manage event participation and visibility.
- **Account Deletion**: Users have the option to permanently delete their account if desired.

### 🛎️ **Notifications**

- **Real-Time Updates**: Receive instant notifications for requests, invites, and team completions.
- **Interactive Modal**: The notification button opens a modal displaying a list of notifications with key details like time, read/unread status, and options to accept or reject requests or invites directly from the modal.
- **Detailed View**: Clicking on a notification shows more details in a full page view for deeper insight.
- **Notification Management**: Users can delete notifications as needed to keep their inbox organized and clutter-free.

### 🤝 **Team**

- **Browse and Filter Teams**: Users can explore all created teams and filter them by members count, date, or sport. Pagination is provided for smooth browsing.
- **Team Details**: Clicking on a team card opens a dedicated page displaying all the team’s detailed information.
- **Join Teams**: Users can easily join a team by clicking the "Join Team" button directly from the team list or team details page.
- **Create Teams**: Users can create a team in two simple steps: 1- Enter a team name, description, and select a sport. 2- Provide the location, members count, and date & time for the activity.
- **Invite Users to Join**: After creating a team, users are automatically redirected to a page where they can invite others to join based on their location, sport preference, and availability.

### 🏆 **Hub**

- **Upcoming Activities**: tay informed about upcoming team activities, categorized into "This Week" and "Later". Once a team completes an activity, it is automatically moved from the team section to the upcoming activities. A countdown timer displays the time left until the next activity.
- **Achievements**: Track your finished team activities and monitor your progress. The achievements page displays a chart of "Engaging Sports Activities" and provides insights into your "Weekly Progress", helping you visualize growth and engagement over time.

### ✍️ **Blog**

- **Share Blogs**: Users can create blogs by adding a title, content, and selecting a relevant sport.
- **Top Creators**: The top 5 bloggers, based on blog count, are featured to highlight active contributors.
- **Explore Blogs**: Users can browse author profiles and explore their complete blog history for deeper engagement.
- **Smooth Infinite Scroll**: Blogs are loaded dynamically as users scroll down, offering a seamless browsing experience.

---

## 🛠 **Tech Stack**

### **Backend**

- **PostgreSQL**: Robust relational database.
- **Flask**: Core backend framework for API development.
- **SQLAlchemy**: ORM for database interactions.
- **PyJWT**: Secure authentication and authorization.
- **Flask-SocketIO**: Enables real-time communication.
- **Flask-Mail**: Handles email notifications.

### **Frontend**

- **React.js**: For building a dynamic and responsive UI.
- **Vite**: High-performance development environment.
- **Ant Design**: Elegant component library.
- **TailwindCSS**: Utility-first CSS framework.
- **Framer Motion**: Animations for smooth user experiences.
- **Axios**: Simplified API requests.
- **Socket.io**: Real-time frontend-backend communication.
- **Zustand**: Lightweight state management.

### **DevOps**

- **Docker**: Simplified deployment and scalability.

---

## 📋 **System Design**

### **Architecture**

SportLink follows a modular architecture, ensuring scalability and maintainability:

1. **Frontend**: Built with React.js, leveraging Vite for fast builds and Ant Design for a clean UI.
2. **Backend**: Flask-based RESTful API with real-time communication via Flask-SocketIO.
3. **Database**: PostgreSQL for efficient data storage and retrieval.
4. **State Management**: Zustand for frontend state management.

---

## 🚀 **Getting Started**

### **Prerequisites**

Ensure you have:

- **Docker**
- **Node.js**
- **npm** or **yarn**

### **Setup**

#### 1. Clone the Repository

```bash
  git clone https://github.com/sportlink-app/SportLink.git
  cd sportlink
```

#### 2. Build and Start Services

```bash
  docker compose up --build
```

#### 3. Install Client Dependencies

```bash
  cd client
  npm install
```

#### 4. Start the Client

```bash
  npm run dev
```
