import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiNotepadBold } from "react-icons/pi";
import { login, logout, onUserStateChange } from "../api/firebase";

export default function Navbar() {
  const [user, setUser] = useState();
  const handleLogin = () => {
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser);
  };

  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  }, []);
  return (
    <header className="flex justify-between border-b border-gray--300 p-2">
      <Link className="flex items-center text-3xl">
        <PiNotepadBold />
        <h1>게시판</h1>
      </Link>
      {!user && (
        <button className="text-3xl font-semibold" onClick={handleLogin}>
          login
        </button>
      )}
      {user && (
        <button className="text-3xl font-semibold" onClick={handleLogout}>
          logout
        </button>
      )}
    </header>
  );
}
