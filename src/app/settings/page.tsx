export default function SettingsPage() {
  return (
    <main className="settings-page">
      <a href="/">← Dashboard</a>
      <h1>Settings & data</h1>
      <section><h2>Polar connection</h2><p>Connect an Ignite 3 or another compatible Polar device through AccessLink v3.</p><a className="connect" href="/api/polar/authorize">Connect Polar</a></section>
      <section><h2>Demo Mode</h2><label><input type="checkbox" defaultChecked/> Use deterministic 30-day demo data</label><p>Demo data is isolated and never sent to Polar.</p></section>
      <section><h2>Preferences</h2><label>Sleep target <input type="number" defaultValue={8} min={1} max={12}/> hours</label><label>Resting HR <input type="number" defaultValue={50}/> bpm</label><label>Maximum HR <input type="number" defaultValue={190}/> bpm</label></section>
      <section><h2>Data export</h2><button>Export JSON</button><button>Export CSV</button></section>
      <style>{`body{background:#090d12}.settings-page{max-width:720px;margin:auto;padding:48px 24px;color:#e8edf2}.settings-page>a{color:#58b4ff;text-decoration:none}.settings-page h1{margin:22px 0}.settings-page section{background:#11161b;border:1px solid #20262d;border-radius:12px;padding:20px;margin:12px 0}.settings-page section h2{margin-top:0;font-size:16px}.settings-page section p,.settings-page label{color:#98a2ac}.settings-page label{display:block;margin:12px 0}.settings-page input{background:#090d12;border:1px solid #303842;color:#fff;border-radius:6px;padding:7px;margin-left:8px}.connect,.settings-page button{display:inline-block;background:#d7ff5f;color:#111;text-decoration:none;border:0;border-radius:7px;padding:9px 12px;font-weight:700;margin-right:8px}`}</style>
    </main>
  );
}
