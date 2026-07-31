/**
 * D&D 5e Nexus - Internationalization (i18n) Engine
 * Handles full TR / EN single-language switching and UI label updates.
 */

window.DnDNexus = window.DnDNexus || {};

(function() {
  const TRANSLATIONS = {
    tr: {
      // Header
      char_name_label: "KARAKTER ADI",
      char_name_placeholder: "Karakterinizin Adı...",
      class_level_label: "SINIF VE SEVİYE",
      class_level_placeholder: "Büyücü 3",
      background_label: "GEÇMİŞ",
      background_placeholder: "Mungan",
      player_name_label: "OYUNCU ADI",
      player_name_placeholder: "Oyuncu Adı",
      race_label: "IRK",
      race_placeholder: "Cüce",
      alignment_label: "YÖNELİM",
      alignment_placeholder: "Sadık İyi",
      xp_label: "DENEYİM PUANI",
      
      // Page Sub-tabs
      sub_page_1_tab: "📄 1. SAYFA: TEMEL KARAKTER & BECERİLER",
      sub_page_2_tab: "🔮 2. SAYFA: SINIF YETENEKLERİ, KAYNAKLAR & BÜYÜLER",

      // Ability Scores
      str_label: "GÜÇ",
      dex_label: "ÇEVİKLİK",
      con_label: "DAYANIKLILIK",
      int_label: "ZEKA",
      wis_label: "BİLGELİK",
      cha_label: "KARİZMA",

      // Vitals & Checks
      inspiration_label: "İLHAM",
      prof_bonus_label: "YETERLİLİK BONUSU",
      saving_throws_header: "KAYDETME ATIŞLARI",
      skills_header: "BECERİLER",
      passive_perception_label: "PASİF ALGI",
      other_profs_header: "DİĞER YETERLİLİKLER VE DİLLER",
      other_profs_placeholder: "Zırhlar, silahlar, aletler ve bildiğiniz diller...",

      // Combat Trio
      ac_title: "ZIRH SINIFI",
      initiative_title: "İNİSİYATİF",
      speed_title: "HIZ",

      // HP Panel
      max_hp_label: "MAKSİMUM CAN",
      temp_hp_label: "GEÇİCİ CAN",
      current_hp_label: "MEVCUT CAN",

      // Hit Dice & Death Saves
      hit_dice_title: "CAN ZARLARI",
      death_saves_title: "ÖLÜM KAYDETMELERİ",
      successes_label: "BAŞARILAR",
      failures_label: "BAŞARISIZLIKLAR",

      // Attacks & Equipment
      attacks_header: "SALDIRILAR VE BÜYÜLER",
      add_weapon_btn: "+ Silah Ekle",
      weapon_name_col: "SİLAH ADI",
      atk_bonus_col: "ATIS BONUSU",
      damage_type_col: "HASAR / TÜR",
      action_col: "İŞLEM",
      attack_notes_placeholder: "Manevralar, Sneak Attack, Fighting Style notları...",
      equipment_header: "EKİPMAN",
      attunement_label: "UYUM:",
      equipment_placeholder: "Eşyalarınız, iksirleriniz, macera çantanız...",

      // Traits & Feats
      personality_header: "KİŞİLİK ÖZELLİKLERİ",
      ideals_header: "İDEALLER",
      bonds_header: "BAĞLAR",
      flaws_header: "KUSURLAR",
      feats_header: "✨ FEAT'LER VE ÖZEL YETENEKLER",
      add_feat_btn: "+ Feat Ekle",

      // Saving Throw Names
      save_str: "Güç (STR)",
      save_dex: "Çeviklik (DEX)",
      save_con: "Dayanıklılık (CON)",
      save_int: "Zeka (INT)",
      save_wis: "Bilgelik (WIS)",
      save_cha: "Karizma (CHA)",

      // Skill Names
      skill_acrobatics: "Akrobasi",
      skill_animal_handling: "Hayvan Terbiyesi",
      skill_arcana: "Mistik Sırlar",
      skill_athletics: "Atletizm",
      skill_deception: "Kandırma",
      skill_history: "Tarih",
      skill_insight: "Sezgi",
      skill_intimidation: "Gözdağı",
      skill_investigation: "Soruşturma",
      skill_medicine: "Tıp",
      skill_nature: "Doğa",
      skill_perception: "Algı",
      skill_performance: "Gösteri",
      skill_persuasion: "İkna",
      skill_religion: "Din",
      skill_sleight_of_hand: "El Çabukluğu",
      skill_stealth: "Gizlilik",
      skill_survival: "Hayatta Kalma"
    },

    en: {
      // Header
      char_name_label: "CHARACTER NAME",
      char_name_placeholder: "Character Name...",
      class_level_label: "CLASS & LEVEL",
      class_level_placeholder: "Wizard 3",
      background_label: "BACKGROUND",
      background_placeholder: "Hermit",
      player_name_label: "PLAYER NAME",
      player_name_placeholder: "Player Name",
      race_label: "RACE",
      race_placeholder: "Dwarf",
      alignment_label: "ALIGNMENT",
      alignment_placeholder: "Lawful Good",
      xp_label: "EXPERIENCE POINTS",

      // Page Sub-tabs
      sub_page_1_tab: "📄 PAGE 1: CORE STATS & SKILLS",
      sub_page_2_tab: "🔮 PAGE 2: CLASS FEATURES & SPELLS",

      // Ability Scores
      str_label: "STRENGTH",
      dex_label: "DEXTERITY",
      con_label: "CONSTITUTION",
      int_label: "INTELLIGENCE",
      wis_label: "WISDOM",
      cha_label: "CHARISMA",

      // Vitals & Checks
      inspiration_label: "INSPIRATION",
      prof_bonus_label: "PROFICIENCY BONUS",
      saving_throws_header: "SAVING THROWS",
      skills_header: "SKILLS",
      passive_perception_label: "PASSIVE PERCEPTION",
      other_profs_header: "OTHER PROFICIENCIES & LANGUAGES",
      other_profs_placeholder: "Armor, weapons, tools, and languages...",

      // Combat Trio
      ac_title: "ARMOR CLASS",
      initiative_title: "INITIATIVE",
      speed_title: "SPEED",

      // HP Panel
      max_hp_label: "HIT POINT MAXIMUM",
      temp_hp_label: "TEMPORARY HIT POINTS",
      current_hp_label: "CURRENT HIT POINTS",

      // Hit Dice & Death Saves
      hit_dice_title: "HIT DICE",
      death_saves_title: "DEATH SAVES",
      successes_label: "SUCCESSES",
      failures_label: "FAILURES",

      // Attacks & Equipment
      attacks_header: "ATTACKS & SPELLCASTING",
      add_weapon_btn: "+ Add Weapon",
      weapon_name_col: "NAME",
      atk_bonus_col: "ATK BONUS",
      damage_type_col: "DAMAGE/TYPE",
      action_col: "ACTION",
      attack_notes_placeholder: "Maneuvers, Sneak Attack, Fighting Style notes...",
      equipment_header: "EQUIPMENT",
      attunement_label: "ATTUNEMENT:",
      equipment_placeholder: "Weapons, armor, potions, adventure gear...",

      // Traits & Feats
      personality_header: "PERSONALITY TRAITS",
      ideals_header: "IDEALS",
      bonds_header: "BONDS",
      flaws_header: "FLAWS",
      feats_header: "✨ FEATS & SPECIAL FEATURES",
      add_feat_btn: "+ Add Feat",

      // Saving Throw Names
      save_str: "Strength (STR)",
      save_dex: "Dexterity (DEX)",
      save_con: "Constitution (CON)",
      save_int: "Intelligence (INT)",
      save_wis: "Wisdom (WIS)",
      save_cha: "Charisma (CHA)",

      // Skill Names
      skill_acrobatics: "Acrobatics",
      skill_animal_handling: "Animal Handling",
      skill_arcana: "Arcana",
      skill_athletics: "Athletics",
      skill_deception: "Deception",
      skill_history: "History",
      skill_insight: "Insight",
      skill_intimidation: "Intimidation",
      skill_investigation: "Investigation",
      skill_medicine: "Medicine",
      skill_nature: "Nature",
      skill_perception: "Perception",
      skill_performance: "Performance",
      skill_persuasion: "Persuasion",
      skill_religion: "Religion",
      skill_sleight_of_hand: "Sleight of Hand",
      skill_stealth: "Stealth",
      skill_survival: "Survival"
    }
  };

  let currentLang = localStorage.getItem('dnd5e_language') || 'tr';

  function getText(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
  }

  function setLanguage(lang) {
    if (lang !== 'tr' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem('dnd5e_language', lang);

    // Update Language Toggle Button UI
    const langBtnText = document.getElementById('current-lang-text');
    if (langBtnText) {
      langBtnText.textContent = lang.toUpperCase();
    }

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[currentLang][key]) {
        el.textContent = TRANSLATIONS[currentLang][key];
      }
    });

    // Update placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (TRANSLATIONS[currentLang][key]) {
        el.placeholder = TRANSLATIONS[currentLang][key];
      }
    });

    // Re-initialize dynamic lists
    if (window.DnDNexus.initSavingThrows) {
      window.DnDNexus.initSavingThrows();
    }
    if (window.DnDNexus.initSkills) {
      window.DnDNexus.initSkills();
    }
    if (window.DnDNexus.calculateAll) {
      window.DnDNexus.calculateAll();
    }
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'tr' ? 'en' : 'tr';
    setLanguage(nextLang);
  }

  window.DnDNexus.i18n = {
    getText,
    setLanguage,
    toggleLanguage,
    getLanguage: () => currentLang
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Initial lang sync
    setLanguage(currentLang);

    const btnLangToggle = document.getElementById('btn-lang-toggle');
    if (btnLangToggle) {
      btnLangToggle.addEventListener('click', () => {
        toggleLanguage();
      });
    }
  });
})();
