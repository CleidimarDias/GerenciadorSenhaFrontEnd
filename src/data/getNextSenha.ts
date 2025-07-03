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
  const res = await fetch(
    `http://localhost:3001/senha/chamarProximaSenha/reparticaoId/${reparticaoId}/servicoId/${servicoId}/guicheId/${guicheId}/usuarioId/${userId}`
  );

  if (!res.ok) {
    throw new Error("Falha ao chamar próxima senha");
  }

  const data = res.json();
  return data;
};
