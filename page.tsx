"use client";
import React, { useMemo, useState } from "react";

// --- Mock data ---
const SUBJECTS = ["Math", "Physics", "Chemistry", "Biology", "Computer Science"] as const;
const CURRICULA = ["IB HL", "IB SL", "A-level", "AP"] as const;

type Tutor = {
  id: string; name: string; uni: string;
  curricula: string[]; subjects: string[];
  price: number; rating: number; lessons: number;
  timezone: string; bio: string; highlights: string[];
};

const TUTORS: Tutor[] = [
  { id: "1", name: "Eunji Park", uni: "KAIST • MSc Biomaterials", curricula: ["IB HL", "A-level"], subjects: ["Math", "Chemistry", "Biology"], price: 42, rating: 4.9, lessons: 318, timezone: "Asia/Seoul", bio: "IB HL Chem 7, A-level A* in Math/Chem. 5+ yrs mentoring intl-school students. Data-driven lesson plans.", highlights: ["Score-backed", "Lab examples", "Exam hacks"] },
  { id: "2", name: "Daniel Choi", uni: "Imperial College • BEng Computing", curricula: ["AP", "A-level"], subjects: ["Math", "Physics", "Computer Science"], price: 55, rating: 4.8, lessons: 221, timezone: "Europe/London", bio: "AP Calc BC 5, AP Physics C 5. Algorithmic problem-solving with clear step-by-step scaffolding.", highlights: ["Code demos", "Past papers", "Clear notes"] },
  { id: "3", name: "Sora Kim", uni: "HKU • BSc Chemistry", curricula: ["IB HL", "AP"], subjects: ["Chemistry", "Biology"], price: 38, rating: 4.7, lessons: 174, timezone: "Asia/Hong_Kong", bio: "Organic mechanisms made intuitive. Structured checklists and spaced-repetition worksheets.", highlights: ["Mechanism maps", "Weekly quizzes", "Lab tips"] },
  { id: "4", name: "Minseo Lee", uni: "UC Berkeley • Applied Math", curricula: ["IB HL", "A-level", "AP"], subjects: ["Math", "Physics"], price: 60, rating: 5.0, lessons: 402, timezone: "America/Los_Angeles", bio: "Olympiad background → exam-ready heuristics. Turns hard calculus into pattern recognition.", highlights: ["Heuristics", "Error logs", "Mock exams"] }
];

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>
);
const CardBody: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);
const Badge: React.FC<React.PropsWithChildren<{ active?: boolean; onClick?: () => void }>> = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`px-2 py-1 text-xs rounded-full border ${active ? "bg-slate-900 text-white border-slate-900" : "bg-slate-100 text-slate-700 border-slate-200"}`}>{children}</button>
);

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-4 w-4 ${i < full ? "fill-yellow-500" : half && i === full ? "fill-yellow-300" : "fill-slate-300"}`}>
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.163L12 18.897l-7.335 3.863 1.4-8.163L.132 9.21l8.2-1.192L12 .587z" />
        </svg>
      ))}
      <span className="text-xs ml-1">{value.toFixed(1)}</span>
    </div>
  );
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<string | "">("");
  const [curriculum, setCurriculum] = useState<string | "">("");
  const [maxPrice, setMaxPrice] = useState<number>(65);
  const [timezone, setTimezone] = useState<string | "">("");

  const filtered = useMemo(() =>
    TUTORS.filter(t =>
      (query ? `${t.name} ${t.bio} ${t.uni}`.toLowerCase().includes(query.toLowerCase()) : true) &&
      (subject ? t.subjects.includes(subject) : true) &&
      (curriculum ? t.curricula.includes(curriculum) : true) &&
      (timezone ? t.timezone === timezone : true) &&
      t.price <= maxPrice
    ), [query, subject, curriculum, timezone, maxPrice]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-indigo-200 to-sky-200"/>
            <span className="font-semibold text-lg">GenieEdu</span>
            <span className="ml-2 text-xs px-2 py-1 rounded bg-slate-100">AP · A-level · IB</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#tutors" className="hover:text-slate-900">Tutors</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex px-3 py-2 rounded-lg hover:bg-slate-100">Log in</button>
            <button className="px-3 py-2 rounded-2xl bg-slate-900 text-white">Sign up</button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find elite STEM tutors for <span className="bg-yellow-200 px-2 rounded">AP · A-level · IB</span></h1>
            <p className="mt-4 text-slate-600 text-lg">Score-proven mentors, verified curricula, and exam-style practice. Book in minutes—learn from anywhere.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="h-11 px-5 rounded-xl bg-slate-900 text-white">Get matched →</button>
              <button className="h-11 px-5 rounded-xl border">Become a tutor</button>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
              <div>✅ Verified scores</div>
              <div>💳 Secure payments</div>
              <div>🎥 In-app lessons</div>
            </div>
          </div>

          <div>
            <Card className="shadow-xl">
              <CardBody className="space-y-4">
                <div className="text-lg font-semibold">Quick search</div>
                <div className="flex items-center gap-2">
                  <input className="h-11 w-full rounded-lg border px-3" placeholder="Search tutors, uni, or keywords" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                  <button className="h-11 px-4 rounded-lg bg-slate-900 text-white">Search</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select className="h-11 rounded-lg border px-3" value={subject} onChange={(e)=>setSubject(e.target.value || "")}>
                    <option value="">Subject</option>
                    {SUBJECTS.map(s=> <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select className="h-11 rounded-lg border px-3" value={curriculum} onChange={(e)=>setCurriculum(e.target.value || "")}>
                    <option value="">Curriculum</option>
                    {CURRICULA.map(c=> <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select className="h-11 rounded-lg border px-3" value={timezone} onChange={(e)=>setTimezone(e.target.value || "")}>
                    <option value="">Timezone</option>
                    {["Asia/Seoul","Asia/Hong_Kong","Europe/London","America/Los_Angeles"].map(z=> <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Max hourly rate</span>
                    <span>${maxPrice}</span>
                  </div>
                  <input type="range" min={20} max={100} step={1} value={maxPrice} onChange={(e)=>setMaxPrice(parseInt(e.target.value))} className="w-full"/>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUBJECTS.map(s=> (
                    <Badge key={s} active={s===subject} onClick={()=>setSubject(s===subject?"":s)}>{s}</Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[{title:"Verified expertise",desc:"Tutor scores & credentials are checked. Real exam experience required."},{title:"Curriculum-specific",desc:"Filters for IB HL/SL, A-level, AP—no more mismatch."},{title:"Smart matching",desc:"We match by subject, level, time zone, and budget."}].map((f,i)=> (
            <Card key={i}><CardBody>
              <div className="text-lg font-semibold">{f.title}</div>
              <p className="text-slate-600 text-sm mt-1">{f.desc}</p>
            </CardBody></Card>
          ))}
        </div>
      </section>

      <section id="tutors" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured tutors</h2>
          <button className="rounded-xl border px-3 py-2">See all</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(t=> (
            <Card key={t.id} className="hover:shadow-lg transition"><CardBody>
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-sky-200 to-indigo-200 flex items-center justify-center text-slate-700 font-semibold">
                  {t.name.split(" ").map(s=>s[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.uni}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${t.price}/h</div>
                      <div className="text-xs text-slate-500">{t.timezone}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Stars value={t.rating}/>
                    <span className="text-xs text-slate-500">{t.lessons} lessons</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {t.curricula.map(c=> <span key={c} className="px-2 py-1 text-xs rounded-full bg-slate-100">{c}</span>)}
                    {t.subjects.map(s=> <span key={s} className="px-2 py-1 text-xs rounded-full bg-slate-900 text-white">{s}</span>)}
                  </div>
                  <p className="mt-3 text-sm text-slate-700 line-clamp-3">{t.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.highlights.map(h=> <span key={h} className="text-xs px-2 py-1 rounded-full bg-slate-100">✓ {h}</span>)}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-xl bg-slate-900 text-white px-3 py-2">Book trial</button>
                    <button className="flex-1 rounded-xl border px-3 py-2">View profile</button>
                  </div>
                </div>
              </div>
            </CardBody></Card>
          ))}
        </div>
        <div className="text-center text-slate-500 py-8">No tutors match the current filters. Try adjusting price or filters.</div>
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-6">Simple pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{title:"Pay-as-you-go", price:"$0/mo", items:["Only pay per lesson","Secure payments","Basic support"]},
            {title:"Plus", price:"$9/mo", items:["Priority matching","Top tutor access","Progress reports"]},
            {title:"Family", price:"$19/mo", items:["2 students included","Shared credits","Parent dashboard"]}].map(p=> (
            <Card key={p.title}><CardBody>
              <div className="text-lg font-semibold">{p.title}</div>
              <div className="text-3xl font-bold mt-2">{p.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
                {p.items.map(it=> <li key={it}>{it}</li>)}
              </ul>
              <button className="w-full mt-6 rounded-xl bg-slate-900 text-white px-3 py-2">Choose</button>
            </CardBody></Card>
          ))}
        </div>
      </section>

      <section id="faq" className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-4">FAQ</h2>
        <div className="space-y-4">
          {[{q:"튜터 ‘빼가기’를 어떻게 방지하나요?", a:"결제·채팅·수업을 플랫폼 내에서만 제공하며, 위반 시 계정 정지/정산 제한 정책을 운영합니다."},
            {q:"어떤 커리큘럼을 지원하나요?", a:"AP, A-level, IB(HL/SL)에 최적화되어 있으며, 이후 SAT/GCSE/국내외 입시 과목으로 확장 가능합니다."},
            {q:"환불 규정은 어떻게 되나요?", a:"수업 24시간 전까지 무료 취소, 그 이후에는 튜터 재량에 따라 부분 환불이 적용됩니다."}].map(f=> (
            <Card key={f.q}><CardBody>
              <div className="font-semibold">{f.q}</div>
              <p className="text-slate-600 text-sm mt-1">{f.a}</p>
            </CardBody></Card>
          ))}
        </div>
      </section>

      <footer className="border-t bg-white/70">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2"><div className="h-5 w-5 rounded bg-gradient-to-br from-indigo-200 to-sky-200"/><span className="font-semibold">GenieEdu</span></div>
            <p className="text-sm text-slate-600 mt-2">TutorHive-style marketplace for AP/A-level/IB STEM tutoring.</p>
          </div>
          <div>
            <div className="font-semibold">Product</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>Search</li><li>Booking</li><li>In-app lessons</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>About</li><li>Careers</li><li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Legal</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>Terms</li><li>Privacy</li><li>Refund policy</li>
            </ul>
          </div>
        </div>
        <div className="text-xs text-center text-slate-500 pb-6">© {new Date().getFullYear()} GenieEdu. All rights reserved.</div>
      </footer>
    </div>
  );
}
