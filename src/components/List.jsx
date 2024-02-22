import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPost } from "../api/firebase";

export default function List() {
  const [allPost, setAllPost] = useState();
  useEffect(() => {
    getPost().then((snap) => setAllPost(snap));
  }, []);
  allPost && console.log(sortDate(allPost));

  function sortDate(list) {
    const sorted_list = list
      .sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reverse();
    return sorted_list;
  }

  return (
    <div>
      <ul>
        {allPost?.map((post) => (
          <Post key={post.uuid} post={post} />
        ))}
      </ul>
    </div>
  );
}
