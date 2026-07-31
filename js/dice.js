/**
 * D&D 5e Nexus - Interactive Dice Roller Engine
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.currentRollName = 'Zar Atışı';

window.DnDNexus.openDiceModal = function(sides = 20, count = 1, mod = 0, name = 'Zar Atışı') {
  window.DnDNexus.currentRollName = name;
  const modal = document.getElementById('dice-modal');
  modal.style.display = 'flex';
  document.getElementById('dice-count').value = count;
  document.getElementById('dice-modifier').value = mod;

  document.querySelectorAll('.dice-btn').forEach(btn => {
    if (parseInt(btn.getAttribute('data-sides')) === sides) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  document.getElementById('d20-options-box').style.display = (sides === 20) ? 'block' : 'none';
  window.DnDNexus.executeModalRoll();
};

window.DnDNexus.closeDiceModal = function() {
  document.getElementById('dice-modal').style.display = 'none';
};

window.DnDNexus.executeModalRoll = function() {
  const activeBtn = document.querySelector('.dice-btn.active');
  const sides = activeBtn ? parseInt(activeBtn.getAttribute('data-sides')) : 20;
  const count = parseInt(document.getElementById('dice-count').value) || 1;
  const modifier = parseInt(document.getElementById('dice-modifier').value) || 0;
  const d20Mode = document.querySelector('input[name="d20-mode"]:checked').value;

  const resultBox = document.getElementById('dice-result-container');
  resultBox.innerHTML = '<div class="roll-total">🎲 Atılıyor...</div>';

  setTimeout(() => {
    let rolls = [];
    let total = 0;
    let detailText = '';

    if (sides === 20 && count === 1 && d20Mode !== 'normal') {
      let roll1 = Math.floor(Math.random() * 20) + 1;
      let roll2 = Math.floor(Math.random() * 20) + 1;
      let chosen = (d20Mode === 'advantage') ? Math.max(roll1, roll2) : Math.min(roll1, roll2);
      total = chosen + modifier;
      let modStr = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;
      detailText = `[Zarlar: ${roll1}, ${roll2}] &rarr; Seçilen: ${chosen} ${modStr} (${d20Mode === 'advantage' ? 'Avantaj' : 'Dezavantaj'})`;
    } else {
      for (let i = 0; i < count; i++) rolls.push(Math.floor(Math.random() * sides) + 1);
      let sumRolls = rolls.reduce((a, b) => a + b, 0);
      total = sumRolls + modifier;
      let modStr = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;
      detailText = `[Zarlar: ${rolls.join(', ')}] ${modStr}`;
    }

    resultBox.innerHTML = `
      <div style="font-size: 0.85rem; color: #e9d5ff; font-weight: 700; margin-bottom: 4px;">${window.DnDNexus.currentRollName.toUpperCase()}</div>
      <div class="roll-total">${total}</div>
      <div class="roll-detail">${detailText}</div>
    `;

    if (window.DnDNexus.broadcastRollEvent) {
      window.DnDNexus.broadcastRollEvent(window.DnDNexus.currentRollName, total, detailText);
    }
  }, 250);
};
