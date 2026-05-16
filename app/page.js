import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiUsers, FiFileText, FiSearch, FiCheckCircle } from "react-icons/fi";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">

      <section className="text-center py-16 flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold text-slate-900">
          Gerencie Currículos com <span className="text-purple-900">Facilidade</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xl">
          Cadastre, visualize e organize currículos de candidatos em um só lugar.
        </p>
        <Link href="/sistema/paginas/curriculos">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            Ver Currículos
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <FiUsers size={28} />, titulo: "Candidatos", desc: "Gerencie todos os candidatos em um só lugar." },
          { icon: <FiFileText size={28} />, titulo: "Currículos", desc: "Visualize currículos completos com um clique." },
          { icon: <FiSearch size={28} />, titulo: "Busca Rápida", desc: "Encontre candidatos por nome ou cargo." },
          { icon: <FiCheckCircle size={28} />, titulo: "Validação", desc: "Formulários validados para dados corretos." },
        ].map((item, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="text-purple-600">{item.icon}</div>
              <CardTitle className="text-base">{item.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

    </div>
  );
}