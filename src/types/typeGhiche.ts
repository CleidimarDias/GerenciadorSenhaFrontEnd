export interface Guiche {
  id: string;
  name: string;
  reparticaoId: string;
  createdAt: string; // Ou Date se você for converter
  updatedAt: string; // Ou Date se você for converter
}

export interface ReparticaoComGuiches {
  guiches: Guiche[];
}

// A interface para a resposta completa do backend
export type BackendResponseGuicheProps = ReparticaoComGuiches[];
