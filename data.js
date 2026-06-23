/*
  Datos editables del prode.
  Cambia estos valores y subi nuevamente los archivos para actualizar GitHub Pages.
*/

const CONFIG = {
  // Cambiar aca el numero de WhatsApp destino, con codigo de pais y sin signos.
  whatsappDestino: "541154865284",
  nombreProde: "Prode TAFA Copa del Mundo 2026",
  puntos: {
    pleno: 3,
    parcial: 1,
    error: 0
  }
};

const PARTICIPANTES = [
  "Benja",
  "Bruno Alonso",
  "Cami",
  "Cristian Hantis",
  "Cristian Serpico",
  "Cundo",
  "Eze",
  "Fabrizio Escolano",
  "Felipe Galante",
  "Gabriel Talarico",
  "Ignacio Cejas",
  "Jhose",
  "Kevin Sívori",
  "Kraiizer",
  "Lucas Aguilera",
  "Lucas Insua",
  "Luciano Hufschmid",
  "Mario Talarico",
  "Moreno Pérez",
  "Nahuel González",
  "Nico Avalos",
  "Pancho Muzzio",
  "Renzo Badano",
  "Rodrigo Soca",
  "Rodrigo Talarico",
  "Santi",
  "Verónica Lucchesi",
  "Yago"
];

/*
  Notificaciones simples del navegador.
  Se pueden desactivar cambiando activo a false.
*/
const NOTIFICACIONES = [
  {
    id: "fecha-1-disponible",
    fechaId: "fecha-1",
    titulo: "Fecha 1",
    mensaje: "Disponible para cargar.",
    tipo: "info",
    activo: true,
    mostrarAlEntrar: true
  },
  {
    id: "recordatorio-fecha-1",
    fechaId: "fecha-1",
    titulo: "Cierre",
    mensaje: "Falta poco para Fecha 1.",
    tipo: "alerta",
    activo: true,
    mostrarAlEntrar: true
  }
];

/*
  Fecha 1 real de fase de grupos: primer partido de cada seleccion dentro de su grupo.
  Son 2 partidos por grupo, 12 grupos, 24 partidos en total.

  Horarios cargados en hora de Argentina (UTC-3).
  El cierre de pronostico queda 30 minutos antes del primer partido de la fecha.
  Para cambiar el cierre, editar cierrePronostico sin tocar los ids de partidos.

  En cada equipo:
  - bandera queda vacia para no usar emojis.
  - banderaImagen apunta a un archivo local si existe.
  - si banderaImagen queda vacia o falla, la app muestra el codigo FIFA como respaldo.
*/
const FECHAS = [
  {
    id: "fecha-1",
    nombre: "Fecha 1",
    fase: "Fase de grupos",
    cierrePronostico: "2026-06-11T15:30:00-03:00",
    descripcion: "Primera fecha de la fase de grupos",
    partidos: [
      {
        id: "mex-rsa-fecha-1",
        grupo: "Grupo A",
        dia: "Jueves 11 de junio",
        fechaISO: "2026-06-11",
        horario: "16:00",
        estadio: "Estadio Azteca",
        ciudad: "Ciudad de México",
        local: {
          nombre: "México",
          bandera: "",
          banderaImagen: "assets/flags/mx.svg",
          codigo: "MEX"
        },
        visitante: {
          nombre: "Sudáfrica",
          bandera: "",
          banderaImagen: "assets/flags/za.svg",
          codigo: "RSA"
        }
      },
      {
        id: "kor-cze-fecha-1",
        grupo: "Grupo A",
        dia: "Jueves 11 de junio",
        fechaISO: "2026-06-11",
        horario: "23:00",
        estadio: "Estadio Akron",
        ciudad: "Zapopan",
        local: {
          nombre: "Corea del Sur",
          bandera: "",
          banderaImagen: "assets/flags/kor.svg",
          codigo: "KOR"
        },
        visitante: {
          nombre: "Chequia",
          bandera: "",
          banderaImagen: "assets/flags/cze.svg",
          codigo: "CZE"
        }
      },
      {
        id: "can-bih-fecha-1",
        grupo: "Grupo B",
        dia: "Viernes 12 de junio",
        fechaISO: "2026-06-12",
        horario: "16:00",
        estadio: "BMO Field",
        ciudad: "Toronto",
        local: {
          nombre: "Canadá",
          bandera: "",
          banderaImagen: "assets/flags/ca.svg",
          codigo: "CAN"
        },
        visitante: {
          nombre: "Bosnia y Herzegovina",
          bandera: "",
          banderaImagen: "assets/flags/bih.svg",
          codigo: "BIH"
        }
      },
      {
        id: "usa-par-fecha-1",
        grupo: "Grupo D",
        dia: "Viernes 12 de junio",
        fechaISO: "2026-06-12",
        horario: "22:00",
        estadio: "SoFi Stadium",
        ciudad: "Inglewood",
        local: {
          nombre: "Estados Unidos",
          bandera: "",
          banderaImagen: "assets/flags/us.svg",
          codigo: "USA"
        },
        visitante: {
          nombre: "Paraguay",
          bandera: "",
          banderaImagen: "assets/flags/par.svg",
          codigo: "PAR"
        }
      },
      {
        id: "qat-sui-fecha-1",
        grupo: "Grupo B",
        dia: "Sábado 13 de junio",
        fechaISO: "2026-06-13",
        horario: "16:00",
        estadio: "Levi's Stadium",
        ciudad: "Santa Clara",
        local: {
          nombre: "Qatar",
          bandera: "",
          banderaImagen: "assets/flags/qat.svg",
          codigo: "QAT"
        },
        visitante: {
          nombre: "Suiza",
          bandera: "",
          banderaImagen: "assets/flags/sui.svg",
          codigo: "SUI"
        }
      },
      {
        id: "bra-mar-fecha-1",
        grupo: "Grupo C",
        dia: "Sábado 13 de junio",
        fechaISO: "2026-06-13",
        horario: "19:00",
        estadio: "MetLife Stadium",
        ciudad: "East Rutherford",
        local: {
          nombre: "Brasil",
          bandera: "",
          banderaImagen: "assets/flags/br.svg",
          codigo: "BRA"
        },
        visitante: {
          nombre: "Marruecos",
          bandera: "",
          banderaImagen: "assets/flags/ma.svg",
          codigo: "MAR"
        }
      },
      {
        id: "hai-sco-fecha-1",
        grupo: "Grupo C",
        dia: "Sábado 13 de junio",
        fechaISO: "2026-06-13",
        horario: "22:00",
        estadio: "Gillette Stadium",
        ciudad: "Foxborough",
        local: {
          nombre: "Haití",
          bandera: "",
          banderaImagen: "assets/flags/hai.svg",
          codigo: "HAI"
        },
        visitante: {
          nombre: "Escocia",
          bandera: "",
          banderaImagen: "assets/flags/sco.svg",
          codigo: "SCO"
        }
      },
      {
        id: "aus-tur-fecha-1",
        grupo: "Grupo D",
        dia: "Domingo 14 de junio",
        fechaISO: "2026-06-14",
        horario: "01:00",
        estadio: "BC Place",
        ciudad: "Vancouver",
        local: {
          nombre: "Australia",
          bandera: "",
          banderaImagen: "assets/flags/aus.svg",
          codigo: "AUS"
        },
        visitante: {
          nombre: "Turquía",
          bandera: "",
          banderaImagen: "assets/flags/tur.svg",
          codigo: "TUR"
        }
      },
      {
        id: "ger-cuw-fecha-1",
        grupo: "Grupo E",
        dia: "Domingo 14 de junio",
        fechaISO: "2026-06-14",
        horario: "14:00",
        estadio: "NRG Stadium",
        ciudad: "Houston",
        local: {
          nombre: "Alemania",
          bandera: "",
          banderaImagen: "assets/flags/de.svg",
          codigo: "GER"
        },
        visitante: {
          nombre: "Curazao",
          bandera: "",
          banderaImagen: "assets/flags/cuw.svg",
          codigo: "CUW"
        }
      },
      {
        id: "ned-jpn-fecha-1",
        grupo: "Grupo F",
        dia: "Domingo 14 de junio",
        fechaISO: "2026-06-14",
        horario: "17:00",
        estadio: "AT&T Stadium",
        ciudad: "Arlington",
        local: {
          nombre: "Países Bajos",
          bandera: "",
          banderaImagen: "assets/flags/ned.svg",
          codigo: "NED"
        },
        visitante: {
          nombre: "Japón",
          bandera: "",
          banderaImagen: "assets/flags/jp.svg",
          codigo: "JPN"
        }
      },
      {
        id: "civ-ecu-fecha-1",
        grupo: "Grupo E",
        dia: "Domingo 14 de junio",
        fechaISO: "2026-06-14",
        horario: "20:00",
        estadio: "Lincoln Financial Field",
        ciudad: "Filadelfia",
        local: {
          nombre: "Costa de Marfil",
          bandera: "",
          banderaImagen: "assets/flags/civ.svg",
          codigo: "CIV"
        },
        visitante: {
          nombre: "Ecuador",
          bandera: "",
          banderaImagen: "assets/flags/ecu.svg",
          codigo: "ECU"
        }
      },
      {
        id: "swe-tun-fecha-1",
        grupo: "Grupo F",
        dia: "Domingo 14 de junio",
        fechaISO: "2026-06-14",
        horario: "23:00",
        estadio: "Estadio BBVA",
        ciudad: "Guadalupe",
        local: {
          nombre: "Suecia",
          bandera: "",
          banderaImagen: "assets/flags/swe.svg",
          codigo: "SWE"
        },
        visitante: {
          nombre: "Túnez",
          bandera: "",
          banderaImagen: "assets/flags/tun.svg",
          codigo: "TUN"
        }
      },
      {
        id: "esp-cpv-fecha-1",
        grupo: "Grupo H",
        dia: "Lunes 15 de junio",
        fechaISO: "2026-06-15",
        horario: "13:00",
        estadio: "Mercedes-Benz Stadium",
        ciudad: "Atlanta",
        local: {
          nombre: "España",
          bandera: "",
          banderaImagen: "assets/flags/es.svg",
          codigo: "ESP"
        },
        visitante: {
          nombre: "Cabo Verde",
          bandera: "",
          banderaImagen: "assets/flags/cpv.svg",
          codigo: "CPV"
        }
      },
      {
        id: "bel-egy-fecha-1",
        grupo: "Grupo G",
        dia: "Lunes 15 de junio",
        fechaISO: "2026-06-15",
        horario: "16:00",
        estadio: "Lumen Field",
        ciudad: "Seattle",
        local: {
          nombre: "Bélgica",
          bandera: "",
          banderaImagen: "assets/flags/bel.svg",
          codigo: "BEL"
        },
        visitante: {
          nombre: "Egipto",
          bandera: "",
          banderaImagen: "assets/flags/egy.svg",
          codigo: "EGY"
        }
      },
      {
        id: "ksa-uru-fecha-1",
        grupo: "Grupo H",
        dia: "Lunes 15 de junio",
        fechaISO: "2026-06-15",
        horario: "19:00",
        estadio: "Hard Rock Stadium",
        ciudad: "Miami Gardens",
        local: {
          nombre: "Arabia Saudita",
          bandera: "",
          banderaImagen: "assets/flags/ksa.svg",
          codigo: "KSA"
        },
        visitante: {
          nombre: "Uruguay",
          bandera: "",
          banderaImagen: "assets/flags/uy.svg",
          codigo: "URU"
        }
      },
      {
        id: "irn-nzl-fecha-1",
        grupo: "Grupo G",
        dia: "Lunes 15 de junio",
        fechaISO: "2026-06-15",
        horario: "22:00",
        estadio: "SoFi Stadium",
        ciudad: "Inglewood",
        local: {
          nombre: "Irán",
          bandera: "",
          banderaImagen: "assets/flags/irn.svg",
          codigo: "IRN"
        },
        visitante: {
          nombre: "Nueva Zelanda",
          bandera: "",
          banderaImagen: "assets/flags/nzl.svg",
          codigo: "NZL"
        }
      },
      {
        id: "fra-sen-fecha-1",
        grupo: "Grupo I",
        dia: "Martes 16 de junio",
        fechaISO: "2026-06-16",
        horario: "16:00",
        estadio: "MetLife Stadium",
        ciudad: "East Rutherford",
        local: {
          nombre: "Francia",
          bandera: "",
          banderaImagen: "assets/flags/fr.svg",
          codigo: "FRA"
        },
        visitante: {
          nombre: "Senegal",
          bandera: "",
          banderaImagen: "assets/flags/sen.svg",
          codigo: "SEN"
        }
      },
      {
        id: "irq-nor-fecha-1",
        grupo: "Grupo I",
        dia: "Martes 16 de junio",
        fechaISO: "2026-06-16",
        horario: "19:00",
        estadio: "Gillette Stadium",
        ciudad: "Foxborough",
        local: {
          nombre: "Irak",
          bandera: "",
          banderaImagen: "assets/flags/irq.svg",
          codigo: "IRQ"
        },
        visitante: {
          nombre: "Noruega",
          bandera: "",
          banderaImagen: "assets/flags/nor.svg",
          codigo: "NOR"
        }
      },
      {
        id: "arg-alg-fecha-1",
        grupo: "Grupo J",
        dia: "Martes 16 de junio",
        fechaISO: "2026-06-16",
        horario: "22:00",
        estadio: "Arrowhead Stadium",
        ciudad: "Kansas City",
        local: {
          nombre: "Argentina",
          bandera: "",
          banderaImagen: "assets/flags/ar.svg",
          codigo: "ARG"
        },
        visitante: {
          nombre: "Argelia",
          bandera: "",
          banderaImagen: "assets/flags/alg.svg",
          codigo: "ALG"
        }
      },
      {
        id: "aut-jor-fecha-1",
        grupo: "Grupo J",
        dia: "Miércoles 17 de junio",
        fechaISO: "2026-06-17",
        horario: "01:00",
        estadio: "Levi's Stadium",
        ciudad: "Santa Clara",
        local: {
          nombre: "Austria",
          bandera: "",
          banderaImagen: "assets/flags/aut.svg",
          codigo: "AUT"
        },
        visitante: {
          nombre: "Jordania",
          bandera: "",
          banderaImagen: "assets/flags/jor.svg",
          codigo: "JOR"
        }
      },
      {
        id: "por-cod-fecha-1",
        grupo: "Grupo K",
        dia: "Miércoles 17 de junio",
        fechaISO: "2026-06-17",
        horario: "14:00",
        estadio: "NRG Stadium",
        ciudad: "Houston",
        local: {
          nombre: "Portugal",
          bandera: "",
          banderaImagen: "assets/flags/pt.svg",
          codigo: "POR"
        },
        visitante: {
          nombre: "RD Congo",
          bandera: "",
          banderaImagen: "assets/flags/cod.svg",
          codigo: "COD"
        }
      },
      {
        id: "eng-cro-fecha-1",
        grupo: "Grupo L",
        dia: "Miércoles 17 de junio",
        fechaISO: "2026-06-17",
        horario: "17:00",
        estadio: "AT&T Stadium",
        ciudad: "Arlington",
        local: {
          nombre: "Inglaterra",
          bandera: "",
          banderaImagen: "assets/flags/gb-eng.svg",
          codigo: "ENG"
        },
        visitante: {
          nombre: "Croacia",
          bandera: "",
          banderaImagen: "assets/flags/cro.svg",
          codigo: "CRO"
        }
      },
      {
        id: "gha-pan-fecha-1",
        grupo: "Grupo L",
        dia: "Miércoles 17 de junio",
        fechaISO: "2026-06-17",
        horario: "20:00",
        estadio: "BMO Field",
        ciudad: "Toronto",
        local: {
          nombre: "Ghana",
          bandera: "",
          banderaImagen: "assets/flags/gha.svg",
          codigo: "GHA"
        },
        visitante: {
          nombre: "Panamá",
          bandera: "",
          banderaImagen: "assets/flags/pan.svg",
          codigo: "PAN"
        }
      },
      {
        id: "uzb-col-fecha-1",
        grupo: "Grupo K",
        dia: "Miércoles 17 de junio",
        fechaISO: "2026-06-17",
        horario: "23:00",
        estadio: "Estadio Azteca",
        ciudad: "Ciudad de México",
        local: {
          nombre: "Uzbekistán",
          bandera: "",
          banderaImagen: "assets/flags/uzb.svg",
          codigo: "UZB"
        },
        visitante: {
          nombre: "Colombia",
          bandera: "",
          banderaImagen: "assets/flags/co.svg",
          codigo: "COL"
        }
      }
    ]
  },
  {
    id: "fecha-2",
    nombre: "Fecha 2",
    fase: "Fase de grupos",
    cierrePronostico: "2026-06-18T12:30:00-03:00",
    descripcion: "Segunda fecha de la fase de grupos",
    partidos: [
      {
        id: "cze-rsa-fecha-2",
        grupo: "Grupo A",
        dia: "Jueves 18 de junio",
        fechaISO: "2026-06-18",
        horario: "13:00",
        estadio: "Mercedes-Benz Stadium",
        ciudad: "Atlanta",
        local: {
          nombre: "Chequia",
          bandera: "",
          banderaImagen: "assets/flags/cze.svg",
          codigo: "CZE"
        },
        visitante: {
          nombre: "Sudáfrica",
          bandera: "",
          banderaImagen: "assets/flags/za.svg",
          codigo: "RSA"
        }
      },
      {
        id: "sui-bih-fecha-2",
        grupo: "Grupo B",
        dia: "Jueves 18 de junio",
        fechaISO: "2026-06-18",
        horario: "16:00",
        estadio: "SoFi Stadium",
        ciudad: "Inglewood",
        local: {
          nombre: "Suiza",
          bandera: "",
          banderaImagen: "assets/flags/sui.svg",
          codigo: "SUI"
        },
        visitante: {
          nombre: "Bosnia y Herzegovina",
          bandera: "",
          banderaImagen: "assets/flags/bih.svg",
          codigo: "BIH"
        }
      },
      {
        id: "can-qat-fecha-2",
        grupo: "Grupo B",
        dia: "Jueves 18 de junio",
        fechaISO: "2026-06-18",
        horario: "19:00",
        estadio: "BC Place",
        ciudad: "Vancouver",
        local: {
          nombre: "Canadá",
          bandera: "",
          banderaImagen: "assets/flags/ca.svg",
          codigo: "CAN"
        },
        visitante: {
          nombre: "Qatar",
          bandera: "",
          banderaImagen: "assets/flags/qat.svg",
          codigo: "QAT"
        }
      },
      {
        id: "mex-kor-fecha-2",
        grupo: "Grupo A",
        dia: "Jueves 18 de junio",
        fechaISO: "2026-06-18",
        horario: "22:00",
        estadio: "Estadio Akron",
        ciudad: "Zapopan",
        local: {
          nombre: "México",
          bandera: "",
          banderaImagen: "assets/flags/mx.svg",
          codigo: "MEX"
        },
        visitante: {
          nombre: "Corea del Sur",
          bandera: "",
          banderaImagen: "assets/flags/kor.svg",
          codigo: "KOR"
        }
      },
      {
        id: "usa-aus-fecha-2",
        grupo: "Grupo D",
        dia: "Viernes 19 de junio",
        fechaISO: "2026-06-19",
        horario: "16:00",
        estadio: "Lumen Field",
        ciudad: "Seattle",
        local: {
          nombre: "Estados Unidos",
          bandera: "",
          banderaImagen: "assets/flags/us.svg",
          codigo: "USA"
        },
        visitante: {
          nombre: "Australia",
          bandera: "",
          banderaImagen: "assets/flags/aus.svg",
          codigo: "AUS"
        }
      },
      {
        id: "sco-mar-fecha-2",
        grupo: "Grupo C",
        dia: "Viernes 19 de junio",
        fechaISO: "2026-06-19",
        horario: "19:00",
        estadio: "Gillette Stadium",
        ciudad: "Foxborough",
        local: {
          nombre: "Escocia",
          bandera: "",
          banderaImagen: "assets/flags/sco.svg",
          codigo: "SCO"
        },
        visitante: {
          nombre: "Marruecos",
          bandera: "",
          banderaImagen: "assets/flags/ma.svg",
          codigo: "MAR"
        }
      },
      {
        id: "bra-hai-fecha-2",
        grupo: "Grupo C",
        dia: "Viernes 19 de junio",
        fechaISO: "2026-06-19",
        horario: "21:30",
        estadio: "Lincoln Financial Field",
        ciudad: "Filadelfia",
        local: {
          nombre: "Brasil",
          bandera: "",
          banderaImagen: "assets/flags/br.svg",
          codigo: "BRA"
        },
        visitante: {
          nombre: "Haití",
          bandera: "",
          banderaImagen: "assets/flags/hai.svg",
          codigo: "HAI"
        }
      },
      {
        id: "tur-par-fecha-2",
        grupo: "Grupo D",
        dia: "Sábado 20 de junio",
        fechaISO: "2026-06-20",
        horario: "00:00",
        estadio: "Levi's Stadium",
        ciudad: "Santa Clara",
        local: {
          nombre: "Turquía",
          bandera: "",
          banderaImagen: "assets/flags/tur.svg",
          codigo: "TUR"
        },
        visitante: {
          nombre: "Paraguay",
          bandera: "",
          banderaImagen: "assets/flags/par.svg",
          codigo: "PAR"
        }
      },
      {
        id: "ned-swe-fecha-2",
        grupo: "Grupo F",
        dia: "Sábado 20 de junio",
        fechaISO: "2026-06-20",
        horario: "14:00",
        estadio: "NRG Stadium",
        ciudad: "Houston",
        local: {
          nombre: "Países Bajos",
          bandera: "",
          banderaImagen: "assets/flags/ned.svg",
          codigo: "NED"
        },
        visitante: {
          nombre: "Suecia",
          bandera: "",
          banderaImagen: "assets/flags/swe.svg",
          codigo: "SWE"
        }
      },
      {
        id: "ger-civ-fecha-2",
        grupo: "Grupo E",
        dia: "Sábado 20 de junio",
        fechaISO: "2026-06-20",
        horario: "17:00",
        estadio: "BMO Field",
        ciudad: "Toronto",
        local: {
          nombre: "Alemania",
          bandera: "",
          banderaImagen: "assets/flags/de.svg",
          codigo: "GER"
        },
        visitante: {
          nombre: "Costa de Marfil",
          bandera: "",
          banderaImagen: "assets/flags/civ.svg",
          codigo: "CIV"
        }
      },
      {
        id: "ecu-cuw-fecha-2",
        grupo: "Grupo E",
        dia: "Sábado 20 de junio",
        fechaISO: "2026-06-20",
        horario: "21:00",
        estadio: "Arrowhead Stadium",
        ciudad: "Kansas City",
        local: {
          nombre: "Ecuador",
          bandera: "",
          banderaImagen: "assets/flags/ecu.svg",
          codigo: "ECU"
        },
        visitante: {
          nombre: "Curazao",
          bandera: "",
          banderaImagen: "assets/flags/cuw.svg",
          codigo: "CUW"
        }
      },
      {
        id: "tun-jpn-fecha-2",
        grupo: "Grupo F",
        dia: "Domingo 21 de junio",
        fechaISO: "2026-06-21",
        horario: "01:00",
        estadio: "Estadio BBVA",
        ciudad: "Guadalupe",
        local: {
          nombre: "Túnez",
          bandera: "",
          banderaImagen: "assets/flags/tun.svg",
          codigo: "TUN"
        },
        visitante: {
          nombre: "Japón",
          bandera: "",
          banderaImagen: "assets/flags/jp.svg",
          codigo: "JPN"
        }
      },
      {
        id: "esp-ksa-fecha-2",
        grupo: "Grupo H",
        dia: "Domingo 21 de junio",
        fechaISO: "2026-06-21",
        horario: "13:00",
        estadio: "Mercedes-Benz Stadium",
        ciudad: "Atlanta",
        local: {
          nombre: "España",
          bandera: "",
          banderaImagen: "assets/flags/es.svg",
          codigo: "ESP"
        },
        visitante: {
          nombre: "Arabia Saudita",
          bandera: "",
          banderaImagen: "assets/flags/ksa.svg",
          codigo: "KSA"
        }
      },
      {
        id: "bel-irn-fecha-2",
        grupo: "Grupo G",
        dia: "Domingo 21 de junio",
        fechaISO: "2026-06-21",
        horario: "16:00",
        estadio: "SoFi Stadium",
        ciudad: "Inglewood",
        local: {
          nombre: "Bélgica",
          bandera: "",
          banderaImagen: "assets/flags/bel.svg",
          codigo: "BEL"
        },
        visitante: {
          nombre: "Irán",
          bandera: "",
          banderaImagen: "assets/flags/irn.svg",
          codigo: "IRN"
        }
      },
      {
        id: "uru-cpv-fecha-2",
        grupo: "Grupo H",
        dia: "Domingo 21 de junio",
        fechaISO: "2026-06-21",
        horario: "19:00",
        estadio: "Hard Rock Stadium",
        ciudad: "Miami Gardens",
        local: {
          nombre: "Uruguay",
          bandera: "",
          banderaImagen: "assets/flags/uy.svg",
          codigo: "URU"
        },
        visitante: {
          nombre: "Cabo Verde",
          bandera: "",
          banderaImagen: "assets/flags/cpv.svg",
          codigo: "CPV"
        }
      },
      {
        id: "nzl-egy-fecha-2",
        grupo: "Grupo G",
        dia: "Domingo 21 de junio",
        fechaISO: "2026-06-21",
        horario: "22:00",
        estadio: "BC Place",
        ciudad: "Vancouver",
        local: {
          nombre: "Nueva Zelanda",
          bandera: "",
          banderaImagen: "assets/flags/nzl.svg",
          codigo: "NZL"
        },
        visitante: {
          nombre: "Egipto",
          bandera: "",
          banderaImagen: "assets/flags/egy.svg",
          codigo: "EGY"
        }
      },
      {
        id: "arg-aut-fecha-2",
        grupo: "Grupo J",
        dia: "Lunes 22 de junio",
        fechaISO: "2026-06-22",
        horario: "14:00",
        estadio: "AT&T Stadium",
        ciudad: "Arlington",
        local: {
          nombre: "Argentina",
          bandera: "",
          banderaImagen: "assets/flags/ar.svg",
          codigo: "ARG"
        },
        visitante: {
          nombre: "Austria",
          bandera: "",
          banderaImagen: "assets/flags/aut.svg",
          codigo: "AUT"
        }
      },
      {
        id: "fra-irq-fecha-2",
        grupo: "Grupo I",
        dia: "Lunes 22 de junio",
        fechaISO: "2026-06-22",
        horario: "18:00",
        estadio: "Lincoln Financial Field",
        ciudad: "Filadelfia",
        local: {
          nombre: "Francia",
          bandera: "",
          banderaImagen: "assets/flags/fr.svg",
          codigo: "FRA"
        },
        visitante: {
          nombre: "Irak",
          bandera: "",
          banderaImagen: "assets/flags/irq.svg",
          codigo: "IRQ"
        }
      },
      {
        id: "nor-sen-fecha-2",
        grupo: "Grupo I",
        dia: "Lunes 22 de junio",
        fechaISO: "2026-06-22",
        horario: "21:00",
        estadio: "MetLife Stadium",
        ciudad: "East Rutherford",
        local: {
          nombre: "Noruega",
          bandera: "",
          banderaImagen: "assets/flags/nor.svg",
          codigo: "NOR"
        },
        visitante: {
          nombre: "Senegal",
          bandera: "",
          banderaImagen: "assets/flags/sen.svg",
          codigo: "SEN"
        }
      },
      {
        id: "jor-alg-fecha-2",
        grupo: "Grupo J",
        dia: "Martes 23 de junio",
        fechaISO: "2026-06-23",
        horario: "00:00",
        estadio: "Levi's Stadium",
        ciudad: "Santa Clara",
        local: {
          nombre: "Jordania",
          bandera: "",
          banderaImagen: "assets/flags/jor.svg",
          codigo: "JOR"
        },
        visitante: {
          nombre: "Argelia",
          bandera: "",
          banderaImagen: "assets/flags/alg.svg",
          codigo: "ALG"
        }
      },
      {
        id: "por-uzb-fecha-2",
        grupo: "Grupo K",
        dia: "Martes 23 de junio",
        fechaISO: "2026-06-23",
        horario: "14:00",
        estadio: "NRG Stadium",
        ciudad: "Houston",
        local: {
          nombre: "Portugal",
          bandera: "",
          banderaImagen: "assets/flags/pt.svg",
          codigo: "POR"
        },
        visitante: {
          nombre: "Uzbekistán",
          bandera: "",
          banderaImagen: "assets/flags/uzb.svg",
          codigo: "UZB"
        }
      },
      {
        id: "eng-gha-fecha-2",
        grupo: "Grupo L",
        dia: "Martes 23 de junio",
        fechaISO: "2026-06-23",
        horario: "17:00",
        estadio: "Gillette Stadium",
        ciudad: "Foxborough",
        local: {
          nombre: "Inglaterra",
          bandera: "",
          banderaImagen: "assets/flags/gb-eng.svg",
          codigo: "ENG"
        },
        visitante: {
          nombre: "Ghana",
          bandera: "",
          banderaImagen: "assets/flags/gha.svg",
          codigo: "GHA"
        }
      },
      {
        id: "pan-cro-fecha-2",
        grupo: "Grupo L",
        dia: "Martes 23 de junio",
        fechaISO: "2026-06-23",
        horario: "20:00",
        estadio: "BMO Field",
        ciudad: "Toronto",
        local: {
          nombre: "Panamá",
          bandera: "",
          banderaImagen: "assets/flags/pan.svg",
          codigo: "PAN"
        },
        visitante: {
          nombre: "Croacia",
          bandera: "",
          banderaImagen: "assets/flags/cro.svg",
          codigo: "CRO"
        }
      },
      {
        id: "col-cod-fecha-2",
        grupo: "Grupo K",
        dia: "Martes 23 de junio",
        fechaISO: "2026-06-23",
        horario: "23:00",
        estadio: "Estadio Akron",
        ciudad: "Zapopan",
        local: {
          nombre: "Colombia",
          bandera: "",
          banderaImagen: "assets/flags/co.svg",
          codigo: "COL"
        },
        visitante: {
          nombre: "RD Congo",
          bandera: "",
          banderaImagen: "assets/flags/cod.svg",
          codigo: "COD"
        }
      }
    ]
  },
  {
    id: "fecha-3",
    nombre: "Fecha 3",
    fase: "Fase de grupos",
    cierrePronostico: "2026-06-24T15:30:00-03:00",
    descripcion: "Tercera fecha de la fase de grupos",
    partidos: [
      {
        id: "can-sui-fecha-3",
        grupo: "Grupo B",
        dia: "Miércoles 24 de junio",
        fechaISO: "2026-06-24",
        horario: "16:00",
        estadio: "BC Place",
        ciudad: "Vancouver",
        local: {
          nombre: "Canadá",
          bandera: "",
          banderaImagen: "assets/flags/ca.svg",
          codigo: "CAN"
        },
        visitante: {
          nombre: "Suiza",
          bandera: "",
          banderaImagen: "assets/flags/sui.svg",
          codigo: "SUI"
        }
      },
      {
        id: "bih-qat-fecha-3",
        grupo: "Grupo B",
        dia: "Miércoles 24 de junio",
        fechaISO: "2026-06-24",
        horario: "16:00",
        estadio: "Lumen Field",
        ciudad: "Seattle",
        local: {
          nombre: "Bosnia y Herzegovina",
          bandera: "",
          banderaImagen: "assets/flags/bih.svg",
          codigo: "BIH"
        },
        visitante: {
          nombre: "Qatar",
          bandera: "",
          banderaImagen: "assets/flags/qat.svg",
          codigo: "QAT"
        }
      },
      {
        id: "sco-bra-fecha-3",
        grupo: "Grupo C",
        dia: "Miércoles 24 de junio",
        fechaISO: "2026-06-24",
        horario: "19:00",
        estadio: "Hard Rock Stadium",
        ciudad: "Miami Gardens",
        local: {
          nombre: "Escocia",
          bandera: "",
          banderaImagen: "assets/flags/sco.svg",
          codigo: "SCO"
        },
        visitante: {
          nombre: "Brasil",
          bandera: "",
          banderaImagen: "assets/flags/br.svg",
          codigo: "BRA"
        }
      },
      {
        id: "mar-hai-fecha-3",
        grupo: "Grupo C",
        dia: "Miércoles 24 de junio",
        fechaISO: "2026-06-24",
        horario: "19:00",
        estadio: "Mercedes-Benz Stadium",
        ciudad: "Atlanta",
        local: {
          nombre: "Marruecos",
          bandera: "",
          banderaImagen: "assets/flags/ma.svg",
          codigo: "MAR"
        },
        visitante: {
          nombre: "Haití",
          bandera: "",
          banderaImagen: "assets/flags/hai.svg",
          codigo: "HAI"
        }
      },
      {
        id: "mex-cze-fecha-3",
        grupo: "Grupo A",
        dia: "Miércoles 24 de junio",
        fechaISO: "2026-06-24",
        horario: "22:00",
        estadio: "Estadio Azteca",
        ciudad: "Ciudad de México",
        local: {
          nombre: "México",
          bandera: "",
          banderaImagen: "assets/flags/mx.svg",
          codigo: "MEX"
        },
        visitante: {
          nombre: "Chequia",
          bandera: "",
          banderaImagen: "assets/flags/cze.svg",
          codigo: "CZE"
        }
      },
      {
        id: "rsa-kor-fecha-3",
        grupo: "Grupo A",
        dia: "Miércoles 24 de junio",
        fechaISO: "2026-06-24",
        horario: "22:00",
        estadio: "Estadio BBVA",
        ciudad: "Guadalupe",
        local: {
          nombre: "Sudáfrica",
          bandera: "",
          banderaImagen: "assets/flags/za.svg",
          codigo: "RSA"
        },
        visitante: {
          nombre: "Corea del Sur",
          bandera: "",
          banderaImagen: "assets/flags/kor.svg",
          codigo: "KOR"
        }
      },
      {
        id: "cuw-civ-fecha-3",
        grupo: "Grupo E",
        dia: "Jueves 25 de junio",
        fechaISO: "2026-06-25",
        horario: "17:00",
        estadio: "Lincoln Financial Field",
        ciudad: "Filadelfia",
        local: {
          nombre: "Curazao",
          bandera: "",
          banderaImagen: "assets/flags/cuw.svg",
          codigo: "CUW"
        },
        visitante: {
          nombre: "Costa de Marfil",
          bandera: "",
          banderaImagen: "assets/flags/civ.svg",
          codigo: "CIV"
        }
      },
      {
        id: "ecu-ger-fecha-3",
        grupo: "Grupo E",
        dia: "Jueves 25 de junio",
        fechaISO: "2026-06-25",
        horario: "17:00",
        estadio: "MetLife Stadium",
        ciudad: "East Rutherford",
        local: {
          nombre: "Ecuador",
          bandera: "",
          banderaImagen: "assets/flags/ecu.svg",
          codigo: "ECU"
        },
        visitante: {
          nombre: "Alemania",
          bandera: "",
          banderaImagen: "assets/flags/de.svg",
          codigo: "GER"
        }
      },
      {
        id: "jpn-swe-fecha-3",
        grupo: "Grupo F",
        dia: "Jueves 25 de junio",
        fechaISO: "2026-06-25",
        horario: "20:00",
        estadio: "AT&T Stadium",
        ciudad: "Arlington",
        local: {
          nombre: "Japón",
          bandera: "",
          banderaImagen: "assets/flags/jp.svg",
          codigo: "JPN"
        },
        visitante: {
          nombre: "Suecia",
          bandera: "",
          banderaImagen: "assets/flags/swe.svg",
          codigo: "SWE"
        }
      },
      {
        id: "tun-ned-fecha-3",
        grupo: "Grupo F",
        dia: "Jueves 25 de junio",
        fechaISO: "2026-06-25",
        horario: "20:00",
        estadio: "Arrowhead Stadium",
        ciudad: "Kansas City",
        local: {
          nombre: "Túnez",
          bandera: "",
          banderaImagen: "assets/flags/tun.svg",
          codigo: "TUN"
        },
        visitante: {
          nombre: "Países Bajos",
          bandera: "",
          banderaImagen: "assets/flags/ned.svg",
          codigo: "NED"
        }
      },
      {
        id: "tur-usa-fecha-3",
        grupo: "Grupo D",
        dia: "Jueves 25 de junio",
        fechaISO: "2026-06-25",
        horario: "23:00",
        estadio: "SoFi Stadium",
        ciudad: "Inglewood",
        local: {
          nombre: "Turquía",
          bandera: "",
          banderaImagen: "assets/flags/tur.svg",
          codigo: "TUR"
        },
        visitante: {
          nombre: "Estados Unidos",
          bandera: "",
          banderaImagen: "assets/flags/us.svg",
          codigo: "USA"
        }
      },
      {
        id: "par-aus-fecha-3",
        grupo: "Grupo D",
        dia: "Jueves 25 de junio",
        fechaISO: "2026-06-25",
        horario: "23:00",
        estadio: "Levi's Stadium",
        ciudad: "Santa Clara",
        local: {
          nombre: "Paraguay",
          bandera: "",
          banderaImagen: "assets/flags/par.svg",
          codigo: "PAR"
        },
        visitante: {
          nombre: "Australia",
          bandera: "",
          banderaImagen: "assets/flags/aus.svg",
          codigo: "AUS"
        }
      },
      {
        id: "nor-fra-fecha-3",
        grupo: "Grupo I",
        dia: "Viernes 26 de junio",
        fechaISO: "2026-06-26",
        horario: "16:00",
        estadio: "Gillette Stadium",
        ciudad: "Foxborough",
        local: {
          nombre: "Noruega",
          bandera: "",
          banderaImagen: "assets/flags/nor.svg",
          codigo: "NOR"
        },
        visitante: {
          nombre: "Francia",
          bandera: "",
          banderaImagen: "assets/flags/fr.svg",
          codigo: "FRA"
        }
      },
      {
        id: "irq-sen-fecha-3",
        grupo: "Grupo I",
        dia: "Viernes 26 de junio",
        fechaISO: "2026-06-26",
        horario: "16:00",
        estadio: "BMO Field",
        ciudad: "Toronto",
        local: {
          nombre: "Irak",
          bandera: "",
          banderaImagen: "assets/flags/irq.svg",
          codigo: "IRQ"
        },
        visitante: {
          nombre: "Senegal",
          bandera: "",
          banderaImagen: "assets/flags/sen.svg",
          codigo: "SEN"
        }
      },
      {
        id: "cpv-ksa-fecha-3",
        grupo: "Grupo H",
        dia: "Viernes 26 de junio",
        fechaISO: "2026-06-26",
        horario: "21:00",
        estadio: "NRG Stadium",
        ciudad: "Houston",
        local: {
          nombre: "Cabo Verde",
          bandera: "",
          banderaImagen: "assets/flags/cpv.svg",
          codigo: "CPV"
        },
        visitante: {
          nombre: "Arabia Saudita",
          bandera: "",
          banderaImagen: "assets/flags/ksa.svg",
          codigo: "KSA"
        }
      },
      {
        id: "uru-esp-fecha-3",
        grupo: "Grupo H",
        dia: "Viernes 26 de junio",
        fechaISO: "2026-06-26",
        horario: "21:00",
        estadio: "Estadio Akron",
        ciudad: "Zapopan",
        local: {
          nombre: "Uruguay",
          bandera: "",
          banderaImagen: "assets/flags/uy.svg",
          codigo: "URU"
        },
        visitante: {
          nombre: "España",
          bandera: "",
          banderaImagen: "assets/flags/es.svg",
          codigo: "ESP"
        }
      },
      {
        id: "egy-irn-fecha-3",
        grupo: "Grupo G",
        dia: "Sábado 27 de junio",
        fechaISO: "2026-06-27",
        horario: "00:00",
        estadio: "Lumen Field",
        ciudad: "Seattle",
        local: {
          nombre: "Egipto",
          bandera: "",
          banderaImagen: "assets/flags/egy.svg",
          codigo: "EGY"
        },
        visitante: {
          nombre: "Irán",
          bandera: "",
          banderaImagen: "assets/flags/irn.svg",
          codigo: "IRN"
        }
      },
      {
        id: "nzl-bel-fecha-3",
        grupo: "Grupo G",
        dia: "Sábado 27 de junio",
        fechaISO: "2026-06-27",
        horario: "00:00",
        estadio: "BC Place",
        ciudad: "Vancouver",
        local: {
          nombre: "Nueva Zelanda",
          bandera: "",
          banderaImagen: "assets/flags/nzl.svg",
          codigo: "NZL"
        },
        visitante: {
          nombre: "Bélgica",
          bandera: "",
          banderaImagen: "assets/flags/bel.svg",
          codigo: "BEL"
        }
      },
      {
        id: "pan-eng-fecha-3",
        grupo: "Grupo L",
        dia: "Sábado 27 de junio",
        fechaISO: "2026-06-27",
        horario: "18:00",
        estadio: "MetLife Stadium",
        ciudad: "East Rutherford",
        local: {
          nombre: "Panamá",
          bandera: "",
          banderaImagen: "assets/flags/pan.svg",
          codigo: "PAN"
        },
        visitante: {
          nombre: "Inglaterra",
          bandera: "",
          banderaImagen: "assets/flags/gb-eng.svg",
          codigo: "ENG"
        }
      },
      {
        id: "cro-gha-fecha-3",
        grupo: "Grupo L",
        dia: "Sábado 27 de junio",
        fechaISO: "2026-06-27",
        horario: "18:00",
        estadio: "Lincoln Financial Field",
        ciudad: "Filadelfia",
        local: {
          nombre: "Croacia",
          bandera: "",
          banderaImagen: "assets/flags/cro.svg",
          codigo: "CRO"
        },
        visitante: {
          nombre: "Ghana",
          bandera: "",
          banderaImagen: "assets/flags/gha.svg",
          codigo: "GHA"
        }
      },
      {
        id: "col-por-fecha-3",
        grupo: "Grupo K",
        dia: "Sábado 27 de junio",
        fechaISO: "2026-06-27",
        horario: "20:30",
        estadio: "Hard Rock Stadium",
        ciudad: "Miami Gardens",
        local: {
          nombre: "Colombia",
          bandera: "",
          banderaImagen: "assets/flags/co.svg",
          codigo: "COL"
        },
        visitante: {
          nombre: "Portugal",
          bandera: "",
          banderaImagen: "assets/flags/pt.svg",
          codigo: "POR"
        }
      },
      {
        id: "cod-uzb-fecha-3",
        grupo: "Grupo K",
        dia: "Sábado 27 de junio",
        fechaISO: "2026-06-27",
        horario: "20:30",
        estadio: "Mercedes-Benz Stadium",
        ciudad: "Atlanta",
        local: {
          nombre: "RD Congo",
          bandera: "",
          banderaImagen: "assets/flags/cod.svg",
          codigo: "COD"
        },
        visitante: {
          nombre: "Uzbekistán",
          bandera: "",
          banderaImagen: "assets/flags/uzb.svg",
          codigo: "UZB"
        }
      },
      {
        id: "alg-aut-fecha-3",
        grupo: "Grupo J",
        dia: "Sábado 27 de junio",
        fechaISO: "2026-06-27",
        horario: "23:00",
        estadio: "Arrowhead Stadium",
        ciudad: "Kansas City",
        local: {
          nombre: "Argelia",
          bandera: "",
          banderaImagen: "assets/flags/alg.svg",
          codigo: "ALG"
        },
        visitante: {
          nombre: "Austria",
          bandera: "",
          banderaImagen: "assets/flags/aut.svg",
          codigo: "AUT"
        }
      },
      {
        id: "jor-arg-fecha-3",
        grupo: "Grupo J",
        dia: "Sábado 27 de junio",
        fechaISO: "2026-06-27",
        horario: "23:00",
        estadio: "AT&T Stadium",
        ciudad: "Arlington",
        local: {
          nombre: "Jordania",
          bandera: "",
          banderaImagen: "assets/flags/jor.svg",
          codigo: "JOR"
        },
        visitante: {
          nombre: "Argentina",
          bandera: "",
          banderaImagen: "assets/flags/ar.svg",
          codigo: "ARG"
        }
      }
    ]
  }
];

/*
  Grupos editables para pronosticar posiciones finales.
  Para cambiar un grupo, editar el orden o los equipos aca.
  Mantener id, nombre, codigo y banderaImagen para que la app pueda guardar y mostrar sin imagenes rotas.
*/
const GRUPOS_MUNDIAL = [
  {
    id: "grupo-a",
    nombre: "Grupo A",
    equipos: [
      { nombre: "México", codigo: "MEX", bandera: "", banderaImagen: "assets/flags/mx.svg" },
      { nombre: "Sudáfrica", codigo: "RSA", bandera: "", banderaImagen: "assets/flags/za.svg" },
      { nombre: "Corea del Sur", codigo: "KOR", bandera: "", banderaImagen: "assets/flags/kor.svg" },
      { nombre: "Chequia", codigo: "CZE", bandera: "", banderaImagen: "assets/flags/cze.svg" }
    ]
  },
  {
    id: "grupo-b",
    nombre: "Grupo B",
    equipos: [
      { nombre: "Canadá", codigo: "CAN", bandera: "", banderaImagen: "assets/flags/ca.svg" },
      { nombre: "Bosnia y Herzegovina", codigo: "BIH", bandera: "", banderaImagen: "assets/flags/bih.svg" },
      { nombre: "Qatar", codigo: "QAT", bandera: "", banderaImagen: "assets/flags/qat.svg" },
      { nombre: "Suiza", codigo: "SUI", bandera: "", banderaImagen: "assets/flags/sui.svg" }
    ]
  },
  {
    id: "grupo-c",
    nombre: "Grupo C",
    equipos: [
      { nombre: "Brasil", codigo: "BRA", bandera: "", banderaImagen: "assets/flags/br.svg" },
      { nombre: "Marruecos", codigo: "MAR", bandera: "", banderaImagen: "assets/flags/ma.svg" },
      { nombre: "Haití", codigo: "HAI", bandera: "", banderaImagen: "assets/flags/hai.svg" },
      { nombre: "Escocia", codigo: "SCO", bandera: "", banderaImagen: "assets/flags/sco.svg" }
    ]
  },
  {
    id: "grupo-d",
    nombre: "Grupo D",
    equipos: [
      { nombre: "Estados Unidos", codigo: "USA", bandera: "", banderaImagen: "assets/flags/us.svg" },
      { nombre: "Paraguay", codigo: "PAR", bandera: "", banderaImagen: "assets/flags/par.svg" },
      { nombre: "Australia", codigo: "AUS", bandera: "", banderaImagen: "assets/flags/aus.svg" },
      { nombre: "Turquía", codigo: "TUR", bandera: "", banderaImagen: "assets/flags/tur.svg" }
    ]
  },
  {
    id: "grupo-e",
    nombre: "Grupo E",
    equipos: [
      { nombre: "Alemania", codigo: "GER", bandera: "", banderaImagen: "assets/flags/de.svg" },
      { nombre: "Curazao", codigo: "CUW", bandera: "", banderaImagen: "assets/flags/cuw.svg" },
      { nombre: "Costa de Marfil", codigo: "CIV", bandera: "", banderaImagen: "assets/flags/civ.svg" },
      { nombre: "Ecuador", codigo: "ECU", bandera: "", banderaImagen: "assets/flags/ecu.svg" }
    ]
  },
  {
    id: "grupo-f",
    nombre: "Grupo F",
    equipos: [
      { nombre: "Países Bajos", codigo: "NED", bandera: "", banderaImagen: "assets/flags/ned.svg" },
      { nombre: "Japón", codigo: "JPN", bandera: "", banderaImagen: "assets/flags/jp.svg" },
      { nombre: "Suecia", codigo: "SWE", bandera: "", banderaImagen: "assets/flags/swe.svg" },
      { nombre: "Túnez", codigo: "TUN", bandera: "", banderaImagen: "assets/flags/tun.svg" }
    ]
  },
  {
    id: "grupo-g",
    nombre: "Grupo G",
    equipos: [
      { nombre: "Bélgica", codigo: "BEL", bandera: "", banderaImagen: "assets/flags/bel.svg" },
      { nombre: "Egipto", codigo: "EGY", bandera: "", banderaImagen: "assets/flags/egy.svg" },
      { nombre: "Irán", codigo: "IRN", bandera: "", banderaImagen: "assets/flags/irn.svg" },
      { nombre: "Nueva Zelanda", codigo: "NZL", bandera: "", banderaImagen: "assets/flags/nzl.svg" }
    ]
  },
  {
    id: "grupo-h",
    nombre: "Grupo H",
    equipos: [
      { nombre: "España", codigo: "ESP", bandera: "", banderaImagen: "assets/flags/es.svg" },
      { nombre: "Cabo Verde", codigo: "CPV", bandera: "", banderaImagen: "assets/flags/cpv.svg" },
      { nombre: "Arabia Saudita", codigo: "KSA", bandera: "", banderaImagen: "assets/flags/ksa.svg" },
      { nombre: "Uruguay", codigo: "URU", bandera: "", banderaImagen: "assets/flags/uy.svg" }
    ]
  },
  {
    id: "grupo-i",
    nombre: "Grupo I",
    equipos: [
      { nombre: "Francia", codigo: "FRA", bandera: "", banderaImagen: "assets/flags/fr.svg" },
      { nombre: "Senegal", codigo: "SEN", bandera: "", banderaImagen: "assets/flags/sen.svg" },
      { nombre: "Irak", codigo: "IRQ", bandera: "", banderaImagen: "assets/flags/irq.svg" },
      { nombre: "Noruega", codigo: "NOR", bandera: "", banderaImagen: "assets/flags/nor.svg" }
    ]
  },
  {
    id: "grupo-j",
    nombre: "Grupo J",
    equipos: [
      { nombre: "Argentina", codigo: "ARG", bandera: "", banderaImagen: "assets/flags/ar.svg" },
      { nombre: "Argelia", codigo: "ALG", bandera: "", banderaImagen: "assets/flags/alg.svg" },
      { nombre: "Austria", codigo: "AUT", bandera: "", banderaImagen: "assets/flags/aut.svg" },
      { nombre: "Jordania", codigo: "JOR", bandera: "", banderaImagen: "assets/flags/jor.svg" }
    ]
  },
  {
    id: "grupo-k",
    nombre: "Grupo K",
    equipos: [
      { nombre: "Portugal", codigo: "POR", bandera: "", banderaImagen: "assets/flags/pt.svg" },
      { nombre: "RD Congo", codigo: "COD", bandera: "", banderaImagen: "assets/flags/cod.svg" },
      { nombre: "Uzbekistán", codigo: "UZB", bandera: "", banderaImagen: "assets/flags/uzb.svg" },
      { nombre: "Colombia", codigo: "COL", bandera: "", banderaImagen: "assets/flags/co.svg" }
    ]
  },
  {
    id: "grupo-l",
    nombre: "Grupo L",
    equipos: [
      { nombre: "Inglaterra", codigo: "ENG", bandera: "", banderaImagen: "assets/flags/gb-eng.svg" },
      { nombre: "Croacia", codigo: "CRO", bandera: "", banderaImagen: "assets/flags/cro.svg" },
      { nombre: "Ghana", codigo: "GHA", bandera: "", banderaImagen: "assets/flags/gha.svg" },
      { nombre: "Panamá", codigo: "PAN", bandera: "", banderaImagen: "assets/flags/pan.svg" }
    ]
  }
];

/*
  Resultados oficiales.
  Para cargar un resultado oficial, reemplazar null por el numero de goles.
  No modificar el id del partido.
*/
const RESULTADOS_OFICIALES = {
  "mex-rsa-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "kor-cze-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "can-bih-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "usa-par-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "qat-sui-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "bra-mar-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "hai-sco-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "aus-tur-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "ger-cuw-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "ned-jpn-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "civ-ecu-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "swe-tun-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "esp-cpv-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "bel-egy-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "ksa-uru-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "irn-nzl-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "fra-sen-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "irq-nor-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "arg-alg-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "aut-jor-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "por-cod-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "eng-cro-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "gha-pan-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "uzb-col-fecha-1": {
    golesLocal: null,
    golesVisitante: null
  },
  "cze-rsa-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "sui-bih-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "can-qat-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "mex-kor-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "usa-aus-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "sco-mar-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "bra-hai-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "tur-par-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "ned-swe-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "ger-civ-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "ecu-cuw-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "tun-jpn-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "esp-ksa-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "bel-irn-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "uru-cpv-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "nzl-egy-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "arg-aut-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "fra-irq-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "nor-sen-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "jor-alg-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "por-uzb-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "eng-gha-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "pan-cro-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "col-cod-fecha-2": {
    golesLocal: null,
    golesVisitante: null
  },
  "can-sui-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "bih-qat-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "sco-bra-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "mar-hai-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "mex-cze-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "rsa-kor-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "cuw-civ-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "ecu-ger-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "jpn-swe-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "tun-ned-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "tur-usa-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "par-aus-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "nor-fra-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "irq-sen-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "cpv-ksa-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "uru-esp-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "egy-irn-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "nzl-bel-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "pan-eng-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "cro-gha-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "col-por-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "cod-uzb-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "alg-aut-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  },
  "jor-arg-fecha-3": {
    golesLocal: null,
    golesVisitante: null
  }
};
