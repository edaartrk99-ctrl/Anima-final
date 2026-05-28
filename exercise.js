// pages/api/exercise.js
// Bu endpoint Frontend'in çağırdığı istek alır,
// Claude API'ye gönderir ve sonuç döner.
// API Key backend'te gizli tutuluyor.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mood, journey, weekTheme, day, ratings } = req.body;

    if (!mood || !journey || !weekTheme) {
      return res.status(400).json({ error: 'Eksik bilgi' });
    }

    // Adaptif plan — son 3 günün ortalaması
    const recent = ratings?.slice(-3) || [];
    const avg = recent.length ? (recent.reduce((a, b) => a + b, 0) / recent.length).toFixed(1) : null;
    const adapt = avg && parseFloat(avg) <= 2
      ? "Kullanıcı son günlerde zorlandı. Egzersizi daha kısa ve hafif tut — 3-5 dakika, tek bir küçük adım yeterli."
      : avg && parseFloat(avg) >= 3.5
        ? "Kullanıcı iyi gidiyor. Biraz daha derine inebilirsin."
        : "";

    const moodLabel = mood; // Frontend'den hazır label geliyor

    const prompt = `Sen Anima adlı bir psikolojik dayanıklılık uygulamasının sıcak, anlayışlı ve hafif mizahlı asistanısın.
Terapi dili kullanmıyorsun — bir arkadaş gibi konuşuyorsun.
Ağır yüzleştirme yapmıyorsun. Yargılamıyorsun. Merak uyandırıyorsun.
Self-help kitabı tarzında, ACT ve BDT ilkelerinden ilham alan ama klinik olmayan bir dil kullanıyorsun.

Kullanıcı bilgileri:
- Bugün kendini "${moodLabel}" hissediyor
- Aktif yolculuğu: "${journey.title}"
- Bu haftanın teması: "${weekTheme.title}" — ${weekTheme.desc}
- Yolculukta ${day}. gün
${adapt ? `- Not: ${adapt}` : ""}

Buna uygun bir günlük egzersiz öner. Egzersiz o günkü duyguyu kabul ederek başlamalı,
sonra yavaşça bu haftanın temasına dokunmalı.

Yanıtın SADECE şu JSON formatında olsun, başka hiçbir şey ekleme:
{
  "yorum": "Kullanıcının duygusunu kabul eden, sıcak ve hafif mizahlı 1-2 cümle",
  "tema": "Bugünün egzersiz teması — 3-5 kelime",
  "egzersiz_adi": "Egzersizin ilgi çekici, kısa adı",
  "sure": "5-10 dakika",
  "aciklama": "Neden bu egzersiz — merak uyandıran 1 cümle, yargısız",
  "adimlar": ["Adım 1 — somut ve nazik", "Adım 2", "Adım 3"],
  "kapanis": "Umut dolu, sıcak bir kapanış cümlesi"
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // Backend'te güvenli
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.content?.find(b => b.type === "text")?.text || "";
    const exercise = JSON.parse(text.replace(/```json|```/g, "").trim());

    res.status(200).json(exercise);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Bir şeyler ters gitti" });
  }
}
