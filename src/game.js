const SIZE = 7;
const START = { x: 3, y: 6 };

const TILE_META = {
  start: { icon: "◆", label: "Start", className: "start" },
  empty: { icon: "·", label: "Path", className: "empty" },
  monster: { icon: "☠", label: "Foe", className: "enemy" },
  boss: { icon: "♛", label: "Boss", className: "boss" },
  treasure: { icon: "✦", label: "Loot", className: "treasure" },
  event: { icon: "?", label: "Event", className: "event" },
  shop: { icon: "⌂", label: "Shop", className: "shop" },
  trap: { icon: "!", label: "Trap", className: "trap" },
  shrine: { icon: "✚", label: "Shrine", className: "shrine" },
};

const MONSTERS = [
  { name: "Cave Gnawer", icon: "☠", hp: 10, attack: 4, defense: 1, xp: 3, gold: 3, tier: "Small" },
  { name: "Bone Guard", icon: "♜", hp: 15, attack: 5, defense: 2, xp: 4, gold: 4, tier: "Guard" },
  { name: "Ember Imp", icon: "♨", hp: 12, attack: 7, defense: 0, xp: 5, gold: 5, tier: "Risk" },
];

const BOSS = {
  name: "Maze Warden",
  icon: "♛",
  hp: 34,
  attack: 8,
  defense: 3,
  xp: 8,
  gold: 10,
  tier: "Boss",
};

const ITEMS = [
  { name: "Potion", text: "+1 potion and +2 gold", apply: (s) => { s.player.potions += 1; s.player.gold += 2; } },
  { name: "Iron Blade", text: "+2 attack", apply: (s) => { s.player.attack += 2; } },
  { name: "Old Shield", text: "+1 defense and +1 energy", apply: (s) => { s.player.defense += 1; s.player.energy = Math.min(s.player.maxEnergy, s.player.energy + 1); } },
];

const EVENTS = [
  {
    title: "Cracked Fountain",
    body: "Cold water runs through a broken statue. It looks clean, but the basin hums.",
    choices: [
      { title: "Drink deeply", detail: "Restore 14 HP.", apply: (s) => healPlayer(s, 14) },
      { title: "Bottle it", detail: "Gain a potion.", apply: (s) => { s.player.potions += 1; addLog(s, "Bottled a clean potion."); } },
    ],
  },
  {
    title: "Gambler's Door",
    body: "A stone door offers a shortcut in exchange for blood or coin.",
    choices: [
      { title: "Pay 5 gold", detail: "Gain +2 attack.", disabled: (s) => s.player.gold < 5, apply: (s) => { s.player.gold -= 5; s.player.attack += 2; addLog(s, "Paid the door and sharpened your weapon."); } },
      { title: "Pay 8 HP", detail: "Gain +2 defense.", disabled: (s) => s.player.hp <= 8, apply: (s) => { damagePlayer(s, 8); s.player.defense += 2; addLog(s, "The door took blood and hardened your armor."); } },
    ],
  },
  {
    title: "Lost Scout",
    body: "A wounded scout can share supplies or a map mark before leaving.",
    choices: [
      { title: "Take supplies", detail: "Gain 6 gold.", apply: (s) => { s.player.gold += 6; addLog(s, "The scout handed over a small purse."); } },
      { title: "Learn the route", detail: "Reveal a nearby safe tile.", apply: (s) => revealSafeNeighbor(s) },
    ],
  },
];

const SHOP = [
  { title: "Field Bandage", detail: "Restore 16 HP.", cost: 7, apply: (s) => healPlayer(s, 16) },
  { title: "Honed Edge", detail: "Gain +2 attack.", cost: 9, apply: (s) => { s.player.attack += 2; addLog(s, "Bought a sharper edge."); } },
  { title: "Guard Charm", detail: "Gain +1 defense and +1 max energy.", cost: 10, apply: (s) => { s.player.defense += 1; s.player.maxEnergy += 1; s.player.energy += 1; addLog(s, "Bought a steady guard charm."); } },
];

let state = null;

const el = {
  board: document.querySelector("#board"),
  hud: document.querySelector("#hud"),
  logList: document.querySelector("#logList"),
  stateBadge: document.querySelector("#stateBadge"),
  hintText: document.querySelector("#hintText"),
  scorePreview: document.querySelector("#scorePreview"),
  seedInput: document.querySelector("#seedInput"),
  startOverlay: document.querySelector("#startOverlay"),
  startButton: document.querySelector("#startButton"),
  newRunButton: document.querySelector("#newRunButton"),
  restartButton: document.querySelector("#restartButton"),
  resultRestartButton: document.querySelector("#resultRestartButton"),
  attackButton: document.querySelector("#attackButton"),
  skillButton: document.querySelector("#skillButton"),
  potionButton: document.querySelector("#potionButton"),
  waitButton: document.querySelector("#waitButton"),
  actionHelp: document.querySelector("#actionHelp"),
  combatPanel: document.querySelector("#combatPanel"),
  enemyTier: document.querySelector("#enemyTier"),
  enemyIcon: document.querySelector("#enemyIcon"),
  enemyName: document.querySelector("#enemyName"),
  enemyStats: document.querySelector("#enemyStats"),
  choiceModal: document.querySelector("#choiceModal"),
  modalKicker: document.querySelector("#modalKicker"),
  modalTitle: document.querySelector("#modalTitle"),
  modalBody: document.querySelector("#modalBody"),
  modalChoices: document.querySelector("#modalChoices"),
  resultModal: document.querySelector("#resultModal"),
  resultKicker: document.querySelector("#resultKicker"),
  resultTitle: document.querySelector("#resultTitle"),
  resultBody: document.querySelector("#resultBody"),
  resultStats: document.querySelector("#resultStats"),
  floatLayer: document.querySelector("#floatLayer"),
};

function hashSeed(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRng(seedText) {
  let t = hashSeed(seedText) || 1;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, list) {
  return list[Math.floor(rng() * list.length)];
}

function key(x, y) {
  return `${x},${y}`;
}

function neighbors(x, y) {
  return [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ].filter((p) => p.x >= 0 && p.x < SIZE && p.y >= 0 && p.y < SIZE);
}

function buildBoard(seedText) {
  const rng = makeRng(seedText);
  const board = Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => ({
      x,
      y,
      type: "empty",
      revealed: false,
      available: false,
      resolved: false,
    })),
  );

  board[START.y][START.x].type = "start";
  board[START.y][START.x].revealed = true;
  board[START.y][START.x].resolved = true;

  const bossX = 1 + Math.floor(rng() * 5);
  const bossY = Math.floor(rng() * 2);
  board[bossY][bossX].type = "boss";

  let cursor = { ...START };
  const path = new Set([key(cursor.x, cursor.y)]);
  while (cursor.x !== bossX || cursor.y !== bossY) {
    const dx = bossX - cursor.x;
    const dy = bossY - cursor.y;
    if (Math.abs(dx) > 0 && (Math.abs(dy) === 0 || rng() < 0.46)) {
      cursor = { x: cursor.x + Math.sign(dx), y: cursor.y };
    } else {
      cursor = { x: cursor.x, y: cursor.y + Math.sign(dy) };
    }
    path.add(key(cursor.x, cursor.y));
  }

  const pool = ["monster", "monster", "monster", "treasure", "treasure", "event", "event", "trap", "shrine", "shop", "empty"];
  const cells = [];
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (board[y][x].type === "start" || board[y][x].type === "boss") continue;
      const forcedPath = path.has(key(x, y));
      board[y][x].type = forcedPath && rng() < 0.35 ? "monster" : pick(rng, pool);
      cells.push(board[y][x]);
    }
  }

  ensureType(board, cells, "shop", rng);
  ensureType(board, cells, "event", rng);
  ensureType(board, cells, "treasure", rng);
  updateAvailable(board, START);
  return board;
}

function ensureType(board, cells, type, rng) {
  if (board.flat().some((tile) => tile.type === type)) return;
  const tile = pick(rng, cells.filter((cell) => cell.type !== "boss"));
  tile.type = type;
}

function newState(seedText = randomSeed()) {
  return {
    seed: seedText,
    rng: makeRng(seedText),
    board: buildBoard(seedText),
    phase: "start",
    current: { ...START },
    enemy: null,
    activeTile: null,
    turn: 0,
    kills: 0,
    explored: 1,
    player: {
      hp: 38,
      maxHp: 38,
      attack: 6,
      defense: 1,
      gold: 4,
      energy: 4,
      maxEnergy: 4,
      level: 1,
      xp: 0,
      potions: 1,
    },
    log: ["Ready at the maze entrance."],
    lastDelta: null,
  };
}

function randomSeed() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function startRun() {
  if (!state || state.phase === "start") {
    state = newState(el.seedInput.value.trim() || randomSeed());
  }
  state.phase = "exploring";
  addLog(state, `Run started with seed ${state.seed}.`);
  render();
}

function restartRun() {
  state = newState(el.seedInput.value.trim() || randomSeed());
  startRun();
}

function addLog(s, message) {
  s.log.unshift(message);
  s.log = s.log.slice(0, 14);
}

function updateAvailable(board, current) {
  board.flat().forEach((tile) => {
    tile.available = false;
  });
  neighbors(current.x, current.y).forEach((p) => {
    const tile = board[p.y][p.x];
    if (!tile.revealed || tile.resolved) tile.available = true;
  });
}

function getTile(x, y) {
  return state.board[y][x];
}

function clickTile(x, y) {
  if (!["exploring"].includes(state.phase)) return;
  const tile = getTile(x, y);
  if (!tile.available) return;
  advanceTurn();
  if (!tile.revealed) {
    tile.revealed = true;
    state.explored += 1;
    state.activeTile = tile;
    addLog(state, `Revealed ${TILE_META[tile.type].label} at row ${y + 1}, column ${x + 1}.`);
    resolveTile(tile);
  } else {
    moveTo(tile);
  }
  if (state.phase === "exploring") updateAvailable(state.board, state.current);
  render();
}

function moveTo(tile) {
  state.current = { x: tile.x, y: tile.y };
  addLog(state, `Moved to row ${tile.y + 1}, column ${tile.x + 1}.`);
  updateAvailable(state.board, state.current);
}

function resolveTile(tile) {
  if (tile.resolved && tile.type !== "boss") {
    moveTo(tile);
    return;
  }

  if (tile.type === "monster" || tile.type === "boss") {
    const base = tile.type === "boss" ? BOSS : pick(state.rng, MONSTERS);
    const scale = Math.max(0, Math.floor((SIZE - tile.y) / 2) - 1);
    state.enemy = {
      ...base,
      hp: base.hp + scale * 3,
      maxHp: base.hp + scale * 3,
      attack: base.attack + scale,
      defense: base.defense,
      boss: tile.type === "boss",
    };
    state.phase = "combat";
    addLog(state, `${state.enemy.name} blocks the room.`);
    return;
  }

  if (tile.type === "treasure") {
    const item = pick(state.rng, ITEMS);
    item.apply(state);
    tile.resolved = true;
    moveTo(tile);
    addLog(state, `Treasure found: ${item.name}. ${item.text}`);
    maybeLevelUp();
    return;
  }

  if (tile.type === "event") {
    state.phase = "event";
    openEventModal(pick(state.rng, EVENTS), tile);
    return;
  }

  if (tile.type === "shop") {
    state.phase = "shop";
    openShopModal(tile);
    return;
  }

  if (tile.type === "trap") {
    const damage = 5 + Math.floor(state.rng() * 5);
    const gold = Math.floor(state.rng() * 4);
    damagePlayer(state, damage);
    state.player.gold += gold;
    tile.resolved = true;
    moveTo(tile);
    addLog(state, `Trap sprung: -${damage} HP, recovered ${gold} gold.`);
    return;
  }

  if (tile.type === "shrine") {
    state.phase = "event";
    openEventModal({
      title: "Sunken Shrine",
      body: "The shrine answers only costly prayers.",
      choices: [
        { title: "Offer 6 HP", detail: "Gain +1 attack and +1 defense.", disabled: (s) => s.player.hp <= 6, apply: (s) => { damagePlayer(s, 6); s.player.attack += 1; s.player.defense += 1; addLog(s, "The shrine traded pain for strength."); } },
        { title: "Offer 2 energy", detail: "Restore 14 HP.", disabled: (s) => s.player.energy < 2, apply: (s) => { s.player.energy -= 2; healPlayer(s, 14); } },
      ],
    }, tile);
    return;
  }

  tile.resolved = true;
  moveTo(tile);
}

function advanceTurn() {
  state.turn += 1;
}

function playerDamage(multiplier = 1) {
  return Math.max(1, Math.floor(state.player.attack * multiplier) - state.enemy.defense);
}

function enemyDamage() {
  return Math.max(1, state.enemy.attack - state.player.defense);
}

function attackEnemy(useSkill = false) {
  if (state.phase !== "combat" || !state.enemy) return;
  if (useSkill && state.player.energy < 2) return;
  advanceTurn();
  if (useSkill) state.player.energy -= 2;
  const damage = useSkill ? playerDamage(2) : playerDamage(1);
  state.enemy.hp -= damage;
  state.lastDelta = { text: `-${damage}`, kind: "damage" };
  addLog(state, `${useSkill ? "Power Strike" : "Attack"} hit ${state.enemy.name} for ${damage}.`);

  if (state.enemy.hp <= 0) {
    defeatEnemy();
  } else {
    const retaliation = enemyDamage();
    damagePlayer(state, retaliation);
    addLog(state, `${state.enemy.name} countered for ${retaliation}.`);
  }
  render();
}

function defeatEnemy() {
  const defeated = state.enemy;
  state.player.gold += defeated.gold;
  state.player.xp += defeated.xp;
  state.kills += 1;
  addLog(state, `Defeated ${defeated.name}: +${defeated.xp} XP, +${defeated.gold} gold.`);
  state.activeTile.resolved = true;
  const defeatedBoss = defeated.boss;
  state.enemy = null;
  maybeLevelUp();
  if (defeatedBoss) {
    endRun("victory");
    return;
  }
  moveTo(state.activeTile);
  state.phase = "exploring";
}

function maybeLevelUp() {
  const needed = levelTarget();
  if (state.player.xp < needed) return;
  state.player.xp -= needed;
  state.player.level += 1;
  state.player.maxHp += 6;
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + 12);
  if (state.player.level % 2 === 0) state.player.attack += 1;
  else state.player.defense += 1;
  state.player.maxEnergy += 1;
  state.player.energy = state.player.maxEnergy;
  addLog(state, `Level ${state.player.level}: stronger, tougher, and energy restored.`);
}

function levelTarget() {
  return 6 + state.player.level * 3;
}

function damagePlayer(s, amount) {
  s.player.hp = Math.max(0, s.player.hp - amount);
  s.lastDelta = { text: `-${amount} HP`, kind: "damage" };
  if (s.player.hp <= 0) endRun("defeat");
}

function healPlayer(s, amount) {
  const before = s.player.hp;
  s.player.hp = Math.min(s.player.maxHp, s.player.hp + amount);
  s.lastDelta = { text: `+${s.player.hp - before} HP`, kind: "heal" };
  addLog(s, `Recovered ${s.player.hp - before} HP.`);
}

function usePotion() {
  if (!state || state.phase === "start" || state.player.potions <= 0 || state.player.hp >= state.player.maxHp) return;
  advanceTurn();
  state.player.potions -= 1;
  healPlayer(state, 12);
  render();
}

function rest() {
  if (!state || state.phase !== "exploring") return;
  advanceTurn();
  const restored = Math.min(state.player.maxEnergy - state.player.energy, 1);
  state.player.energy += restored;
  if (restored) addLog(state, "Caught your breath and recovered 1 energy.");
  else addLog(state, "Rested, but energy is already full.");
  render();
}

function openEventModal(event, tile) {
  openChoiceModal("Event", event.title, event.body, event.choices.map((choice) => ({
    ...choice,
    onPick: () => {
      choice.apply(state);
      finishChoiceTile(tile);
    },
  })));
}

function openShopModal(tile) {
  openChoiceModal("Shop", "Lantern Merchant", "A quiet merchant offers useful gear. You may buy one item before moving on.", [
    ...SHOP.map((item) => ({
      title: `${item.title} - ${item.cost}g`,
      detail: item.detail,
      disabled: (s) => s.player.gold < item.cost,
      apply: (s) => {
        s.player.gold -= item.cost;
        item.apply(s);
      },
      onPick: () => {
        state.player.gold -= item.cost;
        item.apply(state);
        finishChoiceTile(tile);
      },
    })),
    { title: "Leave", detail: "Save your gold.", onPick: () => finishChoiceTile(tile) },
  ]);
}

function openChoiceModal(kicker, title, body, choices) {
  el.modalKicker.textContent = kicker;
  el.modalTitle.textContent = title;
  el.modalBody.textContent = body;
  el.modalChoices.innerHTML = "";
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.disabled = choice.disabled?.(state) || false;
    button.innerHTML = `<strong>${choice.title}</strong><span>${choice.detail}</span>`;
    button.addEventListener("click", () => {
      closeChoiceModal();
      if (choice.onPick) choice.onPick();
      else {
        choice.apply(state);
        render();
      }
    });
    el.modalChoices.append(button);
  });
  el.choiceModal.classList.remove("hidden");
}

function closeChoiceModal() {
  el.choiceModal.classList.add("hidden");
}

function finishChoiceTile(tile) {
  advanceTurn();
  tile.resolved = true;
  moveTo(tile);
  state.phase = state.player.hp <= 0 ? "defeat" : "exploring";
  if (state.phase === "exploring") updateAvailable(state.board, state.current);
  render();
}

function revealSafeNeighbor(s) {
  const candidates = neighbors(s.current.x, s.current.y)
    .map((p) => s.board[p.y][p.x])
    .filter((tile) => !tile.revealed && !["monster", "boss", "trap"].includes(tile.type));
  const tile = candidates[0];
  if (!tile) {
    addLog(s, "No safe nearby route could be read.");
    return;
  }
  tile.revealed = true;
  s.explored += 1;
  addLog(s, "The scout marked a safe nearby room.");
}

function endRun(result) {
  state.phase = result;
  const victory = result === "victory";
  el.resultKicker.textContent = victory ? "Boss Defeated" : "Expedition Lost";
  el.resultTitle.textContent = victory ? "Victory" : "Defeat";
  el.resultBody.textContent = victory
    ? "The Maze Warden falls and the exit opens."
    : "The maze claims this run. A better route or earlier retreat may have changed the outcome.";
  el.resultStats.innerHTML = "";
  [
    ["Score", score()],
    ["Turns", state.turn],
    ["Explored", state.explored],
    ["Kills", state.kills],
  ].forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span class="stat-label">${label}</span><span class="stat-value">${value}</span>`;
    el.resultStats.append(card);
  });
  el.resultModal.classList.remove("hidden");
}

function score() {
  if (!state || state.phase === "start") return 0;
  const victoryBonus = state?.phase === "victory" ? 250 : 0;
  return state.explored * 10 + state.kills * 25 + state.player.gold * 2 + victoryBonus;
}

function render() {
  if (!state) state = newState();
  el.seedInput.value = state.seed;
  el.startOverlay.classList.toggle("hidden", state.phase !== "start");
  el.resultModal.classList.toggle("hidden", !["victory", "defeat"].includes(state.phase));
  renderBoard();
  renderHud();
  renderCombat();
  renderLog();
  renderButtons();
  showFloat();
}

function renderBoard() {
  el.board.innerHTML = "";
  state.board.flat().forEach((tile) => {
    const meta = TILE_META[tile.revealed ? tile.type : "empty"];
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "tile",
      tile.revealed ? "revealed" : "hidden-tile",
      tile.available ? "available" : "",
      state.current.x === tile.x && state.current.y === tile.y ? "current" : "",
      tile.revealed ? meta.className : "",
    ].filter(Boolean).join(" ");
    button.dataset.label = tile.revealed ? meta.label : tile.available ? "Scout" : "";
    button.setAttribute("role", "gridcell");
    button.setAttribute("aria-label", `${tile.revealed ? meta.label : "Hidden tile"} row ${tile.y + 1} column ${tile.x + 1}`);
    button.disabled = !tile.available || state.phase !== "exploring";
    button.innerHTML = `<span class="tile-icon">${tile.revealed ? meta.icon : tile.available ? "◇" : ""}</span>`;
    button.addEventListener("click", () => clickTile(tile.x, tile.y));
    el.board.append(button);
  });
}

function renderHud() {
  const stats = [
    ["HP", `${state.player.hp}/${state.player.maxHp}`],
    ["Attack", state.player.attack],
    ["Defense", state.player.defense],
    ["Gold", state.player.gold],
    ["Energy", `${state.player.energy}/${state.player.maxEnergy}`],
    ["Level", state.player.level],
    ["XP", `${state.player.xp}/${levelTarget()}`],
    ["Turn", state.turn],
    ["Potions", state.player.potions],
    ["Kills", state.kills],
  ];
  el.hud.innerHTML = "";
  stats.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span class="stat-label">${label}</span><span class="stat-value">${value}</span>`;
    el.hud.append(card);
  });
  el.stateBadge.textContent = state.phase[0].toUpperCase() + state.phase.slice(1);
  el.hintText.textContent = hintText();
  el.scorePreview.textContent = `Score ${score()}`;
}

function hintText() {
  if (state.phase === "start") return "Start a run to enter the maze.";
  if (state.phase === "combat") return "Attack or spend 2 energy on Power Strike.";
  if (state.phase === "event") return "Choose an event outcome.";
  if (state.phase === "shop") return "Buy one item or leave.";
  if (state.phase === "victory") return "Boss defeated. Restart for a fresh maze.";
  if (state.phase === "defeat") return "Run ended. Restart for another attempt.";
  return "Click a glowing adjacent tile to reveal or move.";
}

function renderCombat() {
  const active = state.phase === "combat" && state.enemy;
  el.combatPanel.classList.toggle("hidden", !active);
  if (!active) return;
  el.enemyTier.textContent = state.enemy.tier;
  el.enemyIcon.textContent = state.enemy.icon;
  el.enemyName.textContent = state.enemy.name;
  el.enemyStats.textContent = `HP ${Math.max(0, state.enemy.hp)}/${state.enemy.maxHp} / ATK ${state.enemy.attack} / DEF ${state.enemy.defense}`;
}

function renderLog() {
  el.logList.innerHTML = "";
  state.log.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    el.logList.append(li);
  });
}

function renderButtons() {
  const canAct = state.phase === "exploring";
  el.attackButton.disabled = state.phase !== "combat";
  el.skillButton.disabled = state.phase !== "combat" || state.player.energy < 2;
  el.potionButton.disabled = state.phase === "start" || state.player.potions <= 0 || state.player.hp >= state.player.maxHp || ["victory", "defeat"].includes(state.phase);
  el.waitButton.disabled = !canAct;
  el.actionHelp.textContent = hintText();
}

function showFloat() {
  if (!state.lastDelta) return;
  const pop = document.createElement("div");
  pop.className = `float-pop ${state.lastDelta.kind}`;
  pop.textContent = state.lastDelta.text;
  pop.style.left = `${45 + Math.random() * 10}%`;
  pop.style.top = `${42 + Math.random() * 12}%`;
  el.floatLayer.append(pop);
  setTimeout(() => pop.remove(), 820);
  state.lastDelta = null;
}

el.startButton.addEventListener("click", startRun);
el.newRunButton.addEventListener("click", restartRun);
el.restartButton.addEventListener("click", restartRun);
el.resultRestartButton.addEventListener("click", () => {
  el.resultModal.classList.add("hidden");
  restartRun();
});
el.attackButton.addEventListener("click", () => attackEnemy(false));
el.skillButton.addEventListener("click", () => attackEnemy(true));
el.potionButton.addEventListener("click", usePotion);
el.waitButton.addEventListener("click", rest);

state = newState();
render();
