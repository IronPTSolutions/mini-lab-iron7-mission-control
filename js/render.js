// ============================================================
// Motor de renderizado — lee window.station y pinta el DOM
// ============================================================

var completedIterations = {};
var TOTAL_ITERATIONS = 9; // 8 + bonus

// ---- Hints por iteracion ----
var hints = {
  1: {
    title: 'Iteracion 1 — Restaurar Sistemas Basicos',
    tasks: [
      'station.name = "IRON-7"',
      'station.status = "operativa"',
      'station.oxygen = 98',
      'station.energy = 85'
    ]
  },
  2: {
    title: 'Iteracion 2 — Activar el Puente de Mando',
    tasks: [
      'station.modules.puente.online = true',
      'station.modules.puente.temperature = 21',
      'station.modules.puente.systems = ["navegacion", "comunicaciones", "escudos"]'
    ]
  },
  3: {
    title: 'Iteracion 3 — Tripulacion a Bordo',
    tasks: [
      'station.crew.push({ name: "Cmte. Reyes", role: "comandante", active: true })',
      'Anade 2 miembros mas con .push()'
    ]
  },
  4: {
    title: 'Iteracion 4 — Informe de Tripulacion (usa bucles!)',
    tasks: [
      'Usa un for para recorrer station.crew y crear station.crewReport (array de strings)',
      'Usa for...in en station.modules para crear station.modulesReport (array de strings)'
    ]
  },
  5: {
    title: 'Iteracion 5 — Activar Laboratorio',
    tasks: [
      'station.modules.laboratorio.online = true',
      'Haz .push() de 2 experimentos con: id, name, status, progress'
    ]
  },
  6: {
    title: 'Iteracion 6 — Diagnostico de Sistemas (usa bucles!)',
    tasks: [
      'Usa un for para recorrer experiments y crear station.experimentLog (array de strings)',
      'Usa for...in en station.modules para crear station.temperatureReport (objeto clave:temp)'
    ]
  },
  7: {
    title: 'Iteracion 7 — Registro de Misiones',
    tasks: ['station.missions = [{ code, name, priority, assigned, log: [{ timestamp, event }] }]']
  },
  8: {
    title: 'Iteracion 8 — Bahia de Carga Online',
    tasks: [
      'station.modules.bahiaCarga.online = true',
      'Haz .push() de 3 items con: item, quantity, location: { sector, rack, slot }'
    ]
  },
  9: {
    title: 'BONUS — Mision Critica',
    tasks: ['Anade skills a cada crew member', 'Anade una mision con 3+ entradas en su log']
  }
};

// ---- Utilidades ----
function esc(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function gaugeColor(pct) {
  if (pct >= 70) return 'var(--green)';
  if (pct >= 40) return 'var(--yellow)';
  return 'var(--red)';
}

// ---- Renderizado del header ----
function renderHeader() {
  var el = document.getElementById('station-name');
  var statusEl = document.getElementById('station-status');
  var o2Fill = document.getElementById('o2-fill');
  var o2Val = document.getElementById('o2-value');
  var enFill = document.getElementById('energy-fill');
  var enVal = document.getElementById('energy-value');

  el.textContent = station.name || '???';
  el.classList.toggle('active', !!station.name && station.name !== '');

  var isOp = station.status === 'operativa';
  statusEl.textContent = station.status || 'desconocido';
  statusEl.className = 'status-badge ' + (isOp ? 'online' : 'offline');

  var o2 = clamp(station.oxygen || 0, 0, 100);
  o2Fill.style.width = o2 + '%';
  o2Fill.style.background = gaugeColor(o2);
  o2Val.textContent = o2 + '%';

  var en = clamp(station.energy || 0, 0, 100);
  enFill.style.width = en + '%';
  enFill.style.background = gaugeColor(en);
  enVal.textContent = en + '%';
}

// ---- Renderizado de crew ----
function renderCrew() {
  var container = document.getElementById('crew-list');
  if (!Array.isArray(station.crew) || station.crew.length === 0) {
    container.innerHTML = '<p class="empty-msg">Sin tripulacion asignada</p>';
    return;
  }
  var html = '';
  for (var i = 0; i < station.crew.length; i++) {
    var m = station.crew[i];
    var initials = (m.name || '??')
      .split(' ')
      .map(function (w) {
        return w[0];
      })
      .join('')
      .substring(0, 2)
      .toUpperCase();
    var roleClass = m.role === 'comandante' ? 'cmd' : m.role === 'cientifica' ? 'sci' : m.role === 'ingeniero' ? 'eng' : 'gen';

    html += '<div class="crew-card ' + roleClass + '">';
    html += '<div class="crew-avatar">' + esc(initials) + '</div>';
    html += '<div class="crew-info">';
    html += '<strong>' + esc(m.name || 'Desconocido') + '</strong>';
    html += '<span class="crew-role">' + esc(m.role || '—') + '</span>';

    if (m.skills && typeof m.skills === 'object') {
      html += '<div class="crew-skills">';
      var keys = Object.keys(m.skills);
      for (var k = 0; k < keys.length; k++) {
        var val = clamp(m.skills[keys[k]], 0, 10);
        html += '<div class="skill-row">';
        html += '<span class="skill-name">' + esc(keys[k]) + '</span>';
        html += '<div class="skill-bar"><div class="skill-fill" style="width:' + val * 10 + '%"></div></div>';
        html += '</div>';
      }
      html += '</div>';
    }

    html += '</div>';
    html += '<span class="crew-status ' + (m.active ? 'on' : 'off') + '"></span>';
    html += '</div>';
  }
  container.innerHTML = html;
}

// ---- Renderizado de reports (iteracion 4 y 6) ----
function renderReports() {
  var container = document.getElementById('reports-body');
  var card = document.getElementById('mod-reports');
  var badge = card.querySelector('.module-status');

  var hasCrewReport = Array.isArray(station.crewReport) && station.crewReport.length > 0;
  var hasModulesReport = Array.isArray(station.modulesReport) && station.modulesReport.length > 0;
  var hasExpLog = Array.isArray(station.experimentLog) && station.experimentLog.length > 0;
  var hasTempReport = station.temperatureReport && typeof station.temperatureReport === 'object' && Object.keys(station.temperatureReport).length > 0;
  var hasAny = hasCrewReport || hasModulesReport || hasExpLog || hasTempReport;

  card.classList.toggle('online', hasAny);
  card.classList.toggle('offline', !hasAny);
  badge.textContent = hasAny ? 'DATOS' : 'VACIO';
  badge.className = 'module-status ' + (hasAny ? 'on' : 'off');

  if (!hasAny) {
    container.innerHTML = '<div class="static-overlay"><span>SIN INFORMES</span></div>';
    return;
  }

  var html = '';

  if (hasCrewReport) {
    html += '<div class="report-section">';
    html += '<div class="report-title">Informe de Tripulacion</div>';
    for (var i = 0; i < station.crewReport.length; i++) {
      html += '<div class="report-entry crew-entry">' + esc(station.crewReport[i]) + '</div>';
    }
    html += '</div>';
  }

  if (hasModulesReport) {
    html += '<div class="report-section">';
    html += '<div class="report-title">Informe de Modulos</div>';
    for (var j = 0; j < station.modulesReport.length; j++) {
      html += '<div class="report-entry module-entry">' + esc(station.modulesReport[j]) + '</div>';
    }
    html += '</div>';
  }

  if (hasExpLog) {
    html += '<div class="report-section">';
    html += '<div class="report-title">Log de Experimentos</div>';
    for (var k = 0; k < station.experimentLog.length; k++) {
      html += '<div class="report-entry exp-entry">' + esc(station.experimentLog[k]) + '</div>';
    }
    html += '</div>';
  }

  if (hasTempReport) {
    html += '<div class="report-section">';
    html += '<div class="report-title">Reporte de Temperaturas</div>';
    var tempKeys = Object.keys(station.temperatureReport);
    for (var t = 0; t < tempKeys.length; t++) {
      var temp = station.temperatureReport[tempKeys[t]];
      var tempColor = temp >= 20 ? 'var(--green)' : temp >= 15 ? 'var(--yellow)' : 'var(--red)';
      html += '<div class="report-entry temp-entry">';
      html += '<span>' + esc(tempKeys[t]) + '</span>';
      html += '<span class="temp-value" style="color:' + tempColor + '">' + temp + ' C</span>';
      html += '</div>';
    }
    html += '</div>';
  }

  container.innerHTML = html;
}

// ---- Renderizado de modulos ----
function renderModule(key, elId) {
  var mod = station.modules && station.modules[key];
  var card = document.getElementById(elId);
  if (!mod) return;

  card.classList.toggle('online', mod.online === true);
  card.classList.toggle('offline', mod.online !== true);

  var badge = card.querySelector('.module-status');
  badge.textContent = mod.online ? 'ONLINE' : 'OFFLINE';
  badge.className = 'module-status ' + (mod.online ? 'on' : 'off');

  var body = card.querySelector('.module-body');

  if (!mod.online) {
    body.innerHTML = '<div class="static-overlay"><span>SIN SENAL</span></div>';
    return;
  }

  var html = '';

  // Temperature
  if (typeof mod.temperature === 'number') {
    html += '<div class="module-stat"><span>Temp</span><span>' + mod.temperature + ' C</span></div>';
  }

  // Puente systems
  if (key === 'puente' && Array.isArray(mod.systems)) {
    html += '<div class="module-stat"><span>Sistemas</span></div>';
    html += '<div class="systems-list">';
    for (var i = 0; i < mod.systems.length; i++) {
      html += '<span class="system-tag">' + esc(mod.systems[i]) + '</span>';
    }
    html += '</div>';
  }

  // Lab experiments
  if (key === 'laboratorio' && Array.isArray(mod.experiments)) {
    for (var j = 0; j < mod.experiments.length; j++) {
      var exp = mod.experiments[j];
      var pct = clamp(exp.progress || 0, 0, 100);
      html += '<div class="experiment-card">';
      html += '<div class="exp-header"><span class="exp-id">' + esc(exp.id || '') + '</span><span class="exp-status">' + esc(exp.status || '') + '</span></div>';
      html += '<div class="exp-name">' + esc(exp.name || '') + '</div>';
      html += '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div><span class="progress-label">' + pct + '%</span></div>';
      html += '</div>';
    }
  }

  // Cargo bay inventory
  if (key === 'bahiaCarga' && Array.isArray(mod.inventory)) {
    if (mod.inventory.length === 0) {
      html += '<p class="empty-msg">Inventario vacio</p>';
    } else {
      html += '<div class="cargo-grid">';
      for (var c = 0; c < mod.inventory.length; c++) {
        var it = mod.inventory[c];
        var loc = it.location || {};
        html += '<div class="cargo-item">';
        html += '<div class="cargo-name">' + esc(it.item || '???') + '</div>';
        html += '<div class="cargo-qty">x' + (it.quantity || 0) + '</div>';
        html += '<div class="cargo-loc">Sector ' + esc(loc.sector || '?') + ' · Rack ' + (loc.rack || '?') + ' · Slot ' + (loc.slot || '?') + '</div>';
        html += '</div>';
      }
      html += '</div>';
    }
  }

  body.innerHTML = html;
}

// ---- Renderizado de misiones ----
function renderMissions() {
  var container = document.getElementById('missions-body');
  var card = document.getElementById('mod-missions');
  var badge = card.querySelector('.module-status');
  var hasMissions = Array.isArray(station.missions) && station.missions.length > 0;

  card.classList.toggle('online', hasMissions);
  card.classList.toggle('offline', !hasMissions);
  badge.textContent = hasMissions ? 'ACTIVAS' : 'SIN DATOS';
  badge.className = 'module-status ' + (hasMissions ? 'on' : 'off');

  if (!hasMissions) {
    container.innerHTML = '<div class="static-overlay"><span>SIN DATOS</span></div>';
    return;
  }

  var html = '';
  for (var i = 0; i < station.missions.length; i++) {
    var m = station.missions[i];
    var prioClass = m.priority === 'alta' ? 'high' : m.priority === 'media' ? 'med' : 'low';

    html += '<div class="mission-card">';
    html += '<div class="mission-header">';
    html += '<span class="mission-code">' + esc(m.code || '') + '</span>';
    html += '<span class="mission-prio ' + prioClass + '">' + esc(m.priority || '') + '</span>';
    html += '</div>';
    html += '<div class="mission-name">' + esc(m.name || '') + '</div>';
    html += '<div class="mission-assigned">Asignado: ' + esc(m.assigned || '—') + '</div>';

    if (Array.isArray(m.log) && m.log.length > 0) {
      html += '<div class="mission-log">';
      for (var j = 0; j < m.log.length; j++) {
        html += '<div class="log-entry">';
        html += '<span class="log-time">' + esc(m.log[j].timestamp || '') + '</span>';
        html += '<span class="log-event">' + esc(m.log[j].event || '') + '</span>';
        html += '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
  }
  container.innerHTML = html;
}

// ---- Progreso ----
function renderProgress() {
  var dots = document.querySelectorAll('.progress-dot');
  var completedCount = 0;

  for (var i = 0; i < iterationChecks.length; i++) {
    var passed = false;
    try {
      passed = iterationChecks[i]();
    } catch (e) {
      passed = false;
    }

    if (passed) {
      completedCount++;
      if (!completedIterations[i]) {
        completedIterations[i] = true;
        celebrate(i);
      }
    }

    if (dots[i]) {
      dots[i].classList.toggle('done', !!passed);
    }
  }

  var pctEl = document.getElementById('progress-pct');
  pctEl.textContent = Math.round((completedCount / TOTAL_ITERATIONS) * 100) + '%';

  // Final celebration
  if (completedCount === TOTAL_ITERATIONS) {
    document.body.classList.add('mission-complete');
  }
}

// ---- Hint en terminal ----
function renderHint() {
  var termBody = document.getElementById('terminal-body');
  var nextIter = -1;

  for (var i = 0; i < iterationChecks.length; i++) {
    try {
      if (!iterationChecks[i]()) {
        nextIter = i + 1;
        break;
      }
    } catch (e) {
      nextIter = i + 1;
      break;
    }
  }

  if (nextIter === -1) {
    termBody.innerHTML = '<span class="term-success">> TODOS LOS SISTEMAS RESTAURADOS. MISION COMPLETA.</span>';
    return;
  }

  var h = hints[nextIter];
  if (!h) return;

  termBody.innerHTML = '<span class="term-title">> ' + esc(h.title) + '</span>';
}

// ---- Celebracion ----
function celebrate(iterIndex) {
  var toast = document.createElement('div');
  toast.className = 'toast';
  var labels = [
    'Sistemas basicos restaurados',
    'Puente de mando activado',
    'Tripulacion a bordo',
    'Informe de tripulacion generado',
    'Laboratorio operativo',
    'Diagnostico de sistemas completo',
    'Misiones registradas',
    'Bahia de carga online',
    'MISION CRITICA COMPLETA'
  ];
  toast.textContent = labels[iterIndex] || 'Sistema reparado';
  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add('show');
  }, 50);
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () {
      toast.remove();
    }, 500);
  }, 3000);
}

// ---- Loop principal ----
function renderAll() {
  renderHeader();
  renderCrew();
  renderModule('puente', 'mod-puente');
  renderModule('laboratorio', 'mod-laboratorio');
  renderModule('bahiaCarga', 'mod-bahiacarga');
  renderReports();
  renderMissions();
  renderProgress();
  renderHint();
}

// Arrancar
renderAll();
setInterval(renderAll, 1000);
