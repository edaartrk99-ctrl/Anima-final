import { useState, useEffect } from "react";

// ─── RENK PALETİ ─────────────────────────────────────────────────────────────
const ACCENTS = [
  { main: "#F5C842", soft: "rgba(245,200,66,0.13)",  border: "rgba(245,200,66,0.32)"  },
  { main: "#FF8C61", soft: "rgba(255,140,97,0.13)",   border: "rgba(255,140,97,0.32)"  },
  { main: "#5DD6A8", soft: "rgba(93,214,168,0.12)",   border: "rgba(93,214,168,0.32)"  },
  { main: "#7EB8F7", soft: "rgba(126,184,247,0.12)",  border: "rgba(126,184,247,0.32)" },
  { main: "#C97EF5", soft: "rgba(201,126,245,0.12)",  border: "rgba(201,126,245,0.32)" },
];

// ─── 6 YOLCULUK ──────────────────────────────────────────────────────────────
const JOURNEYS = [
  {
    id: "self", title: "Kendini Tanıma", emoji: "🪞",
    desc: "Kim olduğunu keşfetmek, değerlerini ve güçlü yanlarını görmek.",
    color: ACCENTS[0],
    weeks: [
      { title: "Zihnimde neler dönüyor?",          desc: "Kendi düşüncelerini bir adım geriden, merakla izlemek." },
      { title: "Ben kimim — gerçekten?",            desc: "Rollerin ve etiketlerin altındaki kişiyi aramak." },
      { title: "Güçlü yanlarım ve zayıf yanlarım", desc: "Bunları tehdit olarak değil, bilgi olarak görmek." },
      { title: "İç eleştirmenimle tanışmak",        desc: "O sesin nereden geldiğini merakla keşfetmek." },
      { title: "Öz-şefkat nedir?",                  desc: "Kendine bir arkadaş gibi davranmanın ne anlama geldiği." },
      { title: "Değerlerim",                        desc: "Gerçekten önemli olanı — dışarıdan değil içeriden bulmak." },
      { title: "Maneviyat ve anlam",                desc: "Hayatına derinlik katan şeylerle bağlantı kurmak." },
    ],
  },
  {
    id: "mind", title: "Zihnini Sakinleştirme", emoji: "🌊",
    desc: "Kaygı döngüsünü anlamak ve zihinle barışçıl bir ilişki kurmak.",
    color: ACCENTS[3],
    weeks: [
      { title: "Kaygı neden var?",              desc: "Kaygıyı düşman değil, bir sinyal olarak görmek." },
      { title: "Düşünce döngüsünü fark etmek", desc: "Zihnin otomatik pilotta nereye gittiğini izlemek." },
      { title: "Şimdiye dönmek",               desc: "Nefes ve beden aracılığıyla şu ana gelmek." },
      { title: "Zihinle mesafe kurmak",        desc: "Düşüncene inanmak zorunda olmadığını hissetmek." },
      { title: "Kaygıyla oturmak",             desc: "Kaçmadan, savaşmadan — sadece izlemek." },
    ],
  },
  {
    id: "relations", title: "İlişkilerde Güçlenme", emoji: "🤝",
    desc: "Sınırlar, iletişim kalıpları ve ilişkilerde kendin olmak.",
    color: ACCENTS[1],
    weeks: [
      { title: "İlişki kalıplarım",                desc: "Tekrar eden dinamikleri merakla görmek." },
      { title: "Sınır nedir, nasıl hissettiriyor?", desc: "Suçluluk duymadan hayır diyebilmek." },
      { title: "İletişimde ben",                   desc: "Ne söylüyorum, ne demek istiyorum?" },
      { title: "Bağlanma biçimim",                 desc: "Yakınlık ve mesafeyle ilişkim nasıl?" },
      { title: "Affetmek — kendim ve başkaları",   desc: "Affetmenin ne olduğu ve olmadığı." },
    ],
  },
  {
    id: "meaning", title: "Anlam ve Yön Bulma", emoji: "🧭",
    desc: "Amaç keşfi, değer-eylem uyumu ve hayat tasarımı.",
    color: ACCENTS[4],
    weeks: [
      { title: "Şu an neredeyim?",           desc: "Hayatımın farklı alanlarına dürüstçe bakmak." },
      { title: "Ne istiyorum gerçekten?",     desc: "Beklentilerin altındaki gerçek isteği bulmak." },
      { title: "Değerlerim ve eylemlerim",    desc: "Ne söylediğimle ne yaptığım uyuşuyor mu?" },
      { title: "Anlam nerede saklı?",        desc: "Küçük anlarda büyük anlamları görmek." },
      { title: "Bir adım atmak",             desc: "Mükemmel planı beklemeden başlamak." },
    ],
  },
  {
    id: "habits", title: "Alışkanlıklar ve Rutin", emoji: "🌱",
    desc: "Küçük adımlar, sürdürülebilir değişim ve günlük yapı kurma.",
    color: ACCENTS[2],
    weeks: [
      { title: "Alışkanlık döngüsünü görmek", desc: "Tetikleyici — davranış — ödül döngüsünü fark etmek." },
      { title: "Küçük başlamak",              desc: "İki dakikalık kural ve neden işe yarıyor." },
      { title: "Sabotaj kalıplarım",          desc: "Kendimi neden engelliyorum, merakla bakmak." },
      { title: "Bir rutin tasarlamak",        desc: "Hayatıma uyan bir yapı kurmak." },
      { title: "Devam etmenin bilimi",        desc: "Motivasyon gitmesine rağmen sürmek." },
    ],
  },
  {
    id: "hardtimes", title: "Zor Zamanlarla Başa Çıkma", emoji: "⛵",
    desc: "Kayıp, belirsizlik ve kriz anlarında kendine destek olmak.",
    color: ACCENTS[1],
    weeks: [
      { title: "Zorluğun içinde olmak",    desc: "Acıyı inkâr etmeden, içinde boğulmadan durmak." },
      { title: "Başa çıkma stilim",        desc: "Zor anlarda ne yapıyorum — ve işe yarıyor mu?" },
      { title: "Belirsizlikle oturmak",    desc: "Cevap olmadan durmayı öğrenmek." },
      { title: "Destek almak",             desc: "Yardım istemek güçsüzlük değil, cesaret." },
      { title: "Buradan ne öğreniyorum?",  desc: "Zorluğun içindeki büyümeyi nazikçe aramak." },
    ],
  },
];

// ─── ONBOARDİNG SORULARI ─────────────────────────────────────────────────────
const OB_STEPS = [
  { id: "welcome", type: "welcome" },
  {
    id: "trigger", type: "mcq", ci: 0,
    bdtLabel: "Tetikleyici faktör",
    context: "Değişim her zaman bir şeyin dokunmasıyla başlar.",
    question: "Şu an seni en çok zorlayan şey nedir?",
    options: [
      { v: "relations", l: "İlişkilerim ve çevremdeki insanlar" },
      { v: "self",      l: "Kendimle ilgili düşüncelerim" },
      { v: "habits",    l: "İş, okul veya kariyer" },
      { v: "meaning",   l: "Geleceğe dair kaygılarım" },
    ],
    hint: "Aklına ilk gelen şey genellikle en gerçek olandır.",
  },
  {
    id: "sustaining", type: "mcq", ci: 1,
    bdtLabel: "Sürdürücü faktör",
    context: "Zorluğu ayakta tutan genellikle dışarıdaki durum değil, içimizde dönen şeydir.",
    question: "Zihninizden en sık ne geçiyor?",
    options: [
      { v: "self",      l: "\"Yeterince iyi değilim\"" },
      { v: "hardtimes", l: "\"Hiçbir şey değişmeyecek\"" },
      { v: "mind",      l: "\"Hep böyle olacak\"" },
      { v: "self",      l: "\"Bir şeyleri mahvediyorum\"" },
    ],
    hint: "Fark etmek değişimin ilk adımıdır.",
  },
  {
    id: "protective", type: "mcq", ci: 2,
    bdtLabel: "Koruyucu faktör",
    context: "Her insanın içinde, henüz tam keşfedilmemiş kaynaklar vardır.",
    question: "Zor anlarda seni en çok ayakta tutan şey?",
    options: [
      { v: "relations", l: "Güvendiğim biri — bir insan" },
      { v: "meaning",   l: "İnancım veya değerlerim" },
      { v: "self",      l: "Kendime dair güçlü yanlarım" },
      { v: "habits",    l: "Bir alışkanlık veya rutin" },
    ],
    hint: "Küçük bir şey bile olabilir. Farkında olmadan taşıdığın en büyük güç budur.",
  },
  {
    id: "goal", type: "mcq", ci: 3,
    bdtLabel: "Hedef",
    context: "Nereye gitmek istediğini bilmek, oraya nasıl gideceğini bulmayı kolaylaştırır.",
    question: "Anima'dan sonra ne farklı olsun istersin?",
    options: [
      { v: "self",      l: "Kendimle daha iyi geçinmek" },
      { v: "mind",      l: "Kaygı ve stresimi azaltmak" },
      { v: "relations", l: "İlişkilerimi iyileştirmek" },
      { v: "meaning",   l: "Amacımı ve yönümü bulmak" },
    ],
    hint: "Bu senin yön pusulan. İstediğin zaman değiştirebilirsin.",
  },
  {
    id: "history", type: "mcq", ci: 4,
    bdtLabel: "Geçmiş örüntü",
    context: "Nereden geldiğini bilmek, nereye gideceğini anlamlandırır.",
    question: "Daha önce psikolojik destek aldın mı?",
    options: [
      { v: "yes_therapy", l: "Evet, terapi aldım" },
      { v: "yes_other",   l: "Evet, başka bir destek" },
      { v: "no_wanted",   l: "Hayır ama almak istedim" },
      { v: "no",          l: "Hayır, bu ilk adımım" },
    ],
    hint: "Bu bilgi sana daha uygun bir yol haritası oluşturmamıza yardımcı olur.",
  },
  { id: "result", type: "result" },
];

const OB_Q = OB_STEPS.filter(s => s.type === "mcq");

// ─── YOLCULUK ATAMA ───────────────────────────────────────────────────────────
function assignJourney(answers) {
  const scores = {};
  ["trigger","sustaining","protective","goal"].forEach(k => {
    const v = answers[k];
    if (v && JOURNEYS.find(j => j.id === v))
      scores[v] = (scores[v] || 0) + (k === "goal" ? 2 : 1);
  });
  return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0]?.[0] || "self";
}

// ─── SABAH DUYGULARI ─────────────────────────────────────────────────────────
const MOODS = [
  { v:"anxious",  l:"Kaygılı",       e:"😟", color:"#7EB8F7", bg:"rgba(126,184,247,0.12)", border:"rgba(126,184,247,0.35)" },
  { v:"tired",    l:"Yorgun",        e:"😮‍💨", color:"#C97EF5", bg:"rgba(201,126,245,0.12)", border:"rgba(201,126,245,0.35)" },
  { v:"confused", l:"Kafam karışık", e:"🌀", color:"#FF8C61", bg:"rgba(255,140,97,0.12)",  border:"rgba(255,140,97,0.35)"  },
  { v:"sad",      l:"Hüzünlü",      e:"🌧️", color:"#7EB8F7", bg:"rgba(126,184,247,0.1)",  border:"rgba(126,184,247,0.3)"  },
  { v:"good",     l:"İyiyim",       e:"🌱", color:"#5DD6A8", bg:"rgba(93,214,168,0.12)",  border:"rgba(93,214,168,0.35)"  },
  { v:"hopeful",  l:"Umutluyum",    e:"✨", color:"#F5C842", bg:"rgba(245,200,66,0.12)",  border:"rgba(245,200,66,0.35)"  },
  { v:"angry",    l:"Öfkeli",       e:"🔥", color:"#FF6B6B", bg:"rgba(255,107,107,0.12)", border:"rgba(255,107,107,0.35)" },
  { v:"numb",     l:"Hissizim",     e:"🪨", color:"#A8A8A8", bg:"rgba(168,168,168,0.1)",  border:"rgba(168,168,168,0.25)" },
];

// ─── HAFIZA KATMANI ───────────────────────────────────────────────────────────
// Kullanıcının tüm ilerlemesini window.storage'a kaydeder/okur.
// Anahtar: "anima:profile" — tek bir nesnede her şeyi tutar,
// böylece birden fazla storage çağrısından kaçınırız.
//
// Profil şeması:
// {
//   journeyId: string,       — seçili yolculuk
//   day: number,             — kaçıncı günde
//   weekIdx: number,         — kaçıncı haftada
//   ratings: number[],       — her günün puanı
//   lastDate: string,        — son kullanım tarihi (YYYY-MM-DD)
//   onboardingDone: boolean, — onboarding tamamlandı mı
// }

const STORAGE_KEY = "anima:profile";

async function loadProfile() {
  try {
    const res = await window.storage.get(STORAGE_KEY);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null; // Veri yoksa null döner, onboarding'e yönlendiririz
  }
}

async function saveProfile(profile) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Kayıt hatası:", e);
  }
}

// Bugünün tarihini YYYY-MM-DD formatında döner — günlük tekrar engeli için
function today() {
  return new Date().toISOString().slice(0, 10);
}

// ─── API EGZERSİZ ÇAĞRISI ─────────────────────────────────────────────────────
// Backend'e çağrı yapıyor (pages/api/exercise.js)
async function fetchDailyExercise({ mood, journey, weekTheme, day, ratings }) {
  const moodLabel = MOODS.find(m => m.v === mood)?.l || mood;

  try {
    const res = await fetch("/api/exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mood: moodLabel,
        journey,
        weekTheme,
        day,
        ratings,
      }),
    });

    if (!res.ok) throw new Error("API çağrısı başarısız");
    return await res.json();
  } catch (error) {
    console.error("Exercise API error:", error);
    throw error;
  }
}

// ─── HAFTALıK ÖZET API ÇAĞRISI ─────────────────────────────────────────────────
// Backend'e çağrı yapıyor (pages/api/weekly.js)
async function fetchWeeklyInsight({ journey, weekTheme, ratings }) {
  try {
    const res = await fetch("/api/weekly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        journey,
        weekTheme,
        ratings,
      }),
    });

    if (!res.ok) throw new Error("API çağrısı başarısız");
    return await res.json();
  } catch (error) {
    console.error("Weekly API error:", error);
    throw error;
  }
}

// ─── ANA UYGULAMA ─────────────────────────────────────────────────────────────
export default function AnimaApp() {
  // Uygulama başlarken "loading" ekranı gösterilir, storage okununca gerçek ekrana geçilir
  const [screen,     setScreen]     = useState("loading");
  const [profile,    setProfile]    = useState(null); // Kalıcı profil

  // Onboarding geçici state'leri
  const [obStep,    setObStep]    = useState(0);
  const [obAnswers, setObAnswers] = useState({});
  const [obFading,  setObFading]  = useState(false);

  // Günlük state'ler
  const [journey,   setJourney]   = useState(null);
  const [mood,      setMood]      = useState(null);
  const [exercise,  setExercise]  = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [rating,    setRating]    = useState(null);
  const [weeklyData, setWeeklyData] = useState(null); // Haftalık özet verileri
  const [weeklyLoading, setWeeklyLoading] = useState(false);

  const obCurrent = OB_STEPS[obStep];
  const obQIdx    = OB_Q.findIndex(s => s.id === obCurrent?.id);
  const obCanNext = obCurrent?.type === "welcome" ||
                    obCurrent?.type === "result"  ||
                    !!obAnswers[obCurrent?.id];
  const selMood   = MOODS.find(m => m.v === mood);

  // ── Uygulama açıldığında storage'ı oku ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      const saved = await loadProfile();

      if (!saved || !saved.onboardingDone) {
        // İlk kez giriyor — onboarding'e gönder
        setScreen("onboarding");
        return;
      }

      // Profil var — yolculuğu yükle
      const j = JOURNEYS.find(j => j.id === saved.journeyId) || JOURNEYS[0];
      setJourney(j);
      setProfile(saved);

      // Bugün zaten egzersiz yaptı mı? (günlük tekrar engeli)
      if (saved.lastDate === today()) {
        setScreen("already_done");
      } else {
        setScreen("morning");
      }
    })();
  }, []);

  // ── Profil güncelleme yardımcısı ────────────────────────────────────────────
  async function updateProfile(changes) {
    const updated = { ...profile, ...changes };
    setProfile(updated);
    await saveProfile(updated);
    return updated;
  }

  // ── Onboarding bitti ────────────────────────────────────────────────────────
  async function finishOnboarding(selectedJourneyId) {
    const j = JOURNEYS.find(j => j.id === selectedJourneyId) || JOURNEYS[0];
    setJourney(j);

    const newProfile = {
      journeyId:       j.id,
      day:             1,
      weekIdx:         0,
      ratings:         [],
      lastDate:        null,
      onboardingDone:  true,
    };
    setProfile(newProfile);
    await saveProfile(newProfile);
    setScreen("morning");
  }

  // ── Onboarding adım geçişi ───────────────────────────────────────────────────
  function obGo(dir) {
    if (obFading) return;
    setObFading(true);
    setTimeout(async () => {
      const next = obStep + dir;
      if (next >= OB_STEPS.length) {
        const jId = assignJourney(obAnswers);
        setScreen("journey_select");
        const j = JOURNEYS.find(j => j.id === jId) || JOURNEYS[0];
        setJourney(j);
      } else {
        setObStep(Math.max(0, next));
      }
      setObFading(false);
    }, 220);
  }

  // ── Sabah egzersizi çek ──────────────────────────────────────────────────────
  async function startDay() {
    if (!mood || !journey || !profile) return;
    setLoading(true);
    try {
      const weekTheme = journey.weeks[profile.weekIdx] || journey.weeks[0];
      const ex = await fetchDailyExercise({
        mood, journey, weekTheme,
        day:     profile.day,
        ratings: profile.ratings,
      });
      setExercise(ex);
      setScreen("exercise");
    } catch {
      alert("Bir şeyler ters gitti, tekrar dene.");
    }
    setLoading(false);
  }

  // ── Gün tamamlandı: puan kaydet, sayaçları ilerlet ─────────────────────────
  async function completeDay(r) {
    setRating(r);
    const newDay     = profile.day + 1;
    const newRatings = [...profile.ratings, r];
    // Her 7 günde bir haftayı ilerlet
    const newWeekIdx = Math.min(
      Math.floor((newDay - 1) / 7),
      (journey?.weeks.length || 1) - 1
    );
    
    // 7. günün sonunda haftalık özet göster
    const isWeekEnd = (newDay - 1) % 7 === 0 && newDay > 1;
    
    await updateProfile({
      day:      newDay,
      weekIdx:  newWeekIdx,
      ratings:  newRatings,
      lastDate: today(),
    });
    
    if (isWeekEnd) {
      // Haftalık özet gösterilecek — API'yi çağır
      setWeeklyLoading(true);
      try {
        const insight = await fetchWeeklyInsight({
          journey,
          weekTheme: journey.weeks[newWeekIdx],
          ratings: newRatings.slice(-7), // Son 7 günün puanları
        });
        setWeeklyData(insight);
        setScreen("weekly_summary");
      } catch {
        // Hata olsa bile devam et
        setWeeklyData({ insight: "Bu hafta için teşekkürler! Devam et." });
        setScreen("weekly_summary");
      }
      setWeeklyLoading(false);
    } else {
      setScreen("done");
    }
  }

  // ── Sabah sıfırla ────────────────────────────────────────────────────────────
  function resetMorning() {
    setMood(null);
    setExercise(null);
    setRating(null);
    setScreen("morning");
  }

  // ── Yolculuk değiştir ────────────────────────────────────────────────────────
  async function changeJourney(j) {
    setJourney(j);
    await updateProfile({ journeyId: j.id, weekIdx: 0 });
    setScreen("morning");
  }

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes pulse   { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        .lift:hover        { transform:translateY(-2px); transition:transform 0.15s; }
        ::-webkit-scrollbar{ display:none; }
      `}</style>

      <div style={{
        background: "#09080C",
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
        backgroundImage: selMood && screen === "morning"
          ? `radial-gradient(ellipse 70% 40% at 50% 0%, ${selMood.bg}, transparent 65%)`
          : journey && !["loading","onboarding"].includes(screen)
            ? `radial-gradient(ellipse 60% 30% at 50% 0%, ${journey.color.soft}, transparent 60%)`
            : "none",
        transition: "background-image 0.6s ease",
      }}>

        {/* ── TELEFON ÇERÇEVE ── */}
        <div style={{
          width:375, height:720, background:"#111014",
          borderRadius:44, border:"0.5px solid rgba(255,255,255,0.08)",
          boxShadow:"0 40px 100px rgba(0,0,0,0.7)",
          display:"flex", flexDirection:"column",
          overflow:"hidden", position:"relative",
        }}>
          {/* Notch */}
          <div style={{width:100,height:26,background:"#09080C",borderRadius:"0 0 18px 18px",margin:"0 auto",flexShrink:0}}/>

          {/* ════ LOADING ════ */}
          {screen === "loading" && (
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{width:32,height:32,border:"1.5px solid rgba(245,200,66,0.15)",borderTop:"1.5px solid rgba(245,200,66,0.7)",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
            </div>
          )}

          {/* ════ ONBOARDING ════ */}
          {screen === "onboarding" && (
            <>
              {obCurrent?.type === "welcome" && (
                <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 36px",animation:"fadeUp 0.7s ease both"}}>
                  <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:"0.22em",color:"rgba(245,200,66,0.45)",textTransform:"uppercase",marginBottom:52}}>Anima</p>
                  <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:38,fontWeight:300,fontStyle:"italic",color:"#EDE8DF",lineHeight:1.2,marginBottom:16,letterSpacing:"-0.02em"}}>
                    Kendini ne kadar<br/>tanıyorsun?
                  </h1>
                  <p style={{fontSize:14,color:"rgba(237,232,223,0.3)",lineHeight:1.75,marginBottom:60,fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>Birlikte bakalım.</p>
                  <button onClick={()=>obGo(1)} style={{background:"rgba(245,200,66,0.1)",border:"0.5px solid rgba(245,200,66,0.32)",borderRadius:12,padding:"14px 40px",color:"#F5C842",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,letterSpacing:"0.06em",cursor:"pointer"}}>Başla</button>
                  <p style={{position:"absolute",bottom:32,fontSize:10,color:"rgba(237,232,223,0.13)",letterSpacing:"0.1em",fontFamily:"'DM Sans',sans-serif"}}>5 soru · ~2 dakika</p>
                </div>
              )}

              {obCurrent?.type === "mcq" && (
                <>
                  <div style={{padding:"10px 24px 0",flexShrink:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      {obStep > 1
                        ? <button onClick={()=>obGo(-1)} style={{background:"none",border:"none",color:"rgba(237,232,223,0.25)",fontSize:20,cursor:"pointer",padding:0}}>←</button>
                        : <div style={{width:20}}/>}
                      <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em",color:"rgba(237,232,223,0.2)"}}>{obQIdx+1} / {OB_Q.length}</p>
                      <div style={{width:20}}/>
                    </div>
                    <div style={{height:2,background:"rgba(255,255,255,0.07)",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${((obQIdx+1)/OB_Q.length)*100}%`,background:ACCENTS[obCurrent.ci].main,borderRadius:2,transition:"width 0.5s"}}/>
                    </div>
                  </div>

                  <div style={{flex:1,display:"flex",flexDirection:"column",padding:"18px 24px 14px",opacity:obFading?0:1,transform:obFading?"translateY(10px)":"none",transition:"opacity 0.22s,transform 0.22s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:16}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:ACCENTS[obCurrent.ci].main,opacity:0.7}}/>
                      <span style={{fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:ACCENTS[obCurrent.ci].main,opacity:0.65,fontFamily:"'DM Sans',sans-serif"}}>{obCurrent.bdtLabel}</span>
                    </div>
                    <p style={{fontSize:12,color:"rgba(237,232,223,0.32)",lineHeight:1.65,marginBottom:13,fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontStyle:"italic"}}>{obCurrent.context}</p>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:21,fontWeight:400,color:"#EDE8DF",lineHeight:1.3,marginBottom:16,letterSpacing:"-0.01em"}}>{obCurrent.question}</p>
                    <div style={{display:"flex",flexDirection:"column",gap:8,flex:1}}>
                      {obCurrent.options.map(opt=>{
                        const sel = obAnswers[obCurrent.id]===opt.v;
                        const ac  = ACCENTS[obCurrent.ci];
                        return (
                          <button key={opt.v} onClick={()=>setObAnswers(p=>({...p,[obCurrent.id]:opt.v}))} style={{background:sel?ac.soft:"rgba(255,255,255,0.03)",border:sel?`0.5px solid ${ac.border}`:"0.5px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 15px",color:sel?ac.main:"rgba(237,232,223,0.52)",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:sel?500:400,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12,transition:"all 0.15s"}}>
                            <div style={{width:16,height:16,borderRadius:"50%",flexShrink:0,background:sel?ac.main:"transparent",border:sel?"none":"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                              {sel&&<div style={{width:6,height:6,borderRadius:"50%",background:"#111014"}}/>}
                            </div>
                            {opt.l}
                          </button>
                        );
                      })}
                    </div>
                    <p style={{fontSize:11,color:"rgba(237,232,223,0.18)",lineHeight:1.6,marginTop:10,fontFamily:"'DM Sans',sans-serif",fontStyle:"italic"}}>{obCurrent.hint}</p>
                  </div>

                  <div style={{padding:"0 24px 26px",flexShrink:0}}>
                    <button onClick={obCanNext?()=>obGo(1):undefined} style={{width:"100%",padding:"15px",background:obCanNext?ACCENTS[obCurrent.ci].soft:"rgba(255,255,255,0.04)",border:obCanNext?`0.5px solid ${ACCENTS[obCurrent.ci].border}`:"0.5px solid rgba(255,255,255,0.06)",borderRadius:12,color:obCanNext?ACCENTS[obCurrent.ci].main:"rgba(237,232,223,0.17)",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:obCanNext?"pointer":"default",transition:"all 0.2s",letterSpacing:"0.03em"}}>
                      {obStep===OB_STEPS.length-2?"Tamamla":"Devam →"}
                    </button>
                  </div>
                </>
              )}

              {obCurrent?.type === "result" && (
                <div style={{flex:1,display:"flex",flexDirection:"column",padding:"26px 24px 20px",animation:"fadeUp 0.6s ease both"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                    <div style={{display:"flex",gap:4}}>
                      {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:ACCENTS[i].main,animation:`pulse 1.4s ease-in-out ${i*0.2}s infinite`}}/>)}
                    </div>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.18em",color:"rgba(245,200,66,0.5)",textTransform:"uppercase"}}>Kılavuz oluşturuluyor</p>
                  </div>
                  <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:300,fontStyle:"italic",color:"#EDE8DF",lineHeight:1.2,marginBottom:16,letterSpacing:"-0.01em"}}>
                    Bu senin<br/><em style={{fontStyle:"normal",color:"#F5C842"}}>kılavuzun.</em>
                  </h2>
                  <p style={{fontSize:13,color:"rgba(237,232,223,0.4)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.7,marginBottom:24}}>Cevaplarına göre sana en uygun yolculuğu seçtik. İstersen değiştirebilirsin.</p>
                  <button onClick={()=>obGo(1)} style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,rgba(245,200,66,0.16),rgba(255,140,97,0.12))",border:"0.5px solid rgba(245,200,66,0.38)",borderRadius:12,color:"#F5C842",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:"pointer",letterSpacing:"0.03em"}}>
                    Yolculuğumu gör →
                  </button>
                </div>
              )}
            </>
          )}

          {/* ════ YOLCULUK SEÇİMİ ════ */}
          {screen === "journey_select" && journey && (
            <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 24px",overflow:"hidden",animation:"fadeUp 0.6s ease both"}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.18em",color:"rgba(245,200,66,0.5)",textTransform:"uppercase",marginBottom:16}}>Senin için önerilen</p>

              <div style={{background:journey.color.soft,border:`0.5px solid ${journey.color.border}`,borderRadius:16,padding:"18px",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                  <span style={{fontSize:28}}>{journey.emoji}</span>
                  <div>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic",color:"#EDE8DF",marginBottom:4}}>{journey.title}</p>
                    <p style={{fontSize:12,color:"rgba(237,232,223,0.45)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.5}}>{journey.desc}</p>
                  </div>
                </div>
                <div style={{borderTop:`0.5px solid ${journey.color.border}`,paddingTop:10}}>
                  <p style={{fontSize:10,color:journey.color.main,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>İlk hafta</p>
                  <p style={{fontSize:13,color:"rgba(237,232,223,0.6)",fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>{journey.weeks[0].title}</p>
                </div>
              </div>

              <p style={{fontSize:11,color:"rgba(237,232,223,0.25)",fontFamily:"'DM Sans',sans-serif",marginBottom:10,letterSpacing:"0.06em"}}>Veya farklı bir yolculuk seç:</p>
              <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:7}}>
                {JOURNEYS.filter(j=>j.id!==journey.id).map(j=>(
                  <button key={j.id} className="lift" onClick={()=>setJourney(j)} style={{background:"rgba(255,255,255,0.03)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
                    <span style={{fontSize:20}}>{j.emoji}</span>
                    <div>
                      <p style={{fontSize:13,color:"rgba(237,232,223,0.6)",fontFamily:"'DM Sans',sans-serif",marginBottom:2}}>{j.title}</p>
                      <p style={{fontSize:11,color:"rgba(237,232,223,0.3)",fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>{j.desc.substring(0,50)}...</p>
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={()=>finishOnboarding(journey.id)} style={{margin:"14px 0 0",width:"100%",padding:"15px",background:journey.color.soft,border:`0.5px solid ${journey.color.border}`,borderRadius:12,color:journey.color.main,fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:"pointer",letterSpacing:"0.03em"}}>
                Bu yolculukla başla →
              </button>
            </div>
          )}

          {/* ════ SABAH EKRANI ════ */}
          {screen === "morning" && profile && (
            <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 24px 0",overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.18em",color:"rgba(245,200,66,0.45)",textTransform:"uppercase"}}>Anima</p>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:14}}>{journey?.emoji}</span>
                  <p style={{fontSize:10,color:"rgba(237,232,223,0.25)",fontFamily:"'DM Mono',monospace",letterSpacing:"0.08em"}}>{profile.day}. gün</p>
                  {/* Yolculuk değiştirme butonu */}
                  <button onClick={()=>setScreen("journey_select")} style={{background:"rgba(255,255,255,0.05)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:6,padding:"3px 8px",color:"rgba(237,232,223,0.3)",fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>değiştir</button>
                </div>
              </div>

              <div style={{marginBottom:24,animation:"fadeUp 0.6s ease both"}}>
                <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,fontStyle:"italic",color:"#EDE8DF",lineHeight:1.2,marginBottom:8,letterSpacing:"-0.02em"}}>Günaydın.</h1>
                <p style={{fontSize:14,color:"rgba(237,232,223,0.4)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.6}}>Zihnin bugün ne üretiyor?</p>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,flex:1,animation:"fadeUp 0.7s ease 0.1s both"}}>
                {MOODS.map(m=>{
                  const sel=mood===m.v;
                  return (
                    <button key={m.v} className="lift" onClick={()=>setMood(m.v)} style={{background:sel?m.bg:"rgba(255,255,255,0.03)",border:sel?`0.5px solid ${m.border}`:"0.5px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"14px 12px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",transition:"all 0.15s",textAlign:"left"}}>
                      <span style={{fontSize:22,flexShrink:0}}>{m.e}</span>
                      <span style={{fontSize:13,color:sel?m.color:"rgba(237,232,223,0.5)",fontFamily:"'DM Sans',sans-serif",fontWeight:sel?500:400,transition:"color 0.15s"}}>{m.l}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{padding:"16px 0 24px"}}>
                <button onClick={startDay} disabled={!mood||loading} style={{width:"100%",padding:"15px",background:mood?selMood?.bg:"rgba(255,255,255,0.04)",border:mood?`0.5px solid ${selMood?.border}`:"0.5px solid rgba(255,255,255,0.06)",borderRadius:12,color:mood?selMood?.color:"rgba(237,232,223,0.17)",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:mood&&!loading?"pointer":"default",transition:"all 0.2s",letterSpacing:"0.03em",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                  {loading
                    ?<><div style={{width:16,height:16,border:"1.5px solid rgba(255,255,255,0.2)",borderTop:"1.5px solid currentColor",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>Hazırlanıyor...</>
                    :"Günüme başla →"}
                </button>
              </div>
            </div>
          )}

          {/* ════ EGZERSİZ ════ */}
          {screen === "exercise" && exercise && (
            <div style={{flex:1,display:"flex",flexDirection:"column",padding:"16px 24px 0",overflow:"hidden",animation:"fadeUp 0.5s ease both"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <button onClick={()=>setScreen("morning")} style={{background:"none",border:"none",color:"rgba(237,232,223,0.25)",fontSize:18,cursor:"pointer",padding:0}}>←</button>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em",color:"rgba(237,232,223,0.2)"}}>{selMood?.e} {selMood?.l}</p>
                <div style={{width:20}}/>
              </div>

              <div style={{background:selMood?.bg,border:`0.5px solid ${selMood?.border}`,borderRadius:14,padding:"14px 16px",marginBottom:14}}>
                <p style={{fontSize:14,color:selMood?.color,fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.65}}>{exercise.yorum}</p>
              </div>

              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <span style={{fontSize:14}}>{journey?.emoji}</span>
                <p style={{fontSize:11,color:"rgba(237,232,223,0.3)",fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>{journey?.weeks[profile?.weekIdx||0]?.title}</p>
              </div>

              <p style={{fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(245,200,66,0.5)",fontFamily:"'DM Sans',sans-serif",marginBottom:6}}>Bugünün teması</p>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:400,fontStyle:"italic",color:"#EDE8DF",lineHeight:1.2,marginBottom:14}}>{exercise.tema}</p>

              <div style={{background:"rgba(255,255,255,0.03)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"16px",flex:1,overflowY:"auto"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,color:"#EDE8DF",lineHeight:1.3,flex:1}}>{exercise.egzersiz_adi}</p>
                  <span style={{fontSize:10,color:"rgba(245,200,66,0.55)",border:"0.5px solid rgba(245,200,66,0.25)",borderRadius:20,padding:"3px 10px",fontFamily:"'DM Mono',monospace",flexShrink:0,marginLeft:10}}>{exercise.sure}</span>
                </div>
                <p style={{fontSize:12,color:"rgba(237,232,223,0.4)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.6,marginBottom:14,fontStyle:"italic"}}>{exercise.aciklama}</p>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {exercise.adimlar?.map((a,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:20,height:20,borderRadius:"50%",flexShrink:0,background:"rgba(93,214,168,0.12)",border:"0.5px solid rgba(93,214,168,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#5DD6A8",fontFamily:"'DM Mono',monospace",marginTop:1}}>{i+1}</div>
                      <p style={{fontSize:13,color:"rgba(237,232,223,0.65)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.55,flex:1}}>{a}</p>
                    </div>
                  ))}
                </div>
                {exercise.kapanis&&(
                  <div style={{marginTop:14,paddingTop:14,borderTop:"0.5px solid rgba(255,255,255,0.06)"}}>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:"italic",color:"rgba(245,200,66,0.6)",lineHeight:1.6}}>{exercise.kapanis}</p>
                  </div>
                )}
              </div>

              <div style={{padding:"14px 0 24px"}}>
                <button onClick={()=>setScreen("rating")} style={{width:"100%",padding:"15px",background:"rgba(93,214,168,0.12)",border:"0.5px solid rgba(93,214,168,0.35)",borderRadius:12,color:"#5DD6A8",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:"pointer",letterSpacing:"0.03em"}}>
                  Tamamladım ✓
                </button>
              </div>
            </div>
          )}

          {/* ════ PUANLAMA ════ */}
          {screen === "rating" && (
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 32px",animation:"fadeUp 0.5s ease both",textAlign:"center"}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,fontStyle:"italic",color:"#EDE8DF",lineHeight:1.3,marginBottom:10}}>Bugünü nasıl<br/>değerlendirirsin?</p>
              <p style={{fontSize:13,color:"rgba(237,232,223,0.35)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,marginBottom:36,lineHeight:1.6}}>Bu puanlar yol haritanı<br/>şekillendiriyor.</p>
              <div style={{display:"flex",gap:10}}>
                {[{v:1,e:"😔",l:"Zor geçti"},{v:2,e:"😐",l:"Fena değil"},{v:3,e:"🙂",l:"İyiydi"},{v:4,e:"✨",l:"Harikaydı"}].map(r=>(
                  <button key={r.v} className="lift" onClick={()=>completeDay(r.v)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"14px 10px",cursor:"pointer",minWidth:72}}>
                    <span style={{fontSize:24}}>{r.e}</span>
                    <span style={{fontSize:10,color:"rgba(237,232,223,0.4)",fontFamily:"'DM Sans',sans-serif",lineHeight:1.3,textAlign:"center"}}>{r.l}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ════ HAFTALıK ÖZET ════ */}
          {screen === "weekly_summary" && profile && (
            <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 24px",overflow:"hidden",animation:"fadeUp 0.6s ease both"}}>
              
              {/* Üst bar */}
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:22}}>
                <span style={{fontSize:24}}>{journey?.emoji}</span>
                <div>
                  <p style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(245,200,66,0.5)",fontFamily:"'DM Sans',sans-serif",marginBottom:2}}>Bu haftayı tamamladın</p>
                  <p style={{fontSize:13,color:"#EDE8DF",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>{journey?.title}</p>
                </div>
              </div>

              {/* Hafta teması */}
              <div style={{background:journey?.color.soft,border:`0.5px solid ${journey?.color.border}`,borderRadius:14,padding:"14px 16px",marginBottom:18}}>
                <p style={{fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color:journey?.color.main,opacity:0.65,fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>Bu haftanın teması</p>
                <p style={{fontSize:13,color:"rgba(237,232,223,0.7)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.6}}>{journey?.weeks[profile.weekIdx]?.title}</p>
              </div>

              {/* Puanlar — 7 gün gösteriliyor */}
              <div style={{marginBottom:18}}>
                <p style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(237,232,223,0.35)",fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>Günlük puanlar</p>
                <div style={{display:"flex",gap:4,alignItems:"flex-end",height:40}}>
                  {profile.ratings.slice(-7).map((r,i)=>{
                    const emoji = r===1?"😔":r===2?"😐":r===3?"🙂":"✨";
                    return (
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                        <div style={{width:"100%",height:`${(r/4)*35+5}px`,background:journey?.color.main,borderRadius:4,opacity:0.6+(r/4)*0.4,transition:"all 0.3s"}}/>
                        <span style={{fontSize:10}}>{emoji}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Haftalık içgörü */}
              <div style={{background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"14px 16px",marginBottom:20,flex:1}}>
                <p style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(245,200,66,0.5)",fontFamily:"'DM Sans',sans-serif",marginBottom:8}}>Haftalık içgörü</p>
                <p style={{fontSize:13,color:"rgba(237,232,223,0.65)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.65,fontStyle:"italic"}}>
                  {weeklyLoading ? "Haftalık özet hazırlanıyor..." : weeklyData?.insight || "Bu hafta için teşekkürler!"}
                </p>
              </div>

              {/* Sonraki hafta */}
              {profile.weekIdx + 1 < journey?.weeks.length && (
                <div style={{background:journey?.color.soft,border:`0.5px solid ${journey?.color.border}`,borderRadius:12,padding:"12px 14px",marginBottom:16}}>
                  <p style={{fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:journey?.color.main,opacity:0.65,fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>Sonraki hafta</p>
                  <p style={{fontSize:12,color:"rgba(237,232,223,0.7)",fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>{journey?.weeks[profile.weekIdx + 1]?.title}</p>
                </div>
              )}

              {/* Devam et */}
              <button onClick={()=>{setScreen("morning");setMood(null);setExercise(null);setRating(null);setWeeklyData(null);}} style={{width:"100%",padding:"14px",background:journey?.color.soft,border:`0.5px solid ${journey?.color.border}`,borderRadius:12,color:journey?.color.main,fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,cursor:"pointer",letterSpacing:"0.03em",transition:"all 0.2s"}}>
                Devam et →
              </button>
            </div>
          )}

          {/* ════ KAPANIŞ ════ */}
          {screen === "done" && (
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 36px",animation:"fadeUp 0.5s ease both",textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:20}}>{rating>=3?"🌱":"💙"}</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,fontStyle:"italic",color:"#EDE8DF",lineHeight:1.3,marginBottom:12}}>
                {rating>=3?"Bugün için teşekkürler.":"Zor günler de geçer."}
              </p>
              <p style={{fontSize:13,color:"rgba(237,232,223,0.38)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.7,marginBottom:16}}>
                {rating>=3?"Küçük adımlar birikir. Yarın da burada olacağız.":"Burada olmak zaten bir şey. Yarın tekrar deneriz."}
              </p>
              {/* İlerleme özeti */}
              {profile && (
                <div style={{background:journey?.color.soft,border:`0.5px solid ${journey?.color.border}`,borderRadius:12,padding:"12px 16px",marginBottom:32,width:"100%"}}>
                  <p style={{fontSize:10,color:journey?.color.main,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:6,opacity:0.7}}>{journey?.title}</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <p style={{fontSize:13,color:"rgba(237,232,223,0.55)",fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>{profile.day - 1}. gün tamamlandı</p>
                    {/* Son 7 günün puan grafiği — küçük barlar */}
                    <div style={{display:"flex",gap:3,alignItems:"flex-end"}}>
                      {profile.ratings.slice(-7).map((r,i)=>(
                        <div key={i} style={{width:6,borderRadius:2,background:journey?.color.main,opacity:0.5+(r/4)*0.5,height:`${(r/4)*20+4}px`,transition:"height 0.3s"}}/>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <button onClick={resetMorning} style={{background:"rgba(245,200,66,0.1)",border:"0.5px solid rgba(245,200,66,0.3)",borderRadius:12,padding:"13px 32px",color:"#F5C842",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,cursor:"pointer",letterSpacing:"0.05em"}}>
                Ana sayfaya dön
              </button>
            </div>
          )}

          {/* ════ BUGÜN ZATEN YAPILDI ════ */}
          {screen === "already_done" && (
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 36px",animation:"fadeUp 0.6s ease both",textAlign:"center"}}>
              <div style={{fontSize:44,marginBottom:20}}>✓</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,fontStyle:"italic",color:"#EDE8DF",lineHeight:1.3,marginBottom:12}}>
                Bugün zaten<br/>buradasın.
              </p>
              <p style={{fontSize:13,color:"rgba(237,232,223,0.38)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,lineHeight:1.7,marginBottom:32}}>
                Günlük egzersizini tamamladın.<br/>Yarın tekrar görüşürüz.
              </p>
              {profile && (
                <div style={{background:journey?.color.soft,border:`0.5px solid ${journey?.color.border}`,borderRadius:12,padding:"14px 16px",width:"100%",marginBottom:24}}>
                  <p style={{fontSize:10,color:journey?.color.main,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:6,opacity:0.7}}>{journey?.title}</p>
                  <p style={{fontSize:13,color:"rgba(237,232,223,0.55)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,marginBottom:8}}>Bu haftanın teması</p>
                  <p style={{fontSize:14,color:"rgba(237,232,223,0.7)",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>{journey?.weeks[profile.weekIdx]?.title}</p>
                </div>
              )}
              {/* Yine de yapmak isterse */}
              <button onClick={resetMorning} style={{background:"rgba(255,255,255,0.05)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"12px 28px",color:"rgba(237,232,223,0.4)",fontFamily:"'DM Sans',sans-serif",fontSize:12,cursor:"pointer"}}>
                Yine de bir egzersiz yapmak istiyorum
              </button>
            </div>
          )}

          {/* Home bar */}
          <div style={{width:110,height:4,background:"rgba(255,255,255,0.1)",borderRadius:2,margin:"0 auto 14px",flexShrink:0}}/>
        </div>
      </div>
    </>
  );
}
