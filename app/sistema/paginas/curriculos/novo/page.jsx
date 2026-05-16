"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { curriculos } from "@/data/curriculos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FiPlus, FiTrash2, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { IMaskInput } from "react-imask";

import { useState } from "react";
import { FiUpload } from "react-icons/fi";

const schema = yup.object({
  nome: yup.string().min(3, "Nome muito curto").required("Nome obrigatório"),
  cargo: yup.string().min(3, "Cargo muito curto").required("Cargo obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  telefone: yup.string().min(14, "Telefone inválido").required("Telefone obrigatório"),
  cpf: yup.string().min(14, "CPF inválido").required("CPF obrigatório"),
  resumo: yup.string().min(20, "Resumo muito curto (mín. 20 caracteres)").required("Resumo obrigatório"),
  experiencias: yup.array().of(yup.object({
    empresa: yup.string().required("Empresa obrigatória"),
    cargo: yup.string().required("Cargo obrigatório"),
    inicio: yup.string().min(7, "Data inválida").required("Início obrigatório"),
    fim: yup.string().required("Fim obrigatório"),
    descricao: yup.string().required("Descrição obrigatória"),
  })),
  formacoes: yup.array().of(yup.object({
    instituicao: yup.string().required("Instituição obrigatória"),
    curso: yup.string().required("Curso obrigatório"),
    inicio: yup.string().min(7, "Data inválida").required("Início obrigatório"),
    fim: yup.string().required("Fim obrigatório"),
  })),
  habilidades: yup.string().required("Habilidades obrigatórias"),
});

function MaskedInput({ mask, value, onChange, placeholder, className }) {
  return (
    <IMaskInput
      mask={mask}
      value={value || ""}
      onAccept={onChange}
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className || ""}`}
    />
  );
}

export default function NovoCurriculo() {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

const handleFoto = (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setPreview(url);
  }
};
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      experiencias: [{ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" }],
      formacoes: [{ instituicao: "", curso: "", inicio: "", fim: "" }],
    }
  });

  const { fields: expFields, append: addExp, remove: removeExp } = useFieldArray({ control, name: "experiencias" });
  const { fields: formFields, append: addForm, remove: removeForm } = useFieldArray({ control, name: "formacoes" });

  const onSubmit = (data) => {
    const novo = {
      ...data,
      id: String(Date.now()),
      foto: "/fotos/default.jpg",
      habilidades: data.habilidades.split(",").map(h => h.trim()),
    };
    curriculos.push(novo);
    toast.success("Currículo cadastrado!", { description: "Redirecionando para a lista..." });
    router.push("/sistema/paginas/curriculos");
  };

  const onError = (erros) => {
    const primeiro = Object.values(erros).flat()[0];
    toast.error("Erro ao salvar", { description: primeiro?.message || "Preencha todos os campos obrigatórios" });
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <Link href="/sistema/paginas/curriculos">
        <Button variant="outline" className="flex gap-2 w-fit"><FiArrowLeft />Voltar</Button>
      </Link>
      <h1 className="text-3xl font-bold text-slate-900">Novo Currículo</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-6">

        
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
          <h2 className="text-lg font-bold text-slate-900">Dados Pessoais</h2>
          <div className="flex items-center gap-6">
  <div className="w-24 h-24 rounded-full bg-purple-100 border-2 border-purple-300 flex items-center justify-center overflow-hidden">
    {preview ? (
      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
    ) : (
      <FiUpload size={28} className="text-purple-400" />
    )}
  </div>
  <div>
    <Label>Foto de Perfil</Label>
    <input
      type="file"
      accept="image/*"
      onChange={handleFoto}
      className="block mt-1 text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer"
    />
    <p className="text-xs text-slate-400 mt-1">JPG, PNG até 5MB (apenas preview)</p>
  </div>
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome *</Label>
              <Input {...register("nome")} placeholder="Nome completo" maxLength={80} />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
            </div>
            <div>
              <Label>Cargo Desejado *</Label>
              <Input {...register("cargo")} placeholder="Ex: Desenvolvedor Front-end" maxLength={60} />
              {errors.cargo && <p className="text-red-500 text-xs mt-1">{errors.cargo.message}</p>}
            </div>
            <div>
              <Label>E-mail *</Label>
              <Input {...register("email")} placeholder="email@exemplo.com" type="email" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            
            <div>
              <Label>Telefone *</Label>
              <Controller name="telefone" control={control} render={({ field }) => (
                <MaskedInput mask="(00) 00000-0000" value={field.value} onChange={field.onChange} placeholder="(47) 99999-9999" />
              )} />
              {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>}
            </div>

            
            <div>
              <Label>CPF *</Label>
              <Controller name="cpf" control={control} render={({ field }) => (
                <MaskedInput mask="000.000.000-00" value={field.value} onChange={field.onChange} placeholder="000.000.000-00" />
              )} />
              {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf.message}</p>}
            </div>
          </div>

          <div>
            <Label>Resumo Profissional * <span className="text-slate-400 text-xs">(mín. 20 caracteres)</span></Label>
            <Textarea {...register("resumo")} placeholder="Fale sobre sua experiência, objetivos e diferenciais..." rows={4} maxLength={500} />
            {errors.resumo && <p className="text-red-500 text-xs mt-1">{errors.resumo.message}</p>}
          </div>
        </div>

        
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Experiências Profissionais</h2>
            <Button type="button" variant="outline" className="flex gap-2"
              onClick={() => addExp({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" })}>
              <FiPlus />Adicionar
            </Button>
          </div>
          {expFields.map((field, i) => (
            <div key={field.id} className="border rounded-lg p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-slate-700">Experiência {i + 1}</p>
                {expFields.length > 1 && (
                  <Button type="button" variant="ghost" className="text-red-500" onClick={() => removeExp(i)}>
                    <FiTrash2 />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Empresa *</Label>
                  <Input {...register(`experiencias.${i}.empresa`)} placeholder="Nome da empresa" />
                  {errors.experiencias?.[i]?.empresa && <p className="text-red-500 text-xs mt-1">{errors.experiencias[i].empresa.message}</p>}
                </div>
                <div>
                  <Label>Cargo *</Label>
                  <Input {...register(`experiencias.${i}.cargo`)} placeholder="Seu cargo" />
                  {errors.experiencias?.[i]?.cargo && <p className="text-red-500 text-xs mt-1">{errors.experiencias[i].cargo.message}</p>}
                </div>
                <div>
                  <Label>Início *</Label>
                  <Controller name={`experiencias.${i}.inicio`} control={control} render={({ field }) => (
                    <MaskedInput mask="00/0000" value={field.value} onChange={field.onChange} placeholder="MM/AAAA" />
                  )} />
                </div>
                <div>
                  <Label>Fim *</Label>
                  <Input {...register(`experiencias.${i}.fim`)} placeholder="MM/AAAA ou atual" />
                </div>
              </div>
              <div>
                <Label>Descrição *</Label>
                <Textarea {...register(`experiencias.${i}.descricao`)} placeholder="O que você fazia nessa empresa..." rows={2} />
              </div>
            </div>
          ))}
        </div>

        
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Formações Acadêmicas</h2>
            <Button type="button" variant="outline" className="flex gap-2"
              onClick={() => addForm({ instituicao: "", curso: "", inicio: "", fim: "" })}>
              <FiPlus />Adicionar
            </Button>
          </div>
          {formFields.map((field, i) => (
            <div key={field.id} className="border rounded-lg p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-slate-700">Formação {i + 1}</p>
                {formFields.length > 1 && (
                  <Button type="button" variant="ghost" className="text-red-500" onClick={() => removeForm(i)}>
                    <FiTrash2 />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Instituição *</Label>
                  <Input {...register(`formacoes.${i}.instituicao`)} placeholder="Nome da instituição" />
                  {errors.formacoes?.[i]?.instituicao && <p className="text-red-500 text-xs mt-1">{errors.formacoes[i].instituicao.message}</p>}
                </div>
                <div>
                  <Label>Curso *</Label>
                  <Input {...register(`formacoes.${i}.curso`)} placeholder="Nome do curso" />
                  {errors.formacoes?.[i]?.curso && <p className="text-red-500 text-xs mt-1">{errors.formacoes[i].curso.message}</p>}
                </div>
                <div>
                  <Label>Início *</Label>
                  <Controller name={`formacoes.${i}.inicio`} control={control} render={({ field }) => (
                    <MaskedInput mask="00/0000" value={field.value} onChange={field.onChange} placeholder="MM/AAAA" />
                  )} />
                </div>
                <div>
                  <Label>Fim *</Label>
                  <Input {...register(`formacoes.${i}.fim`)} placeholder="MM/AAAA ou cursando" />
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
          <h2 className="text-lg font-bold text-slate-900">Habilidades</h2>
          <div>
            <Label>Habilidades * <span className="text-slate-400 text-xs">(separe por vírgula)</span></Label>
            <Input {...register("habilidades")} placeholder="Ex: React, Node.js, Figma, Photoshop" />
            {errors.habilidades && <p className="text-red-500 text-xs mt-1">{errors.habilidades.message}</p>}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}
          className="bg-purple-500 hover:bg-purple-900 disabled:opacity-50 text-white w-full py-6 text-lg">
          {isSubmitting ? "Salvando..." : "Salvar Currículo"}
        </Button>
      </form>
    </div>
  );
}