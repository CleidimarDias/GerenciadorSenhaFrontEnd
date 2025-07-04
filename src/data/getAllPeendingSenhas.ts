export const getPeendingSenhas = async (servicoId: string) => {
  // const res = await fetch(`http://localhost:3001/senha/servicoId/${servicoId}`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/senha/servicoId/${servicoId}`
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar serviços");
  }

  const data = await res.json();
  return data;
};
