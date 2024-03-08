import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function addPost(userInfo, post, date) {
  const id = uuidv4();
  set(ref(database, `/posts/${id}`), {
    ...post,
    postId: id,
    title: post.title,
    content: post.content,
    userId: userInfo.uid,
    email: userInfo.email,
    date: date,
  });
}

// export async function getPost() {
//   const gets = await get(ref(database, "user"));
//   return gets.val();
// }

export async function getPosts() {
  const dbRef = ref(database, "posts");
  return get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getPost(postId) {
  const dbRef = ref(database, `posts/${postId}`);
  return get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
}

export async function deletePost(postId) {
  return remove(ref(database, `posts/${postId}`));
}

export async function updatePost(updatedPost) {
  const updates = {};
  updates[`/posts/${updatedPost.postId}`] = updatedPost;
  return update(ref(database), updates);
}
