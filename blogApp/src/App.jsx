import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer, ScrollToTop } from "./components";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log("userData in main.jsx :", userData);
          dispatch(login({ userData }));
        } else dispatch(logout());
      })
      .catch((error) => {
        console.log("error while fetching current User: ", error);
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <>
    <ScrollToTop/>
      <div className="min-h-screen flex flex-wrap ">
        <div className="w-full block">
          <Header  />
          <main className="min-h-screen flex-grow mt-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : null;
}

export default App;
