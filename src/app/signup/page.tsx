"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();

  const [message,setMessage] = useState("");
  const [userName,setUserName] = useState("");
  const [lastName,setLastName] = useState("");
  const [firstName,setFirstName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const signup = async (e) =>{
    e.preventDefault();
    setMessage("");

    try{
      const res = await fetch("http://localhost:8080/api/auth/sign-up",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({userName:userName,fullName:lastName + " " + firstName,email:email,password:password}),
      })
      if(!res.ok){
        const err = await res.json();
        throw new Error(err.message || "エラーが発生しました");
      }
      router.push("/login");
    }catch(err:any){
      setMessage(`失敗しました： ${err.message}`);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {message && (
        <div>{message}</div>
      )}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">サインアップ</h2>
        <form onSubmit={signup}>
          <label className="block mb-2">ユーザー名</label>
          <input type="text" className="w-full border rounded p-2 mb-4" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <label className="block mb-2">フルネーム</label>
          <div className="flex gap-4">
            <input type="text" className="w-full border rounded p-2 mb-4" placeholder="姓" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <input type="text" className="w-full border rounded p-2 mb-4" placeholder="名" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <label className="block mb-2">メールアドレス</label>
          <input type="email" className="w-full border rounded p-2 mb-4" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label className="block mb-2">パスワード</label>
          <input type="password" className="w-full border rounded p-2 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white p-2 rounded">サインアップする</button>
        </form>
      </div>
    </div>
  );
}
