/**
 * D&D 5e Nexus - Classes Database (2024 PHB)
 * Official 12 D&D 5e Core Classes data, Hit Dice, Primary Stats, and Saving Throw Proficiencies.
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.CLASSES_DATA = [
  {
    id: "barbarian",
    name: "Barbar (Barbarian)",
    icon: "😡",
    hitDie: 12,
    hitDieStr: "d12",
    primaryStats: ["STR"],
    savingThrows: ["save-str", "save-con"],
    savingThrowsStr: "STR & CON",
    spellAbility: null,
    isCaster: false,
    shortDesc: "Vahşi öfke, durdurulamaz dayanıklılık ve yakın dövüş şiddetinde uzmanlaşmış ön saf savaşçısı."
  },
  {
    id: "bard",
    name: "Ozan (Bard)",
    icon: "🎵",
    hitDie: 8,
    hitDieStr: "d8",
    primaryStats: ["CHA"],
    savingThrows: ["save-dex", "save-cha"],
    savingThrowsStr: "DEX & CHA",
    spellAbility: "cha",
    isCaster: true,
    shortDesc: "Müzik, ilham büyüleri ve çok yönlü becerilerle müttefiklerini coşturan büyü uzmanı."
  },
  {
    id: "cleric",
    name: "Ruhban (Cleric)",
    icon: "✝️",
    hitDie: 8,
    hitDieStr: "d8",
    primaryStats: ["WIS"],
    savingThrows: ["save-wis", "save-cha"],
    savingThrowsStr: "WIS & CHA",
    spellAbility: "wis",
    isCaster: true,
    shortDesc: "Tanrıların ilahi gücü, iyileştirme büyüleri ve kutsal gazapla donanmış inanç savaşçısı."
  },
  {
    id: "druid",
    name: "Druid (Doğa Rahibi)",
    icon: "🍃",
    hitDie: 8,
    hitDieStr: "d8",
    primaryStats: ["WIS"],
    savingThrows: ["save-int", "save-wis"],
    savingThrowsStr: "INT & WIS",
    spellAbility: "wis",
    isCaster: true,
    shortDesc: "Doğanın dengesini koruyan, hayvan biçimlerine dönüşebilen ve elemental büyücülük yapan şaman."
  },
  {
    id: "fighter",
    name: "Savaşçı (Fighter)",
    icon: "⚔️",
    hitDie: 10,
    hitDieStr: "d10",
    primaryStats: ["STR", "DEX"],
    savingThrows: ["save-str", "save-con"],
    savingThrowsStr: "STR & CON",
    spellAbility: null,
    isCaster: false,
    shortDesc: "Tüm silah ve zırhlarda ustalaşmış, disiplinli ve yüksek hasar veren dövüş ustası."
  },
  {
    id: "monk",
    name: "Keşiş (Monk)",
    icon: "☯️",
    hitDie: 8,
    hitDieStr: "d8",
    primaryStats: ["DEX", "WIS"],
    savingThrows: ["save-str", "save-dex"],
    savingThrowsStr: "STR & DEX",
    spellAbility: null,
    isCaster: false,
    shortDesc: "İçsel Ki enerjisini kullanarak silahsız, hızlı ve akrobatik dövüş sanatları icra eden usta."
  },
  {
    id: "paladin",
    name: "Paladin (Şövalye)",
    icon: "🛡️",
    hitDie: 10,
    hitDieStr: "d10",
    primaryStats: ["STR", "CHA"],
    savingThrows: ["save-wis", "save-cha"],
    savingThrowsStr: "WIS & CHA",
    spellAbility: "cha",
    isCaster: true,
    shortDesc: "Kutsal yeminler etmiş, ilahi darbeler (Divine Smite) vuran ve aura koruması sağlayan şövalye."
  },
  {
    id: "ranger",
    name: "Korucu (Ranger)",
    icon: "🏹",
    hitDie: 10,
    hitDieStr: "d10",
    primaryStats: ["DEX", "WIS"],
    savingThrows: ["save-str", "save-dex"],
    savingThrowsStr: "STR & DEX",
    spellAbility: "wis",
    isCaster: true,
    shortDesc: "Vahşi doğada iz süren, okçuluk ve avcılık büyülerinde uzmanlaşmış keskin nişancı."
  },
  {
    id: "rogue",
    name: "Hırsız / Düzenbaz (Rogue)",
    icon: "🗡️",
    hitDie: 8,
    hitDieStr: "d8",
    primaryStats: ["DEX"],
    savingThrows: ["save-dex", "save-int"],
    savingThrowsStr: "DEX & INT",
    spellAbility: null,
    isCaster: false,
    shortDesc: "Gizlilik, kilit açma, tuzak etkisizleştirme ve ölümcül Sneak Attack vurma ustası."
  },
  {
    id: "sorcerer",
    name: "Soysoylu (Sorcerer)",
    icon: "⚡",
    hitDie: 6,
    hitDieStr: "d6",
    primaryStats: ["CHA"],
    savingThrows: ["save-con", "save-cha"],
    savingThrowsStr: "CON & CHA",
    spellAbility: "cha",
    isCaster: true,
    shortDesc: "Kanında doğuştan gelen ejderha veya kaos büyüsü taşıyan ve Metamagic ile büyüleri bükebilen büyücü."
  },
  {
    id: "warlock",
    name: "Efsunbaz (Warlock)",
    icon: "🔮",
    hitDie: 8,
    hitDieStr: "d8",
    primaryStats: ["CHA"],
    savingThrows: ["save-wis", "save-cha"],
    savingThrowsStr: "WIS & CHA",
    spellAbility: "cha",
    isCaster: true,
    shortDesc: "Kadim varlıklarla (Fiend, Fey, Great Old One) anlaşma yaparak gizemli büyü gücü elde eden efsunbaz."
  },
  {
    id: "wizard",
    name: "Büyücü / Bilgin (Wizard)",
    icon: "📜",
    hitDie: 6,
    hitDieStr: "d6",
    primaryStats: ["INT"],
    savingThrows: ["save-int", "save-wis"],
    savingThrowsStr: "INT & WIS",
    spellAbility: "int",
    isCaster: true,
    shortDesc: "Büyü kitabına yüzlerce büyü yazabilen, yoğun akademik araştırma yapmış en kudretli büyü ustası."
  }
];
