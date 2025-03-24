import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  // se usuario nao logado redirecione para o login
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
};

export default SubscriptionPage;
