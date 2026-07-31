/**
 * D&D 5e Nexus - Central State & Constants Module
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.SAVING_THROWS_DATA = [
  { id: 'save-str', stat: 'str', label: 'Strength (Güç)' },
  { id: 'save-dex', stat: 'dex', label: 'Dexterity (El Çabukluğu)' },
  { id: 'save-con', stat: 'con', label: 'Constitution (Dayanıklılık)' },
  { id: 'save-int', stat: 'int', label: 'Intelligence (Zeka)' },
  { id: 'save-wis', stat: 'wis', label: 'Wisdom (Bilgelik)' },
  { id: 'save-cha', stat: 'cha', label: 'Charisma (Karizma)' }
];

window.DnDNexus.SKILLS_DATA = [
  { id: 'skill-acrobatics', stat: 'dex', label: 'Acrobatics (Akrobasi)' },
  { id: 'skill-animal', stat: 'wis', label: 'Animal Handling (Hayvan Terbiyesi)' },
  { id: 'skill-arcana', stat: 'int', label: 'Arcana (Mistik Sırlar)' },
  { id: 'skill-athletics', stat: 'str', label: 'Athletics (Atletizm)' },
  { id: 'skill-deception', stat: 'cha', label: 'Deception (Kandırma)' },
  { id: 'skill-history', stat: 'int', label: 'History (Tarih)' },
  { id: 'skill-insight', stat: 'wis', label: 'Insight (Sezgi)' },
  { id: 'skill-intimidation', stat: 'cha', label: 'Intimidation (Gözdağı)' },
  { id: 'skill-investigation', stat: 'int', label: 'Investigation (Soruşturma)' },
  { id: 'skill-medicine', stat: 'wis', label: 'Medicine (Tıp)' },
  { id: 'skill-nature', stat: 'int', label: 'Nature (Doğa)' },
  { id: 'skill-perception', stat: 'wis', label: 'Perception (Algı)' },
  { id: 'skill-performance', stat: 'cha', label: 'Performance (Gösteri)' },
  { id: 'skill-persuasion', stat: 'cha', label: 'Persuasion (Ikna)' },
  { id: 'skill-religion', stat: 'int', label: 'Religion (Din)' },
  { id: 'skill-sleight', stat: 'dex', label: 'Sleight of Hand (El Çabukluğu)' },
  { id: 'skill-stealth', stat: 'dex', label: 'Stealth (Gizlilik)' },
  { id: 'skill-survival', stat: 'wis', label: 'Survival (Hayatta Kalma)' }
];

window.DnDNexus.RULES_DATA = {
  conditions: `
    <strong>🛡️ DURUM EFEKTLERİ (CONDITIONS):</strong><br><br>
    • <strong>Poisoned:</strong> Saldırı ve beceri zarlarında dezavantaj.<br>
    • <strong>Blinded:</strong> Görüş gerektiren zarlar başarısız. Saldırılarda dezavantaj.<br>
    • <strong>Prone:</strong> Kalkmak için hızın yarısı harcanır. Yakın dövüş sana avantajlı.<br>
    • <strong>Invisible:</strong> Gizlenmede avantaj. Sana yapılan saldırılar dezavantajlı.<br>
    • <strong>Stunned:</strong> Eylem ve hareket yapamaz. STR/DEX kaydetmelerini kaybet.
  `,
  cover: `
    <strong>🛡️ SİPER KURALLARI (COVER):</strong><br><br>
    • <strong>Half Cover:</strong> AC ve DEX zarlarına <strong>+2 Bonus</strong>.<br>
    • <strong>3/4 Cover:</strong> AC ve DEX zarlarına <strong>+5 Bonus</strong>.<br>
    • <strong>Total Cover:</strong> Doğrudan büyü veya saldırı yapılamaz.
  `,
  vision: `
    <strong>👁️ IŞIK VE GÖRÜŞ:</strong><br><br>
    • <strong>Bright Light:</strong> Normal görüş.<br>
    • <strong>Dim Light:</strong> Perception (Algı) zarlarında dezavantaj.<br>
    • <strong>Darkness:</strong> Kör (Blinded) durumu geçerlidir.
  `
};

window.DnDNexus.PRESETS = {
  fighter: {
    "char-id": "char-fighter-01",
    "char-name": "Thorin Ironfist",
    "char-class-level": "Savaşçı 3 (Fighter)",
    "char-background": "Asker", "char-player-name": "Ahmet", "char-race": "Dağ Cücesi", "char-alignment": "Sadık Tarafsız", "char-xp": 900,
    "str-score": 16, "dex-score": 12, "con-score": 16, "int-score": 10, "wis-score": 13, "cha-score": 8,
    "ac-score": 18, "speed-score": "7.5m (25ft)", "hp-max": 28, "hp-current": 28, "hp-temp": 0,
    "hitdice-total": "3d10", "hitdice-current": "3d10",
    "save-str-prof": true, "save-con-prof": true,
    "skill-athletics-prof": 1, "skill-intimidation-prof": 1, "skill-perception-prof": 1, "skill-survival-prof": 1,
    "weapons": [{ name: "Greatsword", bonus: "+5", damage: "2d6+3 Kesici" }, { name: "Handaxe", bonus: "+5", damage: "1d6+3 Kesici" }],
    "spells": [], "attack-notes": "Fighting Style: Defense (+1 AC dahil).", "coin-gp": 45,
    "equipment-list": "Levha Zırh, Çift el kılıç, 2x Fırlatma baltası.", "features-traits": "• Second Wind\n• Action Surge",
    "feats": [{ "id": "savage-attacker", "name": "Savage Attacker", "category": "Origin Feat", "prerequisite": "Level 1", "description": "Once per turn when you hit with a weapon, you can roll damage twice and use the higher roll." }],
    "trackers": [{ "id": "fighter-maneuvers", "name": "⚔️ Superiority / Manevra Zarı (Fighter)", "max": 4, "current": 4, "reset": "short", "category": "Fighter" }]
  },
  wizard: {
    "char-id": "char-wizard-02",
    "char-name": "Elysia Starweaver",
    "char-class-level": "Büyücü 3 (Wizard)",
    "char-background": "Bilgin", "char-player-name": "Zeynep", "char-race": "Yüksek Elf", "char-alignment": "Kaotik İyi", "char-xp": 900,
    "str-score": 8, "dex-score": 14, "con-score": 13, "int-score": 17, "wis-score": 12, "cha-score": 10,
    "ac-score": 12, "speed-score": "9m (30ft)", "hp-max": 17, "hp-current": 17, "hp-temp": 0,
    "hitdice-total": "3d6", "hitdice-current": "3d6",
    "save-int-prof": true, "save-wis-prof": true,
    "skill-arcana-prof": 1, "skill-history-prof": 1, "skill-investigation-prof": 1, "skill-insight-prof": 1,
    "weapons": [{ name: "Quarterstaff", bonus: "+1", damage: "1d6-1 Ezici" }],
    "spells": [
      { prep: true, name: "Fire Bolt", level: "0", range: "36m / 1d10 Ateş" },
      { prep: true, name: "Magic Missile", level: "1", range: "36m / 3x 1d4+1" },
      { prep: true, name: "Misty Step", level: "2", range: "9m Bonus Action" }
    ],
    "slots-1-max": 4, "slots-1-cur": 4, "slots-2-max": 2, "slots-2-cur": 2, "slots-3-max": 0, "slots-3-cur": 0,
    "attack-notes": "Spell Save DC: 13 | Attack Bonus: +5", "coin-gp": 80,
    "equipment-list": "Büyü kitabı, Odak kristali, Asa.", "features-traits": "• Sculpt Spells\n• Arcane Recovery",
    "feats": [{ "id": "magic-initiate", "name": "Magic Initiate", "category": "Origin Feat", "prerequisite": "Level 1", "description": "You learn two cantrips and one 1st-level spell." }],
    "trackers": [{ "id": "feat-magic-initiate", "name": "🔮 Feat: Magic Initiate (Free Cast)", "max": 1, "current": 1, "reset": "long", "category": "Feats" }]
  },
  rogue: {
    "char-id": "char-rogue-03",
    "char-name": "Shadow Kael",
    "char-class-level": "Hırsız 3 (Rogue)",
    "char-background": "Suçlu", "char-player-name": "Caner", "char-race": "Orman Elfi", "char-alignment": "Tarafsız", "char-xp": 900,
    "str-score": 10, "dex-score": 17, "con-score": 12, "int-score": 14, "wis-score": 12, "cha-score": 10,
    "ac-score": 15, "speed-score": "10.5m (35ft)", "hp-max": 21, "hp-current": 21, "hp-temp": 0,
    "hitdice-total": "3d8", "hitdice-current": "3d8",
    "save-dex-prof": true, "save-int-prof": true,
    "skill-stealth-prof": 2, "skill-sleight-prof": 2, "skill-acrobatics-prof": 1, "skill-deception-prof": 1,
    "weapons": [{ name: "Shortsword", bonus: "+5", damage: "1d6+3 Delici" }, { name: "Light Crossbow", bonus: "+5", damage: "1d8+3 Delici" }],
    "spells": [], "attack-notes": "Sneak Attack: 2d6 ek hasar.", "coin-gp": 110,
    "equipment-list": "Deri zırh, 2x Kısa kılıç, Arbalet.", "features-traits": "• Cunning Action\n• Expertise",
    "feats": [{ "id": "alert", "name": "Alert", "category": "Origin Feat", "prerequisite": "Level 1", "description": "Add Proficiency Bonus to Initiative and swap initiative with willing allies." }],
    "trackers": [{ "id": "feat-lucky", "name": "🎲 Feat: Lucky Points", "max": 2, "current": 2, "reset": "long", "category": "Feats" }]
  }
};

window.DnDNexus.spellSlotStates = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
window.DnDNexus.partyMembers = {};
window.DnDNexus.encounterList = [];
window.DnDNexus.activeTurnIndex = 0;
window.DnDNexus.encounterRound = 1;
