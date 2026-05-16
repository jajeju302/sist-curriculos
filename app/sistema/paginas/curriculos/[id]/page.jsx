"use client";
import { curriculos } from "@/data/curriculos";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiArrowLeft, FiMail, FiPhone, FiUser, FiBriefcase, FiBook } from "react-icons/fi";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DetalhesCurriculo() {
  const { id } = useParams();
  const c = curriculos.find(c => c.id === id);

  if (!c) return <p className="text-center text-slate-500 py-12">Currículo não encontrado.</p>;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <Link href="/sistema/paginas/curriculos">
        <Button variant="outline" className="flex gap-2 w-fit">
          <FiArrowLeft /> Voltar
        </Button>
      </Link>

      
      <div className="bg-white rounded-xl p-6 shadow flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
          <FiUser size={36} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{c.nome}</h1>
          <p className="text-purple-600 font-medium">{c.cargo}</p>
          <div className="flex gap-4 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1"><FiMail />{c.email}</span>
            <span className="flex items-center gap-1"><FiPhone />{c.telefone}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Resumo Profissional</h2>
        <p className="text-slate-600">{c.resumo}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><FiBriefcase />Experiências</h2>
        {c.experiencias.map((e, i) => (
          <div key={i} className="border-l-2 border-purple-200 pl-4 mb-4">
            <p className="font-semibold text-slate-800">{e.cargo} — {e.empresa}</p>
            <p className="text-sm text-slate-500">{e.inicio} até {e.fim}</p>
            <p className="text-sm text-slate-600 mt-1">{e.descricao}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><FiBook />Formações</h2>
        {c.formacoes.map((f, i) => (
          <div key={i} className="border-l-2 border-purple-200 pl-4 mb-4">
            <p className="font-semibold text-slate-800">{f.curso}</p>
            <p className="text-sm text-slate-500">{f.instituicao} — {f.inicio} até {f.fim}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Habilidades</h2>
        <div className="flex flex-wrap gap-2">
          {c.habilidades.map((h, i) => (
            <Badge key={i} className="bg-purple-100 text-purple-700 hover:bg-purple-200">{h}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
