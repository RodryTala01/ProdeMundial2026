const CLAVE_ESTADO = "prodeTafa2026_state";
const CLAVE_NOTIFICACIONES_VISTAS = "prodeTafa2026_notificaciones_vistas";
const CLAVE_NOTIFICACIONES_INTERACCION = "prodeTafa2026_notificaciones_interaccion";
const CLAVE_AVISOS_VISUALES_CERRADOS = "prodeTafa2026_avisos_visuales_cerrados";

let intervaloCuentaRegresiva = null;

let estadoApp = {
  fechaSeleccionada: "",
  participanteSeleccionado: "",
  pronosticos: {}
};

document.addEventListener("DOMContentLoaded", inicializarApp);

function inicializarApp() {
  document.title = CONFIG.nombreProde;
  document.getElementById("titulo-prode").textContent = CONFIG.nombreProde;

  estadoApp = cargarEstado();

  renderizarParticipantes();
  renderizarFechas();
  renderizarFechasHerramientas();
  restaurarSelectoresDesdeEstado();
  enlazarNavegacion();
  enlazarAcciones();
  renderizarPartidos();
  cargarPronosticoActual();
  actualizarResumenSeleccion();
  actualizarResumenPronostico();
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
    limpiarMensaje();
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
  guardarEstado();
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
  imagen.crossOrigin = "anonymous";

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
      cambiarSeccion(boton.dataset.seccion);
    });
  });
}

function cambiarSeccion(seccionActiva) {
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
}

function enlazarAcciones() {
  document.getElementById("boton-whatsapp").addEventListener("click", enviarPorWhatsApp);
  document.getElementById("boton-descargar-imagen").addEventListener("click", descargarImagenPronostico);
  document.getElementById("boton-limpiar").addEventListener("click", limpiarPronosticoActual);

  const botonCalcular = document.getElementById("boton-calcular-puntos");
  const botonTabla = document.getElementById("boton-generar-tabla");

  if (botonCalcular) {
    botonCalcular.addEventListener("click", renderizarResultadoIndividual);
  }

  if (botonTabla) {
    botonTabla.addEventListener("click", () => {
      const resultado = generarTablaPosiciones();
      renderizarTablaPosiciones(resultado);
    });
  }
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
    pronosticos: {}
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

function normalizarNombreArchivo(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
