"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [message,setMessage] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async (e) =>{
      e.preventDefault();
      setMessage("");
  
      try{
        const res = await fetch("http://localhost:8080/api/auth/login",{
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({email:email,password:password}),
        })
        if(!res.ok){
          const err = await res.json();
          throw new Error(err.message || "エラーが発生しました");
        }
        const data = await res.json();
        localStorage.setItem("token",data.token);
        router.push("/");
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
        <h2 className="text-2xl font-bold mb-4 text-center">ログイン</h2>
        <form onSubmit={login}>
          <label className="block mb-2">メールアドレス</label>
          <input type="email" className="w-full border rounded p-2 mb-4" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label className="block mb-2">パスワード</label>
          <input type="password" className="w-full border rounded p-2 mb-4" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="w-full bg-blue-600 text-white p-2 rounded">ログイン</button>
        </form>
      </div>
    </div>
  );
}
