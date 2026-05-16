import Nav from "./Nav";

export default function Header() {
  return (
    <header className="bg-purple-900 text-purple-50 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Sistema de Currículos</h1>
        <Nav />
      </div>
    </header>
  );
}
