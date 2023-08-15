"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter()

    const handleSubmit = async (e)=> {
        e.preventDefault()

        try {
            const response = await signIn('credentials', {
                username, password, redirect: false
            })
            if(response.error){
                setError('اسم المستخدم أو كلمة المرور غير صحيحة!')
                return;
            }
            router.replace('dashboard')
        } catch (error) {
            setError(`حدث مشكلة أثناء الاتصال ${error}`)
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">أدخل بيانات الدخول</h1>
                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="اسم المستخدم"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name=""
                        id=""
                        placeholder="كلمة المرور"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        تسجيل الدخول
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 w-fit">
                            {error}
                        </div>
                    )}

                    <Link
                        className="text-sm mt-3 text-right"
                        href={"/register"}
                    >
                        ليس لديك حساب ؟{" "}
                        <span className="underline">انشاء حساب</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
