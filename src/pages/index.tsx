import CrudLocal from "@/components/crudLocal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex  flex-col items-center justify-center p-2 ${inter.className}`}>
      <div className="flex flex-col justify-center w-full px-6">
        <h2 className="font-bold w-full text-center text-2xl underline underline-offset-4">
          CRUD Operation
        </h2>
        <CrudLocal />
      </div>
    </main>
  );
}
