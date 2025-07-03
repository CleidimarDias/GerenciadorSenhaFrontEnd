"use client";
import { createContext, useContext, useState } from "react";

type guicheProps = {
  name: string;
  id: string;
};

interface GuicheContextType {
  guiche: guicheProps | null;
  setGuiche: (dadosGuiche: guicheProps | null) => void;
}

export const GuicheContext = createContext<GuicheContextType | null>(null);

export function GuicheProvider({ children }: { children: React.ReactNode }) {
  const [guiche, setGuiche] = useState<guicheProps | null>(null);

  return (
    <GuicheContext.Provider value={{ setGuiche, guiche }}>
      {children}
    </GuicheContext.Provider>
  );
}

export const useGuiche = (): GuicheContextType => {
  const context = useContext(GuicheContext);
  if (!context) {
    throw new Error("useGuiche deve ser usado dentro de um GuicheProvider");
  }
  return context;
};
