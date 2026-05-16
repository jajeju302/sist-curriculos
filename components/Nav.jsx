"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Início" },
    { href: "/sistema/paginas/curriculos", label: "Currículos" },
  ];
  return (
    <nav className="flex gap-4">
      {links.map(link => (
        <Link key={link.href} href={link.href}
          className={pathname === link.href
            ? "font-bold underline"
            : "opacity-70 hover:opacity-100"}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}