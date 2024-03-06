import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts } from "../api/firebase";

export default function List() {
  const [allPost, setAllPost] = useState();
  useEffect(() => {
    getPosts().then((snap) => setAllPost(sortDate(snap)));
  }, []);

  function sortDate(list) {
    const sorted_list = [...list].sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sorted_list;
  }

  return (
    <>
      <table className="mt-6 w-full">
        <thead>
          <tr className="border-collapse border-b-gray-500 border-b">
            <th className="w-10  py-3">번호</th>
            <th className="w-100">제목</th>
            <th>이메일</th>
            <th>날짜</th>
          </tr>
        </thead>
        {allPost?.map((post, index) => (
          <Post
            key={post.postId}
            post={post}
            index={index}
            allPostLength={allPost.length}
          />
        ))}
      </table>
    </>
  );
}
