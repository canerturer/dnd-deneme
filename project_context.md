# 🎲 D&D 5e Nexus - Project Context & Documentation

Projenin tüm mimari yapısını, modüler modül bileşenlerini, veri şemalarını, senkronizasyon mekanizmalarını ve tüm işlevsel özelliklerini içeren teknik dokümantasyon dosyasıdır.

---

## 📌 1. Proje Genel Bakış (Project Overview)

**D&D 5e Nexus**, Dungeons & Dragons 5th Edition oyuncuları ve Zindan Efendileri (DM) için tasarlanmış web tabanlı, etkileşimli, canlı senkronize çalışan modern bir Karakter Kağıdı ve DM Yönetim Platformudur.

- **Frontend Teknolojileri**: Vanilla HTML5, CSS3 (Modern Glassmorphism & Custom Properties), Modern ES6 Modules (JavaScript).
- **Veri Depolama**: `localStorage` (Otomatik kaydetme, JSON dışa/içe aktarma).
- **Canlı Eşzamanlama (Live Sync)**: HTML5 `BroadcastChannel` API ve `storage` olayları (Çoklu sekme ve oyuncu-DM canlı veri akışı).
- **Tasarım Şeması**: Royal Purple & Arcane Silver Glassmorphic Dark Theme (`#0b0712`, `#1c122f`, `#a855f7`, `#f8fafc`).

---

## 🏗️ 2. Modüler Proje Klasör Yapısı (Directory Structure)

Monolitik yapı kırılarak sorumlulukların ayrılması (Separation of Concerns) ilkesine göre modüllere bölünmüştür:

```
dnd-character-sheet/
├── index.html               # Ana HTML5 uygulama yapısı & modal şablonları
├── style.css                # Royal Purple & Arcane Silver Glassmorphic Tema
├── feats.xlsx / feats.csv   # Feat MASTER kaynağı (Excel'de düzenlenir, site kodu bunu doğrudan okumaz)
├── project_context.md       # [Bu Dosya] Projenin tüm özelliklerini içeren teknik rehber
├── tools/
│   ├── build-feats.html     # feats.xlsx/csv → js/feats_data.js dönüştürücüsü (çift tıkla, sunucu gerekmez)
│   └── vendor/xlsx.full.min.js  # SheetJS (offline, .xlsx okumak için)
└── js/
    ├── main.js              # Uygulama giriş noktası (Entry Point & Event Orchestrator)
    ├── state.js             # Merkezi durum yönetimi, sabitler & hazır karakter şablonları
    ├── storage.js           # LocalStorage kalıcılığı, JSON İthalat/İhracat ve Otomatik Kaydetme
    ├── sync.js              # BroadcastChannel canlı sekme & parti davet linki senkronizasyonu
    ├── dice.js              # Etkileşimli Zar Atıcı motoru, Avantaj/Dezavantaj hesaplamaları
    ├── spells.js            # 1.-6. Seviye görsel büyü slotları ve Büyü Kitabı yönetimi
    ├── csv_parser.js        # CSV ayrıştırma ve dışa aktarma (Parse & Generate) motoru — homebrew Feat import/export için kullanılır
    ├── feats_data.js        # OTOMATİK ÜRETİLİR (tools/build-feats.html ile) — elle düzenlenmez
    ├── feats_ui.js          # Feat modalı, homebrew CSV içe/dışa aktarma, özel Feat ekleme formu & UI mantığı
    ├── resources.js         # Monk Ki, Fighter Manevra, Rage & Feat Sayaç Takipçisi (Short/Long Rest)
    ├── encounter.js         # DM Canlı Savaş Takipçisi, İnisiyatif Sıralayıcı & Canavar HP Motoru
    ├── dm-tools.js          # Rastgele NPC/Hazine üreticileri & DM Hızlı Kural Rehberi
    └── ui.js                # Otomatik istatistik hesaplamaları, DOM bağlamaları & sayfa çizimleri
```

**Feat verisini düzenleme akışı**: `feats.xlsx`'i Excel'de düzenle → `tools/build-feats.html`'i aç → dosyayı yükle → "Oluştur" → inen `feats_data.js`'i eskisinin üzerine kaydet → siteyi yenile. Ana site koduna dokunulmaz.

---

## 🚀 3. Detaylı Özellik Envanteri (Complete Feature Inventory)

### 🛡️ A. Oyuncu Karakter Kağıdı (Player Character Sheet)
1. **3 Kolonlu Otantik Yerleşim**:
   - **Sol Kolon**: İstatistik Skorları (STR, DEX, CON, INT, WIS, CHA), Kaydetme Atışları (Saving Throws), Beceri Listesi (Skills), Pasif Algı (Passive Perception), İlhamlılık (Inspiration), Yeterlilik Bonusu (Proficiency Bonus), Durum Etiketleri (Conditions), Yorgunluk (Exhaustion).
   - **Orta Kolon**: Dövüş Üçlüsü (AC, İnisiyatif, Hız), Can Paneli (Max HP, Current HP, Temp HP, Görsel Can Barı, Hızlı `-5, -1, +1, +5` Butonları), Can Zarları (Hit Dice), Ölüm Kaydetmeleri (Death Saves), Büyü Kitabı & Visual Spell Slot Grid, Silahlar & Saldırılar, Ekipman, Sikkeler (CP, SP, EP, GP, PP), Taşıma Kapasitesi & Uyum (Attunement).
   - **Sağ Kolon**: Kişilik Özellikleri (Personality Traits, Ideals, Bonds, Flaws), Sınıf Özellikleri ve Yetenekler (Features & Traits).
2. **Otomatik Matematik Motoru**:
   - İstatistiğe göre modifikatör hesaplama: `Math.floor((score - 10) / 2)`.
   - Saving Throws & Beceriler: Yeterlilik durumuna göre (`○` Yok, `●` Yeterli, `✪` Uzmanlık) otomatik bonus ekleme.
   - Pasif Bilgelik (Algı): `10 + Perception Bonus`.
   - Taşıma Kapasitesi: `STR * 15 lbs`.
   - Büyü Kaydetme DC: `8 + ProfBonus + SpellMod`.
   - Büyü Saldırı Bonusu: `ProfBonus + SpellMod`.
3. **🔮 Yenilenmiş 1.-6. Seviye Görsel Büyü Slotları**:
   - Her büyü seviyesi için görsel slot kartı.
   - Tıklanabilir parlayan küreler (`●` Kullanılabilir, `○` Harcanmış).
   - Büyü atıldığında otomatik slot düşme.
   - Long Rest'te tüm slotların yenilenmesi.
4. **☕ Short & Long Rest Motoru**:
   - **Kısa Dinlenme**: Hit Dice ve CON bonusu ile zar atıp can yenileme.
   - **Uzun Dinlenme**: Canın fullyenilenmesi, geçici can ve ölüm atışlarının sıfırlanması, tüm büyü slotlarının %100 dolması.
5. **🎲 Etkileşimli Zar Atıcı (Interactive Dice Roller)**:
   - d4, d6, d8, d10, d12, d20, d100 desteği.
   - d20 için Normal, Avantajlı (Advantage - 2d20'den yükseği) ve Dezavantajlı (Disadvantage - 2d20'den düşüğü) atış modu.
   - Stat, Beceri veya Silah yanındaki 🎲 butonuna basıldığında otomatik bonuslu zar atma.

---

### 👑 B. DM Dashboard & Kampanya Yönetimi (DM Screen)
1. **Parti Genel Görünüm Kartları (Party Roster)**:
   - Kampanyaya katılan tüm oyuncuların anlık Can Barı (%'lik renkli doluluk), AC, Hız, Pasif Algı ve 6 Temel Stat modifikatörleri.
   - **Canlı Büyü Slot Durumu**: `🔮 Büyü Slotları: L1: 3/4 L2: 2/2` etiketleri.
   - **Durum Etiketleri**: Karakterin aktif durumları (Zehirli, Kör, Konsantre vb.).
   - DM Özel Notları: Oyuncunun görmediği gizli not alanı.
   - İlhamlık Ver/Al butonu (Oyuncu kağıdıyla canlı senkronize).
2. **⚔️ Canlı Savaş & İnisiyatif Takibi (Combat Encounter Tracker)**:
   - Partideki oyuncular ile DM'in eklediği canavarların birleşik inisiyatif listesi.
   - Canavar Ekleme (`+ Düşman / Canavar Ekle`).
   - Otomatik İnisiyatif Zarları Atıp Yüksekten Düşüğe Sıralama.
   - `Sonraki Tur »` butonuyla sırası gelen savaşçıyı sarı çerçeve ile vurgulama ve Raund Sayacı takibi.
   - Canavar HP'sini hızlı eksiltip artırma butonları.
3. **🎲 Rastgele DM Üreticileri (Random Generators)**:
   - **Rastgele NPC**: İsim, ırk, meslek, mizaç ve gizli motivasyon üretici.
   - **Rastgele Hazine**: Sikkeler ve büyülü eşya/iksir üretici.
4. **📖 DM Hızlı Kural Rehberi (Cheat Sheet)**:
   - *Conditions (Durumlar)*, *Cover (Siper +2/+5 AC)* ve *Vision (Işık & Görüş)* kurallarına hızlı erişim sekmeleri.
5. **🎲 Canlı Zar Akışı Çekmecesi (Roll Feed Drawer)**:
   - Sağ altta açılır/kapanır canlı zar paneli. Atılan tüm zarlar oyuncu ismi ve detaylarıyla burada yayınlanır.

---

## 📡 4. Veri Senkronizasyonu & İletişim Mimarisi

- **BroadcastChannel API**: `dnd_campaign_channel` kanalı üzerinden çalışan 3 mesaj tipi:
  1. `CHARACTER_UPDATE`: Oyuncu verileri değiştiğinde DM paneline gönderilir.
  2. `DM_UPDATE`: DM bir oyuncuya İlhamlık verdiğinde oyuncu kağıdını günceller.
  3. `ROLL_EVENT`: Atılan her zar canlı zar akışı çekmecesine yayınlanır.
- **Davet Bağlantısı (Invite Link)**: `index.html?join=CAMP-XXXX` mantığıyla oyuncular tek tıkla karakterlerini DM'in kampanyasına bağlar.

---

## 💾 5. Veri Kaydetme ve Formatlar

- **Autosave**: Her girdi değişikliğinde 400ms debounced otomatik `localStorage` kaydı.
- **JSON Export/Import**: Karakter kağıdı `.json` dosyası olarak indirilebilir ve tekrar yüklenebilir.
