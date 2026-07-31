/**
 * D&D 5e Nexus - Subclass UI & Selection Module
 * Manages Subclass Selector modal, subclass card rendering, selection events, and feature syncing.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  let selectedSubclassObj = null;

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.DnDNexus.initSubclassesUI = function() {
    const btnOpenModal = document.getElementById('btn-open-subclass-modal');
    const btnCloseModal = document.getElementById('btn-close-subclass-modal');
    const modal = document.getElementById('modal-subclass-selector');

    if (btnOpenModal) {
      btnOpenModal.onclick = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        window.DnDNexus.openSubclassModal();
      };
    }
    if (btnCloseModal) {
      btnCloseModal.onclick = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        window.DnDNexus.closeSubclassModal();
      };
    }

    modal?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-subclass-selector') {
        window.DnDNexus.closeSubclassModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.DnDNexus.closeSubclassModal();
      }
    });

    // Handle subclass input manual change
    const subclassInput = document.getElementById('char-subclass');
    subclassInput?.addEventListener('input', () => {
      window.DnDNexus.triggerAutosave();
    });
  };

  window.DnDNexus.openSubclassModal = function(targetClassKey = null) {
    const modal = document.getElementById('modal-subclass-selector');
    if (!modal) {
      alert("Hata: Alt sınıf seçim penceresi (modal-subclass-selector) bulunamadı!");
      return;
    }

    if (typeof targetClassKey !== 'string') {
      targetClassKey = null;
    }

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');

    try {
      window.DnDNexus.renderSubclassSelectorList(targetClassKey);
    } catch (err) {
      console.error('Error rendering subclass selector list:', err);
    }
  };

  window.DnDNexus.closeSubclassModal = function() {
    const modal = document.getElementById('modal-subclass-selector');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  };

  window.DnDNexus.renderSubclassSelectorList = function(targetClassKey = null) {
    const container = document.getElementById('subclasses-catalog-grid');
    if (!container) return;

    if (typeof targetClassKey !== 'string') {
      targetClassKey = null;
    }

    const classLevelInput = (document.getElementById('char-class-level')?.value || '').toLowerCase();
    
    // Determine class key dynamically
    let classKey = targetClassKey || 'barbarian';
    if (!targetClassKey) {
      if (classLevelInput.includes('bard') || classLevelInput.includes('ozan')) {
        classKey = 'bard';
      } else if (classLevelInput.includes('cleric') || classLevelInput.includes('ruhban')) {
        classKey = 'cleric';
      } else if (classLevelInput.includes('druid')) {
        classKey = 'druid';
      } else if (classLevelInput.includes('fighter') || classLevelInput.includes('savaşçı') || classLevelInput.includes('savasci') || classLevelInput.includes('savascı')) {
        classKey = 'fighter';
      } else if (classLevelInput.includes('monk') || classLevelInput.includes('keşiş') || classLevelInput.includes('kesis')) {
        classKey = 'monk';
      } else if (classLevelInput.includes('paladin') || classLevelInput.includes('şövalye') || classLevelInput.includes('sovalye') || classLevelInput.includes('şovalye')) {
        classKey = 'paladin';
      } else if (classLevelInput.includes('ranger') || classLevelInput.includes('korucu')) {
        classKey = 'ranger';
      } else if (classLevelInput.includes('rogue') || classLevelInput.includes('hırsız') || classLevelInput.includes('hirsiz')) {
        classKey = 'rogue';
      } else if (classLevelInput.includes('sorcerer') || classLevelInput.includes('soysoylu')) {
        classKey = 'sorcerer';
      } else if (classLevelInput.includes('warlock') || classLevelInput.includes('efsunbaz')) {
        classKey = 'warlock';
      } else if (classLevelInput.includes('wizard') || classLevelInput.includes('bilgin') || classLevelInput.includes('büyücü')) {
        classKey = 'wizard';
      } else if (classLevelInput.includes('barbarian') || classLevelInput.includes('barbar')) {
        classKey = 'barbarian';
      }
    }

    // Render Class Filter Tabs at Top of Modal
    const tabsContainer = document.getElementById('subclass-class-tabs');
    if (tabsContainer) {
      const availableClassKeys = [
        { key: 'barbarian', label: '🪓 Barbar' },
        { key: 'bard', label: '🎵 Ozan' },
        { key: 'cleric', label: '✝️ Ruhban' },
        { key: 'druid', label: '🍃 Druid' },
        { key: 'fighter', label: '⚔️ Savaşçı' },
        { key: 'monk', label: '☯️ Keşiş' },
        { key: 'paladin', label: '🛡️ Şövalye' },
        { key: 'ranger', label: '🦅 Korucu' },
        { key: 'rogue', label: '🗡️ Hırsız' },
        { key: 'sorcerer', label: '🔮 Soysoylu' },
        { key: 'warlock', label: '📜 Efsunbaz' },
        { key: 'wizard', label: '📖 Büyücü' }
      ];

      tabsContainer.innerHTML = availableClassKeys.map(c => `
        <button class="feat-category-tab ${c.key === classKey ? 'active' : ''}" onclick="window.DnDNexus.renderSubclassSelectorList('${c.key}')">
          ${c.label}
        </button>
      `).join('');
    }

    const subclassesData = window.DnDNexus.SUBCLASSES_DATA || {};
    const classData = subclassesData[classKey];
    if (!classData || !classData.subclasses || classData.subclasses.length === 0) {
      container.innerHTML = `
        <div class="empty-feats-msg" style="padding: 24px; text-align: center;">
          <h4 style="color:#f0abfc; margin-bottom:8px;">🛡️ Bu Sınıf İçin Alt Sınıf Kataloğu Hazırlanıyor</h4>
          <p style="color:#c084fc; font-size:0.9rem;">Şu an Barbar, Ozan, Ruhban, Druid, Savaşçı, Keşiş ve Şövalye (Paladin) 2024 PHB alt sınıfları aktiftir. Sırayla diğer sınıflar eklenmektedir.</p>
        </div>
      `;
      return;
    }

    const currentSubclassVal = (document.getElementById('char-subclass')?.value || '').toLowerCase();

    let html = '';
    classData.subclasses.forEach(sc => {
      const isSelected = currentSubclassVal.includes(sc.name.toLowerCase()) || currentSubclassVal.includes(sc.id);

      let featuresHTML = (sc.features || []).map(f => `
        <div style="margin-top: 6px; padding: 6px 10px; background: rgba(0,0,0,0.3); border-left: 3px solid #a855f7; border-radius: 4px;">
          <strong style="color:#c084fc;">Lvl ${f.level} - ${escapeHTML(f.name)}:</strong>
          <span style="font-size: 0.83rem; color: #e9d5ff; display: block; margin-top: 2px;">${escapeHTML(f.desc).replace(/\n/g, '<br>')}</span>
        </div>
      `).join('');

      html += `
        <div class="feat-catalog-card ${isSelected ? 'selected-subclass-card' : ''}" style="border: 1.5px solid ${isSelected ? '#34d399' : 'rgba(168,85,247,0.3)'};">
          <div class="feat-card-header">
            <h4 class="feat-card-title">${sc.icon || '🛡️'} ${escapeHTML(sc.name)}</h4>
            <span class="feat-badge ${isSelected ? 'badge-origin' : 'badge-general'}">${isSelected ? '✅ SEÇİLİ' : 'Alt Sınıf'}</span>
          </div>
          <div class="feat-card-desc" style="margin-bottom: 10px;">
            <em>${escapeHTML(sc.shortDesc)}</em>
          </div>
          <div style="margin-bottom: 12px;">
            <strong style="font-size: 0.85rem; color: #a855f7;">⚡ Seviye Yetenekleri:</strong>
            ${featuresHTML}
          </div>
          <div class="feat-card-actions">
            <button class="btn btn-accent btn-sm btn-select-subclass-action" data-subclass-id="${sc.id}" style="${isSelected ? 'background:#059669; border-color:#34d399;' : ''}">
              ${isSelected ? '✅ Seçildi (Yeniden Uygula)' : '⚔️ Bu Alt Sınıfı Seç'}
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.btn-select-subclass-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const scId = btn.getAttribute('data-subclass-id');
        const sc = classData.subclasses.find(s => s.id === scId);
        if (sc) {
          window.DnDNexus.applySubclassToCharacter(sc);
        }
      });
    });
  };

  window.DnDNexus.applySubclassToCharacter = function(subclassObj) {
    const input = document.getElementById('char-subclass');
    if (input) {
      input.value = subclassObj.name;
    }

    window.DnDNexus.renderSubclassAttacksInSheet(subclassObj.id, subclassObj.name);

    window.DnDNexus.closeSubclassModal();
    window.DnDNexus.triggerAutosave();

    alert(`✅ Alt Sınıf Seçildi: ${subclassObj.name}\nYetenekler ve hesaplamalar Saldırılar ve Büyüler paneline eklendi!`);
  };

  /**
   * Renders subclass attack pills, damage bonuses, and stances inside the Attacks & Spellcasting panel on Page 1
   */
  window.DnDNexus.renderSubclassAttacksInSheet = function(subclassId, subclassName) {
    const box = document.getElementById('subclass-attacks-container');
    const pillsList = document.getElementById('subclass-attacks-pills-list');
    const badgeName = document.getElementById('subclass-attacks-badge-name');
    if (!box || !pillsList) return;

    const subclassInputVal = document.getElementById('char-subclass')?.value || '';
    const scId = (subclassId || subclassName || subclassInputVal || '').toLowerCase();

    if (!scId) {
      box.style.display = 'none';
      return;
    }

    const classLevelInput = document.getElementById('char-class-level')?.value || '';
    let totalLevel = 1;
    const numMatches = classLevelInput.match(/\d+/g);
    if (numMatches) totalLevel = numMatches.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    if (totalLevel <= 0) totalLevel = 1;

    const profBonus = Math.max(2, Math.min(6, Math.ceil(1 + (totalLevel / 4))));
    const strScore = parseInt(document.getElementById('str-score')?.value) || 10;
    const strMod = Math.floor((strScore - 10) / 2);

    let pillsHTML = '';

    if (scId.includes('berserker')) {
      let frenzyDice = '1d6';
      if (totalLevel >= 16) frenzyDice = '3d6';
      else if (totalLevel >= 9) frenzyDice = '2d6';

      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🪓 Frenzy Ekstra Hasar:</strong> Reckless Attack + Rage ile ilk vuruşa <span class="badge-subclass-type">+${frenzyDice} Force Damage</span> eklenir (Turda 1 kez).
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🧠 Mindless Rage:</strong> Rage sırasında Charm & Fear bağışıklığı <span class="badge-subclass-type">Pasif</span>.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚔️ Retaliating Strike:</strong> 5 ft içindeki düşman size vurunca <span class="badge-subclass-type">Reaction ile Yakın Dövüş Saldırısı</span>.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        const dc = 8 + profBonus + strMod;
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>😱 Intimidating Presence:</strong> 30 ft alan korkutma <span class="badge-subclass-type">Bonus Action (Wisdom DC ${dc})</span>.
          </div>
        `;
      }
    } else if (scId.includes('wild') || scId.includes('totem') || scId.includes('yaban')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🐻 Bear Stance (Ayı):</strong> Rage sırasında <span class="badge-subclass-type">Psychic hariç TÜM Hasar Direnci (Half Damage)</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>🦅 Eagle Stance (Kartal):</strong> Rage sırasında <span class="badge-subclass-type">Bonus Action ile Dash + Disengage</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>🐺 Wolf Stance (Kurt):</strong> Rage sırasında 5 ft yakınınızdaki düşmanlara <span class="badge-subclass-type">Müttefikler Advantage Alır</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🐘 Aspect of the Beast:</strong> Elephant (Athletics Advantage & 2x Taşıma), Owl (60 ft Darkvision), Spider (Tırmanma Hızı).
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🦉 Nature Speaker:</strong> Commune with Nature büyüsü <span class="badge-subclass-type">Ritüel (0 Slot)</span>.
          </div>
        `;
      }
    } else if (scId.includes('tree') || scId.includes('ağaç') || scId.includes('agac')) {
      const dc = 8 + profBonus + strMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🌲 Vitality of the Tree:</strong> Rage açıldığında anında <span class="badge-subclass-type">+${totalLevel} Temp HP</span> (Müttefiğe aktarılabilir).
        </div>
        <div class="subclass-attack-pill">
          <strong>🍃 Branches of the Tree:</strong> 30 ft içindeki yaratığı yanınıza ışınlayın <span class="badge-subclass-type">Reaction (STR Save DC ${dc})</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌿 Battering Roots:</strong> Heavy/Versatile silahlarla <span class="badge-subclass-type">+10 ft Menzil & Push/Topple Mastery</span>.
          </div>
        `;
      }
    } else if (scId.includes('zealot') || scId.includes('fanatik')) {
      const zealotDmg = Math.floor(totalLevel / 2);
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>⚡ Divine Fury:</strong> Rage iken ilk vuruşa <span class="badge-subclass-type">+1d6 + ${zealotDmg} Radiant/Necrotic Damage</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>✨ Warrior of the Gods:</strong> Revivify / Raise Dead gibi canlandırmalar <span class="badge-subclass-type">$0 Elmas/Malzeme Maliyeti</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Fanatical Focus:</strong> Rage başına 1 kez <span class="badge-subclass-type">Başarısız Saving Throw Tekrar Atma</span>.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🎺 Zealous Presence:</strong> 10 müttefiğe 1 tur Advantage <span class="badge-subclass-type">Bonus Action (1/Long Rest)</span>.
          </div>
        `;
      }
    }

    // Bard Subclasses (Dance, Glamour, Lore, Valor)
    const chaScore = parseInt(document.getElementById('cha-score')?.value) || 10;
    const chaMod = Math.floor((chaScore - 10) / 2);
    const dexScore = parseInt(document.getElementById('dex-score')?.value) || 10;
    const dexMod = Math.floor((dexScore - 10) / 2);

    let bardicDice = '1d6';
    if (totalLevel >= 15) bardicDice = '1d12';
    else if (totalLevel >= 10) bardicDice = '1d10';
    else if (totalLevel >= 5) bardicDice = '1d8';

    const spellDC = 8 + profBonus + chaMod;

    if (scId.includes('dance') || scId.includes('dans')) {
      const acUnarmored = 10 + dexMod + chaMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>💃 Dazzling Footwork:</strong> Zırhsız AC: <span class="badge-subclass-type">${acUnarmored}</span> | Silahsız Vuruş: <span class="badge-subclass-type">${bardicDice} Bludgeoning</span>. Bardic Inspiration harcayınca Serbest Hareket!
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💃 Tandem Footwork:</strong> 1 Bardic Inspiration harcayarak tüm takıma <span class="badge-subclass-type">+${bardicDice} İnisiyatif Bonusu</span> verin.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Leading Evasion:</strong> DEX Saving Throw efektlerinde <span class="badge-subclass-type">Evasion (5 ft Müttefikler Dahil)</span>.
          </div>
        `;
      }
    } else if (scId.includes('glamour') || scId.includes('cazibe')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🎭 Beguiling Magic:</strong> Charm Person & Mirror Image hazır. Enchantment/Illusion büyüsü atınca <span class="badge-subclass-type">Charm / Frighten (Wisdom DC ${spellDC})</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>✨ Mantle of Inspiration:</strong> Bonus Action ile <span class="badge-subclass-type">+2x(${bardicDice}) + ${chaMod} Temp HP</span> ve serbest hareket.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👑 Mantle of Majesty:</strong> 1 dk boyunca her tur <span class="badge-subclass-type">Bonus Action ile $0 Slot Command Büyüsü</span>.
          </div>
        `;
      }
    } else if (scId.includes('lore') || scId.includes('bilgelik') || scId.includes('ilim')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🗣️ Cutting Words (Keskin Sözler):</strong> Düşmanın Saldırı/Damage/Check zarına karşı <span class="badge-subclass-type">Reaction ile -${bardicDice} Düşürün</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔮 Magical Secrets:</strong> TÜM sınıfların büyü listesinden ekstra <span class="badge-subclass-type">2 Büyü Öğrenildi</span>.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌟 Peerless Skill:</strong> Başarısız Yetenek / Saldırı Zarına <span class="badge-subclass-type">+${bardicDice} Ekleyin</span>.
          </div>
        `;
      }
    } else if (scId.includes('valor') || scId.includes('yiğitlik') || scId.includes('cesaret')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🛡️ Combat Inspiration:</strong> Bardic Inspiration zarı müttefikler tarafından <span class="badge-subclass-type">+${bardicDice} Silah Hasarı</span> veya <span class="badge-subclass-type">+${bardicDice} AC (Reaction)</span> olarak kullanılır.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚔️ Extra Attack (Ekstra Saldırı):</strong> Turda 2 saldırı (Birinin yerine <span class="badge-subclass-type">Cantrip Büyü</span> atabilirsiniz).
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚡ Battle Magic:</strong> Aksiyon ile Bard Büyüsü atınca <span class="badge-subclass-type">Bonus Action ile 1 Silah Saldırısı</span>.
          </div>
        `;
      }
    }

    // Cleric Subclasses (Life, Light, Trickery, War)
    const wisScore = parseInt(document.getElementById('wis-score')?.value) || 10;
    const wisMod = Math.floor((wisScore - 10) / 2);
    const clericDC = 8 + profBonus + wisMod;

    if (scId.includes('life') || scId.includes('yaşam') || scId.includes('yasam')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>☀️ Disciple of Life:</strong> İyileştirme büyüleri fazladan <span class="badge-subclass-type">+(2 + Büyü Seviyesi) HP</span> verir.
        </div>
        <div class="subclass-attack-pill">
          <strong>💖 Preserve Life:</strong> Channel Divinity: Toplam <span class="badge-subclass-type">${5 * totalLevel} HP</span> müttefiklere dağıtılır.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Blessed Healer:</strong> Başkasına şifa verince kendinize <span class="badge-subclass-type">+(2 + Büyü Seviyesi) HP</span>.
          </div>
        `;
      }
      if (totalLevel >= 17) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👑 Supreme Healing:</strong> Şifa zarları atılmaz, doğrudan <span class="badge-subclass-type">MAKSİMUM HP</span> verir!
          </div>
        `;
      }
    } else if (scId.includes('light') || scId.includes('ışık') || scId.includes('isik')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🛡️ Warding Flare:</strong> Düşman vuruşunda Reaction ile <span class="badge-subclass-type">Disadvantage</span> (${Math.max(1, wisMod)}/Long Rest).
        </div>
        <div class="subclass-attack-pill">
          <strong>☀️ Radiance of Dawn:</strong> Channel Divinity: 30 ft etraftaki düşmanlara <span class="badge-subclass-type">2d10 + ${totalLevel} Radiant Hasar</span> (CON Save DC ${clericDC}).
        </div>
      `;
      if (totalLevel >= 17) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌟 Corona of Light:</strong> Action (1 dk): 60 ft düşmanlar ateş/ilahi büyülere <span class="badge-subclass-type">Disadvantage Save</span> atar.
          </div>
        `;
      }
    } else if (scId.includes('trickery') || scId.includes('hile') || scId.includes('düzenbaz')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🎭 Blessing of Trickster:</strong> Dokunulan 1 kişiye <span class="badge-subclass-type">Stealth Advantage</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>🔮 Invoke Duplicity:</strong> Channel Divinity: 30 ft kopya yaratılır, kopyadan büyü atılır ve <span class="badge-subclass-type">Advantage</span> verilir.
        </div>
      `;
      if (totalLevel >= 17) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Improved Duplicity:</strong> Aynı anda <span class="badge-subclass-type">4 Kopya İllüzyonu</span> kontrol edilir.
          </div>
        `;
      }
    } else if (scId.includes('war') || scId.includes('savaş') || scId.includes('savas')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>⚔️ War Priest:</strong> Attack sonrası Bonus Action ile <span class="badge-subclass-type">Ekstra Silah Saldırısı</span> (${Math.max(1, wisMod)}/Long Rest).
        </div>
        <div class="subclass-attack-pill">
          <strong>⚡ Guided Strike:</strong> Channel Divinity ile vuruş zarına <span class="badge-subclass-type">+10 İsabet Bonusu</span>.
        </div>
      `;
      if (totalLevel >= 17) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Avatar of Battle:</strong> Fiziksel silahlara karşı <span class="badge-subclass-type">Slashing/Piercing/Bludgeoning Direnci</span>.
          </div>
        `;
      }
    }

    // Druid Subclasses (Moon, Land, Sea, Stars)
    if (scId.includes('moon') || scId.includes('ay')) {
      const moonHP = 3 * totalLevel;
      const moonAC = 13 + wisMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🌕 Combat Wild Shape:</strong> Dönüşünce <span class="badge-subclass-type">+${moonHP} Temp HP</span> | Dönüşüm AC'si: <span class="badge-subclass-type">${moonAC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Improved Elemental Strikes:</strong> Canavar vuruşlarına fazladan <span class="badge-subclass-type">+1d6 Radiant / Cold Damage</span>.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌙 Moonlight Step:</strong> Bonus Action ile <span class="badge-subclass-type">30 ft Teleport & Attack Advantage</span> (${Math.max(1, wisMod)}/Long Rest).
          </div>
        `;
      }
    } else if (scId.includes('land') || scId.includes('diyar')) {
      const recSlots = Math.max(1, Math.floor(totalLevel / 2));
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🏔️ Natural Recovery:</strong> Short Rest'te toplam <span class="badge-subclass-type">${recSlots} Seviyelik Büyü Slotu Geri Kazan</span> (1/Long Rest).
        </div>
      `;
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌿 Nature's Sanctuary:</strong> Yaratıklar vurmadan önce <span class="badge-subclass-type">Wisdom Save (DC ${clericDC})</span> atamazsa ıskalar.
          </div>
        `;
      }
    } else if (scId.includes('sea') || scId.includes('deniz')) {
      let seaDice = '1d6';
      if (totalLevel >= 14) seaDice = '4d6';
      else if (totalLevel >= 10) seaDice = '3d6';
      else if (totalLevel >= 6) seaDice = '2d6';

      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🌊 Wrath of the Sea:</strong> 1 Wild Shape ile 10 ft aura. Bonus Action ile <span class="badge-subclass-type">+${seaDice} Cold/Lightning & 15 ft Push</span> (CON Save DC ${clericDC}).
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🏊 Aquatic Adaptation:</strong> Yüzme Hızı, Su Altı Nefes Alma & <span class="badge-subclass-type">Cold Hasar Direnci</span>.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🦅 Oceanic Form:</strong> Uçma Hızı (Fly Speed) & <span class="badge-subclass-type">Fiziksel Hasar Direnci</span>.
          </div>
        `;
      }
    } else if (scId.includes('star') || scId.includes('yıldız') || scId.includes('yildiz')) {
      const archerDmg = wisMod >= 0 ? `+ ${wisMod}` : `${wisMod}`;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🌸 Star Map:</strong> Guidance Cantrip & <span class="badge-subclass-type">Guiding Bolt (Free ${profBonus}/Long Rest)</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>✨ Starry Form:</strong> 1 Wild Shape ile 10 dk form: 🏹 Archer (<span class="badge-subclass-type">1d8 ${archerDmg} Radiant</span>), 🏺 Chalice (<span class="badge-subclass-type">+1d8 ${archerDmg} HP</span>), 🐉 Dragon (Konsantrasyon min 10!).
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔮 Cosmic Omen:</strong> Reaksiyon ile müttefiğe <span class="badge-subclass-type">+1d6 Bonus</span> veya düşmana <span class="badge-subclass-type">-1d6 Ceza</span>.
          </div>
        `;
      }
    }

    // Fighter Subclasses (Battle Master, Eldritch Knight, Champion, Psi Warrior)
    const intScore = parseInt(document.getElementById('int-score')?.value) || 10;
    const intMod = Math.floor((intScore - 10) / 2);
    const conScore = parseInt(document.getElementById('con-score')?.value) || 10;
    const conMod = Math.floor((conScore - 10) / 2);

    const fighterDC = 8 + profBonus + Math.max(strMod, dexMod);

    if (scId.includes('battle') || scId.includes('dövüş') || scId.includes('dovus')) {
      let supDieType = 'd8';
      if (totalLevel >= 18) supDieType = 'd12';
      else if (totalLevel >= 10) supDieType = 'd10';

      let supCount = 4;
      if (totalLevel >= 15) supCount = 6;
      else if (totalLevel >= 7) supCount = 5;

      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🛡️ Combat Superiority:</strong> ${supCount}x <span class="badge-subclass-type">${supDieType} Superiority Dice</span> (Short/Long Rest). Manevra Save DC: <span class="badge-subclass-type">${fighterDC}</span>.
        </div>
      `;
      if (totalLevel >= 7) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👁️ Know Your Enemy:</strong> Bonus Action ile <span class="badge-subclass-type">Düşmanın AC / Save / Resist Analizi</span>.
          </div>
        `;
      }
      if (totalLevel >= 15) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔥 Relentless:</strong> Zarın kalmadığında turda 1 kez <span class="badge-subclass-type">Bedava 1d8 Manevra Zarı</span>.
          </div>
        `;
      }
    } else if (scId.includes('eldritch') || scId.includes('büyülü') || scId.includes('buyulu')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>⚔️ Weapon Bond:</strong> 2 Silah ile Bağ. Bonus Action ile <span class="badge-subclass-type">Silahı Elinize Işınlama</span>. Düşürülemez!
        </div>
      `;
      if (totalLevel >= 7) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚡ War Magic:</strong> Saldırı Aksiyonunda 1 vuruş yerine <span class="badge-subclass-type">Cantrip Büyü Atma</span>.
          </div>
        `;
      }
      if (totalLevel >= 15) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌀 Arcane Charge:</strong> Action Surge atınca anında <span class="badge-subclass-type">30 ft Teleport</span>.
          </div>
        `;
      }
    } else if (scId.includes('champion') || scId.includes('şampiyon') || scId.includes('sampiyon')) {
      const regenHP = 5 + conMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>👑 Improved Critical:</strong> Saldırı zarlarında <span class="badge-subclass-type">19-20 KRİTİK VURUŞ</span>!
        </div>
        <div class="subclass-attack-pill">
          <strong>🏃 Remarkable Athlete:</strong> Athletics ve Initiative zarlarında <span class="badge-subclass-type">Advantage</span>!
        </div>
      `;
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌟 Heroic Warrior:</strong> Heroic Inspiration yoksa tur başında <span class="badge-subclass-type">Bedava Heroic Inspiration</span>.
          </div>
        `;
      }
      if (totalLevel >= 15) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💖 Survivor:</strong> Tur başında HP yarıdan azsa anında <span class="badge-subclass-type">+${regenHP} HP Yenileme (Regen)</span>.
          </div>
        `;
      }
    } else if (scId.includes('psi') || scId.includes('zihinsel')) {
      let psiDieType = 'd6';
      if (totalLevel >= 17) psiDieType = 'd12';
      else if (totalLevel >= 11) psiDieType = 'd10';
      else if (totalLevel >= 5) psiDieType = 'd8';

      const psiCount = 2 * profBonus;
      const psiBonusStr = intMod >= 0 ? `+ ${intMod}` : `${intMod}`;

      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🧠 Psionic Power:</strong> ${psiCount}x <span class="badge-subclass-type">${psiDieType} Energy Dice</span> (Long Rest):\n• 🛡️ Protective Field: Reaction ile <span class="badge-subclass-type">-${psiDieType} ${psiBonusStr} Hasar Düşürme</span>\n• 🗡️ Psionic Strike: Vuruşta <span class="badge-subclass-type">+${psiDieType} ${psiBonusStr} Force Dmg</span>.
        </div>
      `;
      if (totalLevel >= 7) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🦅 Telekinetic Leap:</strong> Bonus Action ile tur sonuna kadar <span class="badge-subclass-type">2x Yüzme/Uçma Hızı</span>.
          </div>
        `;
      }
      if (totalLevel >= 15) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Bulwark of Force:</strong> Action ile 30 ft müttefiklere <span class="badge-subclass-type">+2 AC & DEX Save (Half Cover)</span>.
          </div>
        `;
      }
    }

    // Monk Subclasses (Warrior of Mercy, Shadow, Elements, Open Hand)
    let maDie = 'd6';
    if (totalLevel >= 17) maDie = 'd12';
    else if (totalLevel >= 11) maDie = 'd10';
    else if (totalLevel >= 5) maDie = 'd8';

    const monkDC = 8 + profBonus + wisMod;
    const wisBonusStr = wisMod >= 0 ? `+ ${wisMod}` : `${wisMod}`;

    if (scId.includes('mercy') || scId.includes('merhamet')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>💚 Hand of Healing:</strong> 1 Focus Point (veya Flurry of Blows ile) <span class="badge-subclass-type">+${maDie} ${wisBonusStr} HP İyileştirme</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>💀 Hand of Harm:</strong> Turda 1 kez 1 Focus Point ile <span class="badge-subclass-type">+${maDie} ${wisBonusStr} Necrotic Dmg</span> & Poisoned.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Physician's Touch:</strong> Şifa verirken Körlük/Sağırlık/Felç/Zehir/Stun temizler! Hand of Harm otomatik zehirler!
          </div>
        `;
      }
      if (totalLevel >= 17) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>😇 Hand of Ultimate Mercy:</strong> Action + 5 Focus Point ile ölen canlıyı <span class="badge-subclass-type">Full HP ile Canlandırma ($0 Malzeme)</span>!
          </div>
        `;
      }
    } else if (scId.includes('shadow') || scId.includes('gölge') || scId.includes('golge')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🌑 Shadow Arts:</strong> 1 Focus Point ile <span class="badge-subclass-type">Darkness (İçini Görürsünüz)</span> & 60 ft Darkvision.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🥷 Shadow Step:</strong> Bonus Action ile karanlıktan karanlığa <span class="badge-subclass-type">60 ft Teleport + Advantage</span>!
          </div>
        `;
      }
      if (totalLevel >= 17) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚡ Improved Shadow Step:</strong> Shadow Step sonrası 1 Focus Point harcayıp <span class="badge-subclass-type">Bedava Unarmed Strike</span>.
          </div>
        `;
      }
    } else if (scId.includes('element') || scId.includes('unsur')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🐉 Elemental Attunement:</strong> Bonus Action + 1 Focus Point (10 dk): <span class="badge-subclass-type">+10 ft Menzil & Asit/Buz/Ateş/Yıldırım Hasarı</span>. Push/Pull DC: <span class="badge-subclass-type">${monkDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌊 Environmental Stride:</strong> Attunement aktifken <span class="badge-subclass-type">Uçma ve Yüzme Hızı (Fly/Swim Speed)</span>.
          </div>
        `;
      }
      if (totalLevel >= 17) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔥 Avatar of the Elements:</strong> Attunement aktifken <span class="badge-subclass-type">5 Elementel Hasara Direnç (Resistance)</span>!
          </div>
        `;
      }
    } else if (scId.includes('open') || scId.includes('açık') || scId.includes('acik')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>👊 Open Hand Technique:</strong> Flurry of Blows ile Vuruşta: 🌀 Yere Düşürme (DEX Save DC <span class="badge-subclass-type">${monkDC}</span>), 💥 15 ft İtme (STR Save DC <span class="badge-subclass-type">${monkDC}</span>) veya 🚫 Reaksiyon Engelleme.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💖 Wholeness of Body:</strong> Bonus Action ile (${wisMod}x/LR) <span class="badge-subclass-type">+${maDie} ${wisBonusStr} HP & +1 Focus Point İadesi</span>.
          </div>
        `;
      }
      if (totalLevel >= 17) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💀 Quivering Palm:</strong> Action + 4 Focus Point: Titreşim Patlatma! CON Save DC <span class="badge-subclass-type">${monkDC}</span>: Başarısız ise <span class="badge-subclass-type">ANINDA 0 HP (ÖLÜM)</span>, Başarılı ise <span class="badge-subclass-type">10d12 Force Dmg</span>!
          </div>
        `;
      }
    }

    // Paladin Subclasses (Devotion, Glory, Ancients, Vengeance)
    const paladinDC = 8 + profBonus + chaMod;
    const chaBonusStr = chaMod >= 0 ? `+ ${chaMod}` : `${chaMod}`;
    const auraDist = totalLevel >= 18 ? '30 ft' : '10 ft';

    if (scId.includes('devotion') || scId.includes('adanmışlık') || scId.includes('adanmislik')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🗡️ Sacred Weapon:</strong> Bonus Action + Channel Divinity (10 dk): <span class="badge-subclass-type">${chaBonusStr} İsabet Bonusu</span> & 20 ft Işık.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Aura of Devotion:</strong> ${auraDist} etrafınızdaki müttefikler <span class="badge-subclass-type">Charmed Bağışıklığı</span> kazanır.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💖 Smite of Protection:</strong> Divine Smite atınca ${auraDist} müttefiklere <span class="badge-subclass-type">+2 AC & DEX Save (Half Cover)</span>.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌟 Holy Nimbus:</strong> Action (1 dk): 30 ft düşmanlara <span class="badge-subclass-type">${5 + chaMod} Radiant Dmg</span> & Fiend/Undead zarlarına Advantage!
          </div>
        `;
      }
    } else if (scId.includes('glory') || scId.includes('zafer')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🏃 Peerless Athlete:</strong> Athletics/Acrobatics Advantage & 2x Taşıma Kapasitesi (10 dk).
        </div>
        <div class="subclass-attack-pill">
          <strong>🌟 Inspiring Smite:</strong> Divine Smite atınca 30 ft müttefiklere toplam <span class="badge-subclass-type">2d8 + ${totalLevel} Temp HP</span> dağıtın.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🏃 Aura of Alacrity:</strong> +10 ft Hareket Hızı (Müttefikler tur başında <span class="badge-subclass-type">+10 ft Hız</span> alır).
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Glorious Defense:</strong> Müttefik vurulunca Reaction ile <span class="badge-subclass-type">+1d8 ${chaBonusStr} AC</span> & Iskalarsa 1 Vuruş!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👑 Living Legend:</strong> Bonus Action (1 dk): Charisma Advantage, 1 Vuruşu İsabet Sayma & Reaksiyon ile Save Yenileme!
          </div>
        `;
      }
    } else if (scId.includes('ancient') || scId.includes('kadim')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🌿 Nature's Wrath:</strong> Channel Divinity: 15 ft düşmanları kökle bağla (STR/DEX Save DC <span class="badge-subclass-type">${paladinDC}</span>).
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Aura of Warding:</strong> ${auraDist} etrafınızdaki müttefikler <span class="badge-subclass-type">Büyü Hasarına Direnç (Resistance)</span> kazanır.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌿 Undying Sentinel:</strong> HP 0'a düştüğünde <span class="badge-subclass-type">1 HP ile Ayakta Kal</span> (1/Long Rest) & Yaşlanmama.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👑 Elder Champion:</strong> Action (1 dk): Tur başı <span class="badge-subclass-type">+10 HP Regen</span>, Bonus Action Büyüler & Düşmanlara Disadvantage Save!
          </div>
        `;
      }
    } else if (scId.includes('vengeance') || scId.includes('intikam')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>💀 Vow of Enmity:</strong> Bonus Action + Channel Divinity (1 dk): 30 ft 1 hedefe karşı tüm vuruşlarda <span class="badge-subclass-type">ADVANTAGE</span>!
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🗡️ Relentless Avenger:</strong> Fırsat Saldırısı vurduğunuzda <span class="badge-subclass-type">Yarı Hızınız Kadar Hareket</span>.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💀 Soul of Vengeance:</strong> Vow hedefi saldırdığında Reaction ile <span class="badge-subclass-type">Ekstra Yakın Dövüş Saldırısı</span>!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👼 Avenging Angel:</strong> Action (1 dk): <span class="badge-subclass-type">60 ft Uçma Hızı (Fly Speed)</span> & 30 ft Frightening Aura!
          </div>
        `;
      }
    } else if (scId.includes('beast') || scId.includes('canavar')) {
      const beastHP = 5 + (5 * totalLevel);
      const beastAC = 13 + profBonus;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🦅 Primal Companion:</strong> İlkel Yoldaş Canı: <span class="badge-subclass-type">${beastHP} HP</span> | Zırh: <span class="badge-subclass-type">${beastAC} AC</span>. Vuruş aksiyonunda 1 vuruş yerine yoldaş vurur!
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Exceptional Training:</strong> Bonus Action ile Yoldaşa <span class="badge-subclass-type">Dash/Disengage/Dodge/Help</span> & Hasar Force Hasarına Dönüşür!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💥 Bestial Fury:</strong> Yoldaşınız Saldırı Emri ile <span class="badge-subclass-type">2 VURUŞ (Extra Attack)</span> Yapar!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔮 Share Spells:</strong> Kendinize attığınız büyüler 30 ft içindeki <span class="badge-subclass-type">İlkel Yoldaşınızı da Etkiler</span>!
          </div>
        `;
      }
    } else if (scId.includes('fey') || scId.includes('peri')) {
      const dreadDice = totalLevel >= 11 ? '1d6' : '1d4';
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🗡️ Dreadful Strikes:</strong> Turda 1 kez vuruşa <span class="badge-subclass-type">+${dreadDice} Psychic Dmg</span> | ✨ CHA Zarlarına <span class="badge-subclass-type">${wisBonusStr} WIS Mod</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌿 Beguiling Twist:</strong> Reaction ile 120 ft içindeki düşmanı <span class="badge-subclass-type">Charm / Frighten (WIS Save DC ${monkDC})</span> etme!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Fey Reinforcements:</strong> Summon Fey <span class="badge-subclass-type">Konsantrasyonsuz & $0 Malzeme</span> (1/Long Rest).
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌫️ Misty Wanderer:</strong> Bedava Misty Step (${Math.max(1, wisMod)}x/LR) & <span class="badge-subclass-type">1 Müttefiği de Işınlama</span>.
          </div>
        `;
      }
    } else if (scId.includes('gloom') || scId.includes('gölgeli') || scId.includes('golgeli')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>⚡ Dread Ambusher:</strong> İnisiyatif +<span class="badge-subclass-type">${wisMod}</span> | Savaşın İlk Turunda: <span class="badge-subclass-type">+10 ft Hız & 1 Ekstra Saldırı (+1d8 Dmg)</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>👁️ Umbral Sight:</strong> 60 ft Darkvision & Karanlıkta Darkvision Sahibi Düşmanlara <span class="badge-subclass-type">GÖRÜNMEZ (Invisible)</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🧠 Iron Mind:</strong> <span class="badge-subclass-type">Wisdom Saving Throw Yetkinliği</span>.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌀 Stalker's Flurry:</strong> Iskalanan vuruşta <span class="badge-subclass-type">Anında Ekstra Saldırı</span> veya 2. hedefe ekstra hasar!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Shadowy Dodge:</strong> Reaction ile düşmana <span class="badge-subclass-type">Disadvantage</span> & Iskalarsa 30 ft Teleport!
          </div>
        `;
      }
    } else if (scId.includes('hunter') || scId.includes('avcı') || scId.includes('avci')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🎯 Hunter's Prey:</strong> Colossus Slayer (<span class="badge-subclass-type">+1d8 Dmg</span>) / Horde Breaker (<span class="badge-subclass-type">Ekstra Vuruş</span>).
        </div>
        <div class="subclass-attack-pill">
          <strong>📜 Hunter's Lore:</strong> Hunter's Mark hedefinin <span class="badge-subclass-type">Tüm Direnç / Zayıflıklarını Görürsünüz</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Defensive Tactics:</strong> Escape Horde (Opp Attack Disadvantage) / Multiattack Def (<span class="badge-subclass-type">+4 AC</span>).
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🎯 Superior Hunter's Prey:</strong> Hunter's Mark etkisini <span class="badge-subclass-type">30 ft Yakındaki 2. Hedefe de Uygula</span>!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💥 Superior Hunter's Defense:</strong> Reaction ile <span class="badge-subclass-type">Yarım Hasar Al</span> veya Saldırıyı Başkasına Saptır!
          </div>
        `;
      }
    } else if (scId.includes('arcane') || scId.includes('büyülü') || scId.includes('buyulu')) {
      const intScore = parseInt(document.getElementById('int-score')?.value) || 10;
      const intMod = Math.floor((intScore - 10) / 2);
      const rogueIntDC = 8 + profBonus + intMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🗡️ Mage Hand Legerdemain:</strong> Görünmez El ile uzaktan <span class="badge-subclass-type">Kilit Açma / Tuzak Bozma / Yan Kesicilik</span>. Büyü DC: <span class="badge-subclass-type">${rogueIntDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🎯 Magical Ambush:</strong> Gizliyken (Hidden) attığınız büyülere karşı düşmanlar <span class="badge-subclass-type">DISADVANTAGE Save</span> atar!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Versatile Trickster:</strong> Bonus Action Mage Hand ile 5 ft yakındaki düşmanı şaşırtıp <span class="badge-subclass-type">ADVANTAGE</span> kazanma.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔮 Spell Thief:</strong> Reaction ile size atılan büyüyü engelle & <span class="badge-subclass-type">8 Saatliğine Çal (Spell DC ${rogueIntDC})</span>!
          </div>
        `;
      }
    } else if (scId.includes('assassin') || scId.includes('suikastçı') || scId.includes('suikastci')) {
      const rogueDexDC = 8 + profBonus + dexMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🩸 Assassinate:</strong> İnisiyatife ADVANTAGE! Savaşın 1. turunda henüz oynamamış düşmanlara <span class="badge-subclass-type">ADVANTAGE +${totalLevel} Ekstra Dmg</span>!
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🎭 Infiltration Expertise:</strong> Deception & Performance zarlarına <span class="badge-subclass-type">ADVANTAGE</span> & Kusursuz Sahte Kimlikler.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🧪 Envenom Weapons:</strong> Bonus Action Zehir & Sneak Attack <span class="badge-subclass-type">Poison Damage (Resist Yok Sayar)</span>.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💀 Death Strike:</strong> 1. tur vuruşunda CON Save DC <span class="badge-subclass-type">${rogueDexDC}</span> elenirse <span class="badge-subclass-type">TOPLAM HASARI 2'YE KATLA</span>!
          </div>
        `;
      }
    } else if (scId.includes('soul') || scId.includes('ruh')) {
      const psiDie = totalLevel >= 17 ? 'd12' : (totalLevel >= 11 ? 'd10' : (totalLevel >= 5 ? 'd8' : 'd6'));
      const psiCount = profBonus * 2;
      const rogueDexDC = 8 + profBonus + dexMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🧠 Psi Power & Blades:</strong> Psionic Zarları: <span class="badge-subclass-type">${psiCount}x ${psiDie}</span> | Psi-Bıçak: <span class="badge-subclass-type">1d6 Psychic (60 ft Range)</span> + BA 1d4 Bıçak.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌀 Soul Blades:</strong> Iskalayan psi-bıçağa Psi Zarı ekle & Bonus Action <span class="badge-subclass-type">Bıçak Konumuna Işınlan (Psi Zar x10 ft)</span>!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👁️ Psychic Veil:</strong> Action ile <span class="badge-subclass-type">1 Saat Görünmezlik</span> (1/Long Rest veya Psi Zarı).
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚡ Rend Mind:</strong> Psi-Bıçak Sneak Attack sonrasında WIS Save DC <span class="badge-subclass-type">${rogueDexDC}</span> elenirse <span class="badge-subclass-type">STUNNED (1 dk)</span>!
          </div>
        `;
      }
    } else if (scId.includes('thief') || scId.includes('hırsız') || scId.includes('hirsiz')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🖐️ Fast Hands:</strong> Bonus Action ile <span class="badge-subclass-type">Kilit Aç / Tuzak Boz / İksir Kullan (Utilize Action)</span>.
        </div>
        <div class="subclass-attack-pill">
          <strong>🏃 Second-Story Work:</strong> Tırmanma Hızı = Normal Hız | Zıplama Mesafesi <span class="badge-subclass-type">+${dexMod} ft</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🥷 Supreme Sneak:</strong> Stealthy Attack (Sneak Attack -1d6) ile <span class="badge-subclass-type">Saldırsa Bile GİZLİ (Hidden) Kalır</span>!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>📜 Use Magic Device:</strong> <span class="badge-subclass-type">4. Attunement Slotu</span> & Sınıf Sınırı Olmadan Tüm Büyü Parşömenlerini Kullanma!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚡ Thief's Reflexes:</strong> Savaşın ilk turunda <span class="badge-subclass-type">TAM 2 DEFA TUR ALIRSINIZ</span>!
          </div>
        `;
      }
    } else if (scId.includes('aberrant') || scId.includes('sapqın') || scId.includes('sapkin')) {
      const sorcererDC = 8 + profBonus + chaMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🧠 Psionic Spells:</strong> 10 Köken Büyüsü | 🔮 Telepathic Speech: <span class="badge-subclass-type">30 ft Zihinsel Telepati</span> (${totalLevel} dk). Büyü DC: <span class="badge-subclass-type">${sorcererDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Psionic Sorcery:</strong> Sorcery Point ile büyüleri <span class="badge-subclass-type">V, S, M BİLEŞENLERİ OLMADAN AT</span> & Psychic Resist!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👁️ Revelation in Flesh:</strong> 1 Sorcery Point (10 dk): <span class="badge-subclass-type">Uçma / Yüzme / Görünmezlik Görme / 1 İnç Esneklik</span>.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💥 Warping Implosion:</strong> Action 120 ft Teleport + 30 ft alan STR Save DC <span class="badge-subclass-type">${sorcererDC}</span> elenirse <span class="badge-subclass-type">3d10 Force Hasarı & Çekilme</span>!
          </div>
        `;
      }
    } else if (scId.includes('clockwork') || scId.includes('çarklı') || scId.includes('carkli')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>⚙️ Restore Balance:</strong> Reaction (60 ft): 1 canlının <span class="badge-subclass-type">Advantage / Disadvantage Zarını İPTAL ET</span> (${profBonus}x/LR).
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Bastion of Law:</strong> Action (1-5 Sorcery Point): <span class="badge-subclass-type">d8 Kalkan Zarları</span> ile alınan hasarı düşür!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚖️ Trance of Order:</strong> BA 2 Sorcery Point (1 dk): Düşman Advantage alamaz & <span class="badge-subclass-type">Attığın d20 Zarları Min 10 Sayılır</span>!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🤖 Clockwork Cavalcade:</strong> Action (30 ft alan): <span class="badge-subclass-type">100 HP İyileşme Dağıt</span>, Eşyaları Tamir Et & Büyüleri Boz!
          </div>
        `;
      }
    } else if (scId.includes('draconic') || scId.includes('ejderha')) {
      const draconicAC = 13 + dexMod;
      const sorcererDC = 8 + profBonus + chaMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🐉 Draconic Resilience:</strong> Zırhsız AC: <span class="badge-subclass-type">${draconicAC}</span> | Can Bonusu: <span class="badge-subclass-type">+${totalLevel} Max HP</span>. Büyü DC: <span class="badge-subclass-type">${sorcererDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔥 Elemental Affinity:</strong> Ejderha elementinde büyüye <span class="badge-subclass-type">+${chaMod} Hasar</span> & 1 Sorcery Point ile Element Direnci!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🦅 Dragon Wings:</strong> Bonus Action ile hayalet ejderha kanatları açıp <span class="badge-subclass-type">Uçma Hızı (Fly Speed)</span> kazan!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🐉 Dragon Companion:</strong> Action (1/LR veya 7 SP): Size itaat eden <span class="badge-subclass-type">7. Seviye Ejderha Yoldaşı Çağır</span>!
          </div>
        `;
      }
    } else if (scId.includes('wild') || scId.includes('vahşi') || scId.includes('vahsi')) {
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🎲 Wild Magic Surge:</strong> 1.+ Lvl büyü atınca d20 at veya Kaos Tablosunu tetikle!
        </div>
        <div class="subclass-attack-pill">
          <strong>🌊 Tides of Chaos:</strong> 1 d20 zarına bedava <span class="badge-subclass-type">ADVANTAGE</span> al (Surge ile yenilenir).
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Bend Luck:</strong> Reaction (2 Sorcery Point): 60 ft yakındaki zara <span class="badge-subclass-type">+1d4 ekle veya -1d4 düşür</span>!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔀 Controlled Chaos:</strong> Vahşi Büyü Tablosunda <span class="badge-subclass-type">2 Kere Zar Atıp İstediğini Seç</span>!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🎯 Tamed Surge:</strong> Surge tetiklendiğinde tablodan <span class="badge-subclass-type">İSTEDİĞİN ETKİYİ BİZZAT SEÇ</span>!
          </div>
        `;
      }
    } else if (scId.includes('archfey') || scId.includes('peri')) {
      const warlockDC = 8 + profBonus + chaMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🏛️ Steps of the Fey:</strong> Misty Step atılınca ek etki (Disappear/Fear/Heal) (${Math.max(1, chaMod)}x/LR). Büyü DC: <span class="badge-subclass-type">${warlockDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌫️ Misty Escape:</strong> Reaction: Hasar aldığında <span class="badge-subclass-type">Bedava Misty Step</span> (1/LR veya Warlock Slot).
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Beguiling Defenses:</strong> <span class="badge-subclass-type">Charm Bağışıklığı</span> & Sizi Charm etmeye çalışana Reaction ile Yansıtma!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Bewitching Movement:</strong> Misty Step attığında ekstra <span class="badge-subclass-type">+30 ft Işınlanma</span>.
          </div>
        `;
      }
    } else if (scId.includes('celestial') || scId.includes('semavi')) {
      const healDiceCount = totalLevel + 1;
      const selfTempHP = totalLevel + chaMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🌟 Healing Light:</strong> Şifa Havuzu: <span class="badge-subclass-type">${healDiceCount}x d6</span>. BA (60 ft): Max ${Math.max(1, chaMod)}d6 harcayıp müttefik iyileştir!
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔥 Radiant Soul:</strong> Radiant Hasar Direnci & Radiant/Fire büyülerine <span class="badge-subclass-type">+${chaMod} Hasar</span>.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Celestial Resilience:</strong> Dinlenme sonu kendine <span class="badge-subclass-type">+${selfTempHP} Temp HP</span> & 5 müttefiğe Temp HP!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💥 Searing Vengeance:</strong> Death Save anında <span class="badge-subclass-type">Yarı Canla Kalk</span>, 30 ft alana 2d8+${chaMod} Radiant Hasar & Kör Et!
          </div>
        `;
      }
    } else if (scId.includes('fiend') || scId.includes('iblis')) {
      const darkBlessingHP = chaMod + totalLevel;
      const warlockDC = 8 + profBonus + chaMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🩸 Dark One's Blessing:</strong> Düşman öldürdüğünde <span class="badge-subclass-type">+${darkBlessingHP} Temp HP</span> kazan! Büyü DC: <span class="badge-subclass-type">${warlockDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🎲 Dark One's Own Luck:</strong> Check veya Save zarına <span class="badge-subclass-type">+1d10 Ekle</span> (${Math.max(1, chaMod)}x/LR).
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Fiendish Resilience:</strong> Dinlenme sonunda seçilen 1 hasar tipine <span class="badge-subclass-type">Direnç (Resistance)</span>.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔥 Hurl Through Hell:</strong> Vurulan hedefi cehenneme sürgün et: Geri döndüğünde <span class="badge-subclass-type">10d10 Psychic Hasarı</span>!
          </div>
        `;
      }
    } else if (scId.includes('great') || scId.includes('kadim') || scId.includes('cthulhu')) {
      const warlockDC = 8 + profBonus + chaMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🐙 Awakened Mind & Spells:</strong> 30 ft Telepati | Büyü Hasarını <span class="badge-subclass-type">Psychic Hasara Dönüştür</span>. Büyü DC: <span class="badge-subclass-type">${warlockDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🧠 Psychic Spells & Ward:</strong> Büyüleri <span class="badge-subclass-type">V, S Bileşensiz At</span> & Reaction ile gelen vuruşa Disadvantage ver!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Thought Shield:</strong> Zihin Okunamaz + Psychic Resist & Size Psychic Hasar verene <span class="badge-subclass-type">Aynı Hasarı Yansıt</span>!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔮 Create Thrall:</strong> Psychic Hasar vurduğun hedef WIS Save DC <span class="badge-subclass-type">${warlockDC}</span> elenirse <span class="badge-subclass-type">Size Büyülenir (Charmed)</span>!
          </div>
        `;
      }
    } else if (scId.includes('abjurer') || scId.includes('koruyucu')) {
      const wizardDC = 8 + profBonus + intMod;
      const wardHP = (2 * totalLevel) + intMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🛡️ Arcane Ward:</strong> Büyülü Kalkan Kapasitesi: <span class="badge-subclass-type">${wardHP} HP</span> (Büyü DC ${wizardDC}). Hasar aldığında kalkan emer!
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Projected Ward:</strong> Reaction (30 ft): Kalkanınız müttefiğe gelen <span class="badge-subclass-type">Hasarı Emer</span>!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>📜 Spell Breaker:</strong> Counterspell / Dispel Magic zarına <span class="badge-subclass-type">+${profBonus} PB</span> & Başarısızlıkta Slot Harcanmaz!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🔮 Spell Resistance:</strong> Büyülere karşı <span class="badge-subclass-type">ADVANTAGE Save</span> & Büyü Hasarlarına Direnç!
          </div>
        `;
      }
    } else if (scId.includes('diviner') || scId.includes('kahin') || scId.includes('kehanet')) {
      const wizardDC = 8 + profBonus + intMod;
      const portentDice = totalLevel >= 14 ? 3 : 2;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🎲 Portent:</strong> Güne başlarken <span class="badge-subclass-type">${portentDice}x d20 Zarı At</span>! Herhangi bir d20 zarını bu zarlarla değiştir. Büyü DC: <span class="badge-subclass-type">${wizardDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>📜 Expert Divination:</strong> 2.+ Lvl Divination büyüsü atınca <span class="badge-subclass-type">Düşük Seviye Slotu Geri Kazan</span>!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>👁️ The Third Eye:</strong> Action (1/Rest): <span class="badge-subclass-type">Darkvision / Ethereal / Dil Okuma / Görünmezlik Görme</span>.
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🎲 Greater Portent:</strong> Portent yeteneğinde artık <span class="badge-subclass-type">TAM 3 ADET d20 ZARI</span> atıp saklarsınız!
          </div>
        `;
      }
    } else if (scId.includes('evoker') || scId.includes('yıkım') || scId.includes('yikim') || scId.includes('çağırım')) {
      const wizardDC = 8 + profBonus + intMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🔥 Sculpt Spells:</strong> Alan büyülerinde (1 + Büyü Lvl) kadar müttefiği koru: <span class="badge-subclass-type">Otomatik Başarılı & HİÇ Hasar Almazlar</span>! Büyü DC: <span class="badge-subclass-type">${wizardDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>⚡ Potent Cantrip:</strong> Düşman Cantrip zarını başarsa bile <span class="badge-subclass-type">YARIM HASAR ALIR</span>!
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>💥 Empowered Evocation:</strong> Evocation büyülerine <span class="badge-subclass-type">+${intMod} INT Mod Hasar</span> ekleyin!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌊 Overchannel:</strong> 1-5. seviye büyü attığında zar atmadan <span class="badge-subclass-type">MAKSİMUM HASAR VUR</span> (1/LR)!
          </div>
        `;
      }
    } else if (scId.includes('illusionist') || scId.includes('illüzyonist') || scId.includes('illuzyonist') || scId.includes('yanılsama')) {
      const wizardDC = 8 + profBonus + intMod;
      pillsHTML += `
        <div class="subclass-attack-pill">
          <strong>🎭 Improved Minor Illusion:</strong> Bedava Minor Illusion | Tek atışta <span class="badge-subclass-type">HEM SES HEM GÖRÜNTÜ (Bonus Action)</span>. Büyü DC: <span class="badge-subclass-type">${wizardDC}</span>.
        </div>
      `;
      if (totalLevel >= 6) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>✨ Phantasmal Creatures:</strong> Summon Fey & Shadowspawn büyülere eklenir, <span class="badge-subclass-type">Illusion Büyüsü Olarak Atılır</span>.
          </div>
        `;
      }
      if (totalLevel >= 10) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🛡️ Illusory Self:</strong> Reaction: Düşman vurduğunda kopya oluşur; <span class="badge-subclass-type">Gelen Saldırı OTOMATİK İSKALAR</span>!
          </div>
        `;
      }
      if (totalLevel >= 14) {
        pillsHTML += `
          <div class="subclass-attack-pill">
            <strong>🌀 Illusory Reality:</strong> BA (Illusion büyü attığında): İllüzyonun 1 nesnesini <span class="badge-subclass-type">1 Dakika GERÇEK Yap</span>!
          </div>
        `;
      }
    }

    const page2Box = document.getElementById('page2-subclass-features-container');
    const page2List = document.getElementById('page2-subclass-pills-list');
    const page2BadgeName = document.getElementById('page2-subclass-badge-name');

    if (pillsHTML) {
      box.style.display = 'block';
      pillsList.innerHTML = pillsHTML;
      if (badgeName) badgeName.textContent = subclassName || subclassInputVal;

      if (page2Box && page2List) {
        page2Box.style.display = 'block';
        page2List.innerHTML = pillsHTML;
        if (page2BadgeName) page2BadgeName.textContent = subclassName || subclassInputVal;
      }
    } else {
      box.style.display = 'none';
      if (page2Box) page2Box.style.display = 'none';
    }
  };
})();
