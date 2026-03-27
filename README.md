<!-- Mini LAB | JS Objects & Arrays — Estacion Espacial IRON-7 -->

:::info

  :computer: **Tipo de actividad:** Practica en clase (live coding con instructor)

  <br>

  :clock3: **Duracion estimada**: 40-50 minutos

:::

<br>

# Mini Lab | Estacion Espacial IRON-7

## Introduccion

La estacion espacial **IRON-7** ha sufrido una averia critica. Todos los sistemas estan danados y necesitan reparacion urgente. Tu mision: restaurar la estacion modulo a modulo manipulando su objeto de datos desde la **consola del navegador**.

La pagina web es un **dashboard de control de mision** que se actualiza automaticamente cada segundo. Cada cambio que hagas en el objeto `station` se reflejara en la pantalla en tiempo real.

---

## Setup

1. Abre el dashboard en tu navegador: **[https://ironptsolutions.github.io/mini-lab-iron7-mission-control/](https://ironptsolutions.github.io/mini-lab-iron7-mission-control/)**
2. Abre las **DevTools** (F12 o Cmd+Option+I en Mac)
3. Ve a la pestana **Console**
4. Escribe `station` y pulsa Enter para ver el estado actual del objeto

Veras que el dashboard esta en rojo y todos los modulos muestran "SIN SENAL". Tu trabajo es repararlo todo desde la consola.

---

## Iteracion 1 — Restaurar Sistemas Basicos

La estacion no tiene nombre, su estado es "danada", y los niveles de oxigeno y energia son criticos. Necesitas:

1. Asignar el nombre `"IRON-7"` a la estacion
2. Cambiar el estado a `"operativa"`
3. Subir el oxigeno a `98`
4. Subir la energia a `85`

Cuando termines, el header del dashboard mostrara el nombre en azul, el badge de estado pasara a verde, y las barras de O2/Energia se llenaran.

<details>
<summary>Solucion</summary>

```javascript
station.name = 'IRON-7';
station.status = 'operativa';
station.oxygen = 98;
station.energy = 85;
```

</details>

---

## Iteracion 2 — Activar el Puente de Mando

El Puente de Mando esta offline y le faltan propiedades. Necesitas:

1. Poner el puente **online**
2. Anadir una propiedad `temperature` con valor `21`
3. Anadir una propiedad `systems` que sea un **array** con estos strings: `"navegacion"`, `"comunicaciones"`, `"escudos"`
4. Usa **bracket notation** para anadir una propiedad `"danger-level"` con valor `"bajo"` (tiene un guion, asi que no puedes usar dot notation)
5. Verifica con `Object.keys(station.modules.puente)` que ves todas las propiedades
6. Verifica con `Object.values(station.modules.puente)` que ves todos los valores
7. Elimina la propiedad `"danger-level"` con `delete` (ya no la necesitamos, el puente esta estable)

Cuando termines, la card del Puente mostrara "ONLINE" en verde, la temperatura, y los sistemas como tags.

<details>
<summary>Solucion</summary>

```javascript
station.modules.puente.online = true;
station.modules.puente.temperature = 21;
station.modules.puente.systems = ['navegacion', 'comunicaciones', 'escudos'];

// Bracket notation para propiedades con guion
station.modules.puente['danger-level'] = 'bajo';

// Verificar
console.log(Object.keys(station.modules.puente));
// ["name", "online", "temperature", "systems", "danger-level"]

console.log(Object.values(station.modules.puente));
// ["Puente de Mando", true, 21, ["navegacion", ...], "bajo"]

// Limpiar
delete station.modules.puente['danger-level'];
```

</details>

---

## Iteracion 3 — Tripulacion a Bordo

El array `station.crew` esta vacio. La estacion necesita al menos 3 miembros de tripulacion. Cada miembro es un **objeto** con las propiedades: `name`, `role` y `active`.

1. Anade al primer miembro con `.push()`:

| Propiedad | Valor |
|-----------|-------|
| `name` | `"Cmte. Reyes"` |
| `role` | `"comandante"` |
| `active` | `true` |

2. Anade un segundo miembro:

| Propiedad | Valor |
|-----------|-------|
| `name` | `"Dra. Okafor"` |
| `role` | `"cientifica"` |
| `active` | `true` |

3. Anade un tercer miembro:

| Propiedad | Valor |
|-----------|-------|
| `name` | `"Ing. Tanaka"` |
| `role` | `"ingeniero"` |
| `active` | `true` |

4. Muestra por consola el **nombre** del primer miembro: `station.crew[0].name`
5. Muestra cuantos miembros tiene la tripulacion: `station.crew.length`

Cuando termines, los avatares de la tripulacion apareceran en la barra lateral izquierda.

<details>
<summary>Solucion</summary>

```javascript
station.crew.push({ name: 'Cmte. Reyes', role: 'comandante', active: true });
station.crew.push({ name: 'Dra. Okafor', role: 'cientifica', active: true });
station.crew.push({ name: 'Ing. Tanaka', role: 'ingeniero', active: true });

console.log(station.crew[0].name); // "Cmte. Reyes"
console.log(station.crew.length);  // 3
```

</details>

---

## Iteracion 4 — Informe de Tripulacion (bucles)

Ahora que tienes la tripulacion cargada, el centro de mando necesita un **informe automatizado**. Para ello vas a tener que usar **bucles** para recorrer los datos y generar los informes.

### Parte A: Informe de crew con `for`

Crea un array `station.crewReport` usando un bucle `for` que recorra `station.crew`. Cada elemento del array debe ser un string con el formato: `"[ROL] Nombre"`.

Por ejemplo: `"[COMANDANTE] Cmte. Reyes"`

```javascript
station.crewReport = [];
for (var i = 0; i < station.crew.length; i++) {
  // construye el string y haz push al array
}
```

### Parte B: Informe de modulos con `Object.keys()` + `for`

Usa `Object.keys(station.modules)` para obtener un array con las claves del objeto, y luego recorrelo con un `for` clasico. Cada elemento debe ser un string con el formato: `"modulo: Nombre — STATUS"` donde STATUS es "ONLINE" u "OFFLINE" segun el valor de `.online`.

```javascript
station.modulesReport = [];
var moduleKeys = Object.keys(station.modules);
for (var i = 0; i < moduleKeys.length; i++) {
  // usa moduleKeys[i] para acceder a station.modules[moduleKeys[i]]
}
```

Cuando termines, el panel de **Informes** mostrara ambos listados.

<details>
<summary>Solucion</summary>

```javascript
// Parte A: for clasico sobre el array crew
station.crewReport = [];
for (var i = 0; i < station.crew.length; i++) {
  var member = station.crew[i];
  station.crewReport.push('[' + member.role.toUpperCase() + '] ' + member.name);
}

console.log(station.crewReport);
// ["[COMANDANTE] Cmte. Reyes", "[CIENTIFICA] Dra. Okafor", "[INGENIERO] Ing. Tanaka"]

// Parte B: Object.keys() + for sobre el objeto modules
station.modulesReport = [];
var moduleKeys = Object.keys(station.modules);
for (var j = 0; j < moduleKeys.length; j++) {
  var key = moduleKeys[j];
  var mod = station.modules[key];
  var status = mod.online ? 'ONLINE' : 'OFFLINE';
  station.modulesReport.push(key + ': ' + mod.name + ' — ' + status);
}

console.log(station.modulesReport);
// ["puente: Puente de Mando — ONLINE", "laboratorio: Laboratorio Central — OFFLINE", "bahiaCarga: Bahia de Carga — OFFLINE"]
```

</details>

---

## Iteracion 5 — Activar el Laboratorio

El laboratorio esta offline y no tiene experimentos. Necesitas:

1. Poner el laboratorio **online**
2. Anadir 2 experimentos al array `experiments` usando `.push()`. Cada experimento es un objeto con: `id`, `name`, `status` y `progress` (numero de 0 a 100)

Usa estos datos:

| id | name | status | progress |
|----|------|--------|----------|
| `"EXP-01"` | `"Cultivo Hidroponico"` | `"activo"` | `72` |
| `"EXP-02"` | `"Cristales de Gravedad"` | `"activo"` | `45` |

3. Muestra por consola el progreso del primer experimento: `station.modules.laboratorio.experiments[0].progress`

Cuando termines, la card del Laboratorio mostrara "ONLINE" y los experimentos con sus barras de progreso.

<details>
<summary>Solucion</summary>

```javascript
station.modules.laboratorio.online = true;

station.modules.laboratorio.experiments.push({
  id: 'EXP-01',
  name: 'Cultivo Hidroponico',
  status: 'activo',
  progress: 72
});

station.modules.laboratorio.experiments.push({
  id: 'EXP-02',
  name: 'Cristales de Gravedad',
  status: 'activo',
  progress: 45
});

console.log(station.modules.laboratorio.experiments[0].progress); // 72
```

</details>

---

## Iteracion 6 — Diagnostico de Sistemas (bucles)

Ahora que el laboratorio esta activo con experimentos, necesitas generar un diagnostico completo de la estacion usando bucles.

### Parte A: Log de experimentos con `for`

Recorre el array `station.modules.laboratorio.experiments` con un bucle `for` y crea un array `station.experimentLog`. Cada elemento debe ser un string con el formato: `"[ID] Nombre — progress%"`.

Por ejemplo: `"[EXP-01] Cultivo Hidroponico — 72%"`

```javascript
station.experimentLog = [];
for (var i = 0; i < station.modules.laboratorio.experiments.length; i++) {
  // accede a cada experimento y construye el string
}
```

### Parte B: Reporte de temperaturas con `Object.keys()` + `for`

Usa `Object.keys(station.modules)` para obtener las claves y recorrelas con un `for`. Crea un **objeto** `station.temperatureReport` donde cada clave es el nombre del modulo y el valor es su temperatura. Solo incluye los modulos que tengan la propiedad `temperature`.

```javascript
station.temperatureReport = {};
var modKeys = Object.keys(station.modules);
for (var i = 0; i < modKeys.length; i++) {
  // si el modulo tiene temperature, anadelo al objeto
}
```

Cuando termines, el panel de Informes se actualizara con el log de experimentos y el reporte de temperaturas.

<details>
<summary>Solucion</summary>

```javascript
// Parte A: for sobre array de experimentos
station.experimentLog = [];
for (var i = 0; i < station.modules.laboratorio.experiments.length; i++) {
  var exp = station.modules.laboratorio.experiments[i];
  station.experimentLog.push('[' + exp.id + '] ' + exp.name + ' — ' + exp.progress + '%');
}

console.log(station.experimentLog);
// ["[EXP-01] Cultivo Hidroponico — 72%", "[EXP-02] Cristales de Gravedad — 45%"]

// Parte B: Object.keys() + for para construir un objeto
station.temperatureReport = {};
var modKeys = Object.keys(station.modules);
for (var j = 0; j < modKeys.length; j++) {
  var mod = station.modules[modKeys[j]];
  if (typeof mod.temperature === 'number') {
    station.temperatureReport[mod.name] = mod.temperature;
  }
}

console.log(station.temperatureReport);
// { "Laboratorio Central": 19, "Bahia de Carga": 15 }
// (si el puente ya tenia temperature: { "Puente de Mando": 21, "Laboratorio Central": 19, "Bahia de Carga": 15 })
```

</details>

---

## Iteracion 7 — Registro de Misiones

La estacion no tiene registro de misiones. Necesitas crear la propiedad `missions` en `station` como un **array** y anadir al menos una mision.

Cada mision es un objeto con: `code`, `name`, `priority`, `assigned`, y `log` (un array de objetos con `timestamp` y `event`).

1. Crea el array de misiones con una mision dentro:

```javascript
station.missions = [
  {
    code: 'MSN-401',
    name: 'Reparar Antena de Comunicaciones',
    priority: 'alta',
    assigned: 'Ing. Tanaka',
    log: [
      { timestamp: '08:00', event: 'Inicio EVA' },
      { timestamp: '09:30', event: 'Antena localizada' }
    ]
  }
];
```

2. Muestra por consola el nombre de la mision: `station.missions[0].name`
3. Muestra el evento del primer registro del log: `station.missions[0].log[0].event`

Cuando termines, el panel de Misiones mostrara la mision con su timeline de eventos.

<details>
<summary>Solucion</summary>

```javascript
station.missions = [
  {
    code: 'MSN-401',
    name: 'Reparar Antena de Comunicaciones',
    priority: 'alta',
    assigned: 'Ing. Tanaka',
    log: [
      { timestamp: '08:00', event: 'Inicio EVA' },
      { timestamp: '09:30', event: 'Antena localizada' }
    ]
  }
];

console.log(station.missions[0].name);         // "Reparar Antena de Comunicaciones"
console.log(station.missions[0].log[0].event);  // "Inicio EVA"
```

</details>

---

## Iteracion 8 — Bahia de Carga Online

La Bahia de Carga esta offline y su inventario esta vacio. Cada item del inventario tiene una ubicacion anidada.

1. Pon la Bahia de Carga **online**
2. Anade 3 items al inventario con `.push()`. Cada item tiene: `item` (nombre), `quantity` (numero), y `location` (un **objeto** con `sector`, `rack` y `slot`):

| item | quantity | sector | rack | slot |
|------|----------|--------|------|------|
| `"Celulas de Energia"` | `24` | `"B"` | `3` | `7` |
| `"Repuestos de Escudo"` | `8` | `"A"` | `1` | `2` |
| `"Raciones de Emergencia"` | `150` | `"C"` | `5` | `1` |

3. Muestra por consola el **sector** del primer item: `station.modules.bahiaCarga.inventory[0].location.sector`

Cuando termines, la card de Bahia de Carga mostrara cada item con su ubicacion en el almacen.

<details>
<summary>Solucion</summary>

```javascript
station.modules.bahiaCarga.online = true;

station.modules.bahiaCarga.inventory.push({
  item: 'Celulas de Energia',
  quantity: 24,
  location: { sector: 'B', rack: 3, slot: 7 }
});

station.modules.bahiaCarga.inventory.push({
  item: 'Repuestos de Escudo',
  quantity: 8,
  location: { sector: 'A', rack: 1, slot: 2 }
});

station.modules.bahiaCarga.inventory.push({
  item: 'Raciones de Emergencia',
  quantity: 150,
  location: { sector: 'C', rack: 5, slot: 1 }
});

console.log(station.modules.bahiaCarga.inventory[0].location.sector); // "B"
```

</details>

---

## Bonus — Mision Critica

Para completar la mision al 100% necesitas dos cosas mas:

### Parte A: Habilidades de la tripulacion

Anade a **cada miembro** de la tripulacion un objeto `skills` con al menos 2 habilidades (clave = nombre de la habilidad, valor = nivel numerico):

```javascript
station.crew[0].skills = { pilotaje: 9, liderazgo: 10, combate: 7 };
station.crew[1].skills = { biologia: 10, quimica: 9, medicina: 8 };
station.crew[2].skills = { mecanica: 10, electronica: 9, software: 8 };
```

### Parte B: Completar el log de la mision

Anade una tercera entrada al log de la primera mision para marcarla como completa:

```javascript
station.missions[0].log.push({ timestamp: '11:00', event: 'Reparacion completa' });
```

Cuando termines, los cards de tripulacion mostraran barras de habilidades y un banner de **MISION COMPLETA** aparecera en pantalla.

<details>
<summary>Solucion</summary>

```javascript
// Skills
station.crew[0].skills = { pilotaje: 9, liderazgo: 10, combate: 7 };
station.crew[1].skills = { biologia: 10, quimica: 9, medicina: 8 };
station.crew[2].skills = { mecanica: 10, electronica: 9, software: 8 };

// Completar log
station.missions[0].log.push({ timestamp: '11:00', event: 'Reparacion completa' });

// Verificar acceso profundo
console.log(station.crew[0].skills.pilotaje);       // 9
console.log(station.missions[0].log[2].event);       // "Reparacion completa"
console.log(Object.keys(station.crew[1].skills));    // ["biologia", "quimica", "medicina"]
```

</details>

---

Happy coding! :heart:
