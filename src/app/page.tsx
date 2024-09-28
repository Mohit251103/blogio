import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const handleSignin = async () => {
    "use server"
    await signIn();
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
      <form action={handleSignin}>
        <Button type="submit"></Button>
      </form>
    </div>
  );
}
