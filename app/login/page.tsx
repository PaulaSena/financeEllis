import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-2">
      {/*ESQUERDA*/}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logoEllis.svg"
          width={185}
          height={49}
          alt="Finance Ellis"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem Vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance Ellis AI é uma plataforma de gestão financeira que utiliza
          IA para monitorar suas movimentações, e oferecer insights
          personalizados, facilitando o controle do seu orçamento.
        </p>

        <SignInButton>
          <Button variant="outline">
            <LogInIcon mr-2 />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/*DIREITA*/}
      <div className="relative h-full w-full">
        <Image
          src="/login.jpeg"
          alt="Faça Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
