"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type Invitation = {
  bride: string; groom: string; date: string; day: string; time: string;
  ceremony: string; reception: string; quote: string; rsvp: string;
  photo: string; flowers: string; background: string; accent: string;
  font: string; layout: "portrait" | "landscape";
};

const initial: Invitation = {
  bride: "Olivia Rose", groom: "Ethan James", date: "18 · 09 · 2026",
  day: "Friday", time: "at half past four in the afternoon",
  ceremony: "The Glasshouse · Singapore", reception: "Dinner & dancing to follow",
  quote: "“Whatever our souls are made of, his and mine are the same.”",
  rsvp: "Kindly reply by 18 August · oliviaandethan.com/rsvp", photo: "",
  flowers: "Botanical", background: "#fbf8f2", accent: "#ad8952", font: "Cormorant", layout: "portrait",
};

const fieldNames: Record<string, string> = {
  bride: "Bride’s name", groom: "Groom’s name", date: "Wedding date", day: "Day",
  time: "Ceremony time", ceremony: "Ceremony venue", reception: "Reception details",
  quote: "Wedding message", rsvp: "RSVP details",
};

function Sprig({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 180 180" fill="none" aria-hidden="true">
    <path d="M12 166C45 135 68 105 92 69c16-24 34-43 66-57" stroke="#b69a6a" strokeWidth="1.2"/>
    <path d="M31 148C17 121 18 102 25 91c17 4 27 17 25 31M48 130c-2-28 7-45 18-51 14 11 17 27 9 41M68 101c5-26 18-39 31-41 10 15 8 31-3 42M91 70c13-21 29-28 41-24 4 18-4 32-19 38M118 42c18-15 34-16 44-8-1 18-11 29-27 32" fill="#d8d0bd" fillOpacity=".72" stroke="#b5a88e" strokeWidth=".8"/>
    <path d="M24 92c-8-18-4-31 6-38 13 6 18 17 13 30M52 121c-7-18-3-31 7-37 13 6 18 17 13 30M80 85c-1-18 7-29 19-32 10 9 11 21 4 32" fill="#e6dfd0" stroke="#c2b493" strokeWidth=".8"/>
    <g fill="#fffdf8" stroke="#d2c3a2" strokeWidth=".8"><circle cx="24" cy="90" r="6"/><circle cx="17" cy="83" r="4"/><circle cx="31" cy="81" r="4"/><circle cx="18" cy="96" r="4"/><circle cx="31" cy="98" r="4"/><circle cx="20" cy="89" r="2" fill="#c2a66e"/><circle cx="100" cy="59" r="5"/><circle cx="94" cy="53" r="3.5"/><circle cx="106" cy="52" r="3.5"/><circle cx="95" cy="65" r="3.5"/><circle cx="106" cy="65" r="3.5"/><circle cx="100" cy="59" r="1.8" fill="#c2a66e"/></g>
    <path d="M11 168c4-5 8-8 12-10M28 155l-1 13m114-144 13 2m-17 9 10 4" stroke="#b38d56" strokeWidth="1"/>
  </svg>;
}

function InvitationCard({ data, printRef }: { data: Invitation; printRef?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={printRef} className={`invitation ${data.layout} flower-${data.flowers.toLowerCase()} font-${data.font.toLowerCase()}`} style={{ backgroundColor: data.background, "--gold": data.accent } as React.CSSProperties}>
    <div className="invite-border"><div className="border-inner" />
      <Sprig className="sprig sprig-tl"/><Sprig className="sprig sprig-tr"/><Sprig className="sprig sprig-bl"/><Sprig className="sprig sprig-br"/>
      <div className="invite-content">
        <div className="ornament"><span>✳</span><i /></div>
        <p className="save-date">Together with their families</p>
        <p className="invite-kicker">REQUEST THE PLEASURE OF YOUR COMPANY</p>
        <h2 className="couple-name">{data.bride || "Bride’s name"}<span className="and">and</span>{data.groom || "Groom’s name"}</h2>
        <div className="thin-rule"><span>❧</span></div>
        <p className="date-label">ON {data.day.toUpperCase()}</p>
        <p className="wedding-date">{data.date || "Wedding date"}</p>
        <p className="ceremony-time">{data.time}</p>
        <p className="quote">{data.quote}</p>
        <div className="venue"><span>CEREMONY</span><strong>{data.ceremony}</strong><span>CELEBRATION TO FOLLOW</span><strong>{data.reception}</strong></div>
        {data.photo ? /* eslint-disable @next/next/no-img-element */ <img className="couple-photo" src={data.photo} alt="Couple"/> : <div className="photo-placeholder"><span>❧</span><small>A day to remember</small><span>❧</span></div>}
        <p className="rsvp-line">{data.rsvp}</p>
        <div className="bottom-mark">✦</div>
      </div>
    </div>
  </div>;
}

export default function Home() {
  const [data, setData] = useState<Invitation>(initial);
  const [activeTab, setActiveTab] = useState("Details");
  const [screen, setScreen] = useState("editor");
  const [saved, setSaved] = useState(true);
  const [toast, setToast] = useState("");
  const [savedCards, setSavedCards] = useState(1);
  const printRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const shared = window.location.hash.startsWith("#invitation=")
        ? decodeURIComponent(window.location.hash.slice("#invitation=".length))
        : null;
      const stored = shared ?? localStorage.getItem("everly-invitation");
      const count = localStorage.getItem("everly-invitations-count");
      if (stored) setData({ ...initial, ...JSON.parse(stored) });
      if (count) setSavedCards(Number(count));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const update = (key: keyof Invitation, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };
  const save = () => {
    localStorage.setItem("everly-invitation", JSON.stringify(data));
    setSaved(true); setToast("Your invitation is saved"); window.setTimeout(() => setToast(""), 2400);
  };
  const newInvitation = () => { setData(initial); setSaved(false); setScreen("editor"); };
  const imageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) { const reader = new FileReader(); reader.onload = () => update("photo", String(reader.result)); reader.readAsDataURL(file); }
  };
  const downloadPng = async () => {
    const element = printRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width * 2}" height="${rect.height * 2}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${new XMLSerializer().serializeToString(element.cloneNode(true) as Node)}</div></foreignObject></svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob); const img = new Image(); img.onload = () => {
      const canvas = document.createElement("canvas"); canvas.width = rect.width * 2; canvas.height = rect.height * 2;
      const ctx = canvas.getContext("2d"); ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url); const link = document.createElement("a"); link.download = "our-wedding-invitation.png"; link.href = canvas.toDataURL("image/png"); link.click();
    }; img.onerror = () => { URL.revokeObjectURL(url); setToast("PNG export could not render this design. Try Print / PDF."); window.setTimeout(() => setToast(""), 3500); }; img.src = url;
  };
  const share = async () => {
    const canSharePhoto = data.photo.length < 80_000;
    const payload = encodeURIComponent(JSON.stringify({ ...data, photo: canSharePhoto ? data.photo : "" }));
    const url = `${window.location.origin}${window.location.pathname}#invitation=${payload}`;
    try { await navigator.clipboard.writeText(url); setToast(canSharePhoto ? "Invitation link copied" : "Link copied. Add the photo separately for sharing."); }
    catch { setToast(url); }
    window.setTimeout(() => setToast(""), 3500);
  };

  return <main className="app-shell">
    <aside className="rail"><a className="brand-mark" href="#" aria-label="Everly home">e<span>✳</span></a><div className="rail-links">
      <button className={screen === "editor" ? "rail-active" : ""} onClick={() => setScreen("editor")} aria-label="Editor"><span>✧</span></button>
      <button className={screen === "library" ? "rail-active" : ""} onClick={() => setScreen("library")} aria-label="My invitations"><span>▤</span></button>
      <button onClick={() => setScreen("preview")} aria-label="Preview"><span>◉</span></button>
    </div><div className="rail-bottom"><button onClick={save} aria-label="Save invitation">⌑</button><div className="avatar">O</div></div></aside>

    <section className="workspace">
      <header className="topbar"><div className="crumb"><span>My invitations</span><b>/</b><strong>{screen === "library" ? "Your collection" : "Olivia & Ethan"}</strong></div>
        <div className="top-actions"><span className={`save-state ${saved ? "" : "unsaved"}`}><i/>{saved ? "All changes saved" : "Unsaved changes"}</span><button className="icon-button" title="Preview" onClick={() => setScreen("preview")}>◉</button><button className="share-button" onClick={share}>↗ <span>Share</span></button><button className="save-button" onClick={save}>Save changes</button></div>
      </header>

      {screen === "library" ? <section className="library-view"><p className="eyebrow">YOUR LITTLE COLLECTION</p><h1>My invitations</h1><p className="library-sub">Every lovely detail, all in one place.</p><div className="library-grid"><button className="new-card" onClick={newInvitation}><span>＋</span><b>Create a new invitation</b><small>Start with a fresh canvas</small></button><button className="saved-card" onClick={() => setScreen("editor")}><div className="mini-card"><span>TOGETHER WITH THEIR FAMILIES</span><strong>{data.bride}<i>and</i>{data.groom}</strong><small>{data.date}</small></div><b>Olivia & Ethan</b><small>{savedCards} {savedCards === 1 ? "design" : "designs"} · Edited just now</small></button></div></section> : screen === "preview" ? <section className="preview-page"><div className="preview-top"><div><p className="eyebrow">YOUR FINISHED DESIGN</p><h1>A little preview</h1></div><button className="back-edit" onClick={() => setScreen("editor")}>← Back to editor</button></div><InvitationCard data={data}/><div className="preview-actions"><button className="save-button" onClick={downloadPng}>↓ Download PNG</button><button className="secondary-button" onClick={() => window.print()}>▤ Print / PDF</button><button className="secondary-button" onClick={share}>↗ Share invitation</button></div></section> : <>
        <div className="editor-heading"><div><p className="eyebrow">A DAY TO REMEMBER</p><h1>Design your invitation</h1><p className="subtitle">Thoughtfully made, just like your day.</p></div><div className="heading-meta"><span>INVITATION 01</span><button onClick={() => setScreen("preview")}>Full preview ↗</button></div></div>
        <div className="editor-grid">
          <aside className="edit-panel"><div className="panel-tabs">{["Details", "Photos"].map((tab) => <button className={activeTab === tab ? "tab-active" : ""} onClick={() => setActiveTab(tab)} key={tab}>{tab}{tab === "Photos" && data.photo ? <i className="tab-dot"/> : null}</button>)}</div>
            {activeTab === "Details" ? <div className="panel-body"><p className="panel-intro">THE WORDS THAT MAKE IT YOURS<span>✧</span></p>{Object.keys(fieldNames).map((key) => <label className={`field field-${key}`} key={key}><span>{fieldNames[key]}</span>{key === "quote" || key === "rsvp" ? <textarea value={data[key as keyof Invitation]} onChange={(e) => update(key as keyof Invitation, e.target.value)} rows={key === "quote" ? 2 : 2}/> : <input value={data[key as keyof Invitation]} onChange={(e) => update(key as keyof Invitation, e.target.value)}/>}</label>)}<div className="upload-inline"><button onClick={() => setActiveTab("Photos")}>＋ Add a couple photo</button></div></div> : <div className="panel-body photo-panel"><p className="panel-intro">A MOMENT TO KEEP<span>✧</span></p><p className="small-copy">Add a favorite photo to make your invitation even more personal.</p><input ref={uploadRef} type="file" accept="image/*" onChange={imageUpload} hidden/><button className="upload-box" onClick={() => uploadRef.current?.click()}><span>↑</span><b>{data.photo ? "Change your photo" : "Choose a photo"}</b><small>JPG or PNG · stored on this device</small></button>{data.photo && <button className="remove-photo" onClick={() => update("photo", "")}>Remove photo</button>}<div className="floral-choice"><p className="panel-intro">FLORAL DETAILS</p><div className="flower-options">{["Botanical", "Olive", "Wildflower"].map((f) => <button key={f} className={data.flowers === f ? "flower-active" : ""} onClick={() => update("flowers", f)}><span>{f === "Botanical" ? "❀" : f === "Olive" ? "❧" : "✿"}</span>{f}</button>)}</div></div></div>}
          </aside>

          <section className="canvas-area"><div className="canvas-toolbar"><span><i/> LIVE PREVIEW</span><div><button aria-label="Portrait layout" className={data.layout === "portrait" ? "layout-active" : ""} onClick={() => update("layout", "portrait")}>▯</button><button aria-label="Landscape layout" className={data.layout === "landscape" ? "layout-active" : ""} onClick={() => update("layout", "landscape")}>▱</button></div></div><div className="canvas-stage"><InvitationCard data={data}/></div><div className="canvas-footer"><span>MADE WITH LOVE, FOR YOUR FOREVER</span><span>100% <i>·</i> FIT TO CANVAS</span></div></section>

          <aside className="design-panel"><div className="design-heading"><div><p className="panel-intro">THE FINISHING TOUCHES</p><h2>Design details</h2></div><span>✧</span></div><div className="property-group"><label>Layout</label><div className="layout-select"><button className={data.layout === "portrait" ? "selected" : ""} onClick={() => update("layout", "portrait")}><span>▯</span>Portrait</button><button className={data.layout === "landscape" ? "selected" : ""} onClick={() => update("layout", "landscape")}><span>▱</span>Landscape</button></div></div><div className="property-group"><label>Typography</label><div className="select-wrap"><select value={data.font} onChange={(e) => update("font", e.target.value)}><option>Cormorant</option><option>Georgia</option><option>Garamond</option></select><span>⌄</span></div><p className="font-sample">Olivia <i>&</i> Ethan</p></div><div className="property-group"><label>Color palette</label><div className="color-row">{[{ name: "Ivory", value: "#fbf8f2" }, { name: "Soft blush", value: "#fbf3ef" }, { name: "Sage", value: "#f1f3ed" }, { name: "White", value: "#ffffff" }].map((c) => <button key={c.name} title={c.name} style={{ backgroundColor: c.value }} className={data.background === c.value ? "color-selected" : ""} onClick={() => update("background", c.value)}/>)}</div></div><div className="property-group"><label>Accent detail</label><div className="color-row accent-row">{[{name:"Champagne",value:"#ad8952"},{name:"Soft gold",value:"#c4a878"},{name:"Rose gold",value:"#b88978"},{name:"Sage",value:"#87927a"}].map(c => <button key={c.name} title={c.name} style={{backgroundColor:c.value}} className={`accent-swatch ${data.accent === c.value ? "color-selected" : ""}`} onClick={() => update("accent",c.value)}/>)}</div></div><div className="property-group flora-prop"><label>Botanical arrangement</label><div className="flora-select">{["Botanical", "Olive", "Wildflower"].map((f) => <button key={f} className={data.flowers === f ? "flora-active" : ""} onClick={() => update("flowers", f)}>{f === "Botanical" ? "❀" : f === "Olive" ? "❧" : "✿"}<span>{f}</span>{data.flowers === f ? <b>✓</b> : null}</button>)}</div></div><div className="help-card"><span>✧</span><div><b>A little design tip</b><p>Keep your message short and sweet to let your invitation breathe.</p></div></div><button className="download-button" onClick={downloadPng}>↓ <span>Download invitation</span></button><button className="pdf-button" onClick={() => window.print()}>Export as PDF <span>↗</span></button></aside>
        </div></>}
    </section>
    {toast && <div className="toast"><span>✧</span>{toast}</div>}
  </main>;
}
