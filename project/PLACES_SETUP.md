# AR "Ойролцоох газрууд" (10 км) — тохиргоо

AR горим одоо **бодит GPS** дээр суурилж, 10 км доторх газруудыг тэдгээрийн
**жинхэнэ компас чиглэлд** нь marker болгож гаргана. Гурван эх сурвалжийг нэг
давхарга дээр нэгтгэнэ:

1. **Bundled curated** — апп дотор шигдсэн 21 аймгийн төв + алдартай газрууд.
   _Юу ч тохируулахгүйгээр шууд ажиллана (офлайн ч)._
2. **Supabase (PostGIS)** — DB-аар удирддаг curated газрууд (заавал биш).
3. **Google Places (New)** — хотын ресторан, дэлгүүр, музей (заавал биш).

> Google key эсвэл Supabase тохируулаагүй ч **bundled curated дээр бүрэн
> ажиллана** — энэ нь хөдөө талын хамгийн чухал use case-ийг хангана.

## 1. Supabase (заавал биш, scale-д зориулсан)

Supabase SQL editor дээр дарааллаар ажиллуул:
1. [`supabase/places.sql`](supabase/places.sql) — PostGIS идэвхжүүлж, `places`
   хүснэгт, `nearby_places(user_lat, user_lng, radius_m)` RPC, RLS (anon read) үүсгэнэ.
2. [`supabase/places-seed.sql`](supabase/places-seed.sql) — 21 аймаг + газруудыг оруулна.

Client нь одоо байгаа publishable (anon) key-ээр `rpc('nearby_places', …)` дууддаг —
10 км шүүлт DB тал дээр болж, frontend бүх газрыг татахгүй (мянган хэрэглэгчид хурдан).

## 2. Google Places (заавал биш)

`.env.local` дотор нэм:

```
GOOGLE_PLACES_API_KEY=...
```

Key зөвхөн серверийн [`/api/places/nearby`](src/app/api/places/nearby/route.ts) route
дотор уншигдана (CORS + key хамгаалалт). Places API (New) `places:searchNearby`-г
`X-Goog-FieldMask`-аар зөвхөн хэрэгтэй талбар асууж зардал хэмнэнэ. Key байхгүй бол
route хоосон жагсаалт буцаана.

## Хэрхэн ажилладаг

| Давхарга | Файл |
|---|---|
| GPS байршил (watchPosition) | `lib/offline/useGeolocation.ts` (дахин ашигласан) |
| Зай/чиглэл/гүн математик | [`lib/places/geo.ts`](src/lib/places/geo.ts) |
| Эх сурвалж нэгтгэх + 10км шүүх | [`lib/places/usePlaces.ts`](src/lib/places/usePlaces.ts), `sources.ts` |
| Компас heading + pitch + smoothing | `lib/ar/useArView.ts` (дахин ашигласан) |
| Marker projection (x/y/scale/opacity) | `lib/ar/projection.ts` + `geo.ts` |
| Офлайн cache | [`lib/places/cache.ts`](src/lib/places/cache.ts) (localStorage) |

## Туршилт (acceptance)

- **HTTPS/localhost** дээр AR таб → "AR эхлүүлэх" → камер/байршил/чиглэл зөвшөөр.
- Монголд (эсвэл Тэрэлж демо) бол 10 км доторх газрууд **бодит чиглэлд** гарна;
  утсыг эргүүлэхэд зөв зүгт хөдөлж, чичрэхгүй (smoothed).
- Хол газар жижиг/бүдэг, ойр газар том/тод. Дээш харахад marker доош гарна.
- Filter chip-ээр ангилал шүүгдэнэ. Marker tap → зай, алхах хугацаа,
  **Чиглүүлэх** (Google Maps), **AI хөтөч** (gpt-4o-mini).
- GPS татгалзсан / 10 км дотор хоосон бол **"Тэрэлжээр демо үзэх"** товч гарна.
- Desktop дээр компас байхгүй → **чирж тойрон харна**.
