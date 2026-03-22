import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({
  className = "w-[250px]"
}: LogoProps) {
  return (
    <div className="flex">
      <Image 
        src="/img/LogoProtoServ.png"
        alt="Logo ProtoServ"
        width={400}
        height={300}
        className={className} // Aplica a classe passada via prop
      />
    </div>
  );
}