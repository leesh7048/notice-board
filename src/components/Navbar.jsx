import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex justify-between border-b border-gray--300">
      <Link className="text-3xl">
        <h1>게시판</h1>
      </Link>
      <button className="text-3xl">login</button>
    </header>
  );
}
