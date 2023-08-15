"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function RegisterForm() {
    const router = useRouter()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name?.trim() || !email?.trim() || !username?.trim() || !password?.trim()){
            setError('جميع الحقول مطلوبة')
            setTimeout(()=> setError(''), 3000)
            return
        }
        try {
            const response = await fetch('api/register',{
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({name, email, username, password})
            })
            if(response.ok){
                const form = e.target
                form.reset()
                router.push('/login')
            }else{
                setError('خطأ بإنشاء المستخدم')
            }
        } catch (error) {
            setError(`خطأ بإنشاء المستخدم ${error}`)
            
        }
    }
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">انشاء حساب جديد</h1>
                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="اسم الرباعي"
                        onChange={(e)=> setName(e.target.value)}
                    />
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="البريد الإلكتروني"
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="اسم المستخدم"
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name=""
                        id=""
                        placeholder="كلمة المرور"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        انشاء الحساب
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 w-fit">
                            {error}
                        </div>
                    )}

                    <Link className="text-sm mt-3 text-right" href={"/login"}>
                        لدي حساب مسبقاً{" "}
                        <span className="underline">تسجيل الدخول</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
