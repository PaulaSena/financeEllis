"use client";

import Image from "next/image";
import Link from "next/link";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between border-b border-solid fill-purple-400 p-4 px-8 py-4">
      {/* Esquerda*/}
      <div className="flex items-center gap-10">
        <Image
          src="/logoEllis.svg"
          width={173}
          height={39}
          alt="Logo ElisFinances"
        />
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-green-400"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>

        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-green-400"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>

        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "font-bold text-green-400"
              : "text-muted-foreground"
          }
        >
          Assinatura
        </Link>
      </div>
      {/* direita*/}

      <UserButton showName />
    </nav>
  );
};

export default Navbar;
