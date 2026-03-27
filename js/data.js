// ============================================================
// ESTACION ESPACIAL IRON-7 — Objeto principal (estado inicial)
// ============================================================
// Este objeto esta "danado". Tu mision es repararlo desde la
// consola del navegador. La web se actualizara automaticamente.
// ============================================================

window.station = {
  name: '',
  status: 'danada',
  oxygen: 23,
  energy: 0,
  crew: [],
  modules: {
    puente: {
      name: 'Puente de Mando',
      online: false
    },
    laboratorio: {
      name: 'Laboratorio Central',
      online: false,
      temperature: 19,
      experiments: []
    },
    bahiaCarga: {
      name: 'Bahia de Carga',
      online: false,
      temperature: 15,
      inventory: []
    }
  }
};
