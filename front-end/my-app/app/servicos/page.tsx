import Sidebar from "@/components/Sidebar";

export default function Servicos() {
  return (
    <main className="flex h-screen">
      
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Página de Serviços</h1>
        <p>Aqui vão ficar os serviços disponíveis</p>
      </div>

    </main>
  );
}