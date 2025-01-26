import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

// Aqui posso chamar uma variavel sensivel do banco pois isso roda no servidor É UM SERVER COMPONENT
//.precess.env.DATABASE_URL

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return <Navbar />;
};

export default Home;
