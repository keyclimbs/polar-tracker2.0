"use client";

import { useState } from "react";
import { Activity, Bell, ChevronLeft, ChevronRight, Settings, Watch } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { getDemoData } from "@/lib/demo";

const tabs = ["Today", "Sleep", "Recovery", "Training", "Trends"];

function Gauge({ value, label, color, max = 100, suffix = "%" }: { value: number; label: string; color: string; max?: number; suffix?: string }) {
  const progress = Math.min(100, (value / max) * 100);
  return <div className="gauge" style={{ "--progress": `${progress * 3.6}deg`, "--gauge": color } as React.CSSProperties}><div className="gauge-inner"><strong>{value}{suffix}</strong><span>{label}</span></div></div>;
}

export default function Home() {
  const [active, setActive] = useState("Today");
  const [dayIndex, setDayIndex] = useState(29);
  const data = getDemoData();
  const day = data[dayIndex];
  return (
    <main className="shell">
      <aside>
        <div className="brand"><span className="brand-mark"><Activity size={20}/></span><span>PEAKDAY</span></div>
        <nav>{tabs.map(tab => <button key={tab} className={active === tab ? "nav-active" : ""} onClick={() => setActive(tab)}><Activity size={16}/>{tab}</button>)}</nav>
        <a className="settings" href="/settings"><Settings size={17}/>Settings & data</a>
        <div className="profile"><div className="avatar">KC</div><div><b>keyclimbs</b><small>Polar Ignite 3</small></div></div>
      </aside>
      <section className="content">
        <header><div><p className="eyebrow">MONDAY · NOVEMBER 23</p><h1>{active === "Today" ? "Good morning" : active}</h1></div><div className="header-actions"><span className="synced"><i/>Synced 2m ago</span><button aria-label="Notifications"><Bell size={18}/></button></div></header>
        {active === "Today" && <>
          <div className="date-row"><button onClick={() => setDayIndex(Math.max(0, dayIndex - 1))}><ChevronLeft size={17}/></button><span>{day.date}</span><button onClick={() => setDayIndex(Math.min(data.length - 1, dayIndex + 1))}><ChevronRight size={17}/></button></div>
          <div className="gauges">
            <article className="metric-card"><Gauge value={day.recovery} label="Recovery" color="#2ea043"/><div className="provenance">Native Polar</div></article>
            <article className="metric-card"><Gauge value={day.strain} label="Day Strain" color="#8b78f6" max={21} suffix=""/><div className="provenance">Derived Algorithm</div></article>
            <article className="metric-card"><Gauge value={day.sleepScore} label="Sleep" color="#d29922"/><div className="provenance">Native Polar</div></article>
          </div>
          <div className="grid">
            <article className="panel"><div className="panel-title"><div><p>OVERNIGHT</p><h3>HRV & resting heart rate</h3></div><span>{day.hrv} ms</span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={data.slice(-14)}><XAxis dataKey="date" hide/><Tooltip/><Line type="monotone" dataKey="hrv" stroke="#58b4ff" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div></article>
            <article className="panel"><div className="panel-title"><div><p>WORKOUT</p><h3>Latest session</h3></div></div>{day.sport ? <div className="workout"><div className="sport-icon"><Watch size={19}/></div><div><b>{day.sport}</b><small>{dayIndex % 2 ? "52" : "68"} min · {day.strain} strain</small></div>{day.srpe && <em>{day.srpe} AU</em>}</div> : <div className="empty">Rest day · No workout recorded</div>}<div className="provenance">{day.srpe ? "Manual Log" : "No workout"}</div></article>
          </div>
        </>}
        {active !== "Today" && <div className="panel view-panel"><h2>{active} overview</h2><p>30-day demo data</p><div className="chart tall"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="date" hide/><Tooltip/><Line type="monotone" dataKey={active === "Sleep" ? "sleepScore" : active === "Training" ? "strain" : "recovery"} stroke="#58b4ff" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div></div>}
      </section>
      <style jsx>{`
        .shell{min-height:100vh;display:grid;grid-template-columns:220px 1fr;background:#090d12}.brand{height:82px;display:flex;align-items:center;gap:10px;padding:0 22px;font-size:14px;font-weight:800;letter-spacing:.12em}.brand-mark{width:34px;height:34px;border-radius:9px;background:#d7ff5f;color:#111;display:grid;place-items:center}.brand span:last-child{color:#e9edf2}
        aside{border-right:1px solid #20262d;display:flex;flex-direction:column}nav{padding:10px 12px;display:grid;gap:4px}nav button,.settings{border:0;background:transparent;color:#87909b;padding:10px 12px;border-radius:8px;display:flex;align-items:center;gap:11px;cursor:pointer;text-align:left;text-decoration:none}nav button svg{display:none}.nav-active{background:#171d23!important;color:#edf2f7!important}.settings{margin:auto 12px 14px}.profile{border-top:1px solid #20262d;padding:14px 16px;display:flex;gap:10px;align-items:center}.profile b,.profile small{display:block}.profile small{color:#747f8a;margin-top:3px}.avatar{width:34px;height:34px;border-radius:50%;background:#2a343d;display:grid;place-items:center;font-size:12px}
        .content{padding:28px 38px 40px;max-width:1250px;width:100%;margin:auto}header{display:flex;justify-content:space-between;align-items:center}.eyebrow{margin:0 0 5px;color:#747f8a;font-size:11px;font-weight:700}.header-actions{display:flex;align-items:center;gap:12px}.header-actions button{width:36px;height:36px;border:1px solid #252d35;border-radius:8px;background:#11161b;color:#aab3bd}.synced{font-size:12px;color:#8d98a3}.synced i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#2ea043;margin-right:7px}h1{font-size:27px;margin:0}.date-row{display:flex;justify-content:flex-end;align-items:center;gap:9px;color:#9aa4ae;font-size:13px;margin:18px 0}.date-row button{border:1px solid #252d35;background:#11161b;color:#8d98a3;width:29px;height:29px;border-radius:7px;display:grid;place-items:center}
        .gauges{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.metric-card,.panel{background:#11161b;border:1px solid #20262d;border-radius:12px}.metric-card{height:230px;display:grid;place-items:center;position:relative}.gauge{width:150px;height:150px;border-radius:50%;background:conic-gradient(var(--gauge) var(--progress),#252d35 0);display:grid;place-items:center}.gauge-inner{width:128px;height:128px;border-radius:50%;background:#11161b;display:flex;flex-direction:column;align-items:center;justify-content:center}.gauge-inner strong{font-size:30px}.gauge-inner span{color:#87909b;font-size:12px;margin-top:5px}.provenance{position:absolute;bottom:10px;right:12px;border:1px solid #303842;border-radius:99px;color:#8d98a3;font-size:9px;text-transform:uppercase;letter-spacing:.07em;padding:4px 7px}
        .grid{display:grid;grid-template-columns:1.55fr 1fr;gap:14px;margin-top:14px}.panel{height:235px;padding:18px}.panel-title{display:flex;justify-content:space-between}.panel-title p{margin:0;color:#747f8a;font-size:9px;letter-spacing:.12em}.panel-title h3{margin:5px 0;font-size:14px}.panel-title>span{color:#58b4ff;font-weight:700}.chart{height:150px}.workout{display:flex;align-items:center;margin-top:24px;gap:12px}.sport-icon{width:42px;height:42px;border-radius:10px;background:#1b2330;color:#58b4ff;display:grid;place-items:center}.workout b,.workout small{display:block}.workout small{color:#87909b;margin-top:4px}.workout em{margin-left:auto;color:#d29922;font-style:normal;font-size:12px}.empty{margin-top:30px;color:#87909b}.view-panel{height:520px;margin-top:18px}.view-panel h2{margin:0}.view-panel p{color:#87909b}.tall{height:420px}
        @media(max-width:800px){.shell{grid-template-columns:1fr}.shell aside{position:fixed;z-index:20;bottom:0;width:100%;height:64px;border-top:1px solid #20262d;border-right:0;background:#0d1217}.brand,.profile,.settings{display:none}.shell nav{height:64px;display:grid;grid-template-columns:repeat(5,1fr);padding:7px}.shell nav button{justify-content:center;padding:5px}.shell nav button svg{display:block}.content{padding:18px 14px 90px}.gauges{grid-template-columns:1fr}.metric-card{height:190px}.grid{grid-template-columns:1fr}.header-actions .synced{display:none}}
      `}</style>
    </main>
  );
}
