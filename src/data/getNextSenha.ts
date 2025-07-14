interface dadosProps {
  reparticaoId: string;
  servicoId: string;
  guicheId: string;
  userId: string;
}

export const GetNextSenha = async ({
  reparticaoId,
  servicoId,
  guicheId,
  userId,
}: dadosProps) => {
  try {
    const res = await fetch(
      //`http://localhost:3001/senha/chamarProximaSenha/reparticaoId/${reparticaoId}/servicoId/${servicoId}/guicheId/${guicheId}/usuarioId/${userId}`
      `${process.env.NEXT_PUBLIC_URL}/senha/chamarProximaSenha/reparticaoId/${reparticaoId}/servicoId/${servicoId}/guicheId/${guicheId}/usuarioId/${userId}`
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erro ao buscar próxima senha", errorData);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro na chamada da Api", error);
  }
};
