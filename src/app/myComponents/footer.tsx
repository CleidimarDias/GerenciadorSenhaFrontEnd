"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#1270b7] h-30 flex justify-center items-center    p-5  w-screen ">
      <Image
        // src="https://www.anapolis.go.gov.br/wp-content/themes/prefeitura-anapolis/assets/images//monumentos-anapolis.png"
        src="/logo-prefeitura.png"
        alt="logo"
        height={100}
        width={140}
        className="t-white b absolute"
      />
    </div>
  );
}
