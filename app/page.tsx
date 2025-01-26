import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Aqui posso chamar uma variavel sensivel do banco pois isso roda no servidor É UM SERVER COMPONENT
//.precess.env.DATABASE_URL

const Home = async () => {
  // se usuario nao logado redirecione para o login
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return;
};

export default Home;
