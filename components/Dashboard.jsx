"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Dashboard() {
    const {data:session} = useSession();
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
                <div>
                    الاسم :{" "}
                    <span className="font-bold">{session?.user?.name}</span>
                </div>
                <div>
                    اسم المستخدم : <span className="font-bold">{session?.user?.username}</span>
                </div>
                <div>
                    البريد :{" "}
                    <span className="font-bold">{session?.user?.email}</span>
                </div>
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
                >
                    تسجيل الخروج
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
