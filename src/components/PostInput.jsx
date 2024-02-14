import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function PostInput() {
  const { user } = useAuthContext();
  return (
    <section className="w-full text-center">
      <h2 className="text-2xl">글쓰기</h2>
      <form className="flex flex-col  px-5 ">
        <input
          type="text"
          className="border-solid border-2 border-black my-1 "
        />
        <textarea className="border-solid border-2 border-black my-1 resize-none " />
      </form>
    </section>
  );
}
