# 🚀 ANIMA — Vercel'e Hazır Paket

Bu klasör **doğrudan Vercel'e deploy edilebilir.**

---

## 📱 Hızlı Başlangıç

### Lokal Test (Opsiyonel)

```bash
npm install
npm run dev
```

Tarayıcıda: `http://localhost:3000`

---

### Vercel'e Deploy

1. GitHub'a push et:
```bash
git init
git add .
git commit -m "Anima - Ready to deploy"
git remote add origin https://github.com/YOUR_USERNAME/anima-app.git
git push -u origin main
```

2. Vercel.com → New Project → anima-app seç

3. Environment Variable ekle:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Senin API key'i

4. Deploy!

---

## ✅ Bitti!

URL'nin Vercel'den geliyor, aç ve test et! 🎉

---

**Sorun olursa:** Logs'u kontrol et (Vercel Dashboard → Deployments → Logs)
