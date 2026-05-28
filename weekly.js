// pages/api/weekly.js
// Haftalık özet için Claude API'ye çağrı yapıyor

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { journey, weekTheme, ratings } = req.body;

    if (!journey || !weekTheme || !ratings) {
      return res.status(400).json({ error: 'Eksik bilgi' });
    }

    const avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
    const trend = ratings.length >= 2
      ? ratings[ratings.length - 1] >= ratings[0] ? "yukarı" : "aşağı"
      : "stabil";

    const prompt = `Sen Anima adlı bir psikolojik dayanıklılık uygulamasının sıcak, anlayışlı ve hafif mizahlı asistanısın.

Kullanıcı bu haftayı şu yolculukta geçirdi:
- Yolculuk: "${journey.title}"
- Hafta teması: "${weekTheme.title}" — ${weekTheme.desc}
- Günlük puanlar: ${ratings.join(", ")}
- Ortalama puan: ${avg}/4
- Trend: ${trend}

Bu hafta hakkında sıcak, teşvik edici ve meraklandıran 1-2 cümle yaz. 
Ağır analiz yapma, sadece "bu hafta için teşekkürler, böyle gitmek güzel" tarzında bir yorum.
Dili kişisel ve yakın tut.

Yanıtın SADECE şu JSON formatında olsun, başka hiçbir şey ekleme:
{
  "insight": "1-2 cümle, sıcak ve teşvik edici yorum"
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.content?.find(b => b.type === "text")?.text || "";
    const insight = JSON.parse(text.replace(/```json|```/g, "").trim());

    res.status(200).json(insight);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Bir şeyler ters gitti" });
  }
}
