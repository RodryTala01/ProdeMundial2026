const CLAVE_ESTADO = "prodeTafa2026_state";
const CLAVE_NOTIFICACIONES_VISTAS = "prodeTafa2026_notificaciones_vistas";
const CLAVE_NOTIFICACIONES_INTERACCION = "prodeTafa2026_notificaciones_interaccion";
const CLAVE_AVISOS_VISUALES_CERRADOS = "prodeTafa2026_avisos_visuales_cerrados";
const SECCIONES_DESHABILITADAS = new Set(["calcular", "tabla"]);

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
  const selectorTabla = document.getElementById("selector-fecha-tabla");

  if (selectorCalculo) {
    selectorCalculo.innerHTML = "";

    FECHAS.forEach((fecha) => {
      const opcion = document.createElement("option");
      opcion.value = fecha.id;
      opcion.textContent = `${fecha.nombre} · ${fecha.fase}`;
      selectorCalculo.appendChild(opcion);
    });
  }

  if (selectorTabla) {
    selectorTabla.innerHTML = "";

    const opcionTodas = document.createElement("option");
    opcionTodas.value = "__todas__";
    opcionTodas.textContent = "Todas";
    selectorTabla.appendChild(opcionTodas);

    FECHAS.forEach((fecha) => {
      const opcion = document.createElement("option");
      opcion.value = fecha.id;
      opcion.textContent = fecha.nombre;
      selectorTabla.appendChild(opcion);
    });
  }
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

  const cuando = document.createElement("p");
  cuando.className = "partido-cuando";
  cuando.textContent = `${partido.dia} · ${partido.horario} hs`;

  const sede = document.createElement("p");
  sede.className = "partido-sede";
  sede.textContent = `${partido.estadio} · ${partido.ciudad}`;

  meta.append(grupo, cuando, sede);

  const equipos = document.createElement("div");
  equipos.className = "partido-equipos";

  equipos.append(
    crearBloqueEquipo(partido.local, "local"),
    crearMarcador(partido),
    crearBloqueEquipo(partido.visitante, "visitante")
  );

  tarjeta.append(meta, equipos);
  return tarjeta;
}

function crearBloqueEquipo(equipo, lado) {
  const contenedor = document.createElement("div");
  contenedor.className = `equipo ${lado}`;

  const bandera = crearBanderaEquipo(equipo, "bandera", true);

  const textos = document.createElement("span");
  textos.className = "equipo-nombre";
  textos.textContent = equipo.nombre;

  const codigo = document.createElement("span");
  codigo.className = "equipo-codigo";
  codigo.textContent = equipo.codigo;
  textos.appendChild(codigo);

  if (lado === "visitante") {
    contenedor.append(textos, bandera);
  } else {
    contenedor.append(bandera, textos);
  }

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

  const inputLocal = crearInputGol(partido, "local", partido.local.nombre);
  const separador = document.createElement("span");
  separador.className = "separador-goles";
  separador.textContent = "-";
  const inputVisitante = crearInputGol(partido, "visitante", partido.visitante.nombre);

  marcador.append(inputLocal, separador, inputVisitante);
  return marcador;
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
}

function enlazarAcciones() {
  document.getElementById("boton-whatsapp").addEventListener("click", enviarPorWhatsApp);
  document.getElementById("boton-descargar-imagen").addEventListener("click", descargarImagenPronostico);
  document.getElementById("boton-limpiar").addEventListener("click", limpiarPronosticoActual);

  const botonCalcular = document.getElementById("boton-calcular-puntos");
  const botonTabla = document.getElementById("boton-generar-tabla");
  const botonGruposWhatsApp = document.getElementById("boton-grupos-whatsapp");
  const botonGruposImagen = document.getElementById("boton-grupos-imagen");
  const botonGruposLimpiar = document.getElementById("boton-grupos-limpiar");
  const modalGrupos = document.getElementById("modal-grupos");
  const modalCerrar = document.getElementById("modal-grupos-cerrar");
  const modalCancelar = document.getElementById("modal-grupos-cancelar");

  if (botonCalcular) {
    botonCalcular.addEventListener("click", renderizarResultadoIndividual);
  }

  if (botonTabla) {
    botonTabla.addEventListener("click", () => {
      const resultado = generarTablaPosiciones();
      renderizarTablaPosiciones(resultado);
    });
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
    return pronostico.golesLocal !== "" || pronostico.golesVisitante !== "";
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
      golesVisitante: pronostico.golesVisitante === "" ? "" : Number(pronostico.golesVisitante)
    };
  });

  guardarEstado();
}

function cargarPronosticoActual() {
  document.querySelectorAll(".input-gol").forEach((input) => {
    input.value = "";
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

function hayValoresEnInputs() {
  return Array.from(document.querySelectorAll(".input-gol")).some((input) => input.value.trim() !== "");
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
      golesVisitante: inputVisitante ? inputVisitante.value.trim() : ""
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
    return `${pronostico.partido.local.nombre} ${pronostico.golesLocal} - ${pronostico.golesVisitante} ${pronostico.partido.visitante.nombre}`;
  });

  return [
    CONFIG.nombreProde,
    `Fecha: ${validacion.fechaSeleccionada.nombre}`,
    `Participante: ${validacion.participante}`,
    "",
    ...lineasPartidos
  ].join("\n");
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
  const { partido, golesLocal, golesVisitante } = pronostico;
  const contenedor = document.createElement("div");
  contenedor.className = "imagen-partido";

  const meta = document.createElement("p");
  meta.className = "imagen-meta-partido";
  meta.textContent = `${partido.grupo} · ${partido.dia} · ${partido.horario} hs · ${partido.estadio} · ${partido.ciudad}`;

  const local = crearEquipoImagen(partido.local, "local");
  const marcador = document.createElement("div");
  marcador.className = "imagen-marcador";
  marcador.append(crearGolImagen(golesLocal), document.createTextNode("-"), crearGolImagen(golesVisitante));
  const visitante = crearEquipoImagen(partido.visitante, "visitante");

  contenedor.append(meta, local, marcador, visitante);
  return contenedor;
}

function crearEquipoImagen(equipo, lado) {
  const contenedor = document.createElement("div");
  contenedor.className = `imagen-equipo ${lado}`;

  const bandera = crearBanderaEquipo(equipo, "imagen-bandera", false);

  const nombre = document.createElement("span");
  nombre.textContent = equipo.nombre;

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
      descripcion: "Pendiente"
    };
  }

  const golesPronosticoLocal = Number(pronostico.golesLocal);
  const golesPronosticoVisitante = Number(pronostico.golesVisitante);
  const golesOficialLocal = Number(oficial.golesLocal);
  const golesOficialVisitante = Number(oficial.golesVisitante);

  if (golesPronosticoLocal === golesOficialLocal && golesPronosticoVisitante === golesOficialVisitante) {
    return {
      estado: "pleno",
      puntos: CONFIG.puntos.pleno,
      descripcion: "Pleno"
    };
  }

  const signoPronostico = obtenerSignoResultado(golesPronosticoLocal, golesPronosticoVisitante);
  const signoOficial = obtenerSignoResultado(golesOficialLocal, golesOficialVisitante);

  if (signoPronostico === signoOficial) {
    return {
      estado: "parcial",
      puntos: CONFIG.puntos.parcial,
      descripcion: "Parcial"
    };
  }

  return {
    estado: "error",
    puntos: CONFIG.puntos.error,
    descripcion: "Error"
  };
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
  puntos.textContent = `+${fila.puntos}`;

  celda.append(badge, puntos);
  return celda;
}

function calcularPronosticoCompleto(mensajeParseado) {
  const filas = [];
  const advertencias = [];

  mensajeParseado.pronosticos.forEach((pronostico) => {
    const oficial = RESULTADOS_OFICIALES[pronostico.partido.id] || null;
    const puntaje = calcularPuntosPartido(pronostico, oficial);

    if (puntaje.estado === "pendiente") {
      advertencias.push(`Pendiente: ${pronostico.partido.local.nombre} vs ${pronostico.partido.visitante.nombre} no tiene resultado oficial cargado.`);
    }

    filas.push({
      fecha: mensajeParseado.fecha,
      participante: mensajeParseado.participante,
      partido: pronostico.partido,
      pronostico,
      oficial,
      estado: puntaje.estado,
      puntos: puntaje.puntos,
      descripcion: puntaje.descripcion,
      resultadoOficialTexto: formatearResultadoOficial(pronostico.partido, oficial)
    });
  });

  return {
    fecha: mensajeParseado.fecha,
    participante: mensajeParseado.participante,
    filas,
    total: filas.reduce((acumulado, fila) => acumulado + fila.puntos, 0),
    plenos: filas.filter((fila) => fila.estado === "pleno").length,
    parciales: filas.filter((fila) => fila.estado === "parcial").length,
    errores: filas.filter((fila) => fila.estado === "error").length,
    pendientes: filas.filter((fila) => fila.estado === "pendiente").length,
    advertencias
  };
}

function formatearResultadoOficial(partido, oficial) {
  if (!oficial || oficial.golesLocal === null || oficial.golesVisitante === null || oficial.golesLocal === undefined || oficial.golesVisitante === undefined) {
    return "Pendiente";
  }

  return `${partido.local.nombre} ${oficial.golesLocal} - ${oficial.golesVisitante} ${partido.visitante.nombre}`;
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

    if (busqueda.invertido) {
      advertencias.push(`Se detectó el partido invertido en "${linea}" y se acomodó al orden oficial.`);
    }

    pronosticos.push({
      partido: busqueda.partido,
      golesLocal,
      golesVisitante,
      pronosticoAvanza: partidoParseado.pronosticoAvanza || null,
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

  return {
    equipoLocal: coincidencia[1].trim(),
    golesLocal: Number(coincidencia[2]),
    golesVisitante: Number(coincidencia[3]),
    equipoVisitante: coincidencia[4].trim()
  };
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

function generarTablaPosiciones() {
  const textarea = document.getElementById("textarea-mensajes-tabla");
  const selectorFecha = document.getElementById("selector-fecha-tabla");
  const texto = textarea ? textarea.value : "";
  const filtroFecha = selectorFecha ? selectorFecha.value : "__todas__";
  const advertencias = [];

  if (!texto.trim()) {
    return {
      filas: [],
      advertencias: ["Pegá uno o más mensajes antes de generar la tabla."]
    };
  }

  const parseoMultiple = parsearMultiplesMensajes(texto, {
    fechaFallbackId: filtroFecha !== "__todas__" ? filtroFecha : ""
  });
  const mensajesPorClave = new Map();

  advertencias.push(...parseoMultiple.advertencias);

  parseoMultiple.mensajes.forEach((mensaje) => {
    advertencias.push(...mensaje.errores, ...mensaje.advertencias);

    if (!mensaje.fecha || !mensaje.participante) {
      return;
    }

    if (filtroFecha !== "__todas__" && mensaje.fecha.id !== filtroFecha) {
      return;
    }

    const clave = `${normalizarTexto(mensaje.participante)}__${mensaje.fecha.id}`;

    if (mensajesPorClave.has(clave)) {
      advertencias.push(`Se detectó más de un pronóstico para ${mensaje.participante} en ${mensaje.fecha.nombre}. Se usó el último.`);
    }

    mensajesPorClave.set(clave, mensaje);
  });

  const acumulados = new Map();

  mensajesPorClave.forEach((mensaje) => {
    const calculo = calcularPronosticoCompleto(mensaje);
    const claveParticipante = normalizarTexto(mensaje.participante);

    advertencias.push(...calculo.advertencias);

    if (!acumulados.has(claveParticipante)) {
      acumulados.set(claveParticipante, {
        participante: mensaje.participante,
        puntos: 0,
        plenos: 0,
        parciales: 0,
        errores: 0,
        pendientes: 0,
        fechas: new Set(),
        detalles: []
      });
    }

    const acumulado = acumulados.get(claveParticipante);
    acumulado.puntos += calculo.total;
    acumulado.plenos += calculo.plenos;
    acumulado.parciales += calculo.parciales;
    acumulado.errores += calculo.errores;
    acumulado.pendientes += calculo.pendientes;
    acumulado.fechas.add(mensaje.fecha.nombre);
    acumulado.detalles.push(...calculo.filas);
  });

  const filas = Array.from(acumulados.values())
    .map((fila) => ({
      ...fila,
      fechasTexto: Array.from(fila.fechas).join(", ")
    }))
    .sort(ordenarTablaPosiciones)
    .map((fila, indice) => ({
      ...fila,
      posicion: indice + 1
    }));

  return {
    filas,
    advertencias
  };
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

  if (a.errores !== b.errores) {
    return a.errores - b.errores;
  }

  return a.participante.localeCompare(b.participante, "es");
}

function renderizarTablaPosiciones(resultado) {
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
    <thead>
      <tr>
        <th>Posición</th>
        <th>Participante</th>
        <th>Puntos totales</th>
        <th>Plenos</th>
        <th>Parciales</th>
        <th>Errores</th>
        <th>Pendientes</th>
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

    tr.children[1].appendChild(crearDetalleParticipante(fila));
    cuerpo.appendChild(tr);
  });

  contenedor.appendChild(tabla);
  renderizarAdvertencias(contenedorAdvertencias, resultado.advertencias);
}

function crearDetalleParticipante(fila) {
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
    lista.appendChild(detalleItem);
  });

  detalle.append(resumen, lista);
  contenedor.append(nombre, detalle);
  return contenedor;
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
    return esGolValido(pronostico.golesLocal) && esGolValido(pronostico.golesVisitante);
  }).length;
  const estaCompleto = Boolean(participante !== "Sin participante" && totalPartidos > 0 && partidosCompletos === totalPartidos);

  document.getElementById("resumen-fecha").textContent = fechaSeleccionada ? fechaSeleccionada.nombre : "Sin fecha";
  document.getElementById("resumen-participante").textContent = participante;
  document.getElementById("resumen-completos").textContent = `${partidosCompletos}/${totalPartidos}`;

  const estado = document.getElementById("resumen-estado");
  estado.textContent = estaCompleto ? "Completo" : "Incompleto";
  estado.className = estaCompleto ? "completo" : "incompleto";
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
