# AI камер — тохиргоо (Supabase талд хийх зүйлс)

AI камер дэлгэц нь жинхэнэ камер нээж, зураг авч, OpenAI Vision-оор
танаж, үр дүнг **Supabase**-д хадгалдаг. Кодыг бүрэн бичсэн — чи зөвхөн
доорх 2 алхмыг Supabase дээр хийнэ.

## 1. SQL ажиллуулах

Supabase Dashboard → **SQL Editor** → **New query** руу ороод
[`supabase/schema.sql`](supabase/schema.sql) доторх бүх кодыг хуулж тавиад
**Run** дар. Энэ нь:

- `public.scans` хүснэгт үүсгэнэ (таньсан газар бүрийн мэдээлэл),
- хурдан хайлтын индекс нэмнэ,
- RLS (row level security) бодлого тавина (анонимаар унших/нэмэх),
- `scans` нэртэй **Storage bucket** (public) үүсгэж зургийн бодлого тавина.

## 2. .env шалгах

`.env` дотор дараах 3 түлхүүр байх ёстой (одоо байгаа):

```
OPENAI_KEY=...                              # сервер талд л ашиглана, нууц
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

> ⚠️ `OPENAI_KEY` нь `NEXT_PUBLIC_` биш тул браузерт хэзээ ч задрахгүй —
> зөвхөн `/api/scan` серверийн route дотор уншигдана.

## 3. Туршиж үзэх

```bash
npm run dev
```

Камер нь **HTTPS эсвэл localhost** дээр л ажиллана (браузерын дүрэм).
Утсан дээр туршихдаа `npm run dev -- -H 0.0.0.0` ажиллуулаад `https`
tunnel (жишээ нь `ngrok`, эсвэл Vercel deploy) ашигла.

---

## Хэрхэн ажилладаг (архитектур)

| Давхарга | Файл | Үүрэг |
|---|---|---|
| Камер | `lib/camera/useCamera.ts` | Арын камер нээх/хаах, эрхийн алдаа |
| Зураг | `lib/camera/captureFrame.ts` | Frame → 1024px JPEG (хэмжээ багасгана) |
| AI | `app/api/scan/route.ts` + `lib/ai/*` | OpenAI Vision, rate-limit, JSON schema |
| Хадгалалт | `lib/camera/storage.ts` + `useScans.ts` | Storage upload + DB бичих/унших |
| Зохион байгуулалт | `lib/camera/useScanner.ts` | capture → recognise → save урсгал |
| UI | `components/nomad/camera/*` | Viewport, үр дүн, түүх, эрхийн дэлгэц |

## Мянган хэрэглэгчид зориулсан тэмдэглэл

- **Зураг багасгалт** — клиент талд 1024px болгож шахна → upload/AI зардал бага.
- **Rate-limit** — IP тус бүр минутад 12 scan (`lib/ai/rateLimit.ts`). Олон
  серверт scale хийх бол Upstash Redis / Vercel KV руу залга (interface адил).
- **Storage шууд** — браузер → Supabase Storage руу шууд upload хийдэг тул
  манай Next сервер дээр ачаалал унахгүй.
- **Найдвартай байдал** — Supabase унавал ч таних үр дүн хэрэглэгчид
  харагдсаар байна (зөвхөн түүхэнд орохгүй).
- **Хатууруулах** (заавал биш) — Supabase Auth нэмж RLS-ийг `auth.uid()`-р
  солих, эсвэл DB бичилтийг `service_role` түлхүүртэй серверээс хийх.
