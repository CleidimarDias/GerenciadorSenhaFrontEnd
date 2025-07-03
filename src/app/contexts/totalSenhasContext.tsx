"use client";
import { createContext, useContext, useState } from "react";

type totalSenhasProps = {
  total: number;
};

interface totalSenhasContextType {
  totalSenhas: totalSenhasProps[] | null;
  settotalSenhas: (dadostotalSenhas: totalSenhasProps[] | null) => void;
}

export const totalSenhasContext = createContext<totalSenhasContextType | null>(
  null
);

export function TotalSenhasProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [totalSenhas, settotalSenhas] = useState<totalSenhasProps[] | null>(
    null
  );

  return (
    <totalSenhasContext.Provider value={{ settotalSenhas, totalSenhas }}>
      {children}
    </totalSenhasContext.Provider>
  );
}

export const UsetotalSenhas = (): totalSenhasContextType => {
  const context = useContext(totalSenhasContext);
  if (!context) {
    throw new Error(
      "usetotalSenhas deve ser usado dentro de um totalSenhasProvider"
    );
  }
  return context;
};
