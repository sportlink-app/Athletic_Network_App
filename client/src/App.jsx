import "./App.css";
import Error from "./components/Error";
import Navbar from "./components/navbar";
import Login from "./views/auth/Login";
import SignUp from "./views/auth/SignUp";
import LandingPage from "./views/landing-page";

function App() {
  return (
    <>
      <Navbar />
      <LandingPage />
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <Error /> */}
    </>
  );
}

export default App;
