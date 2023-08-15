import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Home() {
    return (
        <main className="grid place-items-center h-screen">
            <div className="flex flex-col">
                <Link href={"/login"} className="mb-3 border px-6 py-3 cursor-pointer hover:bg-gray-100">
                    الدخول
                </Link>
                <Link href={"/register"} className="border px-6 py-3 cursor-pointer hover:bg-gray-100" >إنشاء حساب</Link>
            </div>
        </main>
    );
}
