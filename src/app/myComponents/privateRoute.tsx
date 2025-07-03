// src/components/PrivateRoute.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/contexts/AuthContext";

// interface slugProps {
//   params: {slug: string}

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/sine/login"); // redireciona se não estiver logado
    }
  }, [isAuthenticated, router, loading]);

  if (loading) return <div>Carregando...</div>;

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
