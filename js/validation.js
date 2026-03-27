// ============================================================
// Validaciones por iteracion
// ============================================================

function checkIteration1() {
  return (
    station.name === 'IRON-7' &&
    station.status === 'operativa' &&
    station.oxygen >= 90 &&
    station.energy >= 80
  );
}

function checkIteration2() {
  var p = station.modules && station.modules.puente;
  return (
    p &&
    p.online === true &&
    typeof p.temperature === 'number' &&
    Array.isArray(p.systems) &&
    p.systems.length >= 3
  );
}

function checkIteration3() {
  return (
    Array.isArray(station.crew) &&
    station.crew.length >= 3 &&
    station.crew.every(function (m) {
      return m.name && m.role && m.active === true;
    })
  );
}

// NEW: Loops — crew report + modules report
function checkIteration4() {
  return (
    Array.isArray(station.crewReport) &&
    station.crewReport.length >= 3 &&
    station.crewReport.every(function (entry) {
      return typeof entry === 'string' && entry.length > 0;
    }) &&
    Array.isArray(station.modulesReport) &&
    station.modulesReport.length >= 3 &&
    station.modulesReport.every(function (entry) {
      return typeof entry === 'string' && entry.length > 0;
    })
  );
}

function checkIteration5() {
  var lab = station.modules && station.modules.laboratorio;
  return (
    lab &&
    lab.online === true &&
    Array.isArray(lab.experiments) &&
    lab.experiments.length >= 2 &&
    lab.experiments.every(function (e) {
      return e.id && e.name && e.status && typeof e.progress === 'number';
    })
  );
}

// NEW: Loops — experiment summary + module temperatures
function checkIteration6() {
  return (
    Array.isArray(station.experimentLog) &&
    station.experimentLog.length >= 2 &&
    station.experimentLog.every(function (entry) {
      return typeof entry === 'string' && entry.length > 0;
    }) &&
    typeof station.temperatureReport === 'object' &&
    station.temperatureReport !== null &&
    Object.keys(station.temperatureReport).length >= 2
  );
}

function checkIteration7() {
  return (
    Array.isArray(station.missions) &&
    station.missions.length >= 1 &&
    station.missions.every(function (m) {
      return (
        m.code &&
        m.name &&
        m.priority &&
        m.assigned &&
        Array.isArray(m.log) &&
        m.log.length >= 1 &&
        m.log.every(function (entry) {
          return entry.timestamp && entry.event;
        })
      );
    })
  );
}

function checkIteration8() {
  var bc = station.modules && station.modules.bahiaCarga;
  return (
    bc &&
    bc.online === true &&
    Array.isArray(bc.inventory) &&
    bc.inventory.length >= 3 &&
    bc.inventory.every(function (item) {
      return (
        item.item &&
        typeof item.quantity === 'number' &&
        item.location &&
        item.location.sector &&
        typeof item.location.rack === 'number' &&
        typeof item.location.slot === 'number'
      );
    })
  );
}

function checkBonus() {
  var crewHasSkills =
    Array.isArray(station.crew) &&
    station.crew.length >= 3 &&
    station.crew.every(function (m) {
      return m.skills && typeof m.skills === 'object' && Object.keys(m.skills).length >= 2;
    });

  var hasMissionWithFullLog =
    Array.isArray(station.missions) &&
    station.missions.some(function (m) {
      return Array.isArray(m.log) && m.log.length >= 3;
    });

  return crewHasSkills && hasMissionWithFullLog;
}

var iterationChecks = [checkIteration1, checkIteration2, checkIteration3, checkIteration4, checkIteration5, checkIteration6, checkIteration7, checkIteration8, checkBonus];
