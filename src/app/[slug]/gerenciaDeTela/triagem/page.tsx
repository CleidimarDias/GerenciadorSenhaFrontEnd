import PrivateRoute from "@/app/myComponents/privateRoute";
import Triagem from "@/app/myComponents/triagem";

import React from "react";

interface slugProps {
  params: Promise<{ slug: string }>;
}

export default async function Recepcao({ params }: slugProps) {
  const { slug } = await params;

  return (
    <PrivateRoute>
      <div className="max-h-max ">
        <Triagem slug={slug} />
      </div>
    </PrivateRoute>
  );
}
