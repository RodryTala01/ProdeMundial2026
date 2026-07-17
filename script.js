const CLAVE_ESTADO = "prodeTafa2026_state";
const CLAVE_NOTIFICACIONES_VISTAS = "prodeTafa2026_notificaciones_vistas";
const CLAVE_NOTIFICACIONES_INTERACCION = "prodeTafa2026_notificaciones_interaccion";
const CLAVE_AVISOS_VISUALES_CERRADOS = "prodeTafa2026_avisos_visuales_cerrados";
const SECCIONES_DESHABILITADAS = new Set();

let intervaloCuentaRegresiva = null;
let modalGrupoActivo = {
  grupoId: "",
  posicion: -1
};

let estadoApp = {
  fechaSeleccionada: "",
  participanteSeleccionado: "",
  pronosticos: {},
  pronosticosGrupos: {}
};

let cacheResultadosOficialesHardcodeados = null;
let cacheGruposOficialesHardcodeados = null;
let cacheMensajesCrucesHardcodeados = null;
let cachePosicionesGeneralesCruces = null;
let ultimoResultadoTabla = null;
let participanteDetalleTabla = "";
let ultimaVistaTabla = "general";

/*
  CRUCES FASE FINAL
  Edita estos arrays si cambia algun cruce.
  fechaId indica que fecha del fixture se usa para calcular el duelo.
  partidoInicio y partidoFin usan el orden de partidos cargado en data.js.
*/
const CRUCES_ORO_16AVOS = [
  { numero: 1, local: "Lucas Insua", visitante: "Cristian Serpico", fechaId: "16avos", partidoInicio: 1, partidoFin: 8 },
  { numero: 2, local: "Pancho Muzzio", visitante: "Felipe Galante", fechaId: "16avos", partidoInicio: 1, partidoFin: 8 },
  { numero: 3, local: "Ignacio Cejas", visitante: "Cundo", fechaId: "16avos", partidoInicio: 1, partidoFin: 8 },
  { numero: 4, local: "Santi", visitante: "Jhose", fechaId: "16avos", partidoInicio: 1, partidoFin: 8 },
  { numero: 5, local: "Nahuel González", visitante: "Nico Avalos", fechaId: "16avos", partidoInicio: 1, partidoFin: 8 },
  { numero: 6, local: "Luciano Hufschmid", visitante: "Kraiizer", fechaId: "16avos", partidoInicio: 1, partidoFin: 8 },
  { numero: 7, local: "Lucas Aguilera", visitante: "Bruno Alonso", fechaId: "16avos", partidoInicio: 1, partidoFin: 8 },
  { numero: 8, local: "Rodrigo Talarico", visitante: "Cami", fechaId: "16avos", partidoInicio: 1, partidoFin: 8 }
];

const CRUCES_ORO_OCTAVOS = [
  { numero: 1, local: "Gabriel Talarico", visitante: "Ganador Rodrigo Talarico / Cami", fechaId: "16avos", partidoInicio: 9, partidoFin: 16 },
  { numero: 2, local: "Eze", visitante: "Ganador Lucas Aguilera / Bruno Alonso", fechaId: "16avos", partidoInicio: 9, partidoFin: 16 },
  { numero: 3, local: "Benja", visitante: "Ganador Luciano Hufschmid / Kraiizer", fechaId: "16avos", partidoInicio: 9, partidoFin: 16 },
  { numero: 4, local: "Yago", visitante: "Ganador Nahuel González / Nico Avalos", fechaId: "16avos", partidoInicio: 9, partidoFin: 16 },
  { numero: 5, local: "Verónica Lucchesi", visitante: "Ganador Santi / Jhose", fechaId: "16avos", partidoInicio: 9, partidoFin: 16 },
  { numero: 6, local: "Renzo Badano", visitante: "Ganador Ignacio Cejas / Cundo", fechaId: "16avos", partidoInicio: 9, partidoFin: 16 },
  { numero: 7, local: "Rodrigo Soca", visitante: "Ganador Pancho Muzzio / Felipe Galante", fechaId: "16avos", partidoInicio: 9, partidoFin: 16 },
  { numero: 8, local: "Kevin Sívori", visitante: "Ganador Lucas Insua / Cristian Serpico", fechaId: "16avos", partidoInicio: 9, partidoFin: 16 }
];

const CRUCES_PLATA_FECHAS = [
  {
    numero: 1,
    titulo: "Fecha 1",
    subtitulo: "Fabrizio vs Moreno y Mario vs Hantis · Partidos 1 al 4 de 16avos",
    fechaId: "16avos",
    partidoInicio: 1,
    partidoFin: 4,
    cruces: [
      { numero: 1, local: "Fabrizio Escolano", visitante: "Moreno Pérez" },
      { numero: 2, local: "Mario Talarico", visitante: "Cristian Hantis" }
    ]
  },
  {
    numero: 2,
    titulo: "Fecha 2",
    subtitulo: "Ingresan perdedores de 16avos de Copa Oro · Partidos 5 al 8 de 16avos",
    fechaId: "16avos",
    partidoInicio: 5,
    partidoFin: 8,
    cruces: [
      { numero: 1, local: "Ganador Plata Fecha 1 - Cruce 1", visitante: "Perdedor Rodrigo Talarico / Cami" },
      { numero: 2, local: "Ganador Plata Fecha 1 - Cruce 2", visitante: "Perdedor Lucas Aguilera / Bruno Alonso" },
      { numero: 3, local: "Perdedor Luciano Hufschmid / Kraiizer", visitante: "Perdedor Nahuel González / Nico Avalos" },
      { numero: 4, local: "Perdedor Santi / Jhose", visitante: "Perdedor Ignacio Cejas / Cundo" },
      { numero: 5, local: "Perdedor Pancho Muzzio / Felipe Galante", visitante: "Perdedor Lucas Insua / Cristian Serpico" }
    ]
  },
  {
    numero: 3,
    titulo: "Fecha 3",
    subtitulo: "Ingresan perdedores de octavos de Copa Oro · Partidos 9 al 12 de 16avos",
    fechaId: "16avos",
    partidoInicio: 9,
    partidoFin: 12,
    cruces: [
      { numero: 1, local: "Ganador Plata Fecha 2 - Cruce 1", visitante: "Perdedor Copa Oro Octavos - Cruce 1" },
      { numero: 2, local: "Ganador Plata Fecha 2 - Cruce 2", visitante: "Perdedor Copa Oro Octavos - Cruce 2" },
      { numero: 3, local: "Ganador Plata Fecha 2 - Cruce 3", visitante: "Perdedor Copa Oro Octavos - Cruce 3" },
      { numero: 4, local: "Ganador Plata Fecha 2 - Cruce 4", visitante: "Perdedor Copa Oro Octavos - Cruce 4" },
      { numero: 5, local: "Ganador Plata Fecha 2 - Cruce 5", visitante: "Perdedor Copa Oro Octavos - Cruce 5" },
      { numero: 6, local: "Perdedor Copa Oro Octavos - Cruce 6", visitante: "Perdedor Copa Oro Octavos - Cruce 7" },
      { numero: 7, local: "Perdedor Copa Oro Octavos - Cruce 8", visitante: "Por definir" }
    ]
  },
  {
    numero: 4,
    titulo: "Fecha 4",
    subtitulo: "Los que siguen · Últimos 4 partidos de 16avos",
    fechaId: "16avos",
    partidoInicio: 13,
    partidoFin: 16,
    cruces: [
      { numero: 1, local: "Ganador Plata Fecha 3 - Cruce 1", visitante: "Ganador Plata Fecha 3 - Cruce 2" },
      { numero: 2, local: "Ganador Plata Fecha 3 - Cruce 3", visitante: "Ganador Plata Fecha 3 - Cruce 4" },
      { numero: 3, local: "Ganador Plata Fecha 3 - Cruce 5", visitante: "Ganador Plata Fecha 3 - Cruce 6" },
      { numero: 4, local: "Ganador Plata Fecha 3 - Cruce 7", visitante: "Por definir" }
    ]
  },
  {
    numero: 5,
    titulo: "Fecha 5",
    subtitulo: "Ingresan perdedores de cuartos de Copa Oro · Primeros 4 partidos de octavos",
    fechaId: "octavos",
    partidoInicio: 1,
    partidoFin: 4,
    cruces: [
      { numero: 1, local: "Ganador Plata Fecha 4 - Cruce 1", visitante: "Perdedor Copa Oro Cuartos - Cruce 1" },
      { numero: 2, local: "Ganador Plata Fecha 4 - Cruce 2", visitante: "Perdedor Copa Oro Cuartos - Cruce 2" },
      { numero: 3, local: "Ganador Plata Fecha 4 - Cruce 3", visitante: "Perdedor Copa Oro Cuartos - Cruce 3" },
      { numero: 4, local: "Ganador Plata Fecha 4 - Cruce 4", visitante: "Perdedor Copa Oro Cuartos - Cruce 4" }
    ]
  },
  {
    numero: 6,
    titulo: "Fecha 6",
    subtitulo: "Ingresan perdedores de semis de Copa Oro · Últimos 4 partidos de octavos",
    fechaId: "octavos",
    partidoInicio: 5,
    partidoFin: 8,
    cruces: [
      { numero: 1, local: "Ganador Plata Fecha 5 - Cruce 1", visitante: "Perdedor Copa Oro Semis - Cruce 1" },
      { numero: 2, local: "Ganador Plata Fecha 5 - Cruce 2", visitante: "Perdedor Copa Oro Semis - Cruce 2" },
      { numero: 3, local: "Ganador Plata Fecha 5 - Cruce 3", visitante: "Ganador Plata Fecha 5 - Cruce 4" }
    ]
  },
  {
    numero: 7,
    titulo: "Fecha 7",
    subtitulo: "Semifinales de Plata · 4 cuartos del Mundial",
    fechaId: "cuartos",
    partidoInicio: 1,
    partidoFin: 4,
    cruces: [
      { numero: 1, local: "Ganador Plata Fecha 6 - Cruce 1", visitante: "Ganador Plata Fecha 6 - Cruce 2" },
      { numero: 2, local: "Ganador Plata Fecha 6 - Cruce 3", visitante: "Por definir" }
    ]
  },
  {
    numero: 8,
    titulo: "Fecha 8",
    subtitulo: "Final de Plata - semifinales del Mundial",
    fechaId: "semifinales",
    partidoInicio: 1,
    partidoFin: 2,
    cruces: [
      { numero: 1, local: "Ganador Plata Fecha 7 - Cruce 1", visitante: "Ganador Plata Fecha 7 - Cruce 2" }
    ]
  }
];

const POSICIONES_CRUCES = {
  "Gabriel Talarico": 1,
  Eze: 2,
  Benja: 3,
  Yago: 4,
  "Verónica Lucchesi": 5,
  "Renzo Badano": 6,
  "Rodrigo Soca": 7,
  "Kevin Sívori": 8,
  "Lucas Insua": 9,
  "Pancho Muzzio": 10,
  "Ignacio Cejas": 11,
  Santi: 12,
  "Nahuel González": 13,
  "Luciano Hufschmid": 14,
  "Lucas Aguilera": 15,
  "Rodrigo Talarico": 16,
  Cami: 17,
  "Bruno Alonso": 18,
  Kraiizer: 19,
  "Nico Avalos": 20,
  Jhose: 21,
  Cundo: 22,
  "Felipe Galante": 23,
  "Cristian Serpico": 24,
  "Fabrizio Escolano": 25,
  "Mario Talarico": 26,
  "Cristian Hantis": 27,
  "Moreno Pérez": 28
};

const IDS_FECHAS_TABLA_GENERAL = ["fecha-1", "fecha-2", "fecha-3"];

document.addEventListener("DOMContentLoaded", inicializarApp);

function inicializarApp() {
  document.title = CONFIG.nombreProde;
  document.getElementById("titulo-prode").textContent = CONFIG.nombreProde;

  estadoApp = cargarEstado();

  renderizarParticipantes();
  renderizarParticipantesGrupos();
  renderizarFechas();
  renderizarFechasHerramientas();
  restaurarSelectoresDesdeEstado();
  enlazarNavegacion();
  enlazarAcciones();
  renderizarPartidos();
  renderizarSeccionGrupos();
  cargarPronosticoActual();
  cargarPronosticoGruposActual();
  actualizarResumenSeleccion();
  actualizarResumenPronostico();
  actualizarResumenGrupos();
  renderizarCrucesTabla();
  inicializarNotificaciones();
}

function renderizarParticipantes() {
  const selectorParticipante = document.getElementById("selector-participante");
  selectorParticipante.innerHTML = "";

  const opcionInicial = document.createElement("option");
  opcionInicial.value = "";
  opcionInicial.textContent = "Elegí participante";
  selectorParticipante.appendChild(opcionInicial);

  PARTICIPANTES.forEach((participante) => {
    const opcion = document.createElement("option");
    opcion.value = participante;
    opcion.textContent = participante;
    selectorParticipante.appendChild(opcion);
  });

  selectorParticipante.addEventListener("change", () => {
    const participanteAnterior = estadoApp.participanteSeleccionado;
    estadoApp.participanteSeleccionado = selectorParticipante.value;

    if (!participanteAnterior && selectorParticipante.value && hayValoresEnInputs()) {
      guardarPronosticoActual();
    } else {
      guardarEstado();
      cargarPronosticoActual();
    }

    actualizarResumenSeleccion();
    actualizarResumenPronostico();
    sincronizarSelectorParticipanteGrupos(selectorParticipante.value);
    cargarPronosticoGruposActual();
    limpiarMensajeGrupos();
    limpiarMensaje();
  });
}

function renderizarParticipantesGrupos() {
  const selectorParticipante = document.getElementById("selector-grupos-participante");

  if (!selectorParticipante) {
    return;
  }

  selectorParticipante.innerHTML = "";

  const opcionInicial = document.createElement("option");
  opcionInicial.value = "";
  opcionInicial.textContent = "Elegí participante";
  selectorParticipante.appendChild(opcionInicial);

  PARTICIPANTES.forEach((participante) => {
    const opcion = document.createElement("option");
    opcion.value = participante;
    opcion.textContent = participante;
    selectorParticipante.appendChild(opcion);
  });

  selectorParticipante.addEventListener("change", () => {
    estadoApp.participanteSeleccionado = selectorParticipante.value;
    sincronizarSelectorParticipantePartidos(selectorParticipante.value);
    guardarEstado();
    cargarPronosticoActual();
    cargarPronosticoGruposActual();
    actualizarResumenSeleccion();
    actualizarResumenPronostico();
    actualizarResumenGrupos();
    limpiarMensaje();
    limpiarMensajeGrupos();
  });
}

function renderizarFechas() {
  const selectorFecha = document.getElementById("selector-fecha");
  selectorFecha.innerHTML = "";

  FECHAS.forEach((fecha) => {
    const opcion = document.createElement("option");
    opcion.value = fecha.id;
    opcion.textContent = `${fecha.nombre} · ${fecha.fase}`;
    selectorFecha.appendChild(opcion);
  });

  selectorFecha.addEventListener("change", () => {
    estadoApp.fechaSeleccionada = selectorFecha.value;
    guardarEstado();
    renderizarPartidos();
    cargarPronosticoActual();
    actualizarResumenSeleccion();
    actualizarResumenPronostico();
    actualizarCuentaRegresiva();
    renderizarAvisosVisuales();
    procesarRecordatoriosDeCierre();
    limpiarMensaje();
  });
}

function renderizarFechasHerramientas() {
  const selectorCalculo = document.getElementById("selector-fecha-calculo");

  if (selectorCalculo) {
    selectorCalculo.innerHTML = "";

    FECHAS.forEach((fecha) => {
      const opcion = document.createElement("option");
      opcion.value = fecha.id;
      opcion.textContent = `${fecha.nombre} · ${fecha.fase}`;
      selectorCalculo.appendChild(opcion);
    });
  }
}

function obtenerCargaResultadosHardcodeados() {
  if (typeof RESULTADOS_HARDCODEADOS === "undefined" || !RESULTADOS_HARDCODEADOS || typeof RESULTADOS_HARDCODEADOS !== "object") {
    return {
      oficiales: [],
      pronosticos: []
    };
  }

  return RESULTADOS_HARDCODEADOS;
}

function obtenerBloquesResultadosHardcodeados(tipo) {
  const carga = obtenerCargaResultadosHardcodeados();
  const aliasPorTipo = {
    pronosticos: "mensajes",
    pronosticosGrupos: "gruposPronosticos",
    oficialesGrupos: "gruposOficiales"
  };
  const valor = carga[tipo] || carga[aliasPorTipo[tipo]] || [];
  const items = Array.isArray(valor) ? valor : [valor];

  return items
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      if (item && typeof item.texto === "string") {
        return item.texto.trim();
      }

      return "";
    })
    .filter(Boolean);
}

function obtenerTextoPronosticosHardcodeados() {
  return obtenerBloquesResultadosHardcodeados("pronosticos").join("\n\n");
}

function obtenerTextoPronosticosGruposHardcodeados() {
  return obtenerBloquesResultadosHardcodeados("pronosticosGrupos").join("\n\n");
}

function restaurarSelectoresDesdeEstado() {
  const selectorFecha = document.getElementById("selector-fecha");
  const selectorParticipante = document.getElementById("selector-participante");
  const selectorParticipanteGrupos = document.getElementById("selector-grupos-participante");
  const existeFechaGuardada = FECHAS.some((fecha) => fecha.id === estadoApp.fechaSeleccionada);
  const existeParticipanteGuardado = PARTICIPANTES.includes(estadoApp.participanteSeleccionado);

  estadoApp.fechaSeleccionada = existeFechaGuardada
    ? estadoApp.fechaSeleccionada
    : (FECHAS[0] ? FECHAS[0].id : "");

  estadoApp.participanteSeleccionado = existeParticipanteGuardado
    ? estadoApp.participanteSeleccionado
    : "";

  selectorFecha.value = estadoApp.fechaSeleccionada;
  selectorParticipante.value = estadoApp.participanteSeleccionado;

  if (selectorParticipanteGrupos) {
    selectorParticipanteGrupos.value = estadoApp.participanteSeleccionado;
  }

  guardarEstado();
}

function sincronizarSelectorParticipanteGrupos(participante) {
  const selectorParticipanteGrupos = document.getElementById("selector-grupos-participante");

  if (selectorParticipanteGrupos) {
    selectorParticipanteGrupos.value = participante || "";
  }
}

function sincronizarSelectorParticipantePartidos(participante) {
  const selectorParticipante = document.getElementById("selector-participante");

  if (selectorParticipante) {
    selectorParticipante.value = participante || "";
  }
}

function renderizarPartidos() {
  const fechaSeleccionada = obtenerFechaSeleccionada();
  const listaPartidos = document.getElementById("lista-partidos");
  listaPartidos.innerHTML = "";

  if (!fechaSeleccionada) {
    listaPartidos.innerHTML = '<p class="mensaje-estado error">No hay fechas cargadas.</p>';
    return;
  }

  document.getElementById("fecha-activa-fase").textContent = fechaSeleccionada.fase;
  document.getElementById("fecha-activa-nombre").textContent = fechaSeleccionada.nombre;
  document.getElementById("fecha-activa-descripcion").textContent = fechaSeleccionada.descripcion;

  const partidosOrdenados = ordenarPartidosPorFechaYHora(fechaSeleccionada.partidos);

  partidosOrdenados.forEach((partido) => {
    listaPartidos.appendChild(crearTarjetaPartido(partido));
  });

  actualizarCuentaRegresiva();
  renderizarAvisosVisuales();
}

function obtenerFechaSeleccionada() {
  const selectorFecha = document.getElementById("selector-fecha");
  const fechaId = selectorFecha.value || estadoApp.fechaSeleccionada || (FECHAS[0] && FECHAS[0].id);

  return FECHAS.find((fecha) => fecha.id === fechaId) || null;
}

function fechaPermiteGanadorPenales(fecha) {
  if (!fecha) {
    return false;
  }

  const fase = normalizarTexto(fecha.fase);
  const nombre = normalizarTexto(fecha.nombre);
  return fase.includes("eliminacion")
    || nombre.includes("16avos")
    || nombre.includes("octavos")
    || nombre.includes("cuartos")
    || nombre.includes("semifinal")
    || nombre.includes("final");
}

function ordenarPartidosPorFechaYHora(partidos) {
  return [...partidos].sort((partidoA, partidoB) => {
    const fechaA = `${partidoA.fechaISO || ""} ${partidoA.horario || ""}`;
    const fechaB = `${partidoB.fechaISO || ""} ${partidoB.horario || ""}`;
    return fechaA.localeCompare(fechaB);
  });
}

function crearTarjetaPartido(partido) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "partido-card";

  const meta = document.createElement("div");
  meta.className = "partido-meta";

  const grupo = document.createElement("span");
  grupo.className = "partido-grupo";
  grupo.textContent = partido.grupo;

  const cuando = document.createElement("div");
  cuando.className = "partido-cuando";
  const dia = document.createElement("span");
  dia.className = "partido-dia";
  dia.textContent = partido.dia;
  const hora = document.createElement("strong");
  hora.className = "partido-hora";
  hora.textContent = `${partido.horario} hs`;
  cuando.append(dia, hora);

  const sede = document.createElement("div");
  sede.className = "partido-sede";
  const estadio = document.createElement("span");
  estadio.className = "partido-estadio";
  estadio.textContent = partido.estadio;
  const ciudad = document.createElement("small");
  ciudad.className = "partido-ciudad";
  ciudad.textContent = partido.ciudad;
  sede.append(estadio, ciudad);

  meta.append(grupo, cuando, sede);

  const equipos = document.createElement("div");
  equipos.className = "partido-equipos";

  equipos.append(
    crearBloqueEquipo(partido.local, "local"),
    crearMarcador(partido),
    crearBloqueEquipo(partido.visitante, "visitante")
  );

  tarjeta.append(equipos, meta);
  return tarjeta;
}

function crearBloqueEquipo(equipo, lado) {
  const contenedor = document.createElement("div");
  contenedor.className = `equipo ${lado}`;

  const bandera = crearBanderaEquipo(equipo, "bandera", true);

  const textos = document.createElement("span");
  textos.className = "equipo-textos";

  const nombre = document.createElement("span");
  nombre.className = "equipo-nombre";
  nombre.textContent = equipo.nombre;

  const codigo = document.createElement("span");
  codigo.className = "equipo-codigo";
  codigo.textContent = equipo.codigo;
  textos.append(nombre, codigo);

  contenedor.append(bandera, textos);

  return contenedor;
}

function crearBanderaEquipo(equipo, clase, usarCargaDiferida) {
  const contenedor = document.createElement("span");
  contenedor.className = clase;

  if (!equipo.banderaImagen) {
    contenedor.textContent = equipo.bandera || equipo.codigo;
    return contenedor;
  }

  const imagen = document.createElement("img");
  imagen.alt = `Bandera de ${equipo.nombre}`;
  imagen.decoding = "async";

  if (/^https?:\/\//i.test(equipo.banderaImagen)) {
    imagen.crossOrigin = "anonymous";
  }

  if (usarCargaDiferida) {
    imagen.loading = "lazy";
  }

  imagen.addEventListener("error", () => {
    contenedor.textContent = equipo.bandera || equipo.codigo;
    contenedor.classList.add("bandera-fallback");
  });

  imagen.src = equipo.banderaImagen;
  contenedor.appendChild(imagen);
  return contenedor;
}

function crearMarcador(partido) {
  const marcador = document.createElement("div");
  marcador.className = "marcador";
  const etiqueta = document.createElement("span");
  const filaGoles = document.createElement("div");

  etiqueta.className = "marcador-vs";
  etiqueta.textContent = "VS";
  filaGoles.className = "marcador-goles";
  const inputLocal = crearInputGol(partido, "local", partido.local.nombre);
  const separador = document.createElement("span");
  separador.className = "separador-goles";
  separador.textContent = "-";
  const inputVisitante = crearInputGol(partido, "visitante", partido.visitante.nombre);

  filaGoles.append(inputLocal, separador, inputVisitante);
  marcador.append(etiqueta, filaGoles);

  if (fechaPermiteGanadorPenales(obtenerFechaSeleccionada())) {
    marcador.classList.add("marcador-con-penales");
    marcador.appendChild(crearControlGanadorPenales(partido));
  }

  return marcador;
}

function crearControlGanadorPenales(partido) {
  const control = document.createElement("div");
  control.className = "penales-control";
  control.setAttribute("aria-label", "Equipo que clasifica");

  const etiqueta = document.createElement("span");
  etiqueta.className = "penales-etiqueta";
  etiqueta.textContent = "Clasifica";

  const botonLocal = crearBotonGanadorPenales(partido, "local", partido.local.codigo, partido.local.nombre);
  const botonVisitante = crearBotonGanadorPenales(partido, "visitante", partido.visitante.codigo, partido.visitante.nombre);

  control.append(etiqueta, botonLocal, botonVisitante);
  return control;
}

function crearBotonGanadorPenales(partido, ganador, texto, nombreEquipo) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "penales-boton";
  boton.textContent = texto;
  boton.dataset.partidoId = partido.id;
  boton.dataset.ganador = ganador;
  boton.setAttribute("aria-pressed", "false");
  boton.setAttribute("aria-label", `Clasifica ${nombreEquipo}`);
  boton.addEventListener("click", manejarGanadorPenales);
  return boton;
}

function crearInputGol(partido, equipo, nombreEquipo) {
  const input = document.createElement("input");
  input.className = "input-gol";
  input.type = "text";
  input.inputMode = "numeric";
  input.maxLength = 1;
  input.pattern = "[0-9]";
  input.autocomplete = "off";
  input.enterKeyHint = "next";
  input.setAttribute("inputmode", "numeric");
  input.setAttribute("maxlength", "1");
  input.setAttribute("pattern", "[0-9]");
  input.setAttribute("enterkeyhint", "next");
  input.dataset.partidoId = partido.id;
  input.dataset.equipo = equipo;
  input.setAttribute("aria-label", `Goles de ${nombreEquipo}`);

  input.addEventListener("input", manejarInputGol);
  input.addEventListener("focus", () => {
    input.select();
  });

  return input;
}

function manejarInputGol(evento) {
  const input = evento.target;
  const digitos = input.value.match(/[0-9]/g) || [];
  input.value = digitos[0] || "";

  guardarPronosticoActual();
  actualizarResumenPronostico();
  actualizarResumenSeleccion();
  limpiarMensaje();

  if (input.value !== "") {
    avanzarAlSiguienteInput(input);
  }
}

function manejarGanadorPenales(evento) {
  const boton = evento.currentTarget;
  const partidoId = boton.dataset.partidoId;
  const ganadorActual = obtenerGanadorPenalesSeleccionado(partidoId);
  const nuevoGanador = ganadorActual === boton.dataset.ganador ? "" : boton.dataset.ganador;

  marcarGanadorPenales(partidoId, nuevoGanador);
  guardarPronosticoActual();
  actualizarResumenPronostico();
  actualizarResumenSeleccion();
  limpiarMensaje();
}

function marcarGanadorPenales(partidoId, ganador) {
  document.querySelectorAll(`.penales-boton[data-partido-id="${partidoId}"]`).forEach((boton) => {
    const activo = Boolean(ganador && boton.dataset.ganador === ganador);
    boton.classList.toggle("activo", activo);
    boton.setAttribute("aria-pressed", String(activo));
  });
}

function obtenerGanadorPenalesSeleccionado(partidoId) {
  const botonActivo = document.querySelector(`.penales-boton.activo[data-partido-id="${partidoId}"]`);
  return botonActivo ? botonActivo.dataset.ganador : "";
}

function avanzarAlSiguienteInput(inputActual) {
  if (!inputActual || inputActual.value === "") {
    return;
  }

  const inputs = Array.from(document.querySelectorAll(".input-gol"));
  const indiceActual = inputs.indexOf(inputActual);
  const siguienteInput = inputs[indiceActual + 1];

  if (!siguienteInput) {
    inputActual.blur();
    return;
  }

  requestAnimationFrame(() => {
    siguienteInput.focus();
    siguienteInput.select();
  });
}

function enlazarNavegacion() {
  const botones = document.querySelectorAll(".nav-boton");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (boton.disabled || boton.getAttribute("aria-disabled") === "true") {
        return;
      }

      cambiarSeccion(boton.dataset.seccion);
    });
  });
}

function cambiarSeccion(seccionActiva) {
  if (SECCIONES_DESHABILITADAS.has(seccionActiva)) {
    return;
  }

  document.querySelectorAll(".nav-boton").forEach((boton) => {
    const estaActivo = boton.dataset.seccion === seccionActiva;
    boton.classList.toggle("activo", estaActivo);
    boton.setAttribute("aria-selected", String(estaActivo));
  });

  document.querySelectorAll(".seccion-app").forEach((seccion) => {
    const estaActiva = seccion.id === `seccion-${seccionActiva}`;
    seccion.classList.toggle("activa", estaActiva);
    seccion.hidden = !estaActiva;
  });

  if (seccionActiva === "grupos") {
    renderizarSeccionGrupos();
  }

  if (seccionActiva === "tabla") {
    renderizarCrucesTabla();
    renderizarTablaPosiciones(generarTablaPosiciones());
  }
}

function enlazarAcciones() {
  document.getElementById("boton-whatsapp").addEventListener("click", enviarPorWhatsApp);
  document.getElementById("boton-descargar-imagen").addEventListener("click", descargarImagenPronostico);
  document.getElementById("boton-limpiar").addEventListener("click", limpiarPronosticoActual);

  const botonCalcular = document.getElementById("boton-calcular-puntos");
  const selectorVistaTabla = document.getElementById("selector-vista-tabla");
  const botonDescargarTabla = document.getElementById("boton-descargar-tabla");
  const botonDescargarCopaOro = document.getElementById("boton-descargar-copa-oro");
  const botonGruposWhatsApp = document.getElementById("boton-grupos-whatsapp");
  const botonGruposImagen = document.getElementById("boton-grupos-imagen");
  const botonGruposLimpiar = document.getElementById("boton-grupos-limpiar");
  const modalGrupos = document.getElementById("modal-grupos");
  const modalCerrar = document.getElementById("modal-grupos-cerrar");
  const modalCancelar = document.getElementById("modal-grupos-cancelar");

  if (botonCalcular) {
    botonCalcular.addEventListener("click", renderizarResultadoIndividual);
  }

  if (selectorVistaTabla) {
    selectorVistaTabla.addEventListener("change", () => {
      renderizarTablaPosiciones(generarTablaPosiciones());
    });
  }

  if (botonDescargarTabla) {
    botonDescargarTabla.addEventListener("click", descargarImagenTabla);
  }

  if (botonDescargarCopaOro) {
    botonDescargarCopaOro.addEventListener("click", () => descargarImagenLlaves("oro"));
  }

  if (botonGruposWhatsApp) {
    botonGruposWhatsApp.addEventListener("click", enviarGruposPorWhatsApp);
  }

  if (botonGruposImagen) {
    botonGruposImagen.addEventListener("click", descargarImagenGrupos);
  }

  if (botonGruposLimpiar) {
    botonGruposLimpiar.addEventListener("click", limpiarPronosticoGruposActual);
  }

  if (modalCerrar) {
    modalCerrar.addEventListener("click", cerrarModalEquipo);
  }

  if (modalCancelar) {
    modalCancelar.addEventListener("click", cerrarModalEquipo);
  }

  if (modalGrupos) {
    modalGrupos.addEventListener("click", (evento) => {
      if (evento.target === modalGrupos) {
        cerrarModalEquipo();
      }
    });
  }

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      cerrarModalEquipo();
    }
  });
}

function obtenerClavePronostico(participante, fechaId) {
  const participanteElegido = participante !== undefined
    ? participante
    : document.getElementById("selector-participante").value;
  const fechaElegida = fechaId !== undefined
    ? fechaId
    : document.getElementById("selector-fecha").value;

  if (!participanteElegido || !fechaElegida) {
    return "";
  }

  return `${participanteElegido}__${fechaElegida}`;
}

function guardarEstado() {
  try {
    localStorage.setItem(CLAVE_ESTADO, JSON.stringify(estadoApp));
  } catch (error) {
    mostrarMensaje("No se pudo guardar el pronóstico en este navegador.", "error");
  }
}

function cargarEstado() {
  const estadoBase = {
    fechaSeleccionada: "",
    participanteSeleccionado: "",
    pronosticos: {},
    pronosticosGrupos: {}
  };

  try {
    const estadoGuardado = localStorage.getItem(CLAVE_ESTADO);

    if (!estadoGuardado) {
      return estadoBase;
    }

    const estadoParseado = JSON.parse(estadoGuardado);

    return {
      fechaSeleccionada: estadoParseado.fechaSeleccionada || "",
      participanteSeleccionado: estadoParseado.participanteSeleccionado || "",
      pronosticos: estadoParseado.pronosticos && typeof estadoParseado.pronosticos === "object"
        ? estadoParseado.pronosticos
        : {},
      pronosticosGrupos: estadoParseado.pronosticosGrupos && typeof estadoParseado.pronosticosGrupos === "object"
        ? estadoParseado.pronosticosGrupos
        : {}
    };
  } catch (error) {
    return estadoBase;
  }
}

function guardarPronosticoActual() {
  const selectorFecha = document.getElementById("selector-fecha");
  const selectorParticipante = document.getElementById("selector-participante");

  estadoApp.fechaSeleccionada = selectorFecha.value;
  estadoApp.participanteSeleccionado = selectorParticipante.value;

  const clave = obtenerClavePronostico();

  if (!clave) {
    guardarEstado();
    return;
  }

  const pronosticos = obtenerPronosticosActuales();
  const hayAlgunValor = pronosticos.some((pronostico) => {
    return pronostico.golesLocal !== ""
      || pronostico.golesVisitante !== ""
      || pronostico.ganadorPenales !== "";
  });

  if (!hayAlgunValor) {
    delete estadoApp.pronosticos[clave];
    guardarEstado();
    return;
  }

  estadoApp.pronosticos[clave] = {};

  pronosticos.forEach((pronostico) => {
    estadoApp.pronosticos[clave][pronostico.partido.id] = {
      golesLocal: pronostico.golesLocal === "" ? "" : Number(pronostico.golesLocal),
      golesVisitante: pronostico.golesVisitante === "" ? "" : Number(pronostico.golesVisitante),
      ganadorPenales: pronostico.ganadorPenales || ""
    };
  });

  guardarEstado();
}

function cargarPronosticoActual() {
  document.querySelectorAll(".input-gol").forEach((input) => {
    input.value = "";
  });
  document.querySelectorAll(".penales-boton").forEach((boton) => {
    boton.classList.remove("activo");
    boton.setAttribute("aria-pressed", "false");
  });

  const clave = obtenerClavePronostico();

  if (!clave || !estadoApp.pronosticos[clave]) {
    actualizarResumenPronostico();
    return;
  }

  const registro = estadoApp.pronosticos[clave];
  const fechaSeleccionada = obtenerFechaSeleccionada();

  if (!fechaSeleccionada) {
    actualizarResumenPronostico();
    return;
  }

  ordenarPartidosPorFechaYHora(fechaSeleccionada.partidos).forEach((partido) => {
    const pronosticoPartido = registro[partido.id] || {};
    const inputLocal = obtenerInputPartido(partido.id, "local");
    const inputVisitante = obtenerInputPartido(partido.id, "visitante");

    if (inputLocal) {
      inputLocal.value = normalizarGolGuardado(pronosticoPartido.golesLocal);
    }

    if (inputVisitante) {
      inputVisitante.value = normalizarGolGuardado(pronosticoPartido.golesVisitante);
    }

    marcarGanadorPenales(partido.id, normalizarGanadorPenales(pronosticoPartido.ganadorPenales));
  });

  actualizarResumenPronostico();
}

function obtenerInputPartido(partidoId, equipo) {
  return document.querySelector(`.input-gol[data-partido-id="${partidoId}"][data-equipo="${equipo}"]`);
}

function normalizarGolGuardado(valor) {
  const texto = String(valor ?? "");
  return /^[0-9]$/.test(texto) ? texto : "";
}

function normalizarGanadorPenales(valor) {
  return valor === "local" || valor === "visitante" ? valor : "";
}

function hayValoresEnInputs() {
  return Array.from(document.querySelectorAll(".input-gol")).some((input) => input.value.trim() !== "")
    || Boolean(document.querySelector(".penales-boton.activo"));
}

function obtenerPronosticosActuales() {
  const fechaSeleccionada = obtenerFechaSeleccionada();

  if (!fechaSeleccionada) {
    return [];
  }

  return ordenarPartidosPorFechaYHora(fechaSeleccionada.partidos).map((partido) => {
    const inputLocal = obtenerInputPartido(partido.id, "local");
    const inputVisitante = obtenerInputPartido(partido.id, "visitante");

    return {
      partido,
      golesLocal: inputLocal ? inputLocal.value.trim() : "",
      golesVisitante: inputVisitante ? inputVisitante.value.trim() : "",
      ganadorPenales: obtenerGanadorPenalesSeleccionado(partido.id)
    };
  });
}

function validarPronosticoCompleto() {
  const participante = document.getElementById("selector-participante").value;
  const fechaSeleccionada = obtenerFechaSeleccionada();
  const pronosticos = obtenerPronosticosActuales();

  if (!participante) {
    return {
      valido: false,
      mensaje: "Elegí un participante antes de continuar."
    };
  }

  if (!fechaSeleccionada) {
    return {
      valido: false,
      mensaje: "Elegí una fecha antes de continuar."
    };
  }

  if (!pronosticos.length) {
    return {
      valido: false,
      mensaje: "No hay partidos cargados para esta fecha."
    };
  }

  const partidoIncompleto = pronosticos.find((pronostico) => {
    return pronostico.golesLocal === "" || pronostico.golesVisitante === "";
  });

  if (partidoIncompleto) {
    return {
      valido: false,
      mensaje: `Completá el resultado de ${partidoIncompleto.partido.local.nombre} vs ${partidoIncompleto.partido.visitante.nombre}.`
    };
  }

  const partidoInvalido = pronosticos.find((pronostico) => {
    return !esGolValido(pronostico.golesLocal) || !esGolValido(pronostico.golesVisitante);
  });

  if (partidoInvalido) {
    return {
      valido: false,
      mensaje: "Los goles deben ser números del 0 al 9."
    };
  }

  if (fechaPermiteGanadorPenales(fechaSeleccionada)) {
    const partidoSinGanadorPenales = pronosticos.find((pronostico) => {
      return !pronostico.ganadorPenales;
    });

    if (partidoSinGanadorPenales) {
      return {
        valido: false,
        mensaje: `Elegi quien clasifica en ${partidoSinGanadorPenales.partido.local.nombre} vs ${partidoSinGanadorPenales.partido.visitante.nombre}.`
      };
    }
  }

  return {
    valido: true,
    mensaje: "",
    participante,
    fechaSeleccionada,
    pronosticos
  };
}

function esGolValido(valor) {
  return /^[0-9]$/.test(String(valor));
}

function generarMensajeWhatsApp() {
  const validacion = validarPronosticoCompleto();

  if (!validacion.valido) {
    return "";
  }

  const lineasPartidos = validacion.pronosticos.map((pronostico) => {
    const local = formatearEquipoMensajePronostico(pronostico, "local");
    const visitante = formatearEquipoMensajePronostico(pronostico, "visitante");
    return `${local} ${pronostico.golesLocal} - ${pronostico.golesVisitante} ${visitante}`;
  });

  return [
    CONFIG.nombreProde,
    `Fecha: ${validacion.fechaSeleccionada.nombre}`,
    `Participante: ${validacion.participante}`,
    "",
    ...lineasPartidos
  ].join("\n");
}

function formatearEquipoMensajePronostico(pronostico, lado) {
  const equipo = lado === "local" ? pronostico.partido.local : pronostico.partido.visitante;
  const seleccionado = pronostico.ganadorPenales === lado;
  return `${seleccionado ? "*" : ""}${equipo.nombre}`;
}

function enviarPorWhatsApp() {
  const validacion = validarPronosticoCompleto();

  if (!validacion.valido) {
    mostrarMensaje(validacion.mensaje, "error");
    return;
  }

  guardarPronosticoActual();

  const mensaje = generarMensajeWhatsApp();
  const url = `https://wa.me/${CONFIG.whatsappDestino}?text=${encodeURIComponent(mensaje)}`;
  const fechaCerrada = fechaEstaCerrada(validacion.fechaSeleccionada);

  window.open(url, "_blank", "noopener,noreferrer");
  mostrarMensaje(
    fechaCerrada
      ? "Esta fecha figura como cerrada. Revisá antes de enviar. Se abrió WhatsApp con el pronóstico listo."
      : "Se abrió WhatsApp con el pronóstico listo para enviar.",
    fechaCerrada ? "advertencia" : "exito"
  );
}

function limpiarPronosticoActual() {
  const participante = document.getElementById("selector-participante").value;
  const fechaSeleccionada = obtenerFechaSeleccionada();
  const clave = obtenerClavePronostico();

  if (!participante || !fechaSeleccionada) {
    mostrarMensaje("Elegí participante y fecha antes de limpiar.", "error");
    return;
  }

  const confirmado = window.confirm(`¿Limpiar solo el pronóstico de ${participante} para ${fechaSeleccionada.nombre}?`);

  if (!confirmado) {
    return;
  }

  document.querySelectorAll(".input-gol").forEach((input) => {
    input.value = "";
  });
  document.querySelectorAll(".penales-boton").forEach((boton) => {
    boton.classList.remove("activo");
    boton.setAttribute("aria-pressed", "false");
  });

  if (clave) {
    delete estadoApp.pronosticos[clave];
  }

  guardarEstado();
  actualizarResumenPronostico();
  actualizarResumenSeleccion();
  mostrarMensaje("Se limpió solamente este participante y esta fecha.", "info");
}

function renderizarSeccionGrupos() {
  const contenedor = document.getElementById("lista-grupos");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  const grupos = obtenerGruposMundial();

  if (!grupos.length) {
    contenedor.innerHTML = '<p class="mensaje-estado error">No hay grupos cargados.</p>';
    actualizarResumenGrupos();
    return;
  }

  grupos.forEach((grupo) => {
    contenedor.appendChild(renderizarGrupoPronostico(grupo));
  });

  actualizarResumenGrupos();
}

function renderizarGrupoPronostico(grupo) {
  const pronostico = obtenerPronosticoGruposActual();
  const posiciones = normalizarPronosticoGrupo(pronostico[grupo.id], grupo);
  const tarjeta = document.createElement("article");
  tarjeta.className = "grupo-card";

  const encabezado = document.createElement("div");
  encabezado.className = "grupo-card-encabezado";

  const titulo = document.createElement("h3");
  titulo.textContent = grupo.nombre;

  const contador = document.createElement("span");
  contador.textContent = `${posiciones.filter(Boolean).length}/4`;

  encabezado.append(titulo, contador);

  const lista = document.createElement("div");
  lista.className = "grupo-posiciones";

  posiciones.forEach((equipoCodigo, indice) => {
    const fila = document.createElement("div");
    fila.className = "grupo-posicion-fila";

    const posicion = document.createElement("span");
    posicion.className = "grupo-posicion-numero";
    posicion.textContent = `${indice + 1}°`;

    const equipo = obtenerEquipoGrupo(grupo, equipoCodigo);
    const botonEquipo = document.createElement("button");
    botonEquipo.type = "button";
    botonEquipo.className = equipo ? "grupo-equipo-elegido" : "grupo-equipo-placeholder";
    botonEquipo.addEventListener("click", () => abrirModalEquipo(grupo.id, indice));

    if (equipo) {
      botonEquipo.appendChild(crearEquipoResumenGrupo(equipo));
    } else {
      botonEquipo.textContent = "+ Elegir equipo";
    }

    const quitar = document.createElement("button");
    quitar.type = "button";
    quitar.className = "grupo-quitar";
    quitar.textContent = "X";
    quitar.hidden = !equipo;
    quitar.addEventListener("click", (evento) => {
      evento.stopPropagation();
      quitarEquipoGrupo(grupo.id, indice);
    });

    fila.append(posicion, botonEquipo, quitar);
    lista.appendChild(fila);
  });

  tarjeta.append(encabezado, lista);
  return tarjeta;
}

function abrirModalEquipo(grupoId, posicion) {
  const participante = obtenerParticipanteGruposActual();
  const grupo = obtenerGrupoPorId(grupoId);
  const modal = document.getElementById("modal-grupos");
  const titulo = document.getElementById("modal-grupos-titulo");
  const lista = document.getElementById("modal-grupos-lista");

  if (!participante) {
    mostrarMensajeGrupos("Elegí un participante antes de cargar grupos.", "error");

    const selectorParticipante = document.getElementById("selector-grupos-participante");

    if (selectorParticipante) {
      selectorParticipante.focus();
      selectorParticipante.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return;
  }

  if (!grupo || !modal || !titulo || !lista) {
    return;
  }

  modalGrupoActivo = {
    grupoId,
    posicion
  };

  const pronostico = obtenerPronosticoGruposActual();
  const posiciones = normalizarPronosticoGrupo(pronostico[grupo.id], grupo);
  const codigoActual = posiciones[posicion] || "";
  const codigosElegidos = posiciones.filter((codigo) => codigo && codigo !== codigoActual);

  titulo.textContent = `${grupo.nombre} · Elegir ${posicion + 1}°`;
  lista.innerHTML = "";

  grupo.equipos.forEach((equipo) => {
    const yaElegido = codigosElegidos.includes(equipo.codigo);
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "modal-equipo";
    boton.disabled = yaElegido;

    const resumen = crearEquipoResumenGrupo(equipo);
    boton.appendChild(resumen);

    if (yaElegido) {
      const estado = document.createElement("span");
      estado.className = "modal-equipo-estado";
      estado.textContent = "Ya elegido";
      boton.appendChild(estado);
    } else {
      boton.addEventListener("click", (evento) => {
        evento.preventDefault();
        seleccionarEquipoGrupo(grupo.id, posicion, equipo.codigo);
      });
    }

    lista.appendChild(boton);
  });

  modal.hidden = false;
  modal.classList.add("visible");
  document.body.classList.add("modal-grupos-abierto");

  requestAnimationFrame(() => {
    const primerDisponible = lista.querySelector("button:not(:disabled)");
    if (primerDisponible) {
      primerDisponible.focus();
    }
  });
}

function cerrarModalEquipo() {
  const modal = document.getElementById("modal-grupos");

  modalGrupoActivo = {
    grupoId: "",
    posicion: -1
  };

  if (!modal || modal.hidden) {
    return;
  }

  modal.hidden = true;
  modal.classList.remove("visible");
  document.body.classList.remove("modal-grupos-abierto");
}

function seleccionarEquipoGrupo(grupoId, posicion, equipoCodigo) {
  const participante = obtenerParticipanteGruposActual();
  const grupo = obtenerGrupoPorId(grupoId);

  if (!participante) {
    cerrarModalEquipo();
    mostrarMensajeGrupos("Elegí un participante", "error");
    return;
  }

  if (!grupo || !obtenerEquipoGrupo(grupo, equipoCodigo)) {
    mostrarMensajeGrupos("Equipo inválido", "error");
    return;
  }

  sincronizarSelectorParticipanteGrupos(participante);
  sincronizarSelectorParticipantePartidos(participante);
  estadoApp.participanteSeleccionado = participante;

  const pronostico = obtenerPronosticoGruposActual(true);
  const posiciones = normalizarPronosticoGrupo(pronostico[grupo.id], grupo);
  const repetido = posiciones.some((codigo, indice) => indice !== posicion && codigo === equipoCodigo);

  if (repetido) {
    mostrarMensajeGrupos(`Hay equipos repetidos en ${grupo.nombre}`, "error");
    return;
  }

  posiciones[posicion] = equipoCodigo;
  pronostico[grupo.id] = posiciones;
  guardarPronosticoGruposActual();
  cerrarModalEquipo();
  renderizarSeccionGrupos();
  mostrarMensajeGrupos("Equipo guardado.", "exito");
}

function quitarEquipoGrupo(grupoId, posicion) {
  const participante = obtenerParticipanteGruposActual();
  const grupo = obtenerGrupoPorId(grupoId);

  if (!participante || !grupo) {
    return;
  }

  const pronostico = obtenerPronosticoGruposActual(true);
  const posiciones = normalizarPronosticoGrupo(pronostico[grupo.id], grupo);
  posiciones[posicion] = "";
  pronostico[grupo.id] = posiciones;
  guardarPronosticoGruposActual();
  renderizarSeccionGrupos();
  limpiarMensajeGrupos();
}

function obtenerPronosticoGruposActual(crearRegistro = false) {
  const participante = obtenerParticipanteGruposActual();

  if (!estadoApp.pronosticosGrupos || typeof estadoApp.pronosticosGrupos !== "object") {
    estadoApp.pronosticosGrupos = {};
  }

  if (!participante) {
    return {};
  }

  if (!estadoApp.pronosticosGrupos[participante] || typeof estadoApp.pronosticosGrupos[participante] !== "object") {
    if (!crearRegistro) {
      return {};
    }

    estadoApp.pronosticosGrupos[participante] = {};
  }

  return estadoApp.pronosticosGrupos[participante];
}

function guardarPronosticoGruposActual() {
  const participante = obtenerParticipanteGruposActual();

  if (!estadoApp.pronosticosGrupos || typeof estadoApp.pronosticosGrupos !== "object") {
    estadoApp.pronosticosGrupos = {};
  }

  estadoApp.participanteSeleccionado = participante || estadoApp.participanteSeleccionado || "";

  if (participante) {
    const registro = estadoApp.pronosticosGrupos[participante] || {};
    const hayDatos = Object.values(registro).some((posiciones) => {
      return Array.isArray(posiciones) && posiciones.some(Boolean);
    });

    if (!hayDatos) {
      delete estadoApp.pronosticosGrupos[participante];
    } else {
      estadoApp.pronosticosGrupos[participante] = registro;
    }
  }

  guardarEstado();
}

function cargarPronosticoGruposActual() {
  renderizarSeccionGrupos();
  actualizarResumenGrupos();
}

function validarPronosticoGruposCompleto() {
  const participante = obtenerParticipanteGruposActual();
  const grupos = obtenerGruposMundial();
  const pronostico = obtenerPronosticoGruposActual();
  const gruposValidos = [];

  if (!participante) {
    return {
      valido: false,
      mensaje: "Elegí un participante"
    };
  }

  for (const grupo of grupos) {
    const posiciones = normalizarPronosticoGrupo(pronostico[grupo.id], grupo);

    if (posiciones.some((codigo) => !codigo)) {
      return {
        valido: false,
        mensaje: `Falta completar ${grupo.nombre}`
      };
    }

    const repetidos = posiciones.filter((codigo, indice) => posiciones.indexOf(codigo) !== indice);

    if (repetidos.length) {
      return {
        valido: false,
        mensaje: `Hay equipos repetidos en ${grupo.nombre}`
      };
    }

    const equipos = posiciones.map((codigo) => obtenerEquipoGrupo(grupo, codigo));

    if (equipos.some((equipo) => !equipo)) {
      return {
        valido: false,
        mensaje: `Revisá ${grupo.nombre}`
      };
    }

    gruposValidos.push({
      grupo,
      posiciones,
      equipos
    });
  }

  return {
    valido: true,
    mensaje: "",
    participante,
    grupos: gruposValidos
  };
}

function generarMensajeGruposWhatsApp() {
  const validacion = validarPronosticoGruposCompleto();

  if (!validacion.valido) {
    return "";
  }

  const lineas = [
    CONFIG.nombreProde,
    "Pronóstico de grupos",
    `Participante: ${validacion.participante}`,
    ""
  ];

  validacion.grupos.forEach(({ grupo, equipos }, indiceGrupo) => {
    lineas.push(grupo.nombre, "");

    equipos.forEach((equipo, indice) => {
      lineas.push(`${indice + 1}. ${equipo.nombre}`);
    });

    if (indiceGrupo < validacion.grupos.length - 1) {
      lineas.push("");
    }
  });

  return lineas.join("\n");
}

function enviarGruposPorWhatsApp() {
  const validacion = validarPronosticoGruposCompleto();

  if (!validacion.valido) {
    mostrarMensajeGrupos(validacion.mensaje, "error");
    return;
  }

  guardarPronosticoGruposActual();

  const mensaje = generarMensajeGruposWhatsApp();
  const url = `https://wa.me/${CONFIG.whatsappDestino}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank", "noopener,noreferrer");
  mostrarMensajeGrupos("Se abrió WhatsApp con los grupos.", "exito");
}

function prepararTarjetaImagenGrupos() {
  const contenedor = document.getElementById("tarjeta-imagen-pronostico");
  const validacion = validarPronosticoGruposCompleto();

  contenedor.innerHTML = "";

  const tarjeta = document.createElement("div");
  tarjeta.className = "imagen-pronostico imagen-pronostico-grupos";

  const encabezado = document.createElement("div");
  encabezado.className = "imagen-encabezado";

  const textos = document.createElement("div");
  const wordmark = document.createElement("img");
  wordmark.className = "imagen-wordmark";
  wordmark.src = "assets/banner-tafa-awar-transparente.png";
  wordmark.alt = "Prode TAFA";
  wordmark.addEventListener("error", () => {
    wordmark.remove();
  });

  const titulo = document.createElement("h2");
  titulo.textContent = CONFIG.nombreProde;

  const subtitulo = document.createElement("p");
  subtitulo.className = "imagen-subtitulo";
  subtitulo.textContent = "Pronóstico de grupos";

  textos.append(wordmark, titulo, subtitulo);

  const logo = document.createElement("div");
  logo.className = "imagen-logo";
  const logoImagen = document.createElement("img");
  logoImagen.src = "assets/logo-tafa.png";
  logoImagen.alt = "Logo TAFA";
  logoImagen.addEventListener("error", () => {
    logoImagen.remove();
    logo.textContent = "TAFA";
  });
  logo.appendChild(logoImagen);

  encabezado.append(textos, logo);

  const info = document.createElement("div");
  info.className = "imagen-info";
  info.append(
    crearInfoImagen("Tipo", "Grupos"),
    crearInfoImagen("Participante", validacion.participante),
    crearInfoImagen("Completos", `${validacion.grupos.length}/${obtenerGruposMundial().length}`)
  );

  const grilla = document.createElement("div");
  grilla.className = "imagen-grupos-grid";

  validacion.grupos.forEach(({ grupo, equipos }) => {
    grilla.appendChild(crearGrupoImagen(grupo, equipos));
  });

  tarjeta.append(encabezado, info, grilla);
  contenedor.appendChild(tarjeta);

  return tarjeta;
}

async function descargarImagenGrupos() {
  const validacion = validarPronosticoGruposCompleto();

  if (!validacion.valido) {
    mostrarMensajeGrupos(validacion.mensaje, "error");
    return;
  }

  const canvasPrueba = document.createElement("canvas");

  if (!canvasPrueba.getContext) {
    mostrarMensajeGrupos("No se pudo generar la imagen.", "error");
    return;
  }

  guardarPronosticoGruposActual();

  try {
    const canvas = await crearCanvasImagenGrupos(validacion);
    await descargarCanvasPng(canvas, `prode-tafa-grupos-${normalizarNombreArchivo(validacion.participante)}.png`);

    mostrarMensajeGrupos("Imagen descargada.", "exito");
  } catch (error) {
    mostrarMensajeGrupos("No se pudo generar la imagen.", "error");
  }
}

async function crearCanvasImagenGrupos(validacion) {
  const escala = 2;
  const ancho = 900;
  const margen = 22;
  const altoEncabezado = 118;
  const altoInfo = 58;
  const separacion = 8;
  const columnas = 2;
  const separacionColumnas = 10;
  const anchoColumna = (ancho - (margen * 2) - separacionColumnas) / columnas;
  const altoGrupoEncabezado = 31;
  const altoFila = 36;
  const altoGrupo = altoGrupoEncabezado + (altoFila * 4);
  const filas = Math.ceil(validacion.grupos.length / columnas);
  const inicioGrupos = margen + altoEncabezado + altoInfo + 16;
  const alto = inicioGrupos + (filas * altoGrupo) + ((filas - 1) * separacion) + margen;
  const canvas = document.createElement("canvas");
  const contexto = canvas.getContext("2d");

  if (!contexto) {
    throw new Error("No canvas context");
  }

  canvas.width = ancho * escala;
  canvas.height = alto * escala;
  contexto.scale(escala, escala);
  contexto.imageSmoothingEnabled = true;
  contexto.imageSmoothingQuality = "high";

  const imagenes = await cargarImagenesGruposCanvas(validacion.grupos);
  const logo = await cargarImagenCanvas("assets/logo-tafa.png");

  dibujarFondoImagenGrupos(contexto, ancho, alto);
  dibujarEncabezadoImagenGrupos(contexto, validacion, logo, margen, ancho, altoEncabezado);
  dibujarInfoImagenGrupos(contexto, validacion, margen, margen + altoEncabezado, ancho - (margen * 2), altoInfo);

  validacion.grupos.forEach((grupoValidado, indice) => {
    const columna = indice % columnas;
    const fila = Math.floor(indice / columnas);
    const x = margen + (columna * (anchoColumna + separacionColumnas));
    const y = inicioGrupos + (fila * (altoGrupo + separacion));

    dibujarGrupoImagenCanvas(contexto, grupoValidado, imagenes, x, y, anchoColumna, altoGrupoEncabezado, altoFila);
  });

  return canvas;
}

function dibujarFondoImagenGrupos(contexto, ancho, alto) {
  contexto.fillStyle = "#e7dfc8";
  contexto.fillRect(0, 0, ancho, alto);

  contexto.fillStyle = "rgba(15, 82, 45, 0.08)";

  for (let y = 0; y < alto; y += 42) {
    contexto.fillRect(0, y, ancho, 18);
  }

  contexto.fillStyle = "#0f522d";
  contexto.fillRect(0, 0, ancho, 118);
  contexto.fillStyle = "#d6aa34";
  contexto.fillRect(0, 112, ancho, 6);
}

function dibujarEncabezadoImagenGrupos(contexto, validacion, logo, margen, ancho, altoEncabezado) {
  contexto.fillStyle = "#ffffff";
  contexto.font = "700 27px Arial, Helvetica, sans-serif";
  contexto.fillText(CONFIG.nombreProde, margen, 44);

  contexto.font = "700 17px Arial, Helvetica, sans-serif";
  contexto.fillStyle = "#f4ecd7";
  contexto.fillText("Pronostico de grupos", margen, 72);

  contexto.font = "700 15px Arial, Helvetica, sans-serif";
  contexto.fillStyle = "#d6aa34";
  contexto.fillText(`Participante: ${validacion.participante}`, margen, 96);

  const logoAncho = 56;
  const logoAlto = 74;
  const logoX = ancho - margen - logoAncho;
  const logoY = Math.max(12, (altoEncabezado - logoAlto) / 2 - 2);

  if (logo) {
    dibujarImagenContain(contexto, logo, logoX, logoY, logoAncho, logoAlto);
  } else {
    contexto.fillStyle = "#d6aa34";
    contexto.font = "800 20px Arial, Helvetica, sans-serif";
    contexto.textAlign = "center";
    contexto.fillText("TAFA", logoX + (logoAncho / 2), logoY + 42);
    contexto.textAlign = "left";
  }
}

function dibujarInfoImagenGrupos(contexto, validacion, x, y, ancho, alto) {
  const datos = [
    ["Tipo", "Grupos"],
    ["Participante", validacion.participante],
    ["Completos", `${validacion.grupos.length}/${obtenerGruposMundial().length}`]
  ];
  const anchoCelda = ancho / datos.length;

  datos.forEach(([etiqueta, valor], indice) => {
    const celdaX = x + (indice * anchoCelda);

    contexto.fillStyle = indice % 2 === 0 ? "#dce7d6" : "#ebe4cf";
    contexto.fillRect(celdaX, y, anchoCelda, alto);
    contexto.strokeStyle = "#8d8d8d";
    contexto.lineWidth = 1;
    contexto.strokeRect(celdaX, y, anchoCelda, alto);

    contexto.fillStyle = "#555555";
    contexto.font = "700 11px Arial, Helvetica, sans-serif";
    contexto.fillText(etiqueta.toUpperCase(), celdaX + 10, y + 21);

    contexto.fillStyle = "#111111";
    contexto.font = "700 16px Arial, Helvetica, sans-serif";
    dibujarTextoRecortado(contexto, valor, celdaX + 10, y + 43, anchoCelda - 20);
  });
}

function dibujarGrupoImagenCanvas(contexto, grupoValidado, imagenes, x, y, ancho, altoEncabezado, altoFila) {
  contexto.strokeStyle = "#08391f";
  contexto.lineWidth = 1;
  contexto.strokeRect(x, y, ancho, altoEncabezado + (altoFila * 4));

  contexto.fillStyle = "#08391f";
  contexto.fillRect(x, y, ancho, altoEncabezado);

  contexto.fillStyle = "#ffffff";
  contexto.font = "700 16px Arial, Helvetica, sans-serif";
  contexto.fillText(grupoValidado.grupo.nombre, x + 9, y + 21);

  grupoValidado.equipos.forEach((equipo, indice) => {
    const filaY = y + altoEncabezado + (indice * altoFila);
    const esPar = indice % 2 === 0;

    contexto.fillStyle = esPar ? "#f4ecd7" : "#dce7d6";
    contexto.fillRect(x, filaY, ancho, altoFila);
    contexto.strokeStyle = "#8d8d8d";
    contexto.strokeRect(x, filaY, ancho, altoFila);

    contexto.fillStyle = "#163f70";
    contexto.fillRect(x, filaY, 32, altoFila);

    contexto.fillStyle = "#ffffff";
    contexto.font = "800 13px Arial, Helvetica, sans-serif";
    contexto.textAlign = "center";
    contexto.fillText(`${indice + 1}.`, x + 16, filaY + 23);
    contexto.textAlign = "left";

    dibujarBanderaCanvas(contexto, imagenes.get(equipo.codigo), equipo, x + 42, filaY + 7, 32, 22);

    contexto.fillStyle = "#111111";
    contexto.font = "700 14px Arial, Helvetica, sans-serif";
    dibujarTextoRecortado(contexto, equipo.nombre, x + 84, filaY + 22, ancho - 142);

    contexto.fillStyle = "#555555";
    contexto.font = "700 11px Arial, Helvetica, sans-serif";
    contexto.textAlign = "right";
    contexto.fillText(equipo.codigo, x + ancho - 10, filaY + 22);
    contexto.textAlign = "left";
  });
}

function dibujarBanderaCanvas(contexto, imagen, equipo, x, y, ancho, alto) {
  contexto.fillStyle = "#fffaf0";
  contexto.fillRect(x, y, ancho, alto);
  contexto.strokeStyle = "#8d8d8d";
  contexto.lineWidth = 1;
  contexto.strokeRect(x, y, ancho, alto);

  if (imagen) {
    contexto.save();
    contexto.beginPath();
    contexto.rect(x + 1, y + 1, ancho - 2, alto - 2);
    contexto.clip();
    dibujarImagenCover(contexto, imagen, x + 1, y + 1, ancho - 2, alto - 2);
    contexto.restore();
    return;
  }

  contexto.fillStyle = "#163f70";
  contexto.font = "800 9px Arial, Helvetica, sans-serif";
  contexto.textAlign = "center";
  contexto.fillText(equipo.codigo, x + (ancho / 2), y + 14);
  contexto.textAlign = "left";
}

async function cargarImagenesGruposCanvas(grupos) {
  const entradas = [];

  grupos.forEach(({ equipos }) => {
    equipos.forEach((equipo) => {
      entradas.push(equipo);
    });
  });

  const imagenes = await Promise.all(entradas.map(async (equipo) => {
    const imagen = await cargarImagenCanvas(equipo.banderaImagen);
    return [equipo.codigo, imagen];
  }));

  return new Map(imagenes);
}

function cargarImagenCanvas(src) {
  if (!src) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const imagen = new Image();

    if (/^https?:\/\//i.test(src)) {
      imagen.crossOrigin = "anonymous";
    }

    imagen.addEventListener("load", () => {
      resolve(imagen);
    }, { once: true });

    imagen.addEventListener("error", () => {
      resolve(null);
    }, { once: true });

    imagen.src = src;
  });
}

function dibujarImagenContain(contexto, imagen, x, y, ancho, alto) {
  const anchoOriginal = imagen.naturalWidth || imagen.width || ancho;
  const altoOriginal = imagen.naturalHeight || imagen.height || alto;
  const proporcion = Math.min(ancho / anchoOriginal, alto / altoOriginal);
  const anchoFinal = anchoOriginal * proporcion;
  const altoFinal = altoOriginal * proporcion;
  const xFinal = x + ((ancho - anchoFinal) / 2);
  const yFinal = y + ((alto - altoFinal) / 2);

  contexto.drawImage(imagen, xFinal, yFinal, anchoFinal, altoFinal);
}

function dibujarImagenCover(contexto, imagen, x, y, ancho, alto) {
  const anchoOriginal = imagen.naturalWidth || imagen.width || ancho;
  const altoOriginal = imagen.naturalHeight || imagen.height || alto;
  const proporcion = Math.max(ancho / anchoOriginal, alto / altoOriginal);
  const anchoFinal = anchoOriginal * proporcion;
  const altoFinal = altoOriginal * proporcion;
  const xFinal = x + ((ancho - anchoFinal) / 2);
  const yFinal = y + ((alto - altoFinal) / 2);

  contexto.drawImage(imagen, xFinal, yFinal, anchoFinal, altoFinal);
}

function dibujarTextoRecortado(contexto, texto, x, y, anchoMaximo) {
  if (contexto.measureText(texto).width <= anchoMaximo) {
    contexto.fillText(texto, x, y);
    return;
  }

  let textoRecortado = texto;

  while (textoRecortado.length > 1 && contexto.measureText(`${textoRecortado}...`).width > anchoMaximo) {
    textoRecortado = textoRecortado.slice(0, -1);
  }

  contexto.fillText(`${textoRecortado}...`, x, y);
}

function descargarCanvasPng(canvas, nombreArchivo) {
  return new Promise((resolve, reject) => {
    const descargarBlob = (blob) => {
      if (!blob) {
        reject(new Error("No image blob"));
        return;
      }

      const enlace = document.createElement("a");
      const url = URL.createObjectURL(blob);
      enlace.href = url;
      enlace.download = nombreArchivo;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      resolve();
    };

    if (canvas.toBlob) {
      try {
        canvas.toBlob(descargarBlob, "image/png");
      } catch (error) {
        reject(error);
      }

      return;
    }

    try {
      const enlace = document.createElement("a");
      enlace.href = canvas.toDataURL("image/png");
      enlace.download = nombreArchivo;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function limpiarPronosticoGruposActual() {
  const participante = obtenerParticipanteGruposActual();

  if (!participante) {
    mostrarMensajeGrupos("Elegí un participante", "error");
    return;
  }

  const confirmado = window.confirm(`¿Limpiar solo el pronóstico de grupos de ${participante}?`);

  if (!confirmado) {
    return;
  }

  if (estadoApp.pronosticosGrupos && estadoApp.pronosticosGrupos[participante]) {
    delete estadoApp.pronosticosGrupos[participante];
  }

  guardarEstado();
  renderizarSeccionGrupos();
  actualizarResumenGrupos();
  mostrarMensajeGrupos("Se limpiaron solo los grupos.", "info");
}

function actualizarResumenGrupos() {
  const participante = obtenerParticipanteGruposActual() || "Sin participante";
  const grupos = obtenerGruposMundial();
  const completos = contarGruposCompletos();
  const estaCompleto = Boolean(participante !== "Sin participante" && grupos.length > 0 && completos === grupos.length);

  const resumenCabecera = document.getElementById("resumen-grupos-cabecera");
  const resumenParticipante = document.getElementById("resumen-grupos-participante");
  const resumenCompletos = document.getElementById("resumen-grupos-completos");
  const resumenEstado = document.getElementById("resumen-grupos-estado");

  if (resumenCabecera) {
    resumenCabecera.textContent = `${participante} · ${completos}/${grupos.length}`;
  }

  if (resumenParticipante) {
    resumenParticipante.textContent = participante;
  }

  if (resumenCompletos) {
    resumenCompletos.textContent = `${completos}/${grupos.length}`;
  }

  if (resumenEstado) {
    resumenEstado.textContent = estaCompleto ? "Completo" : "Incompleto";
    resumenEstado.className = estaCompleto ? "completo" : "incompleto";
  }
}

function contarGruposCompletos() {
  const pronostico = obtenerPronosticoGruposActual();

  return obtenerGruposMundial().filter((grupo) => {
    const posiciones = normalizarPronosticoGrupo(pronostico[grupo.id], grupo);
    const codigosUnicos = new Set(posiciones.filter(Boolean));
    return posiciones.every(Boolean) && codigosUnicos.size === 4;
  }).length;
}

function obtenerParticipanteGruposActual() {
  const selectorGrupos = document.getElementById("selector-grupos-participante");
  const selectorPartidos = document.getElementById("selector-participante");
  const participante = (selectorGrupos && selectorGrupos.value)
    || (selectorPartidos && selectorPartidos.value)
    || estadoApp.participanteSeleccionado
    || "";

  if (participante && selectorGrupos && !selectorGrupos.value) {
    selectorGrupos.value = participante;
  }

  return participante;
}

function obtenerGruposMundial() {
  return typeof GRUPOS_MUNDIAL !== "undefined" && Array.isArray(GRUPOS_MUNDIAL)
    ? GRUPOS_MUNDIAL
    : [];
}

function obtenerGrupoPorId(grupoId) {
  return obtenerGruposMundial().find((grupo) => grupo.id === grupoId) || null;
}

function obtenerEquipoGrupo(grupo, equipoCodigo) {
  if (!grupo || !equipoCodigo) {
    return null;
  }

  return grupo.equipos.find((equipo) => equipo.codigo === equipoCodigo) || null;
}

function normalizarPronosticoGrupo(registro, grupo) {
  const valores = Array.isArray(registro) ? registro : [];
  const codigosValidos = new Set((grupo && grupo.equipos ? grupo.equipos : []).map((equipo) => equipo.codigo));

  return [0, 1, 2, 3].map((indice) => {
    const codigo = valores[indice] || "";
    return codigosValidos.has(codigo) ? codigo : "";
  });
}

function buscarGrupoPorNombre(nombreGrupo) {
  const normalizado = normalizarTexto(nombreGrupo);

  if (!normalizado) {
    return null;
  }

  return obtenerGruposMundial().find((grupo) => {
    const grupoNormalizado = normalizarTexto(grupo.nombre);
    return grupoNormalizado === normalizado
      || normalizado.includes(grupoNormalizado)
      || grupoNormalizado.includes(normalizado);
  }) || null;
}

function buscarEquipoGrupoPorNombre(grupo, nombreEquipo) {
  const normalizado = normalizarNombreEquipo(nombreEquipo);

  if (!grupo || !normalizado) {
    return null;
  }

  return grupo.equipos.find((equipo) => {
    return normalizarNombreEquipo(equipo.nombre) === normalizado
      || normalizarNombreEquipo(equipo.codigo) === normalizado;
  }) || null;
}

function parsearMensajeGrupos(texto, opciones = {}) {
  const lineas = String(texto || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((linea) => linea.trim())
    .filter(Boolean);
  const errores = [];
  const advertencias = [];
  const grupos = {};
  const requiereParticipante = opciones.requiereParticipante !== false;
  let participante = "";
  let grupoActual = null;

  lineas.forEach((linea) => {
    const lineaNormalizada = normalizarTexto(linea);

    if (lineaNormalizada.startsWith("participante:") || lineaNormalizada.includes(" participante:")) {
      participante = limpiarValorEncabezado(linea, "participante");
      return;
    }

    const grupoDetectado = buscarGrupoPorNombre(linea);

    if (grupoDetectado) {
      grupoActual = grupoDetectado;

      if (!grupos[grupoActual.id]) {
        grupos[grupoActual.id] = ["", "", "", ""];
      }

      return;
    }

    const posicion = linea.match(/^([1-4])\s*[\.)-]\s*(.+)$/);

    if (!posicion) {
      return;
    }

    if (!grupoActual) {
      advertencias.push(`Grupo sin encabezado para la linea "${linea}".`);
      return;
    }

    const indice = Number(posicion[1]) - 1;
    const nombreEquipo = posicion[2].trim();
    const equipo = buscarEquipoGrupoPorNombre(grupoActual, nombreEquipo);

    if (!equipo) {
      errores.push(`No se pudo reconocer "${nombreEquipo}" en ${grupoActual.nombre}.`);
      return;
    }

    grupos[grupoActual.id][indice] = equipo.codigo;
  });

  if (requiereParticipante && !participante) {
    errores.push("El mensaje de grupos no tiene participante.");
  }

  if (!Object.keys(grupos).length && texto.trim()) {
    errores.push("No se detectaron grupos en el mensaje.");
  }

  return {
    participante,
    grupos,
    errores,
    advertencias
  };
}

function parsearMultiplesMensajesGrupos(texto, opciones = {}) {
  const bloques = separarBloquesMensajesGrupos(texto);
  const advertencias = [];
  const mensajes = bloques.map((bloque, indice) => {
    const mensaje = parsearMensajeGrupos(bloque, opciones);
    mensaje.indice = indice;
    mensaje.textoOriginal = bloque;
    return mensaje;
  });

  if (!bloques.length && String(texto || "").trim()) {
    advertencias.push("No se pudo separar ningun mensaje de grupos.");
  }

  return {
    mensajes,
    advertencias
  };
}

function separarBloquesMensajesGrupos(texto) {
  const lineas = String(texto || "").replace(/\r/g, "").split("\n");
  const bloques = [];
  let actual = [];
  let actualTieneParticipante = false;
  let actualTieneGrupo = false;
  const nombreProdeNormalizado = normalizarTexto(CONFIG.nombreProde);

  lineas.forEach((linea) => {
    const normalizada = normalizarTexto(linea);
    const esTitulo = normalizada && normalizada.includes(nombreProdeNormalizado);
    const esParticipante = normalizada.startsWith("participante:") || normalizada.includes(" participante:");
    const esGrupo = Boolean(buscarGrupoPorNombre(linea));
    const empiezaNuevoMensaje = actual.length > 0 && (
      esTitulo
      || (esParticipante && actualTieneParticipante && actualTieneGrupo)
    );

    if (empiezaNuevoMensaje) {
      bloques.push(actual.join("\n").trim());
      actual = [];
      actualTieneParticipante = false;
      actualTieneGrupo = false;
    }

    actual.push(linea);
    actualTieneParticipante = actualTieneParticipante || esParticipante;
    actualTieneGrupo = actualTieneGrupo || esGrupo;
  });

  if (actual.join("").trim()) {
    bloques.push(actual.join("\n").trim());
  }

  return bloques.filter(Boolean);
}

function obtenerCargaGruposOficialesHardcodeados() {
  if (cacheGruposOficialesHardcodeados) {
    return cacheGruposOficialesHardcodeados;
  }

  const grupos = {};
  const advertencias = [];

  obtenerBloquesResultadosHardcodeados("oficialesGrupos").forEach((bloque, indice) => {
    const parseo = parsearMensajeGrupos(bloque, { requiereParticipante: false });
    advertencias.push(...parseo.errores, ...parseo.advertencias);

    Object.entries(parseo.grupos).forEach(([grupoId, posiciones]) => {
      if (grupos[grupoId]) {
        advertencias.push(`Grupo oficial repetido para ${grupoId}. Se uso el ultimo cargado.`);
      }

      grupos[grupoId] = posiciones;
    });

    if (!Object.keys(parseo.grupos).length) {
      advertencias.push(`Bloque oficial de grupos ${indice + 1}: no se detectaron posiciones.`);
    }
  });

  cacheGruposOficialesHardcodeados = {
    grupos,
    advertencias
  };

  return cacheGruposOficialesHardcodeados;
}

function calcularPronosticoGruposHardcodeado(mensajeParseado, oficiales) {
  const detalle = [];
  let puntos = 0;
  let aciertos = 0;
  let errores = 0;
  let pendientes = 0;

  obtenerGruposMundial().forEach((grupo) => {
    const pronostico = normalizarPronosticoGrupo(mensajeParseado.grupos[grupo.id], grupo);
    const oficial = normalizarPronosticoGrupo(oficiales[grupo.id], grupo);
    const tieneOficial = oficial.every(Boolean);
    const posiciones = pronostico.map((codigo, indice) => {
      const equipoPronostico = obtenerEquipoGrupo(grupo, codigo);
      const equipoOficial = obtenerEquipoGrupo(grupo, oficial[indice]);
      const pendiente = !tieneOficial;
      const acertado = Boolean(!pendiente && codigo && codigo === oficial[indice]);

      if (pendiente) {
        pendientes += 1;
      } else if (acertado) {
        puntos += 1;
        aciertos += 1;
      } else {
        errores += 1;
      }

      return {
        posicion: indice + 1,
        pronostico: equipoPronostico,
        oficial: equipoOficial,
        estado: pendiente ? "pendiente" : (acertado ? "pleno" : "error"),
        puntos: acertado ? 1 : 0
      };
    });

    detalle.push({
      grupo,
      puntos: posiciones.reduce((total, item) => total + item.puntos, 0),
      posiciones
    });
  });

  return {
    participante: mensajeParseado.participante,
    puntos,
    aciertos,
    errores,
    pendientes,
    detalle
  };
}

function crearEquipoResumenGrupo(equipo) {
  return crearEquipoResumenGrupoConOpciones(equipo, true, "bandera grupo-bandera");
}

function crearEquipoResumenGrupoConOpciones(equipo, usarCargaDiferida, claseBandera) {
  const resumen = document.createElement("span");
  resumen.className = "grupo-equipo-resumen";

  const bandera = crearBanderaEquipo(equipo, claseBandera, usarCargaDiferida);

  const nombre = document.createElement("span");
  nombre.className = "grupo-equipo-nombre";
  nombre.textContent = equipo.nombre;

  const codigo = document.createElement("span");
  codigo.className = "equipo-codigo";
  codigo.textContent = equipo.codigo;

  resumen.append(bandera, nombre, codigo);
  return resumen;
}

function crearGrupoImagen(grupo, equipos) {
  const contenedor = document.createElement("div");
  contenedor.className = "imagen-grupo";

  const titulo = document.createElement("h3");
  titulo.textContent = grupo.nombre;
  contenedor.appendChild(titulo);

  equipos.forEach((equipo, indice) => {
    const fila = document.createElement("div");
    fila.className = "imagen-grupo-fila";

    const posicion = document.createElement("span");
    posicion.className = "imagen-grupo-posicion";
    posicion.textContent = `${indice + 1}.`;

    const resumen = crearEquipoResumenGrupoConOpciones(equipo, false, "imagen-bandera grupo-bandera");
    fila.append(posicion, resumen);
    contenedor.appendChild(fila);
  });

  return contenedor;
}

function mostrarMensajeGrupos(mensaje, tipo) {
  const mensajeEstado = document.getElementById("mensaje-grupos");

  if (!mensajeEstado) {
    return;
  }

  mensajeEstado.textContent = mensaje;
  mensajeEstado.className = `mensaje-estado ${tipo || ""}`.trim();
}

function limpiarMensajeGrupos() {
  mostrarMensajeGrupos("", "");
}

async function descargarImagenPronostico() {
  const validacion = validarPronosticoCompleto();

  if (!validacion.valido) {
    mostrarMensaje(validacion.mensaje, "error");
    return;
  }

  if (typeof html2canvas !== "function") {
    mostrarMensaje("No se pudo cargar la herramienta para generar la imagen. Probá recargar la página.", "error");
    return;
  }

  guardarPronosticoActual();

  const tarjetaImagen = prepararTarjetaImagen();

  try {
    await esperarRender();
    await esperarImagenes(tarjetaImagen);
    await convertirImagenesLocalesADataUrl(tarjetaImagen);
    await esperarImagenes(tarjetaImagen);

    const canvas = await html2canvas(tarjetaImagen, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    });

    const enlace = document.createElement("a");

    enlace.href = canvas.toDataURL("image/png");
    enlace.download = `prode-tafa-${normalizarNombreArchivo(validacion.fechaSeleccionada.nombre)}-${normalizarNombreArchivo(validacion.participante)}.png`;
    enlace.click();

    mostrarMensaje("Imagen descargada.", "exito");
  } catch (error) {
    mostrarMensaje("No se pudo generar la imagen. Probá nuevamente.", "error");
  }
}

async function descargarImagenTabla() {
  const objetivo = document.getElementById("tabla-exportable");
  const contenedorAdvertencias = document.getElementById("advertencias-tabla");
  const contenedorScroll = objetivo ? objetivo.closest(".tabla-exportable-scroll") : null;

  if (!objetivo) {
    return;
  }

  if (typeof html2canvas !== "function") {
    renderizarAdvertencias(contenedorAdvertencias, ["No se pudo cargar la herramienta para generar la imagen. Proba recargar la pagina."]);
    return;
  }

  try {
    if (contenedorScroll) {
      contenedorScroll.classList.add("exportando-tabla");
    }

    const canvas = await html2canvas(objetivo, {
      backgroundColor: "#e7dfc8",
      scale: 2,
      useCORS: true
    });
    const nombreVista = normalizarNombreArchivo(obtenerNombreVistaTabla(ultimaVistaTabla || "general"));

    await descargarCanvasPng(canvas, `tabla-prode-tafa-${nombreVista || "general"}.png`);
  } catch (error) {
    renderizarAdvertencias(contenedorAdvertencias, ["No se pudo descargar la imagen de la tabla. Proba recargar la pagina."]);
  } finally {
    if (contenedorScroll) {
      contenedorScroll.classList.remove("exportando-tabla");
    }
  }
}

async function descargarImagenLlaves(tipo = "oro") {
  const contenedorAdvertencias = document.getElementById("advertencias-tabla");

  if (typeof html2canvas !== "function") {
    renderizarAdvertencias(contenedorAdvertencias, ["No se pudo cargar la herramienta para generar la imagen. Proba recargar la pagina."]);
    return;
  }

  const tarjeta = crearTarjetaImagenLlaves();
  document.body.appendChild(tarjeta);

  try {
    await Promise.all(Array.from(tarjeta.querySelectorAll("img")).map(esperarImagenIndividual));

    const canvas = await html2canvas(tarjeta, {
      backgroundColor: "#082e61",
      scale: 2,
      useCORS: true
    });

    await descargarCanvasPng(canvas, "llaves-prode-tafa-copa-oro.png");
  } catch (error) {
    renderizarAdvertencias(contenedorAdvertencias, ["No se pudo descargar la imagen de las llaves. Proba recargar la pagina."]);
  } finally {
    tarjeta.remove();
  }
}

function crearTarjetaImagenLlaves() {
  const tarjeta = document.createElement("div");
  const encabezado = document.createElement("div");
  const cuerpo = document.createElement("div");
  const panel = document.createElement("section");

  tarjeta.className = "imagen-llaves-export imagen-llaves-oro-export";
  encabezado.className = "imagen-llaves-header";
  encabezado.innerHTML = `
    <div>
      <span>Prode TAFA Copa del Mundo 2026</span>
      <h2>Llaves Copa Oro</h2>
    </div>
    <strong>Fase final</strong>
  `;

  cuerpo.className = "imagen-llaves-cuerpo";
  panel.className = "imagen-llaves-panel imagen-llaves-oro";
  panel.append(
    crearTituloImagenLlaves(
      "Copa Oro",
      "16avos, octavos y camino al campeon"
    ),
    crearBracketCopaOroImagen()
  );

  cuerpo.append(panel);
  tarjeta.append(encabezado, cuerpo);
  return tarjeta;
}

function crearTituloImagenLlaves(titulo, subtitulo) {
  const contenedor = document.createElement("div");
  contenedor.className = "imagen-llaves-titulo";
  contenedor.innerHTML = `
    <h3>${titulo}</h3>
    <span>${subtitulo}</span>
  `;
  return contenedor;
}

function crearBracketCopaOroImagen() {
  const bracket = document.createElement("div");
  const cruces = obtenerCrucesCopaOroImagenCalculados();

  bracket.className = "imagen-bracket";
  bracket.append(
    crearColumnaBracketImagen("16avos", cruces.dieciseisavos.map((calculo) => crearPartidoBracketImagen(calculo))),
    crearColumnaBracketImagen("Octavos", cruces.octavos.map((calculo) => crearPartidoBracketImagen(calculo))),
    crearColumnaBracketImagen("Cuartos", cruces.cuartos.map((calculo) => crearPartidoBracketImagen(calculo))),
    crearColumnaBracketImagen("Semis", cruces.semis.map((calculo) => crearPartidoBracketImagen(calculo))),
    crearColumnaBracketImagen("Final", cruces.final.map((calculo) => crearPartidoBracketImagen(calculo)))
  );
  return bracket;
}

function obtenerCrucesCopaOroImagenCalculados() {
  const cruces = obtenerCrucesCopaOroCalculados();

  return {
    ...cruces,
    dieciseisavos: obtenerCruces16OrdenadosParaImagenOro()
  };
}

function crearCrucesDesdeGanadoresImagen(crucesPrevios, datosRonda) {
  const cantidadCruces = Math.max(1, Math.ceil(crucesPrevios.length / 2));

  return Array.from({ length: cantidadCruces }, (_, indice) => {
    const local = obtenerGanadorCruceCalculado(crucesPrevios[indice * 2]) || "Por definir";
    const visitante = obtenerGanadorCruceCalculado(crucesPrevios[(indice * 2) + 1]) || "Por definir";

    return calcularCrucePronosticos({
      numero: indice + 1,
      local,
      visitante,
      fechaId: datosRonda.fechaId,
      partidoInicio: datosRonda.partidoInicio,
      partidoFin: datosRonda.partidoFin
    });
  });
}

function obtenerCruces16OrdenadosParaImagenOro() {
  const cruces16 = CRUCES_ORO_16AVOS.map((cruce) => calcularCrucePronosticos(cruce));
  const indicesUsados = new Set();
  const ordenados = [];

  CRUCES_ORO_OCTAVOS.forEach((octavo) => {
    const nombresSlot = obtenerNombresSlotGanador(octavo.visitante);

    if (!nombresSlot.length) {
      return;
    }

    const indice = cruces16.findIndex((calculo, indiceCruce) => {
      return !indicesUsados.has(indiceCruce)
        && nombresSlot.includes(normalizarTexto(calculo.cruce.local))
        && nombresSlot.includes(normalizarTexto(calculo.cruce.visitante));
    });

    if (indice !== -1) {
      indicesUsados.add(indice);
      ordenados.push(cruces16[indice]);
    }
  });

  cruces16.forEach((calculo, indice) => {
    if (!indicesUsados.has(indice)) {
      ordenados.push(calculo);
    }
  });

  return ordenados;
}

function obtenerNombresSlotGanador(slot) {
  const texto = String(slot || "");

  if (!texto.startsWith("Ganador ")) {
    return [];
  }

  return texto
    .replace(/^Ganador\s+/i, "")
    .split("/")
    .map((nombre) => normalizarTexto(nombre))
    .filter(Boolean);
}

function obtenerClasificadoParaSlot(slot, crucesPrevios) {
  const texto = String(slot || "Por definir");

  if (!texto.startsWith("Ganador ")) {
    return texto;
  }

  const nombres = obtenerNombresSlotGanador(texto);
  const cruce = crucesPrevios.find((calculo) => {
    return nombres.includes(normalizarTexto(calculo.cruce.local))
      && nombres.includes(normalizarTexto(calculo.cruce.visitante));
  });

  if (!cruce || !cruce.ganador) {
    return "Por definir";
  }

  return cruce.ganador === "local" ? cruce.cruce.local : cruce.cruce.visitante;
}

function crearBracketCopaPlataImagen() {
  const mapa = document.createElement("div");
  const contextoPlata = obtenerContextoCopaPlata();

  mapa.className = "imagen-plata-mapa";

  CRUCES_PLATA_FECHAS.forEach((fechaPlata) => {
    const crucesCalculados = fechaPlata.cruces
      .map((cruce) => contextoPlata.cruces.get(crearClaveCrucePlata(fechaPlata.numero, cruce.numero)))
      .filter(Boolean)
      .map((item) => item.calculo);

    mapa.appendChild(crearFechaPlataImagenDesdeCalculos(fechaPlata.titulo, fechaPlata.subtitulo, crucesCalculados));
  });

  return mapa;

  const perdedores16 = obtenerPerdedoresOro16avosParaPlata();
  const perdedoresOctavos = obtenerPerdedoresOroOctavosParaPlata();

  mapa.className = "imagen-plata-mapa";
  mapa.append(
    crearFechaPlataImagen("Fecha 1", "Partidos 1 al 4 de 16avos", [
      [entradaPlata("", "Fabrizio Escolano"), entradaPlata("", "Moreno Pérez")],
      [entradaPlata("", "Mario Talarico"), entradaPlata("", "Cristian Hantis")]
    ]),
    crearFechaPlataImagen("Fecha 2", "Partidos 5 al 8 de 16avos · ingresan perdedores de 16avos Oro", [
      [entradaGanadorPlata(contextoPlata, 1, 1), perdedores16[0]],
      [entradaGanadorPlata(contextoPlata, 1, 2), perdedores16[1]],
      [perdedores16[2], perdedores16[3]],
      [perdedores16[4], perdedores16[5]],
      [perdedores16[6], perdedores16[7]]
    ]),
    crearFechaPlataImagen("Fecha 3", "Partidos 9 al 12 de 16avos · ingresan perdedores de octavos Oro", [
      [entradaGanadorPlata(contextoPlata, 2, 1), perdedoresOctavos[0]],
      [entradaGanadorPlata(contextoPlata, 2, 2), perdedoresOctavos[1]],
      [entradaGanadorPlata(contextoPlata, 2, 3), perdedoresOctavos[2]],
      [entradaGanadorPlata(contextoPlata, 2, 4), perdedoresOctavos[3]],
      [entradaGanadorPlata(contextoPlata, 2, 5), perdedoresOctavos[4]],
      [perdedoresOctavos[5], perdedoresOctavos[6]],
      [perdedoresOctavos[7], entradaPlata("Libre", "A definir")]
    ]),
    crearFechaPlataImagen("Fecha 4", "Últimos 4 partidos de 16avos", [
      [entradaGanadorPlata(contextoPlata, 3, 1), entradaGanadorPlata(contextoPlata, 3, 2)],
      [entradaGanadorPlata(contextoPlata, 3, 3), entradaGanadorPlata(contextoPlata, 3, 4)],
      [entradaGanadorPlata(contextoPlata, 3, 5), entradaGanadorPlata(contextoPlata, 3, 6)],
      [entradaGanadorPlata(contextoPlata, 3, 7), entradaPlata("Libre", "A definir")]
    ]),
    crearFechaPlataImagen("Fecha 5", "Primeros 4 partidos de octavos · ingresan perdedores de cuartos Oro", [
      [entradaGanadorPlata(contextoPlata, 4, 1), entradaPlata("Perdedor cuartos Oro", "Cruce 1")],
      [entradaGanadorPlata(contextoPlata, 4, 2), entradaPlata("Perdedor cuartos Oro", "Cruce 2")],
      [entradaGanadorPlata(contextoPlata, 4, 3), entradaPlata("Perdedor cuartos Oro", "Cruce 3")],
      [entradaGanadorPlata(contextoPlata, 4, 4), entradaPlata("Perdedor cuartos Oro", "Cruce 4")]
    ]),
    crearFechaPlataImagen("Fecha 6", "Últimos 4 partidos de octavos · ingresan perdedores de semis Oro", [
      [entradaGanadorPlata(contextoPlata, 5, 1), entradaPlata("Perdedor semis Oro", "Cruce 1")],
      [entradaGanadorPlata(contextoPlata, 5, 2), entradaPlata("Perdedor semis Oro", "Cruce 2")],
      [entradaGanadorPlata(contextoPlata, 5, 3), entradaGanadorPlata(contextoPlata, 5, 4)]
    ]),
    crearFechaPlataImagen("Fecha 7", "Semifinales de Plata · 4 cuartos del Mundial", [
      [entradaGanadorPlata(contextoPlata, 6, 1), entradaGanadorPlata(contextoPlata, 6, 2)],
      [entradaGanadorPlata(contextoPlata, 6, 3), entradaPlata("Libre", "A definir")]
    ]),
    crearFechaPlataImagen("Fecha 8", "Final de Plata - semifinales del Mundial", [
      [entradaGanadorPlata(contextoPlata, 7, 1), entradaGanadorPlata(contextoPlata, 7, 2)]
    ])
  );
  return mapa;
}

function crearFechaPlataImagenDesdeCalculos(titulo, subtitulo, crucesCalculados) {
  const fecha = document.createElement("section");
  const encabezado = document.createElement("div");
  const lista = document.createElement("div");

  fecha.className = "imagen-plata-fecha-card";
  encabezado.className = "imagen-plata-fecha-top";
  encabezado.innerHTML = `
    <h4>${titulo}</h4>
    <span>${subtitulo}</span>
  `;
  lista.className = "imagen-plata-cruces";

  crucesCalculados.forEach((calculo) => {
    lista.appendChild(crearCrucePlataImagenDesdeCalculo(calculo));
  });

  fecha.append(encabezado, lista);
  return fecha;
}

function crearCrucePlataImagenDesdeCalculo(calculo) {
  const cruce = document.createElement("article");
  const numeroElemento = document.createElement("strong");
  const resultadoLinea = document.createElement("div");
  const resultadoTexto = obtenerTextoResultadoPlataImagen(calculo);
  const hayPuntaje = resultadoTexto !== "-";

  cruce.className = `imagen-plata-cruce estado-${calculo.estado}${calculo.ganadorPorTabla ? " desempate" : ""}`;
  numeroElemento.textContent = calculo.cruce.numero;
  numeroElemento.className = "imagen-plata-cruce-numero";
  resultadoLinea.className = "imagen-plata-resultado-linea";
  resultadoLinea.textContent = resultadoTexto !== "-" ? `Resultado: ${resultadoTexto}` : "Resultado pendiente";
  cruce.append(
    numeroElemento,
    crearLadoCrucePlataImagen(crearEntradaPlataDesdeCalculo(calculo.cruce.local, calculo.ganador === "local", hayPuntaje ? calculo.local.total : null)),
    crearMarcadorPlataImagen(calculo),
    crearLadoCrucePlataImagen(crearEntradaPlataDesdeCalculo(calculo.cruce.visitante, calculo.ganador === "visitante", hayPuntaje ? calculo.visitante.total : null)),
    resultadoLinea
  );
  return cruce;
}

function crearEntradaPlataDesdeCalculo(nombre, esGanador, puntos = null) {
  const texto = String(nombre || "Por definir");
  const esPendiente = esTextoCrucePendiente(texto);
  const posicion = obtenerPosicionGeneralCruce(texto);
  const etiquetas = [];

  if (!esPendiente && Number.isFinite(posicion)) {
    etiquetas.push(`${posicion}`);
  }

  if (esGanador) {
    etiquetas.push("Clasifica");
  }

  return {
    etiqueta: etiquetas.join(" - ") || "Participante",
    nombre: texto,
    ganador: esGanador,
    puntos
  };
}

function crearMarcadorPlataImagen(calculo) {
  const marcador = document.createElement("div");
  const etiqueta = document.createElement("span");
  const resultado = document.createElement("strong");
  const textoResultado = obtenerTextoResultadoPlataImagen(calculo);
  const hayPuntaje = textoResultado !== "-";

  marcador.className = `imagen-plata-marcador${hayPuntaje ? "" : " sin-resultado"}`;
  etiqueta.textContent = hayPuntaje ? "PTS" : "VS";
  resultado.textContent = textoResultado;

  marcador.append(etiqueta, resultado);
  return marcador;
}

function obtenerTextoResultadoPlataImagen(calculo) {
  if (!calculo.partidos.length || calculo.local.esSlotPendiente || calculo.visitante.esSlotPendiente) {
    return "-";
  }

  return `${calculo.local.total} - ${calculo.visitante.total}`;
}

function entradaGanadorPlata(contextoPlata, fecha, cruce) {
  const ganador = contextoPlata.ganadores.get(crearClaveCrucePlata(fecha, cruce));
  return entradaPlata(`Clasif. Plata F${fecha}`, ganador || `Cruce ${cruce}`);
}

function obtenerPerdedoresOro16avosParaPlata() {
  return obtenerEntradasPerdedoresDesdeCruces(
    obtenerCruces16OrdenadosParaImagenOro(),
    "Perdedor 16avos Oro"
  );
}

function obtenerPerdedoresOroOctavosParaPlata() {
  return obtenerEntradasPerdedoresDesdeCruces(
    obtenerCrucesOroOctavosConClasificados().map((cruce) => calcularCrucePronosticos(cruce)),
    "Perdedor octavos Oro",
    true
  );
}

function obtenerEntradasPerdedoresDesdeCruces(crucesCalculados, etiqueta, usarNumeroCruceComoFallback = false) {
  return crucesCalculados.map((calculo) => {
    const perdedor = obtenerPerdedorCruceCalculado(calculo);
    const referencia = usarNumeroCruceComoFallback
      ? `Cruce ${calculo.cruce.numero}`
      : `${calculo.cruce.local} / ${calculo.cruce.visitante}`;

    return entradaPlata(etiqueta, perdedor || referencia);
  });
}

function obtenerPerdedorCruceCalculado(calculo) {
  if (!calculo || !calculo.ganador) {
    return "";
  }

  return calculo.ganador === "local" ? calculo.cruce.visitante : calculo.cruce.local;
}

function resolverCrucePlataConGanadores(cruce, ganadoresPlata) {
  return {
    ...cruce,
    local: resolverTextoCrucePlata(cruce.local, ganadoresPlata),
    visitante: resolverTextoCrucePlata(cruce.visitante, ganadoresPlata)
  };
}

function resolverTextoCrucePlata(texto, ganadoresPlata) {
  const ganadorPlata = resolverTextoGanadorPlata(texto, ganadoresPlata);

  if (ganadorPlata) {
    return ganadorPlata;
  }

  return resolverTextoPerdedorOro(texto);
}

function resolverTextoGanadorPlata(texto, ganadoresPlata) {
  const valor = String(texto || "");
  const coincidencia = valor.match(/^Ganador Plata Fecha\s+(\d+)\s*-\s*Cruce\s+(\d+)$/i);

  if (!coincidencia) {
    return "";
  }

  return ganadoresPlata.get(crearClaveCrucePlata(Number(coincidencia[1]), Number(coincidencia[2]))) || "";
}

function crearClaveCrucePlata(fecha, cruce) {
  return `${fecha}-${cruce}`;
}

function obtenerGanadorCruceCalculado(calculo) {
  if (!calculo || !calculo.ganador) {
    return "";
  }

  return calculo.ganador === "local" ? calculo.cruce.local : calculo.cruce.visitante;
}

function obtenerContextoCopaPlata() {
  const ganadores = new Map();
  const cruces = new Map();

  CRUCES_PLATA_FECHAS.forEach((fechaPlata) => {
    const fechaNumero = Number(fechaPlata.numero);

    fechaPlata.cruces.forEach((cruce) => {
      const cruceResuelto = resolverCrucePlataConGanadores(cruce, ganadores);
      const cruceCompleto = {
        ...cruceResuelto,
        fechaId: fechaPlata.fechaId,
        partidoInicio: fechaPlata.partidoInicio,
        partidoFin: fechaPlata.partidoFin
      };
      const calculo = calcularCrucePronosticos(cruceCompleto);
      const ganador = obtenerGanadorCruceCalculado(calculo);
      const clave = crearClaveCrucePlata(fechaNumero, cruce.numero);

      cruces.set(clave, { cruce: cruceCompleto, calculo });

      if (ganador) {
        ganadores.set(clave, ganador);
      }
    });
  });

  return { ganadores, cruces };
}

function resolverTextoPerdedorOro(texto) {
  const valor = String(texto || "");

  if (!valor.startsWith("Perdedor ")) {
    return valor;
  }

  const copaOro = obtenerCrucesCopaOroCalculados();
  const perdedorCuartos = resolverPerdedorOroPorNumero(valor, "Perdedor Copa Oro Cuartos - Cruce", copaOro.cuartos);

  if (perdedorCuartos) {
    return perdedorCuartos;
  }

  const perdedorSemis = resolverPerdedorOroPorNumero(valor, "Perdedor Copa Oro Semis - Cruce", copaOro.semis);

  if (perdedorSemis) {
    return perdedorSemis;
  }

  const perdedorOctavos = resolverPerdedorOroPorNumero(valor, "Perdedor Copa Oro Octavos - Cruce", obtenerCrucesOroOctavosConClasificados());

  if (perdedorOctavos) {
    return perdedorOctavos;
  }

  const textoSinPrefijo = valor.replace(/^Perdedor\s+/i, "");

  if (textoSinPrefijo.includes("/")) {
    const perdedor16 = resolverPerdedorOroPorNombres(textoSinPrefijo, CRUCES_ORO_16AVOS);

    if (perdedor16) {
      return perdedor16;
    }
  }

  return valor;
}

function resolverPerdedorOroPorNumero(texto, prefijo, cruces) {
  if (!texto.startsWith(prefijo)) {
    return "";
  }

  const numero = Number(texto.replace(prefijo, "").trim());
  const cruce = cruces[numero - 1];

  if (!cruce) {
    return "";
  }

  return obtenerPerdedorCruceCalculado(cruce.cruce ? cruce : calcularCrucePronosticos(cruce));
}

function resolverPerdedorOroPorNombres(texto, cruces) {
  const nombres = texto.split("/").map((nombre) => normalizarTexto(nombre)).filter(Boolean);
  const cruce = cruces.find((item) => {
    return nombres.includes(normalizarTexto(item.local))
      && nombres.includes(normalizarTexto(item.visitante));
  });

  return cruce ? obtenerPerdedorCruceCalculado(calcularCrucePronosticos(cruce)) : "";
}

function entradaPlata(etiqueta, nombre) {
  return { etiqueta, nombre };
}

function crearFechaPlataImagen(titulo, subtitulo, cruces) {
  const fecha = document.createElement("section");
  const encabezado = document.createElement("div");
  const lista = document.createElement("div");

  fecha.className = "imagen-plata-fecha-card";
  encabezado.className = "imagen-plata-fecha-top";
  encabezado.innerHTML = `
    <h4>${titulo}</h4>
    <span>${subtitulo}</span>
  `;
  lista.className = "imagen-plata-cruces";

  cruces.forEach(([local, visitante], indice) => {
    lista.appendChild(crearCrucePlataImagen(indice + 1, local, visitante));
  });

  fecha.append(encabezado, lista);
  return fecha;
}

function crearCrucePlataImagen(numero, local, visitante) {
  const cruce = document.createElement("article");
  const numeroElemento = document.createElement("strong");
  const versus = document.createElement("span");

  cruce.className = "imagen-plata-cruce";
  numeroElemento.textContent = numero;
  numeroElemento.className = "imagen-plata-cruce-numero";
  versus.textContent = "vs";
  versus.className = "imagen-plata-vs";
  cruce.append(
    numeroElemento,
    crearLadoCrucePlataImagen(local),
    versus,
    crearLadoCrucePlataImagen(visitante)
  );
  return cruce;
}

function crearLadoCrucePlataImagen(entrada) {
  const lado = document.createElement("div");
  const escudoMarco = document.createElement("span");
  const contenido = document.createElement("div");
  const etiqueta = document.createElement("span");
  const nombre = document.createElement("strong");
  const puntos = document.createElement("b");
  const participante = obtenerParticipanteRealPlata(entrada.nombre || "");

  lado.className = `imagen-plata-lado${entrada.ganador ? " ganador" : ""}`;
  escudoMarco.className = "imagen-plata-escudo";

  if (participante) {
    const escudo = document.createElement("img");
    escudo.alt = "";
    escudo.src = obtenerRutaEscudoParticipante(participante);
    escudo.onerror = () => {
      escudoMarco.classList.add("sin-escudo");
      escudo.remove();
    };
    escudoMarco.appendChild(escudo);
  } else {
    escudoMarco.classList.add("sin-escudo");
  }

  etiqueta.textContent = entrada.etiqueta || "Participante";
  nombre.innerHTML = formatearNombrePlataImagen(entrada.nombre || "");
  puntos.className = "imagen-plata-puntos";
  puntos.textContent = Number.isFinite(entrada.puntos) ? `${entrada.puntos} pts` : "";
  contenido.append(etiqueta, nombre);

  if (puntos.textContent) {
    contenido.appendChild(puntos);
  }

  lado.append(escudoMarco, contenido);
  return lado;
}

function obtenerParticipanteRealPlata(nombre) {
  const normalizado = normalizarTexto(nombre);

  if (!normalizado || normalizado.includes("/") || normalizado.startsWith("cruce") || normalizado.includes("definir")) {
    return "";
  }

  return PARTICIPANTES.find((participante) => normalizarTexto(participante) === normalizado) || "";
}

function formatearNombrePlataImagen(nombre) {
  return String(nombre || "")
    .split("/")
    .map((parte) => parte.trim())
    .filter(Boolean)
    .join("<br>");
}

function crearColumnaBracketImagen(titulo, items) {
  const columna = document.createElement("div");
  const encabezado = document.createElement("h4");
  const lista = document.createElement("div");

  columna.className = "imagen-bracket-col";
  encabezado.textContent = titulo;
  lista.className = "imagen-bracket-lista";
  items.forEach((item) => lista.appendChild(item));
  columna.append(encabezado, lista);
  return columna;
}

function crearCajasPendientesBracket(cantidad, texto) {
  return Array.from({ length: cantidad }, (_, indice) => {
    const caja = document.createElement("div");
    caja.className = "imagen-bracket-pendiente";
    caja.textContent = "";
    return caja;
  });
}

function crearPartidoPlataImagen(local, visitante, metaTexto) {
  const calculo = calcularCrucePronosticos({
    local,
    visitante,
    fechaId: "16avos",
    partidoInicio: 1,
    partidoFin: 4
  });

  return crearPartidoBracketImagen({
    ...calculo,
    estadoTexto: metaTexto
  });
}

function crearIngresoPlataImagen(texto) {
  const caja = document.createElement("div");
  caja.className = "imagen-bracket-pendiente imagen-bracket-perdedor";
  caja.textContent = texto;
  return caja;
}

function crearPartidoBracketImagen(calculo) {
  const partido = document.createElement("article");

  partido.className = `imagen-bracket-partido estado-${calculo.estado}`;
  partido.append(
    crearEquipoBracketImagen(calculo.cruce.local, calculo.local, calculo.ganador === "local"),
    crearEquipoBracketImagen(calculo.cruce.visitante, calculo.visitante, calculo.ganador === "visitante")
  );
  return partido;
}

function crearEquipoBracketImagen(nombre, datos, esGanador) {
  const texto = String(nombre || "Por definir");
  const pendiente = esTextoCrucePendiente(texto);
  const equipo = document.createElement("div");
  const escudo = document.createElement("span");
  const nombreEquipo = document.createElement("strong");
  const puntos = document.createElement("em");

  equipo.className = `imagen-bracket-equipo${pendiente ? " pendiente" : ""}${esGanador ? " ganador" : ""}`;
  escudo.className = "imagen-bracket-escudo";

  if (pendiente) {
    escudo.textContent = "";
  } else {
    const imagen = document.createElement("img");
    imagen.alt = "";
    imagen.src = obtenerRutaEscudoParticipante(texto);
    imagen.onerror = () => {
      escudo.textContent = "?";
      imagen.remove();
    };
    escudo.appendChild(imagen);
  }

  nombreEquipo.textContent = pendiente ? "" : texto;
  puntos.textContent = pendiente ? "" : `${datos.total} pts`;
  equipo.append(escudo, nombreEquipo, puntos);
  return equipo;
}

function crearResumenCopaPlataImagen() {
  const contenedor = document.createElement("div");
  contenedor.className = "imagen-plata-fechas";

  CRUCES_PLATA_FECHAS.forEach((fechaPlata) => {
    const item = document.createElement("div");
    const titulo = document.createElement("strong");
    const descripcion = document.createElement("span");

    item.className = "imagen-plata-fecha";
    titulo.textContent = fechaPlata.titulo;
    descripcion.textContent = fechaPlata.subtitulo;
    item.append(titulo, descripcion);
    contenedor.appendChild(item);
  });

  return contenedor;
}

function prepararTarjetaImagen() {
  const contenedor = document.getElementById("tarjeta-imagen-pronostico");
  const validacion = validarPronosticoCompleto();

  contenedor.innerHTML = "";

  const tarjeta = document.createElement("div");
  tarjeta.className = "imagen-pronostico";

  const encabezado = document.createElement("div");
  encabezado.className = "imagen-encabezado";

  const textos = document.createElement("div");
  const wordmark = document.createElement("img");
  wordmark.className = "imagen-wordmark";
  wordmark.src = "assets/banner-tafa-awar-transparente.png";
  wordmark.alt = "Prode TAFA";
  wordmark.addEventListener("error", () => {
    wordmark.remove();
  });
  const titulo = document.createElement("h2");
  titulo.textContent = CONFIG.nombreProde;
  const subtitulo = document.createElement("p");
  subtitulo.className = "imagen-subtitulo";
  subtitulo.textContent = `${validacion.fechaSeleccionada.nombre} · ${validacion.fechaSeleccionada.fase}`;
  textos.append(wordmark, titulo, subtitulo);

  const logo = document.createElement("div");
  logo.className = "imagen-logo";
  const logoImagen = document.createElement("img");
  logoImagen.src = "assets/logo-tafa.png";
  logoImagen.alt = "Logo TAFA";
  logoImagen.addEventListener("error", () => {
    logoImagen.remove();
    logo.textContent = "TAFA";
  });
  logo.appendChild(logoImagen);

  encabezado.append(textos, logo);

  const info = document.createElement("div");
  info.className = "imagen-info";
  info.append(
    crearInfoImagen("Fecha", validacion.fechaSeleccionada.nombre),
    crearInfoImagen("Fase", validacion.fechaSeleccionada.fase),
    crearInfoImagen("Participante", validacion.participante)
  );

  const lista = document.createElement("div");
  lista.className = "imagen-lista";

  validacion.pronosticos.forEach((pronostico) => {
    lista.appendChild(crearPartidoImagen(pronostico));
  });

  tarjeta.append(encabezado, info, lista);
  contenedor.appendChild(tarjeta);

  return tarjeta;
}

function crearInfoImagen(etiqueta, valor) {
  const item = document.createElement("div");
  item.className = "imagen-info-item";

  const label = document.createElement("span");
  label.className = "imagen-label";
  label.textContent = etiqueta;

  const texto = document.createElement("span");
  texto.className = "imagen-valor";
  texto.textContent = valor;

  item.append(label, texto);
  return item;
}

function crearPartidoImagen(pronostico) {
  const { partido, golesLocal, golesVisitante, ganadorPenales } = pronostico;
  const contenedor = document.createElement("div");
  contenedor.className = "imagen-partido";

  const meta = document.createElement("p");
  meta.className = "imagen-meta-partido";
  meta.textContent = `${partido.grupo} · ${partido.dia} · ${partido.horario} hs · ${partido.estadio} · ${partido.ciudad}`;

  const local = crearEquipoImagen(partido.local, "local", ganadorPenales === "local");
  const marcador = document.createElement("div");
  marcador.className = "imagen-marcador";
  marcador.append(crearGolImagen(golesLocal), document.createTextNode("-"), crearGolImagen(golesVisitante));
  const visitante = crearEquipoImagen(partido.visitante, "visitante", ganadorPenales === "visitante");

  contenedor.append(meta, local, marcador, visitante);
  return contenedor;
}

function crearEquipoImagen(equipo, lado, seleccionadoPenales = false) {
  const contenedor = document.createElement("div");
  contenedor.className = `imagen-equipo ${lado}`;

  const bandera = crearBanderaEquipo(equipo, "imagen-bandera", false);

  const nombre = document.createElement("span");
  nombre.textContent = `${seleccionadoPenales ? "*" : ""}${equipo.nombre}`;

  if (lado === "visitante") {
    contenedor.append(nombre, bandera);
  } else {
    contenedor.append(bandera, nombre);
  }

  return contenedor;
}

function crearGolImagen(gol) {
  const elemento = document.createElement("span");
  elemento.className = "imagen-gol";
  elemento.textContent = gol;
  return elemento;
}

function obtenerResultadoOficial(partidoId) {
  const cargaHardcodeada = obtenerCargaResultadosOficialesHardcodeados();
  return cargaHardcodeada.resultados[partidoId]
    || RESULTADOS_OFICIALES[partidoId]
    || null;
}

function obtenerCargaResultadosOficialesHardcodeados() {
  if (cacheResultadosOficialesHardcodeados) {
    return cacheResultadosOficialesHardcodeados;
  }

  const resultados = {};
  const advertencias = [];

  obtenerBloquesResultadosHardcodeados("oficiales").forEach((bloque, indice) => {
    const parseo = parsearBloqueResultadosOficiales(bloque, indice);
    advertencias.push(...parseo.advertencias);

    Object.entries(parseo.resultados).forEach(([partidoId, resultado]) => {
      if (resultados[partidoId]) {
        advertencias.push(`Resultado oficial repetido para ${partidoId}. Se uso el ultimo cargado.`);
      }

      resultados[partidoId] = resultado;
    });
  });

  cacheResultadosOficialesHardcodeados = {
    resultados,
    advertencias
  };

  return cacheResultadosOficialesHardcodeados;
}

function parsearBloqueResultadosOficiales(bloque, indiceBloque) {
  const lineas = String(bloque || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((linea) => linea.trim())
    .filter(Boolean);
  const resultados = {};
  const advertencias = [];
  let nombreFecha = "";

  lineas.forEach((linea) => {
    const lineaNormalizada = normalizarTexto(linea);

    if (lineaNormalizada.startsWith("fecha:") || lineaNormalizada.includes(" fecha:")) {
      nombreFecha = limpiarValorEncabezado(linea, "fecha");
    }
  });

  let fecha = buscarFechaPorNombre(nombreFecha);

  if (!fecha && !nombreFecha) {
    fecha = lineas.map((linea) => buscarFechaPorNombre(linea)).find(Boolean) || null;
  }

  if (!fecha) {
    advertencias.push(`Resultado oficial ${indiceBloque + 1}: no se pudo detectar la fecha.`);
    return {
      resultados,
      advertencias
    };
  }

  lineas.forEach((linea) => {
    const partidoParseado = parsearLineaPartido(linea);

    if (!partidoParseado) {
      return;
    }

    const busqueda = buscarPartidoPorEquipos(fecha, partidoParseado.equipoLocal, partidoParseado.equipoVisitante);

    if (!busqueda) {
      advertencias.push(`Resultado oficial no reconocido en ${fecha.nombre}: "${linea}".`);
      return;
    }

    const ganadorPenales = busqueda.invertido
      ? invertirGanadorMensaje(partidoParseado.pronosticoAvanza)
      : partidoParseado.pronosticoAvanza;

    resultados[busqueda.partido.id] = {
      golesLocal: busqueda.invertido ? partidoParseado.golesVisitante : partidoParseado.golesLocal,
      golesVisitante: busqueda.invertido ? partidoParseado.golesLocal : partidoParseado.golesVisitante,
      ganadorPenales: ganadorPenales || ""
    };
  });

  if (!Object.keys(resultados).length) {
    advertencias.push(`Resultado oficial ${fecha.nombre}: no se detectaron partidos.`);
  }

  return {
    resultados,
    advertencias
  };
}

function calcularPuntosPartido(pronostico, oficial) {
  const oficialPendiente = !oficial
    || oficial.golesLocal === null
    || oficial.golesVisitante === null
    || oficial.golesLocal === undefined
    || oficial.golesVisitante === undefined;

  if (oficialPendiente) {
    return {
      estado: "pendiente",
      puntos: 0,
      extra: 0,
      descripcion: "No cargado"
    };
  }

  const golesPronosticoLocal = Number(pronostico.golesLocal);
  const golesPronosticoVisitante = Number(pronostico.golesVisitante);
  const golesOficialLocal = Number(oficial.golesLocal);
  const golesOficialVisitante = Number(oficial.golesVisitante);
  const extra = calcularExtraPenales(pronostico, oficial);

  if (golesPronosticoLocal === golesOficialLocal && golesPronosticoVisitante === golesOficialVisitante) {
    return {
      estado: "pleno",
      puntos: CONFIG.puntos.pleno,
      extra,
      descripcion: "Pleno"
    };
  }

  const signoPronostico = obtenerSignoResultado(golesPronosticoLocal, golesPronosticoVisitante);
  const signoOficial = obtenerSignoResultado(golesOficialLocal, golesOficialVisitante);

  if (signoPronostico === signoOficial) {
    return {
      estado: "parcial",
      puntos: CONFIG.puntos.parcial,
      extra,
      descripcion: "Parcial"
    };
  }

  return {
    estado: "error",
    puntos: CONFIG.puntos.error,
    extra,
    descripcion: "Error"
  };
}

function calcularExtraPenales(pronostico, oficial) {
  const golesOficialLocal = Number(oficial.golesLocal);
  const golesOficialVisitante = Number(oficial.golesVisitante);
  const ganadorOficial = obtenerGanadorPenalesResultado(oficial);

  if (golesOficialLocal !== golesOficialVisitante || !ganadorOficial) {
    return 0;
  }

  return obtenerGanadorPenalesResultado(pronostico) === ganadorOficial ? 1 : 0;
}

function obtenerGanadorPenalesResultado(resultado) {
  return resultado.pronosticoAvanza || resultado.ganadorPenales || "";
}

function obtenerSignoResultado(golesLocal, golesVisitante) {
  const local = Number(golesLocal);
  const visitante = Number(golesVisitante);

  if (local > visitante) {
    return "local";
  }

  if (local < visitante) {
    return "visitante";
  }

  return "empate";
}

function renderizarResultadoIndividual() {
  const textarea = document.getElementById("textarea-pronostico-calculo");
  const selectorFecha = document.getElementById("selector-fecha-calculo");
  const contenedorResultado = document.getElementById("resultado-calculo-individual");
  const contenedorTotal = document.getElementById("resultado-total-individual");
  const contenedorAdvertencias = document.getElementById("advertencias-calculo");
  const texto = textarea ? textarea.value : "";

  contenedorResultado.innerHTML = "";
  contenedorTotal.hidden = true;
  contenedorTotal.innerHTML = "";

  if (!texto.trim()) {
    renderizarAdvertencias(contenedorAdvertencias, ["Pegá un mensaje de pronóstico antes de calcular."]);
    return;
  }

  const mensaje = parsearMensajePronostico(texto, {
    fechaFallbackId: selectorFecha ? selectorFecha.value : ""
  });
  const calculo = calcularPronosticoCompleto(mensaje);
  const advertencias = [...mensaje.errores, ...mensaje.advertencias, ...calculo.advertencias];

  if (calculo.filas.length) {
    contenedorTotal.hidden = false;
    contenedorTotal.appendChild(crearResumenTotalIndividual(calculo));
    calculo.filas.forEach((fila) => {
      contenedorResultado.appendChild(crearFilaResultado(fila));
    });
  }

  renderizarAdvertencias(contenedorAdvertencias, advertencias);
}

function crearResumenTotalIndividual(calculo) {
  const contenedor = document.createElement("div");
  const titulo = document.createElement("h3");
  const detalle = document.createElement("p");
  const total = document.createElement("div");

  titulo.textContent = calculo.participante || "Participante sin detectar";
  detalle.textContent = calculo.fecha ? `${calculo.fecha.nombre} · ${calculo.fecha.fase}` : "Fecha sin detectar";
  total.className = "total-puntos";
  total.innerHTML = `${calculo.total}<span>puntos</span>`;

  contenedor.append(titulo, detalle, total);
  return contenedor;
}

function crearFilaResultado(fila) {
  const contenedor = document.createElement("article");
  contenedor.className = `resultado-fila estado-${fila.estado}`;

  contenedor.append(
    crearCeldaResultado("Partido", `${fila.partido.local.nombre} vs ${fila.partido.visitante.nombre}`),
    crearCeldaResultado("Pronóstico", `${fila.pronostico.golesLocal} - ${fila.pronostico.golesVisitante}`),
    crearCeldaResultado("Resultado oficial", fila.resultadoOficialTexto),
    crearCeldaEstado(fila)
  );

  return contenedor;
}

function crearCeldaResultado(label, valor) {
  const celda = document.createElement("div");
  const etiqueta = document.createElement("span");
  const contenido = document.createElement("strong");

  etiqueta.className = "resultado-label";
  etiqueta.textContent = label;
  contenido.className = "resultado-valor";
  contenido.textContent = valor;

  celda.append(etiqueta, contenido);
  return celda;
}

function crearCeldaEstado(fila) {
  const celda = document.createElement("div");
  const badge = document.createElement("span");
  const puntos = document.createElement("span");

  badge.className = "badge-estado";
  badge.textContent = fila.descripcion;
  puntos.className = "puntos-mini";
  puntos.textContent = fila.extra ? `+${fila.puntos} · Extra +${fila.extra}` : `+${fila.puntos}`;

  celda.append(badge, puntos);
  return celda;
}

function calcularPronosticoCompleto(mensajeParseado) {
  const filas = [];
  const advertencias = [];

  mensajeParseado.pronosticos.forEach((pronostico) => {
    const oficial = obtenerResultadoOficial(pronostico.partido.id);
    const puntaje = calcularPuntosPartido(pronostico, oficial);

    if (puntaje.estado === "pendiente") {
      advertencias.push(`No cargado: ${pronostico.partido.local.nombre} vs ${pronostico.partido.visitante.nombre} no tiene resultado oficial cargado.`);
    }

    filas.push({
      fecha: mensajeParseado.fecha,
      participante: mensajeParseado.participante,
      partido: pronostico.partido,
      pronostico,
      oficial,
      estado: puntaje.estado,
      puntos: puntaje.puntos,
      extra: puntaje.extra || 0,
      descripcion: puntaje.descripcion,
      resultadoOficialTexto: formatearResultadoOficial(pronostico.partido, oficial)
    });
  });

  return {
    fecha: mensajeParseado.fecha,
    participante: mensajeParseado.participante,
    filas,
    total: filas.reduce((acumulado, fila) => acumulado + fila.puntos + fila.extra, 0),
    puntosPartidos: filas.reduce((acumulado, fila) => acumulado + fila.puntos, 0),
    extrasPenales: filas.reduce((acumulado, fila) => acumulado + fila.extra, 0),
    plenos: filas.filter((fila) => fila.estado === "pleno").length,
    parciales: filas.filter((fila) => fila.estado === "parcial").length,
    errores: filas.filter((fila) => fila.estado === "error").length,
    pendientes: filas.filter((fila) => fila.estado === "pendiente").length,
    advertencias
  };
}

function formatearResultadoOficial(partido, oficial) {
  if (!oficial || oficial.golesLocal === null || oficial.golesVisitante === null || oficial.golesLocal === undefined || oficial.golesVisitante === undefined) {
    return "No cargado";
  }

  const ganador = obtenerGanadorPenalesResultado(oficial);
  const marcaLocal = ganador === "local" ? "*" : "";
  const marcaVisitante = ganador === "visitante" ? "*" : "";

  return `${marcaLocal}${partido.local.nombre} ${oficial.golesLocal} - ${oficial.golesVisitante} ${marcaVisitante}${partido.visitante.nombre}`;
}

function parsearMensajePronostico(texto, opciones = {}) {
  const lineas = String(texto || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((linea) => linea.trim())
    .filter(Boolean);
  const errores = [];
  const advertencias = [];
  let nombreFecha = "";
  let participante = "";

  lineas.forEach((linea) => {
    const lineaNormalizada = normalizarTexto(linea);

    if (lineaNormalizada.startsWith("fecha:") || lineaNormalizada.includes(" fecha:")) {
      nombreFecha = limpiarValorEncabezado(linea, "fecha");
    }

    if (lineaNormalizada.startsWith("participante:") || lineaNormalizada.includes(" participante:")) {
      participante = limpiarValorEncabezado(linea, "participante");
    }
  });

  let fecha = buscarFechaPorNombre(nombreFecha);

  if (!fecha && opciones.fechaFallbackId) {
    fecha = FECHAS.find((fechaItem) => fechaItem.id === opciones.fechaFallbackId) || null;

    if (fecha && !nombreFecha) {
      advertencias.push(`El mensaje no tiene fecha. Se usó ${fecha.nombre} por el selector.`);
    }
  }

  if (!participante) {
    errores.push("El mensaje no tiene participante.");
  }

  if (!nombreFecha && !fecha) {
    errores.push("El mensaje no tiene fecha.");
  }

  if (nombreFecha && !fecha) {
    errores.push(`La fecha "${nombreFecha}" no existe en data.js.`);
  }

  const pronosticos = [];

  lineas.forEach((linea) => {
    const partidoParseado = parsearLineaPartido(linea);

    if (!partidoParseado) {
      return;
    }

    if (!fecha) {
      errores.push(`No se pudo asociar el partido "${linea}" porque falta una fecha válida.`);
      return;
    }

    const busqueda = buscarPartidoPorEquipos(fecha, partidoParseado.equipoLocal, partidoParseado.equipoVisitante);

    if (!busqueda) {
      errores.push(`No se pudo reconocer el partido: "${linea}".`);
      return;
    }

    const golesLocal = busqueda.invertido ? partidoParseado.golesVisitante : partidoParseado.golesLocal;
    const golesVisitante = busqueda.invertido ? partidoParseado.golesLocal : partidoParseado.golesVisitante;
    const pronosticoAvanza = busqueda.invertido
      ? invertirGanadorMensaje(partidoParseado.pronosticoAvanza)
      : partidoParseado.pronosticoAvanza;

    if (busqueda.invertido) {
      advertencias.push(`Se detectó el partido invertido en "${linea}" y se acomodó al orden oficial.`);
    }

    pronosticos.push({
      partido: busqueda.partido,
      golesLocal,
      golesVisitante,
      pronosticoAvanza: pronosticoAvanza || null,
      lineaOriginal: linea
    });
  });

  if (!pronosticos.length && texto.trim()) {
    errores.push("No se detectaron partidos en el mensaje.");
  }

  return {
    fecha,
    nombreFecha,
    participante,
    pronosticos,
    errores,
    advertencias
  };
}

function parsearLineaPartido(linea) {
  const lineaLimpia = limpiarLineaPartido(linea);
  const coincidencia = lineaLimpia.match(/^(.+?)\s+([0-9])\s*-\s*([0-9])\s+(.+)$/);

  if (!coincidencia) {
    return null;
  }

  const equipoLocal = coincidencia[1].trim();
  const equipoVisitante = coincidencia[4].trim();

  return {
    equipoLocal: limpiarMarcaGanadorMensaje(equipoLocal),
    golesLocal: Number(coincidencia[2]),
    golesVisitante: Number(coincidencia[3]),
    equipoVisitante: limpiarMarcaGanadorMensaje(equipoVisitante),
    pronosticoAvanza: equipoLocal.startsWith("*")
      ? "local"
      : (equipoVisitante.startsWith("*") ? "visitante" : "")
  };
}

function limpiarMarcaGanadorMensaje(texto) {
  return String(texto || "").replace(/^\*\s*/, "").trim();
}

function invertirGanadorMensaje(ganador) {
  if (ganador === "local") {
    return "visitante";
  }

  if (ganador === "visitante") {
    return "local";
  }

  return "";
}

function limpiarLineaPartido(linea) {
  return String(linea || "")
    .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function limpiarValorEncabezado(linea, clave) {
  const indice = normalizarTexto(linea).indexOf(`${clave}:`);

  if (indice === -1) {
    return "";
  }

  const posicionDosPuntos = linea.indexOf(":");

  if (posicionDosPuntos === -1) {
    return "";
  }

  return linea.slice(posicionDosPuntos + 1).trim();
}

function normalizarTexto(texto) {
  return quitarTildes(String(texto || ""))
    .toLowerCase()
    .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, " ")
    .replace(/[^\p{L}\p{N}:\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function quitarTildes(texto) {
  return String(texto || "")
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buscarFechaPorNombre(nombreFecha) {
  const normalizada = normalizarTexto(nombreFecha);

  if (!normalizada) {
    return null;
  }

  return FECHAS.find((fecha) => {
    const nombreNormalizado = normalizarTexto(fecha.nombre);
    const faseNormalizada = normalizarTexto(`${fecha.nombre} ${fecha.fase}`);
    return nombreNormalizado === normalizada
      || faseNormalizada === normalizada
      || normalizada.includes(nombreNormalizado)
      || nombreNormalizado.includes(normalizada);
  }) || null;
}

function buscarPartidoPorEquipos(fecha, equipoLocal, equipoVisitante) {
  const localNormalizado = normalizarNombreEquipo(equipoLocal);
  const visitanteNormalizado = normalizarNombreEquipo(equipoVisitante);
  const partidos = ordenarPartidosPorFechaYHora(fecha.partidos);

  const directo = partidos.find((partido) => {
    return normalizarNombreEquipo(partido.local.nombre) === localNormalizado
      && normalizarNombreEquipo(partido.visitante.nombre) === visitanteNormalizado;
  });

  if (directo) {
    return {
      partido: directo,
      invertido: false
    };
  }

  const invertido = partidos.find((partido) => {
    return normalizarNombreEquipo(partido.local.nombre) === visitanteNormalizado
      && normalizarNombreEquipo(partido.visitante.nombre) === localNormalizado;
  });

  if (invertido) {
    return {
      partido: invertido,
      invertido: true
    };
  }

  return null;
}

function normalizarNombreEquipo(nombre) {
  return normalizarTexto(nombre)
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parsearMultiplesMensajes(texto, opciones = {}) {
  const bloques = separarBloquesMensajes(texto);
  const advertencias = [];
  const mensajes = bloques.map((bloque, indice) => {
    const mensaje = parsearMensajePronostico(bloque, opciones);
    mensaje.indice = indice;
    mensaje.textoOriginal = bloque;
    return mensaje;
  });

  if (!bloques.length && String(texto || "").trim()) {
    advertencias.push("No se pudo separar ningún mensaje.");
  }

  return {
    mensajes,
    advertencias
  };
}

function separarBloquesMensajes(texto) {
  const lineas = String(texto || "").replace(/\r/g, "").split("\n");
  const bloques = [];
  let actual = [];
  let actualTieneFecha = false;
  let actualTieneParticipante = false;
  let actualTienePartidos = false;
  const nombreProdeNormalizado = normalizarTexto(CONFIG.nombreProde);

  lineas.forEach((linea) => {
    const normalizada = normalizarTexto(linea);
    const esTitulo = normalizada && normalizada.includes(nombreProdeNormalizado);
    const esFecha = normalizada.startsWith("fecha:") || normalizada.includes(" fecha:");
    const esParticipante = normalizada.startsWith("participante:") || normalizada.includes(" participante:");
    const esPartido = Boolean(parsearLineaPartido(linea));
    const empiezaNuevoMensaje = actual.length > 0 && (
      esTitulo
      || (esFecha && actualTieneFecha && (actualTieneParticipante || actualTienePartidos))
      || (esParticipante && actualTieneParticipante && actualTienePartidos)
    );

    if (empiezaNuevoMensaje) {
      bloques.push(actual.join("\n").trim());
      actual = [];
      actualTieneFecha = false;
      actualTieneParticipante = false;
      actualTienePartidos = false;
    }

    actual.push(linea);
    actualTieneFecha = actualTieneFecha || esFecha;
    actualTieneParticipante = actualTieneParticipante || esParticipante;
    actualTienePartidos = actualTienePartidos || esPartido;
  });

  if (actual.join("").trim()) {
    bloques.push(actual.join("\n").trim());
  }

  return bloques.filter(Boolean);
}

function renderizarCrucesTabla() {
  const copaOro = obtenerCrucesCopaOroCalculados();

  renderizarListaCrucesCalculados("cruces-oro-16avos", copaOro.dieciseisavos, "16avos");
  renderizarListaCrucesCalculados("cruces-oro-octavos", copaOro.octavos, "Octavos");
  prepararRondaDinamica(".fase-cuartos", "Ganadores de octavos - 8 partidos de octavos");
  renderizarListaCrucesPorSelector(".fase-cuartos .cruces-grid", copaOro.cuartos, "Cuartos");
  prepararRondaDinamica(".fase-semifinales", "Ganadores de cuartos - 4 partidos de cuartos");
  renderizarListaCrucesPorSelector(".fase-semifinales .cruces-grid", copaOro.semis, "Semifinales");
  prepararRondaDinamica(".fase-tercer-puesto", "Perdedores de semifinales");
  renderizarListaCrucesPorSelector(".fase-tercer-puesto .cruces-grid", copaOro.tercerPuesto, "Tercer puesto");
  prepararRondaDinamica(".fase-final", "Ganadores de semifinales");
  renderizarListaCrucesPorSelector(".fase-final .cruces-grid", copaOro.final, "Final");
}

function prepararRondaDinamica(selector, subtitulo) {
  const ronda = document.querySelector(selector);
  const subtituloElemento = ronda ? ronda.querySelector(".ronda-cruces-titulo.sub span") : null;

  if (!ronda) {
    return;
  }

  ronda.classList.remove("fase-pendiente");

  if (subtituloElemento) {
    subtituloElemento.textContent = subtitulo;
  }
}

function obtenerCrucesCopaOroCalculados() {
  const dieciseisavos = CRUCES_ORO_16AVOS.map((cruce) => calcularCrucePronosticos(cruce));
  const octavos = obtenerCrucesOroOctavosConClasificados().map((cruce) => calcularCrucePronosticos(cruce));
  // Copa Oro usa los 8 partidos de Octavos del Mundial para cuartos de copa.
  const cuartos = crearCrucesDesdeGanadoresCalculados(octavos, {
    fechaId: "octavos",
    partidoInicio: 1,
    partidoFin: 8
  });
  const semis = crearCrucesDesdeGanadoresCalculados(cuartos, {
    fechaId: "cuartos",
    partidoInicio: 1,
    partidoFin: 4
  });
  const tercerPuesto = crearCrucesDesdePerdedoresCalculados(semis, {
    fechaId: "final",
    partidoInicio: 1,
    partidoFin: 1
  });
  const final = crearCrucesDesdeGanadoresCalculados(semis, {
    fechaId: "final",
    partidoInicio: 1,
    partidoFin: 4
  });

  return {
    dieciseisavos,
    octavos,
    cuartos,
    semis,
    tercerPuesto,
    final
  };
}

function crearCrucesDesdeGanadoresCalculados(crucesPrevios, datosRonda) {
  const cantidadCruces = Math.max(1, Math.ceil(crucesPrevios.length / 2));

  return Array.from({ length: cantidadCruces }, (_, indice) => {
    const local = obtenerGanadorCruceCalculado(crucesPrevios[indice * 2]) || "Por definir";
    const visitante = obtenerGanadorCruceCalculado(crucesPrevios[(indice * 2) + 1]) || "Por definir";

    return calcularCrucePronosticos({
      numero: indice + 1,
      local,
      visitante,
      fechaId: datosRonda.fechaId,
      partidoInicio: datosRonda.partidoInicio,
      partidoFin: datosRonda.partidoFin
    });
  });
}

function crearCrucesDesdePerdedoresCalculados(crucesPrevios, datosRonda) {
  if (!crucesPrevios.length) {
    return [];
  }

  return [
    calcularCrucePronosticos({
      numero: 1,
      local: obtenerPerdedorCruceCalculado(crucesPrevios[0]) || "Por definir",
      visitante: obtenerPerdedorCruceCalculado(crucesPrevios[1]) || "Por definir",
      fechaId: datosRonda.fechaId,
      partidoInicio: datosRonda.partidoInicio,
      partidoFin: datosRonda.partidoFin
    })
  ];
}

function obtenerCrucesOroOctavosConClasificados() {
  const cruces16 = CRUCES_ORO_16AVOS.map((cruce) => calcularCrucePronosticos(cruce));

  return CRUCES_ORO_OCTAVOS.map((cruce) => ({
    ...cruce,
    visitante: obtenerClasificadoParaSlot(cruce.visitante, cruces16)
  }));
}

function renderizarListaCruces(contenedorId, cruces, ronda) {
  const contenedor = document.getElementById(contenedorId);

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";
  cruces.forEach((cruce) => {
    contenedor.appendChild(crearTarjetaCruce(cruce, ronda));
  });
}

function renderizarListaCrucesCalculados(contenedorId, crucesCalculados, ronda) {
  const contenedor = document.getElementById(contenedorId);

  if (!contenedor) {
    return;
  }

  renderizarCrucesCalculadosEnContenedor(contenedor, crucesCalculados, ronda);
}

function renderizarListaCrucesPorSelector(selector, crucesCalculados, ronda) {
  const contenedor = document.querySelector(selector);

  if (!contenedor) {
    return;
  }

  renderizarCrucesCalculadosEnContenedor(contenedor, crucesCalculados, ronda);
}

function renderizarCrucesCalculadosEnContenedor(contenedor, crucesCalculados, ronda) {
  contenedor.classList.remove("cruces-grid-pendientes");
  contenedor.innerHTML = "";

  crucesCalculados.forEach((calculo) => {
    contenedor.appendChild(crearTarjetaCruceDesdeCalculo(calculo, ronda));
  });
}

function crearTarjetaCruce(cruce, ronda) {
  return crearTarjetaCruceDesdeCalculo(calcularCrucePronosticos(cruce), ronda);
}

function crearTarjetaCruceDesdeCalculo(calculo, ronda) {
  const tarjeta = document.createElement("article");
  const encabezado = document.createElement("div");
  const pie = document.createElement("div");
  const cruce = calculo.cruce;
  const etiquetaPartidos = obtenerEtiquetaPartidosCruce(calculo);
  const textosMeta = [
    etiquetaPartidos,
    calculo.ganadorPorTabla ? "Desempate tabla general" : ""
  ].filter(Boolean);

  tarjeta.className = `cruce-card estado-${calculo.estado}${calculo.ganadorPorTabla ? " desempate" : ""}`;
  encabezado.className = "cruce-card-top";
  encabezado.innerHTML = `
    <span>${ronda}</span>
    <strong>Cruce ${cruce.numero}</strong>
  `;

  pie.className = "cruce-card-pie";
  pie.innerHTML = `
    ${textosMeta.map((texto) => `<span>${texto}</span>`).join("")}
  `;

  tarjeta.append(
    encabezado,
    crearVersusCruce(calculo),
    pie
  );

  const detalle = crearDetalleCrucePronosticos(calculo);

  if (detalle) {
    tarjeta.appendChild(detalle);
  }

  return tarjeta;
}

function crearVersusCruce(calculo) {
  const versus = document.createElement("div");
  const motivoGanador = obtenerMotivoGanadorCruce(calculo);

  versus.className = "cruce-versus";
  versus.append(
    crearFilaCruceInformativa(calculo.cruce.local, calculo.local, calculo.ganador === "local", motivoGanador),
    crearMarcadorCruce(calculo),
    crearFilaCruceInformativa(calculo.cruce.visitante, calculo.visitante, calculo.ganador === "visitante", motivoGanador)
  );
  return versus;
}

function crearMarcadorCruce(calculo) {
  const marcador = document.createElement("div");
  const etiqueta = document.createElement("span");
  const resultado = document.createElement("div");
  const local = document.createElement("strong");
  const separador = document.createElement("span");
  const visitante = document.createElement("strong");

  marcador.className = "cruce-marcador";
  etiqueta.className = "cruce-marcador-label";
  etiqueta.textContent = calculo.ganador ? "PTS" : "VS";
  resultado.className = "cruce-marcador-resultado";
  local.textContent = calculo.local.esSlotPendiente || !calculo.partidos.length ? "-" : calculo.local.total;
  separador.textContent = "-";
  visitante.textContent = calculo.visitante.esSlotPendiente || !calculo.partidos.length ? "-" : calculo.visitante.total;
  resultado.append(local, separador, visitante);
  marcador.append(etiqueta, resultado);
  return marcador;
}

function crearFilaCruceInformativa(nombre, datos = null, esGanador = false, motivoGanador = "") {
  const fila = document.createElement("div");
  const texto = String(nombre || "Por definir");
  const esPendiente = esTextoCrucePendiente(texto);
  const contenido = document.createElement("div");
  const escudoMarco = document.createElement("span");
  const posicion = obtenerPosicionGeneralCruce(texto);
  const metadatos = [];

  if (!esPendiente && Number.isFinite(posicion)) {
    metadatos.push(`${posicion}°`);
  }

  if (esGanador) {
    metadatos.push(motivoGanador || "Clasifica");
  }

  fila.className = `cruce-equipo${esPendiente ? " pendiente" : ""}${esGanador ? " ganador" : ""}`;
  escudoMarco.className = "cruce-escudo-marco";

  if (esPendiente) {
    escudoMarco.classList.add("cruce-escudo-placeholder");
    escudoMarco.textContent = "?";
  } else {
    const escudo = document.createElement("img");
    escudo.className = "cruce-escudo";
    escudo.alt = "";
    escudo.src = obtenerRutaEscudoParticipante(texto);
    escudo.onerror = () => {
      escudoMarco.classList.add("cruce-escudo-placeholder");
      escudoMarco.textContent = "?";
      escudo.remove();
    };
    escudoMarco.appendChild(escudo);
  }

  contenido.className = "cruce-equipo-nombre";
  contenido.innerHTML = `
    <strong>${texto}</strong>
    ${metadatos.length ? `<span>${metadatos.join(" · ")}</span>` : ""}
  `;
  fila.append(escudoMarco, contenido);
  return fila;
}

function obtenerEtiquetaPartidosCruce(calculo) {
  if (!calculo.fecha || !calculo.partidos.length) {
    return "";
  }

  const inicio = Math.max(1, Number(calculo.cruce.partidoInicio) || 1);
  const fin = Math.min(calculo.fecha.partidos.length, Number(calculo.cruce.partidoFin) || calculo.fecha.partidos.length);
  const rango = inicio === fin ? `P${inicio}` : `P${inicio}-${fin}`;

  return `${calculo.fecha.nombre} · ${rango}`;
}

function obtenerMotivoGanadorCruce(calculo) {
  if (!calculo.ganador) {
    return "";
  }

  return calculo.ganadorPorTabla ? "Clasifica por tabla" : "Clasifica";
}

function calcularCrucePronosticos(cruce) {
  const { fecha, partidos } = obtenerPartidosParaCruce(cruce);
  const local = calcularParticipanteCruce(cruce.local, cruce.fechaId, partidos);
  const visitante = calcularParticipanteCruce(cruce.visitante, cruce.fechaId, partidos);
  const haySlotPendiente = local.esSlotPendiente || visitante.esSlotPendiente;
  const resultadosCompletos = partidos.length > 0 && partidos.every((partido) => {
    const oficial = obtenerResultadoOficial(partido.id);
    return !esResultadoOficialPendiente(oficial);
  });
  let estado = "pendiente";
  let estadoTexto = "Por definir";
  let ganador = "";
  let ganadorPorTabla = false;

  if (!fecha) {
    estadoTexto = "Fecha por cargar";
  } else if (!partidos.length) {
    estadoTexto = "Sin partidos";
  } else if (haySlotPendiente) {
    estadoTexto = "Por definir";
  } else if (!resultadosCompletos) {
    estadoTexto = !local.enviado || !visitante.enviado ? "Faltan pronósticos" : "Esperando oficiales";
  } else if (local.total === visitante.total) {
    ganador = obtenerGanadorEmpatePorTabla(cruce.local, cruce.visitante);
    ganadorPorTabla = Boolean(ganador);
    estado = ganador ? "definido desempate" : "empate";
    estadoTexto = ganador ? "Desempate tabla general" : "Empate";
  } else {
    ganador = local.total > visitante.total ? "local" : "visitante";
    estado = "definido";
    estadoTexto = "Definido";
  }

  return {
    cruce,
    fecha,
    partidos,
    local,
    visitante,
    estado,
    estadoTexto,
    ganador,
    ganadorPorTabla
  };
}

function obtenerGanadorEmpatePorTabla(nombreLocal, nombreVisitante) {
  const posicionLocal = obtenerPosicionGeneralCruce(nombreLocal);
  const posicionVisitante = obtenerPosicionGeneralCruce(nombreVisitante);

  if (!Number.isFinite(posicionLocal) && !Number.isFinite(posicionVisitante)) {
    return "";
  }

  if (posicionLocal === posicionVisitante) {
    return "";
  }

  return posicionLocal < posicionVisitante ? "local" : "visitante";
}

function obtenerPosicionGeneralCruce(nombre) {
  const clave = normalizarTexto(nombre);

  if (!clave) {
    return Number.POSITIVE_INFINITY;
  }

  return obtenerMapaPosicionesGeneralesCruces().get(clave) || Number.POSITIVE_INFINITY;
}

function obtenerMapaPosicionesGeneralesCruces() {
  if (cachePosicionesGeneralesCruces) {
    return cachePosicionesGeneralesCruces;
  }

  const tablaGeneral = generarTablaPosiciones("general");

  cachePosicionesGeneralesCruces = new Map(tablaGeneral.filas.map((fila) => [
    normalizarTexto(fila.participante),
    fila.posicion
  ]));

  return cachePosicionesGeneralesCruces;
}

function calcularParticipanteCruce(nombre, fechaId, partidos) {
  const texto = String(nombre || "Por definir");
  const esSlotPendiente = esTextoCrucePendiente(texto);
  const base = {
    nombre: texto,
    esSlotPendiente,
    enviado: false,
    total: 0,
    plenos: 0,
    parciales: 0,
    errores: 0,
    pendientes: 0,
    noCargados: 0,
    detalles: []
  };

  if (esSlotPendiente || !fechaId || !partidos.length) {
    return base;
  }

  const mensaje = obtenerMensajePronosticoCruce(texto, fechaId);
  const pronosticosPorPartido = new Map();

  if (mensaje) {
    mensaje.pronosticos.forEach((pronostico) => {
      pronosticosPorPartido.set(pronostico.partido.id, pronostico);
    });
    base.enviado = true;
  }

  partidos.forEach((partido) => {
    const pronostico = pronosticosPorPartido.get(partido.id) || null;
    const oficial = obtenerResultadoOficial(partido.id);

    if (!pronostico) {
      base.noCargados += 1;
      base.detalles.push({
        partido,
        pronostico: null,
        oficial,
        estado: "sin-envio",
        descripcion: "No mandó",
        puntos: 0,
        extra: 0,
        resultadoOficialTexto: formatearResultadoOficial(partido, oficial)
      });
      return;
    }

    const puntaje = calcularPuntosPartido(pronostico, oficial);
    const puntosTotales = puntaje.puntos + (puntaje.extra || 0);

    base.total += puntosTotales;
    base.plenos += puntaje.estado === "pleno" ? 1 : 0;
    base.parciales += puntaje.estado === "parcial" ? 1 : 0;
    base.errores += puntaje.estado === "error" ? 1 : 0;
    base.pendientes += puntaje.estado === "pendiente" ? 1 : 0;
    base.detalles.push({
      partido,
      pronostico,
      oficial,
      estado: puntaje.estado,
      descripcion: puntaje.descripcion,
      puntos: puntaje.puntos,
      extra: puntaje.extra || 0,
      resultadoOficialTexto: formatearResultadoOficial(partido, oficial)
    });
  });

  return base;
}

function obtenerMensajePronosticoCruce(participante, fechaId) {
  const carga = obtenerMensajesCrucesHardcodeados();
  return carga.mensajes.get(crearClaveMensajeCruce(participante, fechaId)) || null;
}

function obtenerMensajesCrucesHardcodeados() {
  if (cacheMensajesCrucesHardcodeados) {
    return cacheMensajesCrucesHardcodeados;
  }

  const parseo = parsearMultiplesMensajes(obtenerTextoPronosticosHardcodeados());
  const mensajes = new Map();

  parseo.mensajes.forEach((mensaje) => {
    if (!mensaje.fecha || !mensaje.participante) {
      return;
    }

    mensajes.set(crearClaveMensajeCruce(mensaje.participante, mensaje.fecha.id), mensaje);
  });

  cacheMensajesCrucesHardcodeados = {
    mensajes,
    advertencias: parseo.advertencias
  };

  return cacheMensajesCrucesHardcodeados;
}

function crearClaveMensajeCruce(participante, fechaId) {
  return `${normalizarTexto(participante)}__${fechaId}`;
}

function obtenerPartidosParaCruce(cruce) {
  const fecha = FECHAS.find((fechaItem) => fechaItem.id === cruce.fechaId) || null;

  if (!fecha) {
    return {
      fecha: null,
      partidos: []
    };
  }

  const inicio = Math.max(1, Number(cruce.partidoInicio) || 1);
  const fin = Math.min(fecha.partidos.length, Number(cruce.partidoFin) || fecha.partidos.length);

  return {
    fecha,
    partidos: fecha.partidos.slice(inicio - 1, fin)
  };
}

function esResultadoOficialPendiente(oficial) {
  return !oficial
    || oficial.golesLocal === null
    || oficial.golesVisitante === null
    || oficial.golesLocal === undefined
    || oficial.golesVisitante === undefined;
}

function crearDetalleCrucePronosticos(calculo) {
  if (!calculo.partidos.length || calculo.local.esSlotPendiente || calculo.visitante.esSlotPendiente) {
    return null;
  }

  const detalle = document.createElement("details");
  const resumen = document.createElement("summary");
  const lista = document.createElement("div");

  detalle.className = "cruce-detalle";
  resumen.textContent = "Ver pronósticos";
  lista.className = "cruce-detalle-lista";
  lista.append(
    crearColumnaDetalleCruce(calculo.local),
    crearColumnaDetalleCruce(calculo.visitante)
  );

  detalle.append(resumen, lista);
  return detalle;
}

function crearColumnaDetalleCruce(participante) {
  const columna = document.createElement("section");
  const encabezado = document.createElement("div");
  const lista = document.createElement("div");

  columna.className = "cruce-detalle-columna";
  encabezado.className = "cruce-detalle-columna-top";
  encabezado.innerHTML = `
    <span>${participante.nombre}</span>
    <strong>${participante.total} pts</strong>
  `;
  lista.className = "cruce-pronostico-lista";

  participante.detalles.forEach((item) => {
    lista.appendChild(crearPronosticoDetalleCruce(item));
  });

  columna.append(encabezado, lista);
  return columna;
}

function crearPronosticoDetalleCruce(item) {
  const fila = document.createElement("article");
  const texto = document.createElement("div");
  const puntos = document.createElement("strong");

  fila.className = `cruce-pronostico-item estado-${item ? item.estado : "sin-envio"}`;
  texto.innerHTML = `
    <b>${item && item.pronostico ? formatearPronosticoCruce(item.partido, item.pronostico) : "No mandó"}</b>
    <span>${item ? item.resultadoOficialTexto : "Oficial: No cargado"}</span>
  `;
  puntos.textContent = item && item.extra ? `${item.puntos}+${item.extra}` : String(item ? item.puntos : 0);
  fila.append(texto, puntos);
  return fila;
}

function formatearPronosticoCruce(partido, pronostico) {
  const ganador = obtenerGanadorPenalesResultado(pronostico);
  const marcaLocal = ganador === "local" ? "*" : "";
  const marcaVisitante = ganador === "visitante" ? "*" : "";

  return `${marcaLocal}${partido.local.nombre} ${pronostico.golesLocal} - ${pronostico.golesVisitante} ${marcaVisitante}${partido.visitante.nombre}`;
}

function esTextoCrucePendiente(texto) {
  const valor = String(texto || "Por definir");
  return valor === "Por definir" || valor.startsWith("Ganador ") || valor.startsWith("Perdedor ");
}

function generarTablaPosiciones(vistaTabla = obtenerVistaTablaSeleccionada()) {
  const textoPartidos = obtenerTextoPronosticosHardcodeados();
  const textoGrupos = obtenerTextoPronosticosGruposHardcodeados();
  const advertencias = [];
  const cargaOficial = obtenerCargaResultadosOficialesHardcodeados();
  const cargaGruposOficiales = obtenerCargaGruposOficialesHardcodeados();
  const vistaNormalizada = normalizarVistaTabla(vistaTabla);

  if (!textoPartidos.trim() && !textoGrupos.trim()) {
    return {
      filas: [],
      advertencias: ["Carga uno o mas mensajes en Resultados.js antes de generar la tabla."],
      vista: vistaNormalizada
    };
  }

  advertencias.push(...cargaOficial.advertencias);
  advertencias.push(...cargaGruposOficiales.advertencias);

  if (textoPartidos.trim() && !Object.keys(cargaOficial.resultados).length) {
    advertencias.push("No hay resultados oficiales cargados en Resultados.js. Los partidos sin resultado figuran como no cargados.");
  }

  if (textoGrupos.trim() && !Object.keys(cargaGruposOficiales.grupos).length) {
    advertencias.push("No hay posiciones oficiales de grupos cargadas en Resultados.js. Los grupos figuran como no cargados.");
  }

  const parseoMultiple = parsearMultiplesMensajes(textoPartidos);
  const mensajesPartidos = [];

  advertencias.push(...parseoMultiple.advertencias);

  parseoMultiple.mensajes.forEach((mensaje) => {
    advertencias.push(...mensaje.errores, ...mensaje.advertencias);

    if (!mensaje.fecha || !mensaje.participante) {
      return;
    }

    mensajesPartidos.push(mensaje);
  });

  const parseoGrupos = parsearMultiplesMensajesGrupos(textoGrupos, { requiereParticipante: true });
  const mensajesGrupos = [];

  advertencias.push(...parseoGrupos.advertencias);

  parseoGrupos.mensajes.forEach((mensaje) => {
    advertencias.push(...mensaje.errores, ...mensaje.advertencias);

    if (!mensaje.participante || !Object.keys(mensaje.grupos).length) {
      return;
    }

    mensajesGrupos.push(mensaje);
  });

  const mensajesPartidosTablaGeneral = mensajesPartidos.filter((mensaje) => esFechaTablaGeneral(mensaje.fecha && mensaje.fecha.id));

  const filasGeneral = construirFilasTabla({
    mensajesPartidos: mensajesPartidosTablaGeneral,
    mensajesGrupos,
    cargaGruposOficiales,
    filtroFecha: "__todas__",
    incluirGrupos: true,
    fechasEsperadas: obtenerFechasEsperadasTabla("general", mensajesPartidosTablaGeneral, cargaOficial.resultados),
    advertencias,
    registrarDuplicados: true
  });
  const filasVista = vistaNormalizada === "general"
    ? filasGeneral
    : construirFilasTabla({
      mensajesPartidos: vistaNormalizada === "grupos" ? [] : mensajesPartidos,
      mensajesGrupos,
      cargaGruposOficiales,
      filtroFecha: vistaNormalizada,
      incluirGrupos: vistaNormalizada === "grupos",
      fechasEsperadas: obtenerFechasEsperadasTabla(vistaNormalizada, mensajesPartidos, cargaOficial.resultados),
      advertencias,
      registrarDuplicados: false
    });
  const posicionesGeneral = new Map(filasGeneral.map((fila) => [fila.clave, fila.posicion]));
  const filas = filasVista.map((fila) => {
    const posicionGeneral = posicionesGeneral.get(fila.clave) || fila.posicion;

    return {
      ...fila,
      posicionGeneral,
      zonaClasificacion: obtenerZonaClasificacionTabla(posicionGeneral)
    };
  });

  return {
    filas,
    advertencias,
    vista: vistaNormalizada
  };
}

function construirFilasTabla(opciones) {
  const {
    mensajesPartidos,
    mensajesGrupos,
    cargaGruposOficiales,
    filtroFecha,
    incluirGrupos,
    fechasEsperadas,
    advertencias,
    registrarDuplicados
  } = opciones;
  const mensajesPorClave = new Map();
  const gruposPorParticipante = new Map();
  const acumulados = new Map();

  PARTICIPANTES.forEach((participante) => {
    obtenerAcumuladoTabla(acumulados, participante);
  });

  mensajesPartidos.forEach((mensaje) => {
    if (filtroFecha !== "__todas__" && mensaje.fecha.id !== filtroFecha) {
      return;
    }

    const clave = normalizarTexto(mensaje.participante) + "__" + mensaje.fecha.id;

    if (mensajesPorClave.has(clave) && registrarDuplicados) {
      advertencias.push("Se detecto mas de un pronostico para " + mensaje.participante + " en " + mensaje.fecha.nombre + ". Se uso el ultimo.");
    }

    mensajesPorClave.set(clave, mensaje);
  });

  mensajesPorClave.forEach((mensaje) => {
    const calculo = calcularPronosticoCompleto(mensaje);
    const acumulado = obtenerAcumuladoTabla(acumulados, mensaje.participante);

    if (registrarDuplicados) {
      advertencias.push(...calculo.advertencias);
    }

    acumulado.puntos += calculo.total;
    acumulado.puntosPartidos += calculo.puntosPartidos;
    acumulado.puntosPenales += calculo.extrasPenales;
    acumulado.plenos += calculo.plenos;
    acumulado.parciales += calculo.parciales;
    acumulado.errores += calculo.errores;
    acumulado.pendientes += calculo.pendientes;
    acumulado.fechas.add(mensaje.fecha.nombre);
    acumulado.detalles.push(...calculo.filas);
  });

  acumulados.forEach((acumulado) => {
    acumulado.noMandados = calcularPartidosNoMandados(acumulado.participante, fechasEsperadas, mensajesPorClave);
  });

  if (incluirGrupos) {
    mensajesGrupos.forEach((mensaje) => {
      const claveParticipante = normalizarTexto(mensaje.participante);

      if (gruposPorParticipante.has(claveParticipante) && registrarDuplicados) {
        advertencias.push("Se detecto mas de un pronostico de grupos para " + mensaje.participante + ". Se uso el ultimo.");
      }

      gruposPorParticipante.set(claveParticipante, mensaje);
    });

    gruposPorParticipante.forEach((mensaje) => {
      const calculo = calcularPronosticoGruposHardcodeado(mensaje, cargaGruposOficiales.grupos);
      const acumulado = obtenerAcumuladoTabla(acumulados, mensaje.participante);

      acumulado.puntos += calculo.puntos;
      acumulado.puntosGrupos += calculo.puntos;
      acumulado.gruposAciertos += calculo.aciertos;
      acumulado.gruposErrores += calculo.errores;
      acumulado.gruposPendientes += calculo.pendientes;
      acumulado.detalleGrupos = calculo.detalle;
    });
  }

  return Array.from(acumulados.values())
    .map((fila) => ({
      ...fila,
      fechasTexto: Array.from(fila.fechas).join(", ") || "Sin fechas"
    }))
    .sort(ordenarTablaPosiciones)
    .map((fila, indice) => ({
      ...fila,
      posicion: indice + 1
    }));
}

function obtenerVistaTablaSeleccionada() {
  const selector = document.getElementById("selector-vista-tabla");
  return normalizarVistaTabla(selector ? selector.value : "general");
}

function normalizarVistaTabla(vista) {
  return ["general", "fecha-1", "fecha-2", "fecha-3", "grupos"].includes(vista) ? vista : "general";
}

function esFechaTablaGeneral(fechaId) {
  return IDS_FECHAS_TABLA_GENERAL.includes(fechaId);
}

function obtenerNombreVistaTabla(vista) {
  const nombres = {
    general: "General",
    "fecha-1": "Fecha 1",
    "fecha-2": "Fecha 2",
    "fecha-3": "Fecha 3",
    grupos: "Solo grupos"
  };

  return nombres[normalizarVistaTabla(vista)] || nombres.general;
}

function obtenerFechasEsperadasTabla(vista, mensajesPartidos, resultadosOficiales) {
  const vistaNormalizada = normalizarVistaTabla(vista);

  if (vistaNormalizada === "grupos") {
    return [];
  }

  if (vistaNormalizada !== "general") {
    const fecha = FECHAS.find((item) => item.id === vistaNormalizada);
    return fecha ? [fecha] : [];
  }

  return FECHAS.filter((fecha) => esFechaTablaGeneral(fecha.id));
}

function obtenerFechaPorPartidoId(partidoId) {
  return FECHAS.find((fecha) => fecha.partidos.some((partido) => partido.id === partidoId)) || null;
}

function calcularPartidosNoMandados(participante, fechasEsperadas, mensajesPorClave) {
  const claveParticipante = normalizarTexto(participante);

  return fechasEsperadas.reduce((total, fecha) => {
    const mensaje = mensajesPorClave.get(`${claveParticipante}__${fecha.id}`);
    const partidosEnviados = new Set((mensaje ? mensaje.pronosticos : []).map((pronostico) => pronostico.partido.id));
    const faltantes = fecha.partidos.filter((partido) => !partidosEnviados.has(partido.id)).length;

    return total + faltantes;
  }, 0);
}

function obtenerZonaClasificacionTabla(posicionGeneral) {
  if (posicionGeneral >= 1 && posicionGeneral <= 8) {
    return "octavos";
  }

  if (posicionGeneral >= 9 && posicionGeneral <= 24) {
    return "dieciseisavos";
  }

  return "";
}

function obtenerAcumuladoTabla(acumulados, participante) {
  const claveParticipante = normalizarTexto(participante);

  if (!acumulados.has(claveParticipante)) {
    acumulados.set(claveParticipante, {
      clave: claveParticipante,
      participante,
      puntos: 0,
      puntosPartidos: 0,
      puntosPenales: 0,
      puntosGrupos: 0,
      plenos: 0,
      parciales: 0,
      errores: 0,
      pendientes: 0,
      noMandados: 0,
      gruposAciertos: 0,
      gruposErrores: 0,
      gruposPendientes: 0,
      fechas: new Set(),
      detalles: [],
      detalleGrupos: []
    });
  }

  return acumulados.get(claveParticipante);
}

function ordenarTablaPosiciones(a, b) {
  if (b.puntos !== a.puntos) {
    return b.puntos - a.puntos;
  }

  if (b.plenos !== a.plenos) {
    return b.plenos - a.plenos;
  }

  if (b.parciales !== a.parciales) {
    return b.parciales - a.parciales;
  }

  if (b.gruposAciertos !== a.gruposAciertos) {
    return b.gruposAciertos - a.gruposAciertos;
  }

  if (a.errores !== b.errores) {
    return a.errores - b.errores;
  }

  return a.participante.localeCompare(b.participante, "es");
}

function renderizarTablaPosicionesAnterior(resultado) {
  const contenedor = document.getElementById("tabla-posiciones");
  const contenedorAdvertencias = document.getElementById("advertencias-tabla");
  contenedor.innerHTML = "";

  if (!resultado.filas.length) {
    const vacio = document.createElement("p");
    vacio.className = "mensaje-estado info";
    vacio.textContent = "No hay pronósticos válidos para generar la tabla.";
    contenedor.appendChild(vacio);
    renderizarAdvertencias(contenedorAdvertencias, resultado.advertencias);
    return;
  }

  const tabla = document.createElement("table");
  tabla.className = "tabla-posiciones";
  tabla.innerHTML = `
    <colgroup>
      <col class="col-pos">
      <col class="col-participante">
      <col class="col-puntos">
      <col class="col-plenos">
      <col class="col-par">
      <col class="col-err">
      <col class="col-nc">
      <col class="col-ext">
    </colgroup>
    <thead>
      <tr>
        <th>Posición</th>
        <th>Participante</th>
        <th>Puntos totales</th>
        <th>Plenos</th>
        <th>Parciales</th>
        <th>Errores</th>
        <th>No cargados</th>
        <th>Fechas cargadas</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const cuerpo = tabla.querySelector("tbody");

  resultado.filas.forEach((fila) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${fila.posicion}</td>
      <td></td>
      <td>${fila.puntos}</td>
      <td>${fila.plenos}</td>
      <td>${fila.parciales}</td>
      <td>${fila.errores}</td>
      <td>${fila.pendientes}</td>
      <td>${fila.fechasTexto}</td>
    `;

    tr.children[1].appendChild(crearDetalleParticipanteAnterior(fila));
    cuerpo.appendChild(tr);
  });

  contenedor.appendChild(tabla);
  renderizarAdvertencias(contenedorAdvertencias, resultado.advertencias);
}

function crearDetalleParticipanteAnterior(fila) {
  const contenedor = document.createElement("div");
  const nombre = document.createElement("strong");
  const detalle = document.createElement("details");
  const resumen = document.createElement("summary");
  const lista = document.createElement("div");

  nombre.textContent = fila.participante;
  detalle.className = "detalle-participante";
  resumen.textContent = "Ver detalle";
  lista.className = "detalle-lista";

  fila.detalles.forEach((item) => {
    const detalleItem = document.createElement("div");
    detalleItem.className = `detalle-item estado-${item.estado}`;
    detalleItem.innerHTML = `
      <strong>${item.fecha.nombre} · ${item.partido.local.nombre} vs ${item.partido.visitante.nombre}</strong>
      <span>Pronóstico: ${item.pronostico.golesLocal} - ${item.pronostico.golesVisitante}</span>
      <span>Oficial: ${item.resultadoOficialTexto}</span>
      <span>${item.descripcion} · +${item.puntos}</span>
    `;
    detalleItem.innerHTML = "";

    const texto = document.createElement("div");
    texto.className = "detalle-partido-texto";

    const pronostico = document.createElement("strong");
    pronostico.textContent = `${item.partido.local.nombre} ${item.pronostico.golesLocal} - ${item.pronostico.golesVisitante} ${item.partido.visitante.nombre}`;

    const oficial = document.createElement("span");
    oficial.textContent = `Oficial: ${item.resultadoOficialTexto}`;

    const puntos = document.createElement("div");
    puntos.className = "detalle-partido-puntos";

    const puntosTotal = item.puntos + (item.extra || 0);
    const valorPuntos = document.createElement("strong");
    valorPuntos.textContent = `+${puntosTotal}`;

    const descripcion = document.createElement("span");
    descripcion.textContent = item.extra
      ? `${item.descripcion} + clasificacion`
      : item.descripcion;

    texto.append(pronostico, oficial);
    puntos.append(valorPuntos, descripcion);
    detalleItem.append(texto, puntos);
    lista.appendChild(detalleItem);
  });

  detalle.append(resumen, lista);
  contenedor.append(nombre, detalle);
  return contenedor;
}

function renderizarTablaPosiciones(resultado) {
  const contenedor = document.getElementById("tabla-posiciones");
  const contenedorAdvertencias = document.getElementById("advertencias-tabla");
  const contenedorDetalle = document.getElementById("detalle-tabla");

  ultimoResultadoTabla = resultado;
  ultimaVistaTabla = resultado.vista || "general";
  contenedor.innerHTML = "";
  actualizarTituloTablaExportable(ultimaVistaTabla);

  if (!resultado.filas.length) {
    const vacio = document.createElement("p");
    vacio.className = "mensaje-estado info";
    vacio.textContent = "No hay pronosticos validos para generar la tabla.";
    contenedor.appendChild(vacio);
    participanteDetalleTabla = "";

    if (contenedorDetalle) {
      contenedorDetalle.hidden = true;
      contenedorDetalle.innerHTML = "";
    }

    renderizarAdvertencias(contenedorAdvertencias, resultado.advertencias);
    return;
  }

  const esTablaSoloGrupos = ultimaVistaTabla === "grupos";
  const tabla = document.createElement("table");
  tabla.className = "tabla-posiciones";
  tabla.innerHTML = esTablaSoloGrupos
    ? `
      <thead>
        <tr>
          <th>Pos</th>
          <th>Participante</th>
          <th>PTS</th>
          <th>ACIERTOS</th>
          <th>ERR</th>
          <th>NC</th>
        </tr>
      </thead>
      <tbody></tbody>
    `
    : `
      <thead>
        <tr>
          <th>Pos</th>
          <th>Participante</th>
          <th>PTS</th>
          <th>PLENOS</th>
          <th>PAR</th>
          <th>ERR</th>
          <th>NM</th>
          <th>EXT</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

  const cuerpo = tabla.querySelector("tbody");

  resultado.filas.forEach((fila) => {
    const tr = document.createElement("tr");
    const clasesFila = [];

    if (fila.clave === participanteDetalleTabla) {
      clasesFila.push("fila-seleccionada");
    }

    if (fila.zonaClasificacion) {
      clasesFila.push(`zona-${fila.zonaClasificacion}`);
    }

    tr.className = clasesFila.join(" ");
    tr.innerHTML = esTablaSoloGrupos
      ? `
        <td>${fila.posicion}</td>
        <td></td>
        <td>${fila.puntosGrupos}</td>
        <td>${fila.gruposAciertos}</td>
        <td>${fila.gruposErrores}</td>
        <td>${fila.gruposPendientes}</td>
      `
      : `
        <td>${fila.posicion}</td>
        <td></td>
        <td>${fila.puntos}</td>
        <td>${fila.plenos}</td>
        <td>${fila.parciales}</td>
        <td>${fila.errores}</td>
        <td>${fila.noMandados}</td>
        <td>${fila.puntosGrupos + fila.puntosPenales}</td>
      `;

    tr.children[1].appendChild(crearBotonParticipanteTabla(fila));
    cuerpo.appendChild(tr);
  });

  contenedor.appendChild(tabla);
  renderizarDetalleTablaSeleccionado();
  renderizarAdvertencias(contenedorAdvertencias, resultado.advertencias);
}

function actualizarTituloTablaExportable(vista) {
  const etiquetaVista = document.getElementById("tabla-vista-exportable");

  if (etiquetaVista) {
    etiquetaVista.textContent = obtenerNombreVistaTabla(vista);
  }
}

function crearBotonParticipanteTabla(fila) {
  const boton = document.createElement("button");
  const escudoMarco = document.createElement("span");
  const escudo = document.createElement("img");
  const nombre = document.createElement("span");

  boton.type = "button";
  boton.className = "participante-tabla-boton";
  boton.setAttribute("aria-label", `${fila.clave === participanteDetalleTabla ? "Ocultar" : "Ver"} detalle de ${fila.participante}`);
  boton.setAttribute("aria-expanded", String(fila.clave === participanteDetalleTabla));
  escudoMarco.className = "escudo-participante-marco";
  escudo.className = "escudo-participante";
  escudo.alt = "";
  escudo.src = obtenerRutaEscudoParticipante(fila.participante);
  escudo.onerror = () => {
    escudoMarco.hidden = true;
  };
  escudoMarco.appendChild(escudo);
  nombre.textContent = fila.participante;
  boton.append(escudoMarco, nombre);
  boton.addEventListener("click", () => {
    participanteDetalleTabla = participanteDetalleTabla === fila.clave ? "" : fila.clave;
    renderizarTablaPosiciones(ultimoResultadoTabla);
  });
  return boton;
}

function obtenerRutaEscudoParticipante(participante) {
  const nombresEscudos = {
    "Nico Avalos": "Nico avalos"
  };
  const nombreArchivo = nombresEscudos[participante] || participante;
  return `assets/escudos/${encodeURIComponent(nombreArchivo)}.png`;
}

function renderizarDetalleTablaSeleccionado() {
  const contenedor = document.getElementById("detalle-tabla");

  if (!contenedor || !ultimoResultadoTabla || !ultimoResultadoTabla.filas.length) {
    return;
  }

  const fila = ultimoResultadoTabla.filas.find((item) => item.clave === participanteDetalleTabla);

  if (!fila) {
    contenedor.hidden = true;
    contenedor.innerHTML = "";
    return;
  }

  contenedor.hidden = false;
  contenedor.innerHTML = "";
  contenedor.appendChild(crearDetalleTablaParticipante(fila));
}

function crearDetalleTablaParticipante(fila) {
  const contenedor = document.createElement("article");
  contenedor.className = "detalle-tabla-panel";
  const esDetalleSoloGrupos = ultimaVistaTabla === "grupos";

  const encabezado = document.createElement("div");
  encabezado.className = "detalle-tabla-encabezado";

  const titulo = document.createElement("h3");
  titulo.textContent = fila.participante;

  const total = document.createElement("strong");
  total.textContent = `${esDetalleSoloGrupos ? fila.puntosGrupos : fila.puntos} pts`;

  encabezado.append(titulo, total);

  const resumen = document.createElement("div");
  resumen.className = "detalle-tabla-resumen";
  if (esDetalleSoloGrupos) {
    resumen.classList.add("solo-grupos");
    resumen.append(
      crearDatoDetalleTabla("Grupos", `${fila.puntosGrupos} pts`),
      crearDatoDetalleTabla("Puestos acertados", fila.gruposAciertos),
      crearDatoDetalleTabla("Errores", fila.gruposErrores),
      crearDatoDetalleTabla("No cargados", fila.gruposPendientes)
    );
  } else {
    resumen.append(
      crearDatoDetalleTabla("Plenos", fila.plenos),
      crearDatoDetalleTabla("Parciales", fila.parciales),
      crearDatoDetalleTabla("Errores", fila.errores),
      crearDatoDetalleTabla("No mandados", fila.noMandados),
      crearDatoDetalleTabla("Grupos", `${fila.puntosGrupos} pts`)
    );
  }

  const secciones = document.createElement("div");
  secciones.className = "detalle-tabla-secciones";
  if (esDetalleSoloGrupos) {
    secciones.classList.add("solo-grupos");
    secciones.appendChild(crearDetalleGruposTabla(fila));
  } else {
    secciones.append(
      crearDetallePartidosTabla(fila),
      crearDetalleGruposTabla(fila)
    );
  }

  contenedor.append(encabezado, resumen, secciones);
  return contenedor;
}

function crearDatoDetalleTabla(etiqueta, valor) {
  const item = document.createElement("div");
  const label = document.createElement("span");
  const dato = document.createElement("strong");

  label.textContent = etiqueta;
  dato.textContent = valor;
  item.append(label, dato);
  return item;
}

function crearDetallePartidosTabla(fila) {
  const bloque = document.createElement("section");
  bloque.className = "detalle-bloque";

  const titulo = document.createElement("h4");
  titulo.textContent = "Partidos";
  bloque.appendChild(titulo);

  if (!fila.detalles.length) {
    const vacio = document.createElement("p");
    vacio.className = "detalle-vacio";
    vacio.textContent = "Sin pronosticos de partidos cargados.";
    bloque.appendChild(vacio);
    return bloque;
  }

  const lista = document.createElement("div");
  lista.className = "detalle-lista";
  const detallesOrdenados = [...fila.detalles].sort((a, b) => {
    const indiceA = FECHAS.findIndex((fecha) => fecha.id === (a.fecha && a.fecha.id));
    const indiceB = FECHAS.findIndex((fecha) => fecha.id === (b.fecha && b.fecha.id));
    return (indiceA === -1 ? 999 : indiceA) - (indiceB === -1 ? 999 : indiceB);
  });
  let fechaDetalleActual = "";

  detallesOrdenados.forEach((item) => {
    const nombreFecha = item.fecha && item.fecha.nombre ? item.fecha.nombre : "Fecha";

    if (nombreFecha !== fechaDetalleActual) {
      const separadorFecha = document.createElement("h5");
      separadorFecha.className = "detalle-fecha-titulo";
      separadorFecha.textContent = nombreFecha;
      lista.appendChild(separadorFecha);
      fechaDetalleActual = nombreFecha;
    }

    const detalleItem = document.createElement("div");
    detalleItem.className = `detalle-item estado-${item.estado}`;
    detalleItem.innerHTML = `
      <strong>${item.fecha.nombre} · ${item.partido.local.nombre} vs ${item.partido.visitante.nombre}</strong>
      <span>Pronostico: ${item.pronostico.golesLocal} - ${item.pronostico.golesVisitante}</span>
      <span>Oficial: ${item.resultadoOficialTexto}</span>
      <span>${item.descripcion} · +${item.puntos}${item.extra ? ` · Extra clasificacion +${item.extra}` : ""}</span>
    `;
    detalleItem.innerHTML = "";

    const texto = document.createElement("div");
    texto.className = "detalle-partido-texto";

    const pronostico = document.createElement("strong");
    pronostico.textContent = `${item.partido.local.nombre} ${item.pronostico.golesLocal} - ${item.pronostico.golesVisitante} ${item.partido.visitante.nombre}`;

    const oficial = document.createElement("span");
    oficial.textContent = `Oficial: ${item.resultadoOficialTexto}`;

    const puntos = document.createElement("div");
    puntos.className = "detalle-partido-puntos";

    const puntosTotal = item.puntos + (item.extra || 0);
    const valorPuntos = document.createElement("strong");
    valorPuntos.textContent = `+${puntosTotal}`;

    const descripcion = document.createElement("span");
    descripcion.textContent = item.extra
      ? `${item.descripcion} + clasificacion`
      : item.descripcion;

    texto.append(pronostico, oficial);
    puntos.append(valorPuntos, descripcion);
    detalleItem.append(texto, puntos);
    lista.appendChild(detalleItem);
  });

  bloque.appendChild(lista);
  return bloque;
}

function crearDetalleGruposTabla(fila) {
  const bloque = document.createElement("section");
  bloque.className = "detalle-bloque detalle-bloque-grupos";

  const titulo = document.createElement("h4");
  titulo.textContent = "Grupos";
  bloque.appendChild(titulo);

  if (!fila.detalleGrupos.length) {
    const vacio = document.createElement("p");
    vacio.className = "detalle-vacio";
    vacio.textContent = "Sin pronostico de grupos cargado.";
    bloque.appendChild(vacio);
    return bloque;
  }

  const grilla = document.createElement("div");
  grilla.className = "detalle-grupos-grid";

  fila.detalleGrupos.forEach((grupoDetalle) => {
    grilla.appendChild(crearDetalleGrupoTabla(grupoDetalle));
  });

  bloque.appendChild(grilla);
  return bloque;
}

function crearDetalleGrupoTabla(grupoDetalle) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "detalle-grupo-card";

  const titulo = document.createElement("h5");
  titulo.textContent = `${grupoDetalle.grupo.nombre} · ${grupoDetalle.puntos}/4`;
  tarjeta.appendChild(titulo);

  grupoDetalle.posiciones.forEach((posicion) => {
    const fila = document.createElement("div");
    fila.className = `detalle-grupo-posicion estado-${posicion.estado}`;

    const pronostico = posicion.pronostico ? posicion.pronostico.nombre : "Sin cargar";
    const oficial = posicion.oficial ? posicion.oficial.nombre : "No cargado";
    const estado = posicion.estado === "pleno"
      ? "+1"
      : (posicion.estado === "pendiente" ? "NC" : "0");

    fila.innerHTML = `
      <span>${posicion.posicion}.</span>
      <strong>${pronostico}</strong>
      <small>Oficial: ${oficial}</small>
      <em>${estado}</em>
    `;
    tarjeta.appendChild(fila);
  });

  return tarjeta;
}

function renderizarAdvertencias(contenedor, advertencias) {
  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  const advertenciasUnicas = Array.from(new Set(advertencias.filter(Boolean)));

  advertenciasUnicas.forEach((advertencia) => {
    const item = document.createElement("div");
    item.className = "advertencia";
    item.textContent = advertencia;
    contenedor.appendChild(item);
  });
}

function actualizarResumenSeleccion() {
  const participante = document.getElementById("selector-participante").value || "Sin participante";
  const fechaSeleccionada = obtenerFechaSeleccionada();
  const nombreFecha = fechaSeleccionada ? fechaSeleccionada.nombre : "Sin fecha";
  document.getElementById("resumen-seleccion").textContent = `${participante} · ${nombreFecha}`;
}

function actualizarResumenPronostico() {
  const participante = document.getElementById("selector-participante").value || "Sin participante";
  const fechaSeleccionada = obtenerFechaSeleccionada();
  const pronosticos = obtenerPronosticosActuales();
  const totalPartidos = pronosticos.length;
  const partidosCompletos = pronosticos.filter((pronostico) => {
    return pronosticoPartidoEstaCompleto(pronostico, fechaSeleccionada);
  }).length;
  const estaCompleto = Boolean(participante !== "Sin participante" && totalPartidos > 0 && partidosCompletos === totalPartidos);

  document.getElementById("resumen-fecha").textContent = fechaSeleccionada ? fechaSeleccionada.nombre : "Sin fecha";
  document.getElementById("resumen-participante").textContent = participante;
  document.getElementById("resumen-completos").textContent = `${partidosCompletos}/${totalPartidos}`;

  const estado = document.getElementById("resumen-estado");
  estado.textContent = estaCompleto ? "Completo" : "Incompleto";
  estado.className = estaCompleto ? "completo" : "incompleto";
}

function pronosticoPartidoEstaCompleto(pronostico, fecha) {
  if (!esGolValido(pronostico.golesLocal) || !esGolValido(pronostico.golesVisitante)) {
    return false;
  }

  if (!fechaPermiteGanadorPenales(fecha)) {
    return true;
  }

  return Boolean(pronostico.ganadorPenales);
}

function mostrarMensaje(mensaje, tipo) {
  const mensajeEstado = document.getElementById("mensaje-estado");
  mensajeEstado.textContent = mensaje;
  mensajeEstado.className = `mensaje-estado ${tipo || ""}`.trim();
}

function limpiarMensaje() {
  mostrarMensaje("", "");
}

function inicializarNotificaciones() {
  const boton = document.getElementById("boton-notificaciones");

  if (boton) {
    boton.addEventListener("click", solicitarPermisoNotificaciones);
  }

  actualizarEstadoBotonNotificaciones();
  actualizarCuentaRegresiva();
  renderizarAvisosVisuales();
  procesarNotificacionesAlEntrar();
  procesarRecordatoriosDeCierre();

  if (intervaloCuentaRegresiva) {
    clearInterval(intervaloCuentaRegresiva);
  }

  intervaloCuentaRegresiva = setInterval(() => {
    actualizarCuentaRegresiva();
    procesarRecordatoriosDeCierre();
  }, 60000);
}

function actualizarEstadoBotonNotificaciones() {
  const boton = document.getElementById("boton-notificaciones");
  const estado = document.getElementById("estado-notificaciones");

  if (!boton || !estado) {
    return;
  }

  boton.classList.remove("activadas", "bloqueadas", "no-soportadas");
  boton.disabled = false;

  if (!("Notification" in window)) {
    boton.textContent = "Sin soporte";
    boton.disabled = true;
    boton.classList.add("no-soportadas");
    estado.textContent = "Sin soporte";
    return;
  }

  if (Notification.permission === "granted") {
    boton.textContent = "Activadas";
    boton.classList.add("activadas");
    estado.textContent = "Notificaciones activadas";
    return;
  }

  if (Notification.permission === "denied") {
    boton.textContent = "Bloqueadas";
    boton.classList.add("bloqueadas");
    estado.textContent = "Notificaciones bloqueadas";
    return;
  }

  boton.textContent = "Activar notificaciones";
  estado.textContent = "Avisos del navegador";
}

async function solicitarPermisoNotificaciones() {
  if (!("Notification" in window)) {
    actualizarEstadoBotonNotificaciones();
    mostrarMensaje("Sin soporte de notificaciones.", "error");
    return;
  }

  guardarInteraccionNotificaciones(Notification.permission);

  try {
    const permiso = await Notification.requestPermission();
    guardarInteraccionNotificaciones(permiso);
    actualizarEstadoBotonNotificaciones();

    if (permiso === "granted") {
      mostrarMensaje("Notificaciones activadas.", "exito");
      procesarNotificacionesAlEntrar();
      procesarRecordatoriosDeCierre();
      return;
    }

    if (permiso === "denied") {
      mostrarMensaje("Notificaciones bloqueadas.", "error");
      return;
    }

    mostrarMensaje("No activadas.", "info");
  } catch (error) {
    actualizarEstadoBotonNotificaciones();
    mostrarMensaje("No se pudo activar.", "error");
  }
}

function puedeMostrarNotificaciones() {
  return "Notification" in window && Notification.permission === "granted";
}

function mostrarNotificacionNavegador(titulo, mensaje) {
  if (!puedeMostrarNotificaciones()) {
    return false;
  }

  try {
    const notificacion = new Notification(titulo, {
      body: mensaje,
      icon: "assets/logo-tafa.png",
      tag: normalizarNombreArchivo(`${titulo}-${mensaje}`).slice(0, 64) || "prode-tafa"
    });

    setTimeout(() => {
      notificacion.close();
    }, 7000);

    return true;
  } catch (error) {
    return false;
  }
}

function obtenerNotificacionesVistas() {
  return leerObjetoLocalStorage(CLAVE_NOTIFICACIONES_VISTAS);
}

function guardarNotificacionVista(id) {
  if (!id) {
    return;
  }

  const vistas = obtenerNotificacionesVistas();
  vistas[id] = new Date().toISOString();
  guardarObjetoLocalStorage(CLAVE_NOTIFICACIONES_VISTAS, vistas);
}

function yaSeMostroNotificacion(id) {
  const vistas = obtenerNotificacionesVistas();
  return Boolean(id && vistas[id]);
}

function procesarNotificacionesAlEntrar() {
  if (!puedeMostrarNotificaciones()) {
    return;
  }

  obtenerConfiguracionNotificaciones().forEach((notificacion) => {
    if (!notificacion.activo || !notificacion.mostrarAlEntrar || yaSeMostroNotificacion(notificacion.id)) {
      return;
    }

    const seMostro = mostrarNotificacionNavegador(notificacion.titulo, notificacion.mensaje);

    if (seMostro) {
      guardarNotificacionVista(notificacion.id);
    }
  });
}

function procesarRecordatoriosDeCierre() {
  if (!puedeMostrarNotificaciones()) {
    return;
  }

  FECHAS.forEach((fecha) => {
    const tiempo = calcularTiempoRestante(fecha.cierrePronostico);

    if (!tiempo.valido) {
      return;
    }

    let id = "";
    let mensaje = "";

    if (tiempo.cerrado) {
      id = `cierre-final-${fecha.id}`;
      mensaje = `${fecha.nombre} ya cerro.`;
    } else if (tiempo.totalMs <= 2 * 60 * 60 * 1000) {
      id = `cierre-2h-${fecha.id}`;
      mensaje = `Cierra en menos de 2h: ${fecha.nombre}.`;
    } else if (tiempo.totalMs <= 24 * 60 * 60 * 1000) {
      id = `cierre-24h-${fecha.id}`;
      mensaje = `Cierra en menos de 24h: ${fecha.nombre}.`;
    }

    if (!id || yaSeMostroNotificacion(id)) {
      return;
    }

    const seMostro = mostrarNotificacionNavegador("Prode TAFA", mensaje);

    if (seMostro) {
      guardarNotificacionVista(id);
    }
  });
}

function calcularTiempoRestante(fechaCierre) {
  if (!fechaCierre) {
    return {
      valido: false,
      cerrado: false,
      totalMs: 0,
      texto: "Sin cierre"
    };
  }

  const cierre = new Date(fechaCierre);

  if (Number.isNaN(cierre.getTime())) {
    return {
      valido: false,
      cerrado: false,
      totalMs: 0,
      texto: "Cierre inválido"
    };
  }

  const totalMs = cierre.getTime() - Date.now();

  if (totalMs <= 0) {
    return {
      valido: true,
      cerrado: true,
      totalMs,
      dias: 0,
      horas: 0,
      minutos: 0,
      texto: "Pronóstico cerrado"
    };
  }

  const minutosTotales = Math.ceil(totalMs / 60000);
  const dias = Math.floor(minutosTotales / (24 * 60));
  const horas = Math.floor((minutosTotales % (24 * 60)) / 60);
  const minutos = minutosTotales % 60;
  const partes = [];

  if (dias > 0) {
    partes.push(`${dias}d`);
  }

  if (horas > 0 || dias > 0) {
    partes.push(`${horas}h`);
  }

  if (minutos > 0 || !partes.length) {
    partes.push(`${minutos}m`);
  }

  return {
    valido: true,
    cerrado: false,
    totalMs,
    dias,
    horas,
    minutos,
    texto: `Cierra en ${partes.join(" ")}`
  };
}

function renderizarAvisosVisuales() {
  const contenedor = document.getElementById("avisos-visuales");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  const avisosCerrados = obtenerAvisosVisualesCerrados();
  const avisos = obtenerAvisosVisualesActivos().filter((aviso) => !avisosCerrados[aviso.id]);

  contenedor.hidden = !avisos.length;

  avisos.forEach((aviso) => {
    const item = document.createElement("div");
    item.className = `aviso-visual ${normalizarTipoAviso(aviso.tipo)}`;

    const contenido = document.createElement("div");
    contenido.className = "aviso-contenido";

    const titulo = document.createElement("strong");
    titulo.textContent = aviso.titulo;

    const mensaje = document.createElement("span");
    mensaje.textContent = aviso.mensaje;

    const cerrar = document.createElement("button");
    cerrar.className = "aviso-cerrar";
    cerrar.type = "button";
    cerrar.textContent = "Cerrar";
    cerrar.addEventListener("click", () => cerrarAvisoVisual(aviso.id));

    contenido.append(titulo, mensaje);
    item.append(contenido, cerrar);
    contenedor.appendChild(item);
  });
}

function cerrarAvisoVisual(id) {
  if (!id) {
    return;
  }

  const cerrados = obtenerAvisosVisualesCerrados();
  cerrados[id] = new Date().toISOString();
  guardarObjetoLocalStorage(CLAVE_AVISOS_VISUALES_CERRADOS, cerrados);
  renderizarAvisosVisuales();
}

function actualizarCuentaRegresiva() {
  const cuentaRegresiva = document.getElementById("cuenta-regresiva");

  if (!cuentaRegresiva) {
    return;
  }

  const fechaSeleccionada = obtenerFechaSeleccionada();
  const tiempo = calcularTiempoRestante(fechaSeleccionada ? fechaSeleccionada.cierrePronostico : "");

  cuentaRegresiva.className = "cuenta-regresiva";

  if (!tiempo.valido) {
    cuentaRegresiva.textContent = tiempo.texto;
    cuentaRegresiva.classList.add("sin-cierre");
    return;
  }

  cuentaRegresiva.textContent = tiempo.texto;

  if (tiempo.cerrado) {
    cuentaRegresiva.classList.add("cerrado");
  } else if (tiempo.totalMs <= 2 * 60 * 60 * 1000) {
    cuentaRegresiva.classList.add("importante");
  } else if (tiempo.totalMs <= 24 * 60 * 60 * 1000) {
    cuentaRegresiva.classList.add("alerta");
  }
}

function obtenerConfiguracionNotificaciones() {
  return Array.isArray(window.NOTIFICACIONES)
    ? window.NOTIFICACIONES
    : (typeof NOTIFICACIONES !== "undefined" && Array.isArray(NOTIFICACIONES) ? NOTIFICACIONES : []);
}

function obtenerAvisosVisualesActivos() {
  const fechaSeleccionada = obtenerFechaSeleccionada();
  const avisos = obtenerConfiguracionNotificaciones()
    .filter((notificacion) => notificacion.activo)
    .map((notificacion) => ({
      id: `manual-${notificacion.id}`,
      titulo: obtenerTituloAvisoVisual(notificacion),
      mensaje: notificacion.mensaje,
      tipo: notificacion.tipo || "info"
    }));

  if (!fechaSeleccionada) {
    return avisos;
  }

  const tiempo = calcularTiempoRestante(fechaSeleccionada.cierrePronostico);

  if (!tiempo.valido) {
    return avisos;
  }

  if (tiempo.cerrado) {
    avisos.push({
      id: `fecha-cerrada-${fechaSeleccionada.id}`,
      titulo: "Pronóstico cerrado",
      mensaje: "Revisá antes de enviar.",
      tipo: "importante"
    });
  } else if (tiempo.totalMs <= 2 * 60 * 60 * 1000) {
    avisos.push({
      id: `fecha-ultimas-2h-${fechaSeleccionada.id}`,
      titulo: "Cierre cercano",
      mensaje: `Cierra en menos de 2h: ${fechaSeleccionada.nombre}.`,
      tipo: "importante"
    });
  } else if (tiempo.totalMs <= 24 * 60 * 60 * 1000) {
    avisos.push({
      id: `fecha-cierre-24h-${fechaSeleccionada.id}`,
      titulo: "Falta poco",
      mensaje: `Cierra en menos de 24h: ${fechaSeleccionada.nombre}.`,
      tipo: "alerta"
    });
  }

  return avisos;
}

function obtenerTituloAvisoVisual(notificacion) {
  if (notificacion.tipo === "resultado") {
    return "Puntos";
  }

  if (notificacion.tipo === "alerta") {
    return "Recordatorio";
  }

  if (notificacion.tipo === "importante") {
    return "Importante";
  }

  return notificacion.titulo || "Aviso";
}

function normalizarTipoAviso(tipo) {
  const tiposPermitidos = ["info", "alerta", "importante", "resultado"];
  return tiposPermitidos.includes(tipo) ? tipo : "info";
}

function obtenerAvisosVisualesCerrados() {
  return leerObjetoLocalStorage(CLAVE_AVISOS_VISUALES_CERRADOS);
}

function fechaEstaCerrada(fecha) {
  const tiempo = calcularTiempoRestante(fecha ? fecha.cierrePronostico : "");
  return Boolean(tiempo.valido && tiempo.cerrado);
}

function guardarInteraccionNotificaciones(permiso) {
  guardarObjetoLocalStorage(CLAVE_NOTIFICACIONES_INTERACCION, {
    permiso,
    fecha: new Date().toISOString()
  });
}

function leerObjetoLocalStorage(clave) {
  try {
    const valor = localStorage.getItem(clave);

    if (!valor) {
      return {};
    }

    const objeto = JSON.parse(valor);
    return objeto && typeof objeto === "object" ? objeto : {};
  } catch (error) {
    return {};
  }
}

function guardarObjetoLocalStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    // No se bloquea la app si el navegador no permite guardar este dato auxiliar.
  }
}

function esperarRender() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

function esperarImagenes(contenedor) {
  const imagenes = Array.from(contenedor.querySelectorAll("img"));

  if (!imagenes.length) {
    return Promise.resolve();
  }

  const cargas = imagenes.map((imagen) => {
    if (imagen.complete) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      imagen.addEventListener("load", resolve, { once: true });
      imagen.addEventListener("error", resolve, { once: true });
    });
  });

  return Promise.race([
    Promise.all(cargas),
    new Promise((resolve) => {
      setTimeout(resolve, 3000);
    })
  ]);
}

async function convertirImagenesLocalesADataUrl(contenedor) {
  const imagenes = Array.from(contenedor.querySelectorAll("img"))
    .filter((imagen) => {
      const src = imagen.getAttribute("src") || "";
      return src
        && !src.startsWith("data:")
        && !/^https?:\/\//i.test(src)
        && src.includes("assets/");
    });

  await Promise.all(imagenes.map(async (imagen) => {
    const src = imagen.getAttribute("src") || "";

    try {
      await esperarImagenIndividual(imagen);

      const { ancho, alto } = obtenerMedidasImagenParaExportar(imagen);

      if (/\.svg(?:$|\?)/i.test(src)) {
        const dataUrlSvg = await obtenerDataUrlSvgLocal(src);

        if (dataUrlSvg) {
          const dataUrlPng = await convertirDataUrlImagenAPng(dataUrlSvg, ancho, alto);
          imagen.removeAttribute("crossorigin");
          imagen.src = dataUrlPng || dataUrlSvg;
          await esperarImagenIndividual(imagen);
          return;
        }
      }

      const canvas = document.createElement("canvas");
      const contexto = canvas.getContext("2d");

      if (!contexto) {
        return;
      }

      canvas.width = ancho;
      canvas.height = alto;
      contexto.drawImage(imagen, 0, 0, ancho, alto);
      imagen.removeAttribute("crossorigin");
      imagen.src = canvas.toDataURL("image/png");
    } catch (error) {
      // Si el navegador no permite convertir un asset, se deja la imagen original.
    }
  }));
}

function obtenerMedidasImagenParaExportar(imagen) {
  const rect = imagen.getBoundingClientRect();
  const ancho = Math.round(rect.width || imagen.width || imagen.naturalWidth || 60);
  const alto = Math.round(rect.height || imagen.height || imagen.naturalHeight || 40);

  return {
    ancho: Math.max(1, ancho),
    alto: Math.max(1, alto)
  };
}

async function obtenerDataUrlSvgLocal(src) {
  if (typeof fetch !== "function") {
    return "";
  }

  try {
    const respuesta = await fetch(src);

    if (!respuesta.ok) {
      return "";
    }

    const svg = await respuesta.text();
    return `data:image/svg+xml;base64,${codificarBase64Utf8(svg)}`;
  } catch (error) {
    return "";
  }
}

function convertirDataUrlImagenAPng(src, ancho, alto) {
  return new Promise((resolve) => {
    const imagen = new Image();

    imagen.addEventListener("load", () => {
      try {
        const canvas = document.createElement("canvas");
        const contexto = canvas.getContext("2d");

        if (!contexto) {
          resolve("");
          return;
        }

        canvas.width = ancho || imagen.naturalWidth || 60;
        canvas.height = alto || imagen.naturalHeight || 40;
        contexto.drawImage(imagen, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      } catch (error) {
        resolve("");
      }
    }, { once: true });

    imagen.addEventListener("error", () => {
      resolve("");
    }, { once: true });

    imagen.src = src;
  });
}

function codificarBase64Utf8(texto) {
  if (typeof TextEncoder === "function") {
    const bytes = new TextEncoder().encode(texto);
    let binario = "";

    bytes.forEach((byte) => {
      binario += String.fromCharCode(byte);
    });

    return btoa(binario);
  }

  return btoa(unescape(encodeURIComponent(texto)));
}

function esperarImagenIndividual(imagen) {
  if (!imagen || imagen.complete) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    imagen.addEventListener("load", resolve, { once: true });
    imagen.addEventListener("error", resolve, { once: true });
  });
}

function normalizarNombreArchivo(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
