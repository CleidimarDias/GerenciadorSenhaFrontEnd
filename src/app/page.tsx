"use client";

import { useUser } from "./contexts/AuthContext";

//import { useUser } from "./contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useUser();

  console.log(isAuthenticated);
  // if (isAuthenticated) {
  return <div className="h-dvh text-black">PÁGINA HOMEs</div>;
  // } else {
  //   redirect("/bla/login");
  // }
}
