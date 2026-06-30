"use client";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import React, { useEffect } from "react";

function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null);
  
  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const res = await axios.post("/api/users", {});
    setUser(res.data?.user);
  };

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export default Provider;
