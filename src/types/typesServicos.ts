export interface CategoriaServico {
  id: string;
  name: string;
  slug: string;
  createdAt: string; // Ou `Date` se você fizer a conversão
  updatedAt: string; // Ou `Date` se você fizer a conversão
}

export type CategoriaServicoArray = CategoriaServico[];
