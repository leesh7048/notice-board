import React from "react";
import { Link } from "react-router-dom";
import { PiNotepadBold } from "react-icons/pi";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="flex justify-between border-b border-gray--300 p-2">
      <Link className="flex items-center text-3xl">
        <PiNotepadBold />
        <h1>게시판</h1>
      </Link>
      {!user && (
        <button className="text-3xl font-semibold" onClick={login}>
          login
        </button>
      )}
      {user && (
        <button className="text-3xl font-semibold" onClick={logout}>
          logout
        </button>
      )}
    </header>
  );
}
