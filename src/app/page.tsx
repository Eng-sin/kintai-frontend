"use client";

import { useState } from "react";
import { useEffect} from "react";

export default function Home() {

  const [message,setMessage] = useState("");
  const [status,setStatus] = useState<any>(null);

  const handleCheckIn = async () =>{
    setMessage("");

    try{
      const res = await fetch("http://localhost:8080/api/attendance/check-in",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({userId:1}),
      })

      if(!res.ok){
        const err = await res.json();
        throw new Error(err.message || "エラーが発生しました");
      }
      await getStatus();
      setMessage("勤務を開始しました")
    } catch(err: any){
      setMessage(`失敗しました： ${err.message}`);
    }  
  };

  const handleCheckOut = async () =>{
    setMessage("");
    try{
      const res = await fetch("http://localhost:8080/api/attendance/check-out",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({userId:1}),
      });

      if(!res.ok){
        const err = await res.json();
        throw new Error(err.message || "エラーが発生しました");
      }
      await getStatus();
      setMessage("勤務を終了しました");

    } catch(err: any){
      setMessage(`失敗しました： ${err.message}`);
    }
  };

    const breakStartTime = async () =>{
    setMessage("");

    try{
      const res = await fetch("http://localhost:8080/api/attendance/break/start",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({userId:1}),
      })

      if(!res.ok){
        const err = await res.json();
        throw new Error(err.message || "エラーが発生しました");
      }
      await getStatus();
      setMessage("休憩を開始しました")
    } catch(err: any){
      setMessage(`失敗しました： ${err.message}`);
    }  
  };

  const breakEndTime = async () =>{
    setMessage("");

    try{
      const res = await fetch("http://localhost:8080/api/attendance/break/end",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({userId:1}),
      })

      if(!res.ok){
        const err = await res.json();
        throw new Error(err.message || "エラーが発生しました");
      }
      await getStatus();
      setMessage("休憩を終了しました")
    } catch(err: any){
      setMessage(`失敗しました： ${err.message}`);
    }  
  };

  const getStatus = async () =>{
      setMessage("");
      try{
        const res = await fetch("http://localhost:8080/api/attendance/status",{
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({userId:1}),
        });
        if(!res.ok){
          const err = await res.json();
          throw new Error(err.message || "エラーが発生しました");
        }
        const data = await res.json();
        setStatus(data);
        setMessage("勤務情報を取得しました");

      } catch(err: any){
        setMessage(`勤務情報の取得に失敗しました: ${err.message}`);
      }
  };

  const STATUS_LABEL : Record<string,string> = {
    "NOT_WORKING" : "未出勤",
    "WORKING" : "勤務中",
    "LEFT" : "勤務終了",
    "BREAK" : "休憩中",
    "ABSENT" : "欠勤",
  };
  
  useEffect(() => {
    getStatus();
  },[]);
  return (
    <div>
      {message && (
        <div>{message}</div>
      )}
      <div>
        <button onClick={handleCheckIn}>勤務開始</button>
      </div>
      <div>
        <button onClick={breakStartTime}>休憩開始</button>
      </div>
      <div>
        <button onClick={breakEndTime}>休憩終了</button>
      </div>  
      <div>
        <button onClick={handleCheckOut}>勤務終了</button>
      </div>
      <div>
        <button onClick={getStatus}>勤務情報取得</button>
      </div>
      {status && (
        <div>
          <ul>
            <li>ステータス：{STATUS_LABEL[status.status] || "-"}</li>
            <li>勤務開始時間：{status.checkInTime || "-"}</li>
            <li>勤務終了時間：{status.checkOutTime || "-"}</li>
            <li>休憩開始時間：{status.breakStartTime || "-"}</li>
            <li>休憩終了時間：{status.breakEndTime || "-"}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
