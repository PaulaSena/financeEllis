import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  // se usuario nao logado redirecione para o login
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return <Navbar />;
};

export default SubscriptionPage;
