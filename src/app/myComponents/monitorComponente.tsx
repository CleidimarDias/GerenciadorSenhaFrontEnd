import React from "react";

interface MonitorProps {
  somAtivado: boolean;
}

export default function MonitorComponente({ somAtivado }: MonitorProps) {
  return (
    <div>
      <p>{somAtivado}</p>
    </div>
  );
}
