import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange, login, logout } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    status: "네트워크 통신중",
    userInfo: undefined,
  });

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(
        user
          ? { status: "login완료", userInfo: user }
          : { status: "login비완료" }
      );
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userLoginStatus: user.status,
        userInfo: user.userInfo,
        uid: user && user.uid,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
