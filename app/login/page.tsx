import Image from "next/image";
import { Button } from "../_components/ui/button";
import {LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const LoginPage = async () => {
    
    const{userId} = await auth();
    if(userId) {
        redirect('/')
    }
    return (
        <div className="grid h-full grid-cols-2">
            {/*ESQUERDA*/}
            <div className="mx-auto flex flex-col h-full justify-center p-8  max-w-[550px]">
             <Image src="/logoEllis.svg" width={175} height={39} alt="Finance Ellis" className="mb-8"/>
                <h1 className="text-4xl font-bold mb-3" >Bem Vindo</h1>
                <p className="text-muted-foreground mb-8">
                    A Finance Ellis AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.
                </p>

                <SignInButton>
                <Button variant="outline">
                    <LogInIcon mr-2/>
                     Fazer login ou criar conta
                </Button>
                </SignInButton>

            </div>
            {/*DIREITA*/}
            <div className="relative h-full w-full">
    
                <Image src="/login.png" alt="Faça Login" fill className="object-cover"             
                    />
            </div>
        </div>

    );
    
};
 
export default LoginPage;