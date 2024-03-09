import React from "react";
import { useNavigate } from "react-router-dom";

export default function Post({ post, index, allPostLength }) {
  const { title, email, postId } = post;
  const date = post.date.split("T")[0];
  const postNumber = allPostLength - index;
  const navigate = useNavigate();
  return (
    <tr
      className=" border-collapse border-b-gray-300 border-b cursor-pointer"
      onClick={() => {
        navigate(`/postDetail/${postId}`);
      }}
    >
      <td className="text-center ">{postNumber}</td>
      <td className="text-left pl-3 py-3">{title}</td>
      <td className="text-center">{email}</td>
      <td className="text-center">{date}</td>
    </tr>
  );
}
