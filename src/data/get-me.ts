// src/data/get-me.ts
export const getMe = async (token: string) => {
  try {
    const res = await fetch("http://localhost:3001/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Não autorizado");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar o usuário autenticado:", error);
    return null;
  }
};
