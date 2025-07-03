import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-[#1270b7] md:h-[100px] h-[100px] min-w-screen md:max-w-screen flex justify-between items-center p-5 ">
      <Image
        src="/logo-prefeitura.png"
        alt="logo"
        height={100}
        width={180}
        className=" "
      />
      <h3 className="text-white text-3xl font-semibold mr-10 hidden md:block  ">
        Gerênciador de Senhass
      </h3>
    </div>
  );
}
