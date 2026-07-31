/**
 * D&D 5e (2024) Weapons Database (PHB 2024, Chapter 6: Equipment, p.213-215)
 * OTOMATİK ÜRETİLDİ — tools/build-feats.html ile weapons.xlsx dosyasından oluşturuldu.
 * Elle düzenleme yapma; değişiklik için kaynak dosyayı düzenleyip aracı tekrar çalıştır.
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.WEAPONS_LIST = [
  { "id": "club", "name": "Club", "category": "Simple Melee", "damageDice": "1d4", "damageType": "Bludgeoning", "properties": ["Light"], "mastery": "Slow", "weight": "2 lb.", "cost": "1 SP" },
  { "id": "dagger", "name": "Dagger", "category": "Simple Melee", "damageDice": "1d4", "damageType": "Piercing", "properties": ["Finesse", "Light", "Thrown (Range 20/60)"], "mastery": "Nick", "weight": "1 lb.", "cost": "2 GP" },
  { "id": "greatclub", "name": "Greatclub", "category": "Simple Melee", "damageDice": "1d8", "damageType": "Bludgeoning", "properties": ["Two-Handed"], "mastery": "Push", "weight": "10 lb.", "cost": "2 SP" },
  { "id": "handaxe", "name": "Handaxe", "category": "Simple Melee", "damageDice": "1d6", "damageType": "Slashing", "properties": ["Light", "Thrown (Range 20/60)"], "mastery": "Vex", "weight": "2 lb.", "cost": "5 GP" },
  { "id": "javelin", "name": "Javelin", "category": "Simple Melee", "damageDice": "1d6", "damageType": "Piercing", "properties": ["Thrown (Range 30/120)"], "mastery": "Slow", "weight": "2 lb.", "cost": "5 SP" },
  { "id": "light-hammer", "name": "Light Hammer", "category": "Simple Melee", "damageDice": "1d4", "damageType": "Bludgeoning", "properties": ["Light", "Thrown (Range 20/60)"], "mastery": "Nick", "weight": "2 lb.", "cost": "2 GP" },
  { "id": "mace", "name": "Mace", "category": "Simple Melee", "damageDice": "1d6", "damageType": "Bludgeoning", "properties": [], "mastery": "Sap", "weight": "4 lb.", "cost": "5 GP" },
  { "id": "quarterstaff", "name": "Quarterstaff", "category": "Simple Melee", "damageDice": "1d6", "damageType": "Bludgeoning", "properties": ["Versatile (1d8)"], "mastery": "Topple", "weight": "4 lb.", "cost": "2 SP" },
  { "id": "sickle", "name": "Sickle", "category": "Simple Melee", "damageDice": "1d4", "damageType": "Slashing", "properties": ["Light"], "mastery": "Nick", "weight": "2 lb.", "cost": "1 GP" },
  { "id": "spear", "name": "Spear", "category": "Simple Melee", "damageDice": "1d6", "damageType": "Piercing", "properties": ["Thrown (Range 20/60)", "Versatile (1d8)"], "mastery": "Sap", "weight": "3 lb.", "cost": "1 GP" },

  { "id": "dart", "name": "Dart", "category": "Simple Ranged", "damageDice": "1d4", "damageType": "Piercing", "properties": ["Finesse", "Thrown (Range 20/60)"], "mastery": "Vex", "weight": "1/4 lb.", "cost": "5 CP" },
  { "id": "light-crossbow", "name": "Light Crossbow", "category": "Simple Ranged", "damageDice": "1d8", "damageType": "Piercing", "properties": ["Ammunition (Range 80/320; Bolt)", "Loading", "Two-Handed"], "mastery": "Slow", "weight": "5 lb.", "cost": "25 GP" },
  { "id": "shortbow", "name": "Shortbow", "category": "Simple Ranged", "damageDice": "1d6", "damageType": "Piercing", "properties": ["Ammunition (Range 80/320; Arrow)", "Two-Handed"], "mastery": "Vex", "weight": "2 lb.", "cost": "25 GP" },
  { "id": "sling", "name": "Sling", "category": "Simple Ranged", "damageDice": "1d4", "damageType": "Bludgeoning", "properties": ["Ammunition (Range 30/120; Bullet)"], "mastery": "Slow", "weight": "—", "cost": "1 SP" },

  { "id": "battleaxe", "name": "Battleaxe", "category": "Martial Melee", "damageDice": "1d8", "damageType": "Slashing", "properties": ["Versatile (1d10)"], "mastery": "Topple", "weight": "4 lb.", "cost": "10 GP" },
  { "id": "flail", "name": "Flail", "category": "Martial Melee", "damageDice": "1d8", "damageType": "Bludgeoning", "properties": [], "mastery": "Sap", "weight": "2 lb.", "cost": "10 GP" },
  { "id": "glaive", "name": "Glaive", "category": "Martial Melee", "damageDice": "1d10", "damageType": "Slashing", "properties": ["Heavy", "Reach", "Two-Handed"], "mastery": "Graze", "weight": "6 lb.", "cost": "20 GP" },
  { "id": "greataxe", "name": "Greataxe", "category": "Martial Melee", "damageDice": "1d12", "damageType": "Slashing", "properties": ["Heavy", "Two-Handed"], "mastery": "Cleave", "weight": "7 lb.", "cost": "30 GP" },
  { "id": "greatsword", "name": "Greatsword", "category": "Martial Melee", "damageDice": "2d6", "damageType": "Slashing", "properties": ["Heavy", "Two-Handed"], "mastery": "Graze", "weight": "6 lb.", "cost": "50 GP" },
  { "id": "halberd", "name": "Halberd", "category": "Martial Melee", "damageDice": "1d10", "damageType": "Slashing", "properties": ["Heavy", "Reach", "Two-Handed"], "mastery": "Cleave", "weight": "6 lb.", "cost": "20 GP" },
  { "id": "lance", "name": "Lance", "category": "Martial Melee", "damageDice": "1d10", "damageType": "Piercing", "properties": ["Heavy", "Reach", "Two-Handed (unless mounted)"], "mastery": "Topple", "weight": "6 lb.", "cost": "10 GP" },
  { "id": "longsword", "name": "Longsword", "category": "Martial Melee", "damageDice": "1d8", "damageType": "Slashing", "properties": ["Versatile (1d10)"], "mastery": "Sap", "weight": "3 lb.", "cost": "15 GP" },
  { "id": "maul", "name": "Maul", "category": "Martial Melee", "damageDice": "2d6", "damageType": "Bludgeoning", "properties": ["Heavy", "Two-Handed"], "mastery": "Topple", "weight": "10 lb.", "cost": "10 GP" },
  { "id": "morningstar", "name": "Morningstar", "category": "Martial Melee", "damageDice": "1d8", "damageType": "Piercing", "properties": [], "mastery": "Sap", "weight": "4 lb.", "cost": "15 GP" },
  { "id": "pike", "name": "Pike", "category": "Martial Melee", "damageDice": "1d10", "damageType": "Piercing", "properties": ["Heavy", "Reach", "Two-Handed"], "mastery": "Push", "weight": "18 lb.", "cost": "5 GP" },
  { "id": "rapier", "name": "Rapier", "category": "Martial Melee", "damageDice": "1d8", "damageType": "Piercing", "properties": ["Finesse"], "mastery": "Vex", "weight": "2 lb.", "cost": "25 GP" },
  { "id": "scimitar", "name": "Scimitar", "category": "Martial Melee", "damageDice": "1d6", "damageType": "Slashing", "properties": ["Finesse", "Light"], "mastery": "Nick", "weight": "3 lb.", "cost": "25 GP" },
  { "id": "shortsword", "name": "Shortsword", "category": "Martial Melee", "damageDice": "1d6", "damageType": "Piercing", "properties": ["Finesse", "Light"], "mastery": "Vex", "weight": "2 lb.", "cost": "10 GP" },
  { "id": "trident", "name": "Trident", "category": "Martial Melee", "damageDice": "1d8", "damageType": "Piercing", "properties": ["Thrown (Range 20/60)", "Versatile (1d10)"], "mastery": "Topple", "weight": "4 lb.", "cost": "5 GP" },
  { "id": "war-pick", "name": "War Pick", "category": "Martial Melee", "damageDice": "1d8", "damageType": "Piercing", "properties": [], "mastery": "Sap", "weight": "5 lb.", "cost": "5 GP" },
  { "id": "warhammer", "name": "Warhammer", "category": "Martial Melee", "damageDice": "1d8", "damageType": "Bludgeoning", "properties": ["Versatile (1d10)"], "mastery": "Push", "weight": "5 lb.", "cost": "15 GP" },
  { "id": "whip", "name": "Whip", "category": "Martial Melee", "damageDice": "1d4", "damageType": "Slashing", "properties": ["Finesse", "Reach"], "mastery": "Slow", "weight": "3 lb.", "cost": "5 GP" },

  { "id": "blowgun", "name": "Blowgun", "category": "Martial Ranged", "damageDice": "1", "damageType": "Piercing", "properties": ["Ammunition (Range 25/100; Needle)", "Loading"], "mastery": "Vex", "weight": "1 lb.", "cost": "10 GP" },
  { "id": "hand-crossbow", "name": "Hand Crossbow", "category": "Martial Ranged", "damageDice": "1d6", "damageType": "Piercing", "properties": ["Ammunition (Range 30/120; Bolt)", "Light", "Loading"], "mastery": "Vex", "weight": "3 lb.", "cost": "75 GP" },
  { "id": "heavy-crossbow", "name": "Heavy Crossbow", "category": "Martial Ranged", "damageDice": "1d10", "damageType": "Piercing", "properties": ["Ammunition (Range 100/400; Bolt)", "Heavy", "Loading", "Two-Handed"], "mastery": "Push", "weight": "18 lb.", "cost": "50 GP" },
  { "id": "longbow", "name": "Longbow", "category": "Martial Ranged", "damageDice": "1d8", "damageType": "Piercing", "properties": ["Ammunition (Range 150/600; Arrow)", "Heavy", "Two-Handed"], "mastery": "Slow", "weight": "2 lb.", "cost": "50 GP" },
  { "id": "musket", "name": "Musket", "category": "Martial Ranged", "damageDice": "1d12", "damageType": "Piercing", "properties": ["Ammunition (Range 40/120; Bullet)", "Loading", "Two-Handed"], "mastery": "Slow", "weight": "10 lb.", "cost": "500 GP" },
  { "id": "pistol", "name": "Pistol", "category": "Martial Ranged", "damageDice": "1d10", "damageType": "Piercing", "properties": ["Ammunition (Range 30/90; Bullet)", "Loading"], "mastery": "Vex", "weight": "3 lb.", "cost": "250 GP" }
];
