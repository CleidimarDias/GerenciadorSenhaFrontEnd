import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-[#1270b7] md:h-[100px] h-[100px]   flex justify-between items-center p-5 ">
      <Image
        src="/logo-prefeitura.png"
        alt="logo"
        height={110}
        width={200}
        className=" "
      />
      <h3 className=" text-3xl  text-white font-semibold mr-10 hidden md:block  ">
        Gerênciador de Senhas
      </h3>
    </div>
  );
}
