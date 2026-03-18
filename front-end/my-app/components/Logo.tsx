import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center w-full py-6">
      <Image 
        src="/img/LogoProtoServ.png"
        alt="Logo ProtoServ"
        width={400} //prré carregamento
        height={300}
        className="w-[400px] h-auto object-contain"
      />
    </div>
  );
}
