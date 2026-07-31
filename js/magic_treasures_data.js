/**
 * D&D 5e Magic Items Database (genel SRD tarzı bilgiden derlenmiştir — DMG'nin
 * birebir kopyası değildir; PHB 2024 sadece attunement/rarity kurallarını içerir,
 * eşya kataloğu içermez)
 * OTOMATİK ÜRETİLDİ — tools/build-feats.html ile magic-items.xlsx dosyasından oluşturuldu.
 * Elle düzenleme yapma; değişiklik için kaynak dosyayı düzenleyip aracı tekrar çalıştır.
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.MAGIC_ITEMS_LIST = [
  { "id": "potion-of-healing", "name": "Potion of Healing", "rarity": "Common", "category": "Potion", "attunement": false, "description": "İçildiğinde 2d4+2 can yenilersin." },
  { "id": "potion-of-climbing", "name": "Potion of Climbing", "rarity": "Common", "category": "Potion", "attunement": false, "description": "1 saat boyunca tırmanma hızın yürüme hızına eşitlenir ve tırmanırken düşme riskin azalır." },
  { "id": "spell-scroll-low", "name": "Spell Scroll (Cantrip / 1. Seviye)", "rarity": "Common", "category": "Scroll", "attunement": false, "description": "Parşömeldeki büyüyü hazırlamadan, bir kereliğine atabilirsin. Kullanınca tükenir." },
  { "id": "rope-of-mending", "name": "Rope of Mending", "rarity": "Common", "category": "Wondrous Item", "attunement": false, "description": "Kopan bu ip, iki ucunu birbirine yaklaştırdığında kendini onarır." },
  { "id": "bead-of-nourishment", "name": "Bead of Nourishment", "rarity": "Common", "category": "Wondrous Item", "attunement": false, "description": "Yutulduğunda bir günlük yiyecek ihtiyacını karşılar." },
  { "id": "candle-of-the-deep", "name": "Candle of the Deep", "rarity": "Common", "category": "Wondrous Item", "attunement": false, "description": "Su altında dahi sönmeyen, normal mumdan 6 kat uzun yanan büyülü mum." },
  { "id": "unbreakable-arrow", "name": "Unbreakable Arrow", "rarity": "Common", "category": "Ammunition", "attunement": false, "description": "Vurduktan sonra asla kırılmayan büyülü ok; her atıştan sonra geri toplanabilir." },
  { "id": "wand-of-secrets", "name": "Wand of Secrets", "rarity": "Common", "category": "Wand", "attunement": false, "description": "Aktive edildiğinde 30 fit içindeki gizli kapı veya geçitlerin yönünü hissettirir." },

  { "id": "bag-of-holding", "name": "Bag of Holding", "rarity": "Uncommon", "category": "Wondrous Item", "attunement": false, "description": "İçi dışından çok daha büyük olan bu torba 500 lb'ye kadar eşyayı, ağırlığını hissettirmeden taşır." },
  { "id": "cloak-of-protection", "name": "Cloak of Protection", "rarity": "Uncommon", "category": "Wondrous Item", "attunement": true, "description": "Takarken Zırh Sınıfına (AC) ve tüm kurtarma atışlarına +1 bonus verir." },
  { "id": "ring-of-protection", "name": "Ring of Protection", "rarity": "Uncommon", "category": "Ring", "attunement": true, "description": "Takarken Zırh Sınıfına (AC) ve tüm kurtarma atışlarına +1 bonus verir." },
  { "id": "boots-of-elvenkind", "name": "Boots of Elvenkind", "rarity": "Uncommon", "category": "Wondrous Item", "attunement": false, "description": "Bu botlarla sessizce yürürsün; hareket ederken Stealth (Gizlenme) kontrollerinde avantaj kazanırsın." },
  { "id": "cloak-of-elvenkind", "name": "Cloak of Elvenkind", "rarity": "Uncommon", "category": "Wondrous Item", "attunement": true, "description": "Kukuletası takılıyken Stealth kontrollerinde avantaj sağlar ve seni görmeye çalışan Algı kontrollerini zorlaştırır." },
  { "id": "wand-of-magic-missiles", "name": "Wand of Magic Missiles", "rarity": "Uncommon", "category": "Wand", "attunement": true, "description": "1d4+1 yükle gelir; her yük harcanarak Magic Missile büyüsü atılabilir. Long Rest'te 1d6+1 yük yeniler." },
  { "id": "weapon-plus-1", "name": "+1 Silah", "rarity": "Uncommon", "category": "Weapon", "attunement": false, "description": "Bu büyülü silahla yapılan vuruş ve hasar atışlarına +1 bonus eklenir." },
  { "id": "armor-plus-1", "name": "+1 Zırh", "rarity": "Uncommon", "category": "Armor", "attunement": false, "description": "Bu zırhı giyerken Zırh Sınıfına (AC) +1 bonus eklenir." },
  { "id": "sentinel-shield", "name": "Sentinel Shield", "rarity": "Uncommon", "category": "Armor", "attunement": false, "description": "Bu kalkanı taşırken Algı (Perception) yeteneğinde uzmanlık kazanır ve asla sürpriz saldırıya uğramazsın." },
  { "id": "winged-boots", "name": "Winged Boots", "rarity": "Uncommon", "category": "Wondrous Item", "attunement": true, "description": "Günde toplam 4 saate kadar, yürüme hızınla eşit bir Uçuş hızı kazandırır." },

  { "id": "weapon-plus-2", "name": "+2 Silah", "rarity": "Rare", "category": "Weapon", "attunement": false, "description": "Bu büyülü silahla yapılan vuruş ve hasar atışlarına +2 bonus eklenir." },
  { "id": "armor-plus-2", "name": "+2 Zırh", "rarity": "Rare", "category": "Armor", "attunement": false, "description": "Bu zırhı giyerken Zırh Sınıfına (AC) +2 bonus eklenir." },
  { "id": "flame-tongue", "name": "Flame Tongue", "rarity": "Rare", "category": "Weapon", "attunement": true, "description": "Bonus aksiyonla alevlendirilebilen bu kılıç, aktifken vuruşlarına ekstra 2d6 ateş hasarı ve parlak ışık ekler." },
  { "id": "wand-of-fireballs", "name": "Wand of Fireballs", "rarity": "Rare", "category": "Wand", "attunement": true, "description": "7 yükle gelir; bir yük harcanarak 3. seviye Fireball büyüsü atılabilir, fazla yükle hasar artar." },
  { "id": "boots-of-speed", "name": "Boots of Speed", "rarity": "Rare", "category": "Wondrous Item", "attunement": true, "description": "Bonus aksiyonla aktive edildiğinde 10 dakika boyunca hızını iki katına çıkarır ve fırsat saldırılarına karşı avantaj sağlar." },
  { "id": "amulet-of-health", "name": "Amulet of Health", "rarity": "Rare", "category": "Wondrous Item", "attunement": true, "description": "Takıldığı sürece Dayanıklılık (CON) skorunu 19'a sabitler." },
  { "id": "headband-of-intellect", "name": "Headband of Intellect", "rarity": "Rare", "category": "Wondrous Item", "attunement": true, "description": "Takıldığı sürece Zeka (INT) skorunu 19'a sabitler." },
  { "id": "bracers-of-defense", "name": "Bracers of Defense", "rarity": "Rare", "category": "Wondrous Item", "attunement": true, "description": "Zırh ve kalkan giymiyorken Zırh Sınıfına (AC) +2 bonus verir." },
  { "id": "rod-of-absorption", "name": "Rod of Absorption", "rarity": "Rare", "category": "Rod", "attunement": true, "description": "Sana yönelik büyü hasarını emip depolayabilir; depolanan enerjiyi kendi büyü slotlarını doldurmak için kullanabilirsin." },
  { "id": "ring-of-spell-storing", "name": "Ring of Spell Storing", "rarity": "Rare", "category": "Ring", "attunement": true, "description": "İçine toplam 5 seviyeye kadar büyü depolanabilir; taşıyan kişi depolanan büyüleri kendi büyüsüymüş gibi atabilir." },

  { "id": "weapon-plus-3", "name": "+3 Silah", "rarity": "Very Rare", "category": "Weapon", "attunement": false, "description": "Bu büyülü silahla yapılan vuruş ve hasar atışlarına +3 bonus eklenir." },
  { "id": "armor-plus-3", "name": "+3 Zırh", "rarity": "Very Rare", "category": "Armor", "attunement": false, "description": "Bu zırhı giyerken Zırh Sınıfına (AC) +3 bonus eklenir." },
  { "id": "staff-of-fire", "name": "Staff of Fire", "rarity": "Very Rare", "category": "Staff", "attunement": true, "description": "10 yükle gelir; Fireball, Wall of Fire gibi ateş büyülerini atabilirsin. Taşıyan kişi ateşe bağışıklık kazanır." },
  { "id": "cloak-of-displacement", "name": "Cloak of Displacement", "rarity": "Very Rare", "category": "Wondrous Item", "attunement": true, "description": "Gerçek konumundan biraz kaymış görünürsün; sana yönelik saldırılar dezavantajlı olur (isabet alana kadar)." },
  { "id": "ring-of-regeneration", "name": "Ring of Regeneration", "rarity": "Very Rare", "category": "Ring", "attunement": true, "description": "Takan kişi her dakika başı 1d6 can yeniler; kesilen uzuvlar bile zamanla yeniden büyüyebilir." },
  { "id": "manual-of-bodily-health", "name": "Manual of Bodily Health", "rarity": "Very Rare", "category": "Wondrous Item", "attunement": false, "description": "Bu kitabı okuyup içindeki talimatları 48 saat boyunca uygulayan kişinin Dayanıklılık (CON) skoru kalıcı olarak +2 artar. Kitap sonra gücünü kaybeder." },

  { "id": "vorpal-sword", "name": "Vorpal Sword", "rarity": "Legendary", "category": "Weapon", "attunement": true, "description": "Doğal 20 atışıyla vurduğunda, hedef baş kesilmesine dayanıklı değilse anında öldürülür." },
  { "id": "staff-of-the-magi", "name": "Staff of the Magi", "rarity": "Legendary", "category": "Staff", "attunement": true, "description": "En güçlü büyü asalarından biri; büyü emme, ek büyü slotu ve Fireball/Lightning Bolt gibi güçlü büyüleri atabilme yeteneği verir." },
  { "id": "armor-of-invulnerability", "name": "Armor of Invulnerability", "rarity": "Legendary", "category": "Armor", "attunement": true, "description": "Fiziksel (kesici/delici/ezici) hasara direnç sağlar; günde bir kez, 10 dakikalığına tüm fiziksel hasara tam bağışıklık kazandırır." },
  { "id": "deck-of-many-things", "name": "Deck of Many Things", "rarity": "Legendary", "category": "Wondrous Item", "attunement": false, "description": "13 kartlık büyülü bir deste. Bir kart çekmek, iyi ya da kötü, karakterin kaderini kalıcı olarak değiştirebilecek rastgele ve güçlü bir etki tetikler. Çok risklidir." }
];
