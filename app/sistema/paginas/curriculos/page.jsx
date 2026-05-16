
"use client";
import { useState } from "react";
import Link from "next/link";
import { curriculos } from "@/data/curriculos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch, FiPlus, FiUser } from "react-icons/fi";

export default function ListaCurriculos() {
  const [busca, setBusca] = useState("");

  const filtrados = curriculos.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Currículos</h1>
        <Link href="/sistema/paginas/curriculos/novo">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white flex gap-2">
            <FiPlus /> Novo Currículo
          </Button>
        </Link>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-slate-400" />
        <Input
          placeholder="Buscar por nome ou cargo..."
          className="pl-9"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-slate-500 py-12">Nenhum currículo encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map(c => (
            <Link key={c.id} href={`/sistema/paginas/curriculos/${c.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <FiUser size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{c.nome}</CardTitle>
                    <p className="text-sm text-purple-600">{c.cargo}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 line-clamp-3">{c.resumo}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}