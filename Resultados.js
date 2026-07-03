/*
  Carga hardcodeada para generar la tabla.

  oficiales:
  - Pega aca los resultados reales de cada fecha.
  - En eliminatorias, marca con * el equipo que paso por penales.
  - Formato esperado:
    `
    Fecha: Fecha 1

    Mexico 0 - 0 Sudafrica
    Corea del Sur 0 - 0 Chequia
    `

  pronosticos:
  - Pega aca los mensajes completos que mandan por WhatsApp, uno por bloque.
  - Si un participante manda de nuevo la misma fecha, se usa el ultimo bloque cargado.

  oficialesGrupos:
  - Pega aca las posiciones finales reales de los grupos con el mismo formato de grupos.
  - No hace falta Participante.

  pronosticosGrupos:
  - Pega aca los mensajes completos de "Pronostico de grupos".
  - Cada puesto acertado suma 1 punto.

  Forma recomendada para cargar por codigo:
  - Al final de este archivo, pega:

    agregarPronosticoFecha(`
    Prode TAFA Copa del Mundo 2026
    Fecha: Fecha 1
    Participante: Nombre

    Mexico 1 - 0 Sudafrica
    `);

  - Para grupos:

    agregarPronosticoGrupos(`
    Prode TAFA Copa del Mundo 2026
    Pronostico de grupos
    Participante: Nombre

    Grupo A

    1. Mexico
    2. Sudafrica
    3. Corea del Sur
    4. Chequia
    `);
*/

function agregarPronosticoFecha(mensaje) {
  const texto = String(mensaje || "").trim();

  if (texto) {
    RESULTADOS_HARDCODEADOS.pronosticos.push(texto);
  }
}

function agregarPronosticoGrupos(mensaje) {
  const texto = String(mensaje || "").trim();

  if (texto) {
    RESULTADOS_HARDCODEADOS.pronosticosGrupos.push(texto);
  }
}

const RESULTADOS_HARDCODEADOS = {
  oficiales: [
`Fecha: Fecha 1

Mexico 2 - 0 Sudafrica
Corea del Sur 2 - 1 Chequia
Canada 1 - 1 Bosnia y Herzegovina
Estados Unidos 4 - 1 Paraguay
Qatar 1 - 1 Suiza
Brasil 1 - 1 Marruecos
Haiti 0 - 1 Escocia
Australia 2 - 0 Turquia
Alemania 7 - 1 Curazao
Paises Bajos 2 - 2 Japon
Costa de Marfil 1 - 0 Ecuador
Suecia 5 - 1 Tunez
Espana 0 - 0 Cabo Verde
Belgica 1 - 1 Egipto
Arabia Saudita 1 - 1 Uruguay
Iran 2 - 2 Nueva Zelanda
Francia 3 - 1 Senegal
Irak 1 - 4 Noruega
Argentina 3 - 0 Argelia
Austria 3 - 1 Jordania
Portugal 1 - 1 RD Congo
Inglaterra 4 - 2 Croacia
Ghana 1 - 0 Panama
Uzbekistan 1 - 3 Colombia`,

`Fecha: Fecha 2

Chequia 1 - 1 Sudafrica
Suiza 4 - 1 Bosnia y Herzegovina
Canada 6 - 0 Qatar
Mexico 1 - 0 Corea del Sur
Estados Unidos 2 - 0 Australia
Escocia 0 - 1 Marruecos
Brasil 3 - 0 Haiti
Turquia 0 - 1 Paraguay
Paises Bajos 5 - 1 Suecia
Alemania 2 - 1 Costa de Marfil
Ecuador 0 - 0 Curazao
Tunez 0 - 4 Japon
Espana 4 - 0 Arabia Saudita
Belgica 0 - 0 Iran
Uruguay 2 - 2 Cabo Verde
Nueva Zelanda 1 - 3 Egipto
Argentina 2 - 0 Austria
Francia 3 - 0 Irak
Noruega 3 - 2 Senegal
Jordania 1 - 2 Argelia
Portugal 5 - 0 Uzbekistan
Inglaterra 0 - 0 Ghana
Panama 0 - 1 Croacia
Colombia 1 - 0 RD Congo`,

`Fecha: Fecha 3

Canada 1 - 2 Suiza
Bosnia y Herzegovina 3 - 1 Qatar
Escocia 0 - 3 Brasil
Marruecos 4 - 2 Haiti
Mexico 3 - 0 Chequia
Sudafrica 1 - 0 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 2 - 1 Alemania
Japon 1 - 1 Suecia
Tunez 1 - 3 Paises Bajos
Turquia 3 - 2 Estados Unidos
Paraguay 0 - 0 Australia
Noruega 1 - 4 Francia
Irak 0 - 5 Senegal
Cabo Verde 0 - 0 Arabia Saudita
Uruguay 0 - 1 Espana
Egipto 0 - 0 Iran
Nueva Zelanda 1 - 5 Belgica
Panama 0 - 2 Inglaterra
Croacia 2 - 1 Ghana
Colombia 0 - 0 Portugal
RD Congo 3 - 1 Uzbekistan
Argelia 3 - 3 Austria
Jordania 1 - 3 Argentina`
  ],

  oficialesGrupos: [
`Grupo A

1. Mexico
2. Sudafrica
3. Corea del Sur
4. Chequia

Grupo B

1. Suiza
2. Canada
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haiti

Grupo D

1. Estados Unidos
2. Australia
3. Paraguay
4. Turquia

Grupo E

1. Alemania
2. Costa de Marfil
3. Ecuador
4. Curazao

Grupo F

1. Paises Bajos
2. Japon
3. Suecia
4. Tunez

Grupo G

1. Belgica
2. Egipto
3. Iran
4. Nueva Zelanda

Grupo H

1. Espana
2. Cabo Verde
3. Uruguay
4. Arabia Saudita

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Colombia
2. Portugal
3. RD Congo
4. Uzbekistan

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panama`
  ],

  pronosticos: [
`Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Benja

México 2 - 0 Sudáfrica
Corea del Sur 2 - 1 Chequia
Canadá 2 - 1 Bosnia y Herzegovina
Estados Unidos 1 - 2 Paraguay
Qatar 0 - 2 Suiza
Brasil 1 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 1 - 3 Turquía
Alemania 3 - 0 Curazao
Países Bajos 1 - 1 Japón
Costa de Marfil 1 - 2 Ecuador
Suecia 2 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 0 - 1 Nueva Zelanda
Francia 2 - 0 Senegal
Irak 0 - 2 Noruega
Argentina 2 - 0 Argelia
Austria 2 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Benja

Chequia 2 - 0 Sudáfrica
Suiza 2 - 1 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 2 - 1 Australia
Escocia 0 - 2 Marruecos
Brasil 2 - 0 Haití
Turquía 1 - 2 Paraguay
Países Bajos 2 - 0 Suecia
Alemania 3 - 0 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 1 Arabia Saudita
Bélgica 2 - 0 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 1 - 1 Egipto
Argentina 2 - 1 Austria
Francia 3 - 0 Irak
Noruega 1 - 1 Senegal
Jordania 0 - 2 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 2 - 1 Ghana
Panamá 0 - 1 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Benja

Canadá 1 - 2 Suiza
Bosnia y Herzegovina 2 - 0 Qatar
Escocia 0 - 2 Brasil
Marruecos 2 - 0 Haití
México 2 - 1 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 1 - 2 Alemania
Japón 2 - 1 Suecia
Túnez 0 - 2 Países Bajos
Turquía 1 - 2 Estados Unidos
Paraguay 2 - 1 Australia
Noruega 2 - 3 Francia
Irak 0 - 1 Senegal
Cabo Verde 0 - 1 Arabia Saudita
Uruguay 1 - 3 España
Egipto 2 - 1 Irán
Nueva Zelanda 0 - 1 Bélgica
Panamá 0 - 1 Inglaterra
Croacia 2 - 1 Ghana
Colombia 1 - 1 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 1 - 2 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Bruno Alonso

México 2 - 0 Sudáfrica
Corea del Sur 1 - 0 Chequia
Canadá 2 - 0 Bosnia y Herzegovina
Estados Unidos 1 - 1 Paraguay
Qatar 0 - 2 Suiza
Brasil 1 - 1 Marruecos
Haití 0 - 3 Escocia
Australia 1 - 0 Turquía
Alemania 4 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 0 - 0 Túnez
España 6 - 0 Cabo Verde
Bélgica 4 - 1 Egipto
Arabia Saudita 1 - 0 Uruguay
Irán 0 - 0 Nueva Zelanda
Francia 2 - 0 Senegal
Irak 0 - 4 Noruega
Argentina 2 - 1 Argelia
Austria 2 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 1 - 2 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 1 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Bruno Alonso

Chequia 2 - 0 Sudáfrica
Suiza 2 - 1 Bosnia y Herzegovina
Canadá 1 - 0 Qatar
México 1 - 2 Corea del Sur
Estados Unidos 2 - 2 Australia
Escocia 1 - 1 Marruecos
Brasil 3 - 0 Haití
Turquía 1 - 1 Paraguay
Países Bajos 2 - 2 Suecia
Alemania 3 - 1 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 2 Japón
España 3 - 0 Arabia Saudita
Bélgica 4 - 0 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 0 - 1 Egipto
Argentina 3 - 0 Austria
Francia 4 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 0 - 3 Argelia
Portugal 5 - 0 Uzbekistán
Inglaterra 6 - 1 Ghana
Panamá 1 - 3 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Bruno Alonso

Canadá 1 - 1 Suiza
Bosnia y Herzegovina 3 - 0 Qatar
Escocia 0 - 1 Brasil
Marruecos 3 - 0 Haití
México 2 - 0 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 1 - 3 Costa de Marfil
Ecuador 0 - 1 Alemania
Japón 2 - 0 Suecia
Túnez 0 - 5 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 1 - 1 Australia
Noruega 1 - 3 Francia
Irak 0 - 2 Senegal
Cabo Verde 0 - 0 Arabia Saudita
Uruguay 0 - 2 España
Egipto 2 - 1 Irán
Nueva Zelanda 0 - 1 Bélgica
Panamá 0 - 4 Inglaterra
Croacia 3 - 1 Ghana
Colombia 2 - 1 Portugal
RD Congo 2 - 0 Uzbekistán
Argelia 2 - 0 Austria
Jordania 0 - 2 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Cami

México 1 - 2 Sudáfrica
Corea del Sur 1 - 0 Chequia
Canadá 2 - 0 Bosnia y Herzegovina
Estados Unidos 1 - 1 Paraguay
Qatar 0 - 2 Suiza
Brasil 1 - 1 Marruecos
Haití 0 - 1 Escocia
Australia 2 - 1 Turquía
Alemania 2 - 0 Curazao
Países Bajos 2 - 2 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 0 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 0 - 1 Egipto
Arabia Saudita 0 - 2 Uruguay
Irán 0 - 2 Nueva Zelanda
Francia 2 - 0 Senegal
Irak 1 - 2 Noruega
Argentina 2 - 0 Argelia
Austria 1 - 0 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 1 - 1 Croacia
Ghana 1 - 1 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Cami

Chequia 2 - 0 Sudáfrica
Suiza 1 - 1 Bosnia y Herzegovina
Canadá 1 - 0 Qatar
México 1 - 2 Corea del Sur
Estados Unidos 2 - 0 Australia
Escocia 0 - 2 Marruecos
Brasil 1 - 0 Haití
Turquía 1 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 2 - 0 Costa de Marfil
Ecuador 1 - 0 Curazao
Túnez 1 - 2 Japón
España 2 - 0 Arabia Saudita
Bélgica 0 - 1 Irán
Uruguay 1 - 1 Cabo Verde
Nueva Zelanda 1 - 0 Egipto
Argentina 2 - 0 Austria
Francia 3 - 0 Irak
Noruega 3 - 1 Senegal
Jordania 0 - 1 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 1 - 0 Ghana
Panamá 1 - 2 Croacia
Colombia 1 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Cami

Canadá 1 - 1 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 1 - 2 Brasil
Marruecos 2 - 0 Haití
México 1 - 0 Chequia
Sudáfrica 0 - 3 Corea del Sur
Curazao 0 - 1 Costa de Marfil
Ecuador 0 - 2 Alemania
Japón 2 - 1 Suecia
Túnez 0 - 3 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 1 - 0 Australia
Noruega 1 - 2 Francia
Irak 1 - 1 Senegal
Cabo Verde 1 - 0 Arabia Saudita
Uruguay 0 - 2 España
Egipto 1 - 0 Irán
Nueva Zelanda 2 - 0 Bélgica
Panamá 0 - 1 Inglaterra
Croacia 1 - 1 Ghana
Colombia 2 - 1 Portugal
RD Congo 0 - 0 Uzbekistán
Argelia 0 - 1 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Cristian Serpico

México 1 - 0 Sudáfrica
Corea del Sur 1 - 0 Chequia
Canadá 2 - 0 Bosnia y Herzegovina
Estados Unidos 0 - 1 Paraguay
Qatar 1 - 0 Suiza
Brasil 0 - 1 Marruecos
Haití 0 - 0 Escocia
Australia 1 - 0 Turquía
Alemania 2 - 0 Curazao
Países Bajos 2 - 0 Japón
Costa de Marfil 0 - 2 Ecuador
Suecia 2 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 1 - 1 Egipto
Arabia Saudita 2 - 2 Uruguay
Irán 0 - 1 Nueva Zelanda
Francia 3 - 0 Senegal
Irak 1 - 1 Noruega
Argentina 1 - 0 Argelia
Austria 1 - 0 Jordania
Portugal 1 - 0 RD Congo
Inglaterra 1 - 0 Croacia
Ghana 0 - 1 Panamá
Uzbekistán 0 - 1 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Cristian Serpico

Chequia 1 - 0 Sudáfrica
Suiza 1 - 0 Bosnia y Herzegovina
Canadá 1 - 0 Qatar
México 0 - 1 Corea del Sur
Estados Unidos 2 - 0 Australia
Escocia 0 - 2 Marruecos
Brasil 1 - 0 Haití
Turquía 2 - 0 Paraguay
Países Bajos 0 - 1 Suecia
Alemania 3 - 0 Costa de Marfil
Ecuador 1 - 1 Curazao
Túnez 1 - 0 Japón
España 1 - 1 Arabia Saudita
Bélgica 0 - 1 Irán
Uruguay 0 - 1 Cabo Verde
Nueva Zelanda 0 - 1 Egipto
Argentina 1 - 0 Austria
Francia 2 - 0 Irak
Noruega 2 - 0 Senegal
Jordania 1 - 1 Argelia
Portugal 0 - 1 Uzbekistán
Inglaterra 0 - 1 Ghana
Panamá 0 - 1 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Cristian Serpico

Canadá 1 - 0 Suiza
Bosnia y Herzegovina 1 - 1 Qatar
Escocia 0 - 1 Brasil
Marruecos 2 - 0 Haití
México 1 - 1 Chequia
Sudáfrica 1 - 1 Corea del Sur
Curazao 1 - 0 Costa de Marfil
Ecuador 0 - 1 Alemania
Japón 1 - 0 Suecia
Túnez 0 - 1 Países Bajos
Turquía 0 - 1 Estados Unidos
Paraguay 0 - 1 Australia
Noruega 1 - 1 Francia
Irak 1 - 1 Senegal
Cabo Verde 1 - 0 Arabia Saudita
Uruguay 1 - 2 España
Egipto 1 - 0 Irán
Nueva Zelanda 1 - 0 Bélgica
Panamá 0 - 1 Inglaterra
Croacia 1 - 0 Ghana
Colombia 1 - 0 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 1 - 0 Austria
Jordania 0 - 1 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Cundo

México 1 - 0 Sudáfrica
Corea del Sur 0 - 1 Chequia
Canadá 2 - 0 Bosnia y Herzegovina
Estados Unidos 1 - 2 Paraguay
Qatar 0 - 1 Suiza
Brasil 1 - 2 Marruecos
Haití 1 - 1 Escocia
Australia 1 - 0 Turquía
Alemania 5 - 1 Curazao
Países Bajos 1 - 2 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 1 - 1 Túnez
España 4 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 1 - 2 Uruguay
Irán 1 - 1 Nueva Zelanda
Francia 3 - 1 Senegal
Irak 0 - 2 Noruega
Argentina 2 - 0 Argelia
Austria 1 - 0 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 0 - 1 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Cundo

Chequia 1 - 0 Sudáfrica
Suiza 2 - 0 Bosnia y Herzegovina
Canadá 1 - 1 Qatar
México 1 - 2 Corea del Sur
Estados Unidos 3 - 1 Australia
Escocia 1 - 2 Marruecos
Brasil 3 - 0 Haití
Turquía 1 - 1 Paraguay
Países Bajos 2 - 0 Suecia
Alemania 3 - 0 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 1 Arabia Saudita
Bélgica 1 - 2 Irán
Uruguay 3 - 0 Cabo Verde
Nueva Zelanda 0 - 2 Egipto
Argentina 2 - 1 Austria
Francia 3 - 1 Irak
Noruega 2 - 1 Senegal
Jordania 0 - 2 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 2 - 0 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Cundo

Canadá 2 - 0 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 0 - 3 Brasil
Marruecos 2 - 0 Haití
México 2 - 0 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 1 - 3 Alemania
Japón 2 - 0 Suecia
Túnez 0 - 2 Países Bajos
Turquía 0 - 3 Estados Unidos
Paraguay 1 - 0 Australia
Noruega 1 - 2 Francia
Irak 0 - 1 Senegal
Cabo Verde 1 - 0 Arabia Saudita
Uruguay 1 - 3 España
Egipto 2 - 0 Irán
Nueva Zelanda 0 - 2 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 1 - 1 Ghana
Colombia 1 - 2 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 2 - 0 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Eze

México 2 - 1 Sudáfrica
Corea del Sur 2 - 0 Chequia
Canadá 2 - 1 Bosnia y Herzegovina
Estados Unidos 1 - 1 Paraguay
Qatar 0 - 2 Suiza
Brasil 3 - 2 Marruecos
Haití 0 - 3 Escocia
Australia 1 - 1 Turquía
Alemania 5 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 0 - 2 Ecuador
Suecia 1 - 0 Túnez
España 5 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 0 - 2 Uruguay
Irán 3 - 1 Nueva Zelanda
Francia 3 - 1 Senegal
Irak 0 - 2 Noruega
Argentina 2 - 0 Argelia
Austria 2 - 0 Jordania
Portugal 4 - 0 RD Congo
Inglaterra 3 - 1 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 3 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Eze

Chequia 2 - 0 Sudáfrica
Suiza 1 - 0 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 1 - 2 Corea del Sur
Estados Unidos 3 - 1 Australia
Escocia 0 - 2 Marruecos
Brasil 3 - 0 Haití
Turquía 0 - 1 Paraguay
Países Bajos 2 - 0 Suecia
Alemania 2 - 1 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 1 - 2 Japón
España 2 - 0 Arabia Saudita
Bélgica 2 - 0 Irán
Uruguay 3 - 0 Cabo Verde
Nueva Zelanda 0 - 2 Egipto
Argentina 2 - 0 Austria
Francia 3 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 1 - 2 Argelia
Portugal 3 - 1 Uzbekistán
Inglaterra 3 - 0 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Eze

Canadá 1 - 2 Suiza
Bosnia y Herzegovina 2 - 0 Qatar
Escocia 0 - 2 Brasil
Marruecos 3 - 0 Haití
México 1 - 0 Chequia
Sudáfrica 0 - 3 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 0 - 3 Alemania
Japón 2 - 1 Suecia
Túnez 0 - 2 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 1 - 1 Australia
Noruega 1 - 2 Francia
Irak 0 - 2 Senegal
Cabo Verde 0 - 2 Arabia Saudita
Uruguay 1 - 2 España
Egipto 2 - 1 Irán
Nueva Zelanda 0 - 2 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 2 - 0 Ghana
Colombia 1 - 2 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 1 - 2 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Fabrizio Escolano

México 2 - 1 Sudáfrica
Corea del Sur 1 - 2 Chequia
Canadá 1 - 2 Bosnia y Herzegovina
Estados Unidos 0 - 1 Paraguay
Qatar 0 - 3 Suiza
Brasil 0 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 1 - 2 Turquía
Alemania 4 - 0 Curazao
Países Bajos 1 - 2 Japón
Costa de Marfil 1 - 1 Ecuador
Suecia 2 - 1 Túnez
España 3 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 1 - 1 Uruguay
Irán 2 - 0 Nueva Zelanda
Francia 2 - 1 Senegal
Irak 0 - 2 Noruega
Argentina 2 - 1 Argelia
Austria 2 - 0 Jordania
Portugal 2 - 1 RD Congo
Inglaterra 2 - 0 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 1 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Fabrizio Escolano

Chequia 2 - 1 Sudáfrica
Suiza 2 - 0 Bosnia y Herzegovina
Canadá 2 - 1 Qatar
México 2 - 2 Corea del Sur
Estados Unidos 2 - 1 Australia
Escocia 0 - 2 Marruecos
Brasil 4 - 1 Haití
Turquía 3 - 1 Paraguay
Países Bajos 1 - 2 Suecia
Alemania 1 - 0 Costa de Marfil
Ecuador 3 - 0 Curazao
Túnez 0 - 3 Japón
España 1 - 1 Arabia Saudita
Bélgica 2 - 0 Irán
Uruguay 1 - 0 Cabo Verde
Nueva Zelanda 0 - 1 Egipto
Argentina 2 - 1 Austria
Francia 3 - 0 Irak
Noruega 2 - 2 Senegal
Jordania 1 - 2 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 3 - 0 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 1 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Fabrizio Escolano

Canadá 1 - 1 Suiza
Bosnia y Herzegovina 2 - 1 Qatar
Escocia 0 - 1 Brasil
Marruecos 2 - 0 Haití
México 2 - 1 Chequia
Sudáfrica 0 - 1 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 0 - 2 Alemania
Japón 1 - 0 Suecia
Túnez 1 - 1 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 2 - 1 Australia
Noruega 1 - 3 Francia
Irak 0 - 3 Senegal
Cabo Verde 0 - 1 Arabia Saudita
Uruguay 0 - 1 España
Egipto 1 - 2 Irán
Nueva Zelanda 1 - 1 Bélgica
Panamá 0 - 2 Inglaterra
Croacia 0 - 1 Ghana
Colombia 2 - 1 Portugal
RD Congo 2 - 0 Uzbekistán
Argelia 2 - 1 Austria
Jordania 1 - 2 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Felipe Galante

México 2 - 1 Sudáfrica
Corea del Sur 1 - 0 Chequia
Canadá 2 - 0 Bosnia y Herzegovina
Estados Unidos 0 - 1 Paraguay
Qatar 0 - 1 Suiza
Brasil 2 - 2 Marruecos
Haití 0 - 3 Escocia
Australia 0 - 2 Turquía
Alemania 4 - 0 Curazao
Países Bajos 1 - 1 Japón
Costa de Marfil 1 - 2 Ecuador
Suecia 1 - 0 Túnez
España 5 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 1 - 2 Uruguay
Irán 1 - 0 Nueva Zelanda
Francia 3 - 1 Senegal
Irak 0 - 2 Noruega
Argentina 2 - 1 Argelia
Austria 2 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 3 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Felipe Galante

Chequia 2 - 0 Sudáfrica
Suiza 2 - 1 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 1 - 2 Corea del Sur
Estados Unidos 1 - 1 Australia
Escocia 1 - 3 Marruecos
Brasil 3 - 0 Haití
Turquía 1 - 0 Paraguay
Países Bajos 2 - 0 Suecia
Alemania 4 - 1 Costa de Marfil
Ecuador 3 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 1 Arabia Saudita
Bélgica 1 - 0 Irán
Uruguay 3 - 0 Cabo Verde
Nueva Zelanda 1 - 3 Egipto
Argentina 2 - 1 Austria
Francia 4 - 0 Irak
Noruega 1 - 0 Senegal
Jordania 1 - 2 Argelia
Portugal 3 - 0 Uzbekistán
Inglaterra 3 - 0 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 1 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Gabriel Talarico

México 1 - 1 Sudáfrica
Corea del Sur 1 - 0 Chequia
Canadá 1 - 0 Bosnia y Herzegovina
Estados Unidos 1 - 1 Paraguay
Qatar 0 - 1 Suiza
Brasil 2 - 0 Marruecos
Haití 0 - 2 Escocia
Australia 1 - 0 Turquía
Alemania 3 - 0 Curazao
Países Bajos 1 - 2 Japón
Costa de Marfil 1 - 1 Ecuador
Suecia 1 - 0 Túnez
España 4 - 0 Cabo Verde
Bélgica 1 - 1 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 0 - 0 Nueva Zelanda
Francia 2 - 0 Senegal
Irak 0 - 1 Noruega
Argentina 1 - 0 Argelia
Austria 2 - 0 Jordania
Portugal 4 - 0 RD Congo
Inglaterra 1 - 0 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 1 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Gabriel Talarico

Chequia 1 - 0 Sudáfrica
Suiza 1 - 0 Bosnia y Herzegovina
Canadá 1 - 0 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 2 - 0 Australia
Escocia 0 - 1 Marruecos
Brasil 2 - 0 Haití
Turquía 0 - 1 Paraguay
Países Bajos 1 - 1 Suecia
Alemania 2 - 0 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 0 Arabia Saudita
Bélgica 1 - 0 Irán
Uruguay 1 - 0 Cabo Verde
Nueva Zelanda 0 - 1 Egipto
Argentina 2 - 0 Austria
Francia 3 - 0 Irak
Noruega 1 - 0 Senegal
Jordania 0 - 1 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 2 - 0 Ghana
Panamá 0 - 1 Croacia
Colombia 1 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Gabriel Talarico

Canadá 1 - 0 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 0 - 2 Brasil
Marruecos 2 - 0 Haití
México 1 - 0 Chequia
Sudáfrica 0 - 1 Corea del Sur
Curazao 0 - 1 Costa de Marfil
Ecuador 1 - 2 Alemania
Japón 2 - 0 Suecia
Túnez 0 - 2 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 1 - 1 Australia
Noruega 1 - 2 Francia
Irak 0 - 1 Senegal
Cabo Verde 1 - 0 Arabia Saudita
Uruguay 0 - 2 España
Egipto 1 - 0 Irán
Nueva Zelanda 0 - 1 Bélgica
Panamá 0 - 2 Inglaterra
Croacia 1 - 0 Ghana
Colombia 1 - 1 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 1 - 1 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Ignacio Cejas

México 2 - 0 Sudáfrica
Corea del Sur 2 - 1 Chequia
Canadá 1 - 0 Bosnia y Herzegovina
Estados Unidos 2 - 2 Paraguay
Qatar 0 - 3 Suiza
Brasil 2 - 2 Marruecos
Haití 1 - 2 Escocia
Australia 0 - 1 Turquía
Alemania 4 - 0 Curazao
Países Bajos 1 - 2 Japón
Costa de Marfil 1 - 2 Ecuador
Suecia 3 - 1 Túnez
España 3 - 0 Cabo Verde
Bélgica 3 - 0 Egipto
Arabia Saudita 2 - 1 Uruguay
Irán 1 - 0 Nueva Zelanda
Francia 3 - 2 Senegal
Irak 0 - 4 Noruega
Argentina 2 - 0 Argelia
Austria 3 - 0 Jordania
Portugal 4 - 1 RD Congo
Inglaterra 3 - 2 Croacia
Ghana 2 - 1 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Ignacio Cejas

Chequia 3 - 0 Sudáfrica
Suiza 1 - 2 Bosnia y Herzegovina
Canadá 2 - 1 Qatar
México 0 - 2 Corea del Sur
Estados Unidos 3 - 1 Australia
Escocia 1 - 2 Marruecos
Brasil 3 - 0 Haití
Turquía 1 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 4 - 2 Costa de Marfil
Ecuador 3 - 0 Curazao
Túnez 1 - 3 Japón
España 2 - 1 Arabia Saudita
Bélgica 2 - 0 Irán
Uruguay 1 - 0 Cabo Verde
Nueva Zelanda 1 - 2 Egipto
Argentina 3 - 1 Austria
Francia 5 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 1 - 2 Argelia
Portugal 2 - 1 Uzbekistán
Inglaterra 4 - 1 Ghana
Panamá 0 - 3 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Ignacio Cejas

Canadá 2 - 1 Suiza
Bosnia y Herzegovina 2 - 0 Qatar
Escocia 0 - 3 Brasil
Marruecos 2 - 1 Haití
México 2 - 0 Chequia
Sudáfrica 0 - 3 Corea del Sur
Curazao 1 - 2 Costa de Marfil
Ecuador 0 - 2 Alemania
Japón 3 - 2 Suecia
Túnez 0 - 3 Países Bajos
Turquía 0 - 3 Estados Unidos
Paraguay 2 - 1 Australia
Noruega 3 - 2 Francia
Irak 1 - 2 Senegal
Cabo Verde 1 - 0 Arabia Saudita
Uruguay 0 - 2 España
Egipto 1 - 1 Irán
Nueva Zelanda 0 - 1 Bélgica
Panamá 0 - 2 Inglaterra
Croacia 2 - 1 Ghana
Colombia 1 - 1 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 1 - 2 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Jhose

México 2 - 1 Sudáfrica
Corea del Sur 2 - 0 Chequia
Canadá 2 - 0 Bosnia y Herzegovina
Estados Unidos 0 - 1 Paraguay
Qatar 0 - 2 Suiza
Brasil 1 - 1 Marruecos
Haití 1 - 0 Escocia
Australia 0 - 2 Turquía
Alemania 4 - 0 Curazao
Países Bajos 2 - 0 Japón
Costa de Marfil 1 - 1 Ecuador
Suecia 1 - 0 Túnez
España 5 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 1 - 0 Uruguay
Irán 0 - 0 Nueva Zelanda
Francia 3 - 0 Senegal
Irak 0 - 1 Noruega
Argentina 2 - 1 Argelia
Austria 2 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 1 - 1 Croacia
Ghana 1 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Jhose

Chequia 2 - 0 Sudáfrica
Suiza 2 - 0 Bosnia y Herzegovina
Canadá 3 - 0 Qatar
México 1 - 2 Corea del Sur
Estados Unidos 4 - 0 Australia
Escocia 0 - 2 Marruecos
Brasil 2 - 0 Haití
Turquía 1 - 2 Paraguay
Países Bajos 2 - 0 Suecia
Alemania 4 - 1 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 2 Japón
España 3 - 0 Arabia Saudita
Bélgica 4 - 0 Irán
Uruguay 2 - 1 Cabo Verde
Nueva Zelanda 0 - 2 Egipto
Argentina 2 - 1 Austria
Francia 5 - 0 Irak
Noruega 3 - 1 Senegal
Jordania 0 - 2 Argelia
Portugal 3 - 0 Uzbekistán
Inglaterra 3 - 1 Ghana
Panamá 0 - 2 Croacia
Colombia 3 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Jhose

Canadá 2 - 1 Suiza
Bosnia y Herzegovina 2 - 0 Qatar
Escocia 1 - 2 Brasil
Marruecos 4 - 0 Haití
México 1 - 0 Chequia
Sudáfrica 0 - 1 Corea del Sur
Curazao 0 - 3 Costa de Marfil
Ecuador 1 - 1 Alemania
Japón 2 - 2 Suecia
Túnez 0 - 3 Países Bajos
Turquía 0 - 3 Estados Unidos
Paraguay 2 - 0 Australia
Noruega 1 - 1 Francia
Irak 1 - 2 Senegal
Cabo Verde 0 - 2 Arabia Saudita
Uruguay 0 - 2 España
Egipto 2 - 0 Irán
Nueva Zelanda 0 - 3 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 1 - 1 Ghana
Colombia 1 - 1 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 0 - 2 Austria
Jordania 0 - 4 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Kevin Sívori

México 1 - 0 Sudáfrica
Corea del Sur 2 - 0 Chequia
Canadá 1 - 1 Bosnia y Herzegovina
Estados Unidos 2 - 1 Paraguay
Qatar 0 - 1 Suiza
Brasil 2 - 0 Marruecos
Haití 0 - 1 Escocia
Australia 0 - 1 Turquía
Alemania 4 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 0 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 0 - 0 Nueva Zelanda
Francia 2 - 1 Senegal
Irak 0 - 2 Noruega
Argentina 1 - 0 Argelia
Austria 3 - 0 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 1 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Kevin Sívori

Chequia 2 - 1 Sudáfrica
Suiza 3 - 1 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 2 - 1 Australia
Escocia 0 - 2 Marruecos
Brasil 3 - 0 Haití
Turquía 0 - 2 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 2 - 0 Costa de Marfil
Ecuador 3 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 0 Arabia Saudita
Bélgica 2 - 1 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 0 - 1 Egipto
Argentina 2 - 1 Austria
Francia 3 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 0 - 1 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 3 - 1 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Kevin Sívori

Canadá 0 - 2 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 0 - 2 Brasil
Marruecos 3 - 0 Haití
México 1 - 1 Chequia
Sudáfrica 0 - 1 Corea del Sur
Curazao 1 - 3 Costa de Marfil
Ecuador 0 - 2 Alemania
Japón 2 - 1 Suecia
Túnez 0 - 2 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 2 - 0 Australia
Noruega 1 - 2 Francia
Irak 0 - 1 Senegal
Cabo Verde 0 - 1 Arabia Saudita
Uruguay 0 - 2 España
Egipto 1 - 1 Irán
Nueva Zelanda 0 - 2 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 2 - 0 Ghana
Colombia 0 - 2 Portugal
RD Congo 0 - 0 Uzbekistán
Argelia 0 - 1 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Kraiizer

México 2 - 0 Sudáfrica
Corea del Sur 1 - 0 Chequia
Canadá 3 - 0 Bosnia y Herzegovina
Estados Unidos 0 - 2 Paraguay
Qatar 0 - 4 Suiza
Brasil 1 - 2 Marruecos
Haití 0 - 3 Escocia
Australia 0 - 0 Turquía
Alemania 4 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 1 - 2 Ecuador
Suecia 2 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 1 - 2 Uruguay
Irán 0 - 2 Nueva Zelanda
Francia 3 - 0 Senegal
Irak 0 - 4 Noruega
Argentina 2 - 0 Argelia
Austria 1 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 2 - 3 Croacia
Ghana 1 - 1 Panamá
Uzbekistán 0 - 3 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Kraiizer

Chequia 1 - 2 Sudáfrica
Suiza 2 - 0 Bosnia y Herzegovina
Canadá 2 - 1 Qatar
México 2 - 1 Corea del Sur
Estados Unidos 1 - 2 Australia
Escocia 1 - 2 Marruecos
Brasil 3 - 0 Haití
Turquía 1 - 2 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 4 - 0 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 0 Arabia Saudita
Bélgica 3 - 1 Irán
Uruguay 1 - 0 Cabo Verde
Nueva Zelanda 1 - 2 Egipto
Argentina 2 - 0 Austria
Francia 2 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 0 - 1 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 2 - 0 Ghana
Panamá 0 - 3 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Kraiizer

Canadá 1 - 2 Suiza
Bosnia y Herzegovina 3 - 0 Qatar
Escocia 1 - 3 Brasil
Marruecos 3 - 0 Haití
México 1 - 2 Chequia
Sudáfrica 1 - 2 Corea del Sur
Curazao 1 - 1 Costa de Marfil
Ecuador 0 - 2 Alemania
Japón 2 - 2 Suecia
Túnez 0 - 2 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 1 - 2 Australia
Noruega 2 - 2 Francia
Irak 1 - 2 Senegal
Cabo Verde 1 - 1 Arabia Saudita
Uruguay 1 - 2 España
Egipto 1 - 0 Irán
Nueva Zelanda 0 - 2 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 3 - 0 Ghana
Colombia 1 - 2 Portugal
RD Congo 0 - 1 Uzbekistán
Argelia 0 - 1 Austria
Jordania 0 - 1 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Lucas Aguilera

México 1 - 0 Sudáfrica
Corea del Sur 2 - 0 Chequia
Canadá 1 - 0 Bosnia y Herzegovina
Estados Unidos 1 - 1 Paraguay
Qatar 0 - 1 Suiza
Brasil 1 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 0 - 1 Turquía
Alemania 3 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 1 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 1 - 1 Uruguay
Irán 1 - 0 Nueva Zelanda
Francia 2 - 1 Senegal
Irak 0 - 1 Noruega
Argentina 2 - 0 Argelia
Austria 0 - 0 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 1 - 0 Panamá
Uzbekistán 0 - 1 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Lucas Aguilera

Chequia 2 - 0 Sudáfrica
Suiza 2 - 1 Bosnia y Herzegovina
Canadá 1 - 1 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 2 - 0 Australia
Escocia 0 - 1 Marruecos
Brasil 3 - 1 Haití
Turquía 1 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 3 - 0 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 1 Japón
España 2 - 1 Arabia Saudita
Bélgica 2 - 0 Irán
Uruguay 3 - 0 Cabo Verde
Nueva Zelanda 0 - 1 Egipto
Argentina 2 - 1 Austria
Francia 3 - 0 Irak
Noruega 2 - 0 Senegal
Jordania 0 - 2 Argelia
Portugal 3 - 0 Uzbekistán
Inglaterra 3 - 0 Ghana
Panamá 0 - 2 Croacia
Colombia 3 - 1 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Lucas Aguilera

Canadá 1 - 1 Suiza
Bosnia y Herzegovina 2 - 0 Qatar
Escocia 1 - 2 Brasil
Marruecos 3 - 0 Haití
México 2 - 1 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 0 - 3 Costa de Marfil
Ecuador 1 - 3 Alemania
Japón 2 - 1 Suecia
Túnez 0 - 3 Países Bajos
Turquía 0 - 1 Estados Unidos
Paraguay 1 - 0 Australia
Noruega 1 - 2 Francia
Irak 0 - 2 Senegal
Cabo Verde 0 - 1 Arabia Saudita
Uruguay 1 - 1 España
Egipto 2 - 1 Irán
Nueva Zelanda 0 - 1 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 1 - 1 Ghana
Colombia 1 - 2 Portugal
RD Congo 1 - 1 Uzbekistán
Argelia 1 - 2 Austria
Jordania 0 - 2 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Lucas Insua

México 2 - 0 Sudáfrica
Corea del Sur 1 - 1 Chequia
Canadá 0 - 1 Bosnia y Herzegovina
Estados Unidos 1 - 2 Paraguay
Qatar 0 - 2 Suiza
Brasil 1 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 0 - 1 Turquía
Alemania 3 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 1 - 2 Ecuador
Suecia 0 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 1 - 1 Nueva Zelanda
Francia 2 - 1 Senegal
Irak 0 - 1 Noruega
Argentina 2 - 0 Argelia
Austria 1 - 0 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 0 - 0 Croacia
Ghana 1 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Lucas Insua

Chequia 1 - 0 Sudáfrica
Suiza 2 - 1 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 2 - 1 Australia
Escocia 1 - 3 Marruecos
Brasil 3 - 0 Haití
Turquía 0 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 2 - 0 Costa de Marfil
Ecuador 3 - 0 Curazao
Túnez 1 - 3 Japón
España 2 - 1 Arabia Saudita
Bélgica 1 - 0 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 1 - 1 Egipto
Argentina 3 - 0 Austria
Francia 3 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 0 - 1 Argelia
Portugal 0 - 0 Uzbekistán
Inglaterra 2 - 0 Ghana
Panamá 1 - 2 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Lucas Insua

Canadá 2 - 1 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 0 - 3 Brasil
Marruecos 3 - 0 Haití
México 3 - 1 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 1 - 1 Alemania
Japón 2 - 1 Suecia
Túnez 0 - 2 Países Bajos
Turquía 1 - 2 Estados Unidos
Paraguay 2 - 1 Australia
Noruega 2 - 2 Francia
Irak 0 - 2 Senegal
Cabo Verde 1 - 0 Arabia Saudita
Uruguay 1 - 1 España
Egipto 1 - 2 Irán
Nueva Zelanda 0 - 1 Bélgica
Panamá 0 - 2 Inglaterra
Croacia 2 - 1 Ghana
Colombia 2 - 1 Portugal
RD Congo 0 - 1 Uzbekistán
Argelia 2 - 1 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Luciano Hufschmid

México 2 - 0 Sudáfrica
Corea del Sur 0 - 1 Chequia
Canadá 2 - 1 Bosnia y Herzegovina
Estados Unidos 2 - 1 Paraguay
Qatar 0 - 1 Suiza
Brasil 1 - 2 Marruecos
Haití 0 - 2 Escocia
Australia 1 - 2 Turquía
Alemania 3 - 0 Curazao
Países Bajos 1 - 2 Japón
Costa de Marfil 1 - 2 Ecuador
Suecia 1 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 1 - 0 Nueva Zelanda
Francia 2 - 1 Senegal
Irak 0 - 1 Noruega
Argentina 2 - 1 Argelia
Austria 1 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Luciano Hufschmid

Chequia 2 - 1 Sudáfrica
Suiza 1 - 1 Bosnia y Herzegovina
Canadá 2 - 1 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 2 - 1 Australia
Escocia 1 - 2 Marruecos
Brasil 2 - 0 Haití
Turquía 1 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 3 - 1 Costa de Marfil
Ecuador 2 - 1 Curazao
Túnez 0 - 2 Japón
España 2 - 1 Arabia Saudita
Bélgica 2 - 1 Irán
Uruguay 1 - 0 Cabo Verde
Nueva Zelanda 1 - 1 Egipto
Argentina 2 - 1 Austria
Francia 3 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 1 - 2 Argelia
Portugal 2 - 1 Uzbekistán
Inglaterra 3 - 1 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 1 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Luciano Hufschmid

Canadá 2 - 1 Suiza
Bosnia y Herzegovina 2 - 1 Qatar
Escocia 0 - 2 Brasil
Marruecos 2 - 0 Haití
México 1 - 1 Chequia
Sudáfrica 0 - 1 Corea del Sur
Curazao 1 - 2 Costa de Marfil
Ecuador 1 - 3 Alemania
Japón 2 - 1 Suecia
Túnez 1 - 3 Países Bajos
Turquía 1 - 2 Estados Unidos
Paraguay 2 - 1 Australia
Noruega 2 - 2 Francia
Irak 1 - 2 Senegal
Cabo Verde 1 - 1 Arabia Saudita
Uruguay 1 - 1 España
Egipto 2 - 1 Irán
Nueva Zelanda 1 - 2 Bélgica
Panamá 0 - 2 Inglaterra
Croacia 2 - 1 Ghana
Colombia 1 - 2 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 1 - 1 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Mario Talarico

México 1 - 1 Sudáfrica
Corea del Sur 0 - 0 Chequia
Canadá 0 - 0 Bosnia y Herzegovina
Estados Unidos 0 - 1 Paraguay
Qatar 0 - 2 Suiza
Brasil 2 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 1 - 1 Turquía
Alemania 3 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 1 - 1 Ecuador
Suecia 2 - 0 Túnez
España 4 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 1 - 1 Nueva Zelanda
Francia 2 - 0 Senegal
Irak 0 - 0 Noruega
Argentina 1 - 0 Argelia
Austria 2 - 0 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 1 - 1 Croacia
Ghana 1 - 1 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Mario Talarico

Chequia 1 - 1 Sudáfrica
Suiza 2 - 1 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 3 - 0 Australia
Escocia 1 - 1 Marruecos
Brasil 4 - 0 Haití
Turquía 0 - 0 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 3 - 1 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 1 - 1 Japón
España 2 - 1 Arabia Saudita
Bélgica 2 - 1 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 1 - 1 Egipto
Argentina 2 - 0 Austria
Francia 2 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 0 - 0 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 2 - 1 Ghana
Panamá 1 - 1 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Mario Talarico

Canadá 1 - 1 Suiza
Bosnia y Herzegovina 2 - 1 Qatar
Escocia 0 - 2 Brasil
Marruecos 2 - 0 Haití
México 1 - 1 Chequia
Sudáfrica 1 - 1 Corea del Sur
Curazao 1 - 2 Costa de Marfil
Ecuador 1 - 2 Alemania
Japón 2 - 2 Suecia
Túnez 0 - 3 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 1 - 1 Australia
Noruega 1 - 2 Francia
Irak 2 - 1 Senegal
Cabo Verde 0 - 0 Arabia Saudita
Uruguay 0 - 1 España
Egipto 1 - 1 Irán
Nueva Zelanda 1 - 0 Bélgica
Panamá 0 - 2 Inglaterra
Croacia 1 - 1 Ghana
Colombia 1 - 1 Portugal
RD Congo 1 - 0 Uzbekistán
Argelia 0 - 0 Austria
Jordania 0 - 2 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Nahuel González

México 2 - 1 Sudáfrica
Corea del Sur 0 - 2 Chequia
Canadá 1 - 0 Bosnia y Herzegovina
Estados Unidos 0 - 0 Paraguay
Qatar 0 - 1 Suiza
Brasil 0 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 1 - 1 Turquía
Alemania 4 - 0 Curazao
Países Bajos 1 - 2 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 2 - 1 Túnez
España 6 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 2 - 0 Nueva Zelanda
Francia 3 - 2 Senegal
Irak 0 - 3 Noruega
Argentina 2 - 1 Argelia
Austria 1 - 0 Jordania
Portugal 5 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Nahuel González

Chequia 1 - 1 Sudáfrica
Suiza 1 - 0 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 2 - 1 Corea del Sur
Estados Unidos 2 - 0 Australia
Escocia 1 - 3 Marruecos
Brasil 3 - 0 Haití
Turquía 2 - 0 Paraguay
Países Bajos 1 - 0 Suecia
Alemania 3 - 1 Costa de Marfil
Ecuador 1 - 0 Curazao
Túnez 1 - 2 Japón
España 2 - 1 Arabia Saudita
Bélgica 0 - 0 Irán
Uruguay 1 - 0 Cabo Verde
Nueva Zelanda 1 - 1 Egipto
Argentina 2 - 0 Austria
Francia 4 - 0 Irak
Noruega 1 - 2 Senegal
Jordania 0 - 2 Argelia
Portugal 4 - 0 Uzbekistán
Inglaterra 3 - 1 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Nahuel González

Canadá 1 - 2 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 1 - 2 Brasil
Marruecos 3 - 0 Haití
México 2 - 0 Chequia
Sudáfrica 0 - 1 Corea del Sur
Curazao 0 - 0 Costa de Marfil
Ecuador 1 - 0 Alemania
Japón 2 - 0 Suecia
Túnez 0 - 2 Países Bajos
Turquía 0 - 1 Estados Unidos
Paraguay 2 - 0 Australia
Noruega 1 - 3 Francia
Irak 0 - 2 Senegal
Cabo Verde 1 - 0 Arabia Saudita
Uruguay 1 - 2 España
Egipto 1 - 0 Irán
Nueva Zelanda 2 - 1 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 2 - 0 Ghana
Colombia 2 - 1 Portugal
RD Congo 2 - 0 Uzbekistán
Argelia 2 - 1 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Nico Avalos

México 2 - 0 Sudáfrica
Corea del Sur 2 - 1 Chequia
Canadá 1 - 0 Bosnia y Herzegovina
Estados Unidos 2 - 1 Paraguay
Qatar 0 - 1 Suiza
Brasil 2 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 1 - 2 Turquía
Alemania 5 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 1 - 2 Ecuador
Suecia 1 - 0 Túnez
España 3 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 1 - 2 Uruguay
Irán 0 - 1 Nueva Zelanda
Francia 3 - 0 Senegal
Irak 0 - 1 Noruega
Argentina 2 - 0 Argelia
Austria 2 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 1 - 0 Croacia
Ghana 0 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Nico Avalos

Chequia 1 - 1 Sudáfrica
Suiza 1 - 2 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 2 - 0 Corea del Sur
Estados Unidos 2 - 0 Australia
Escocia 0 - 2 Marruecos
Brasil 4 - 0 Haití
Turquía 1 - 2 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 3 - 0 Costa de Marfil
Ecuador 3 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 0 Arabia Saudita
Bélgica 2 - 0 Irán
Uruguay 3 - 0 Cabo Verde
Nueva Zelanda 2 - 1 Egipto
Argentina 2 - 1 Austria
Francia 3 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 1 - 2 Argelia
Portugal 3 - 0 Uzbekistán
Inglaterra 2 - 0 Ghana
Panamá 1 - 3 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Pancho Muzzio

México 2 - 1 Sudáfrica
Corea del Sur 1 - 1 Chequia
Canadá 1 - 0 Bosnia y Herzegovina
Estados Unidos 1 - 1 Paraguay
Qatar 0 - 3 Suiza
Brasil 1 - 1 Marruecos
Haití 0 - 3 Escocia
Australia 1 - 2 Turquía
Alemania 4 - 0 Curazao
Países Bajos 1 - 1 Japón
Costa de Marfil 1 - 2 Ecuador
Suecia 2 - 1 Túnez
España 6 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 2 - 0 Nueva Zelanda
Francia 2 - 1 Senegal
Irak 0 - 1 Noruega
Argentina 2 - 1 Argelia
Austria 2 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 3 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Pancho Muzzio

Chequia 3 - 0 Sudáfrica
Suiza 2 - 1 Bosnia y Herzegovina
Canadá 2 - 1 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 1 - 1 Australia
Escocia 1 - 2 Marruecos
Brasil 3 - 0 Haití
Turquía 2 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 3 - 1 Costa de Marfil
Ecuador 3 - 0 Curazao
Túnez 1 - 2 Japón
España 1 - 0 Arabia Saudita
Bélgica 2 - 0 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 0 - 1 Egipto
Argentina 2 - 1 Austria
Francia 2 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 1 - 2 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 3 - 0 Ghana
Panamá 0 - 2 Croacia
Colombia 1 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Pancho Muzzio

Canadá 1 - 1 Suiza
Bosnia y Herzegovina 2 - 1 Qatar
Escocia 0 - 2 Brasil
Marruecos 2 - 0 Haití
México 1 - 0 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 0 - 1 Costa de Marfil
Ecuador 0 - 1 Alemania
Japón 1 - 0 Suecia
Túnez 0 - 3 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 1 - 1 Australia
Noruega 1 - 2 Francia
Irak 0 - 2 Senegal
Cabo Verde 0 - 1 Arabia Saudita
Uruguay 0 - 1 España
Egipto 2 - 1 Irán
Nueva Zelanda 0 - 3 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 2 - 1 Ghana
Colombia 1 - 2 Portugal
RD Congo 2 - 1 Uzbekistán
Argelia 1 - 2 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Renzo Badano

México 2 - 1 Sudáfrica
Corea del Sur 3 - 0 Chequia
Canadá 2 - 0 Bosnia y Herzegovina
Estados Unidos 0 - 1 Paraguay
Qatar 0 - 1 Suiza
Brasil 2 - 1 Marruecos
Haití 0 - 3 Escocia
Australia 2 - 1 Turquía
Alemania 5 - 0 Curazao
Países Bajos 1 - 1 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 0 - 0 Túnez
España 4 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 1 - 1 Uruguay
Irán 2 - 0 Nueva Zelanda
Francia 3 - 1 Senegal
Irak 0 - 2 Noruega
Argentina 4 - 0 Argelia
Austria 2 - 0 Jordania
Portugal 6 - 0 RD Congo
Inglaterra 2 - 2 Croacia
Ghana 2 - 1 Panamá
Uzbekistán 0 - 3 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Renzo Badano

Chequia 2 - 0 Sudáfrica
Suiza 1 - 0 Bosnia y Herzegovina
Canadá 1 - 0 Qatar
México 1 - 2 Corea del Sur
Estados Unidos 2 - 1 Australia
Escocia 0 - 2 Marruecos
Brasil 4 - 0 Haití
Turquía 2 - 1 Paraguay
Países Bajos 1 - 3 Suecia
Alemania 4 - 1 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 1 Japón
España 1 - 0 Arabia Saudita
Bélgica 1 - 1 Irán
Uruguay 1 - 0 Cabo Verde
Nueva Zelanda 0 - 2 Egipto
Argentina 2 - 0 Austria
Francia 3 - 0 Irak
Noruega 2 - 0 Senegal
Jordania 1 - 2 Argelia
Portugal 1 - 0 Uzbekistán
Inglaterra 2 - 0 Ghana
Panamá 0 - 3 Croacia
Colombia 4 - 1 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Renzo Badano

Canadá 2 - 0 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 0 - 2 Brasil
Marruecos 4 - 0 Haití
México 1 - 0 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 0 - 3 Costa de Marfil
Ecuador 1 - 1 Alemania
Japón 2 - 1 Suecia
Túnez 0 - 3 Países Bajos
Turquía 0 - 3 Estados Unidos
Paraguay 1 - 0 Australia
Noruega 1 - 2 Francia
Irak 0 - 2 Senegal
Cabo Verde 1 - 1 Arabia Saudita
Uruguay 1 - 3 España
Egipto 2 - 0 Irán
Nueva Zelanda 0 - 3 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 3 - 1 Ghana
Colombia 3 - 1 Portugal
RD Congo 2 - 0 Uzbekistán
Argelia 0 - 4 Austria
Jordania 0 - 4 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Rodrigo Soca

México 1 - 0 Sudáfrica
Corea del Sur 0 - 1 Chequia
Canadá 1 - 1 Bosnia y Herzegovina
Estados Unidos 0 - 1 Paraguay
Qatar 0 - 2 Suiza
Brasil 1 - 0 Marruecos
Haití 0 - 3 Escocia
Australia 0 - 2 Turquía
Alemania 4 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 1 - 1 Ecuador
Suecia 0 - 1 Túnez
España 4 - 0 Cabo Verde
Bélgica 1 - 1 Egipto
Arabia Saudita 0 - 2 Uruguay
Irán 1 - 0 Nueva Zelanda
Francia 2 - 1 Senegal
Irak 0 - 2 Noruega
Argentina 1 - 0 Argelia
Austria 1 - 0 Jordania
Portugal 3 - 0 RD Congo
Inglaterra 1 - 1 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Rodrigo Soca

Chequia 1 - 0 Sudáfrica
Suiza 1 - 1 Bosnia y Herzegovina
Canadá 1 - 1 Qatar
México 1 - 0 Corea del Sur
Estados Unidos 2 - 1 Australia
Escocia 0 - 1 Marruecos
Brasil 3 - 0 Haití
Turquía 1 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 2 - 0 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 1 Japón
España 2 - 0 Arabia Saudita
Bélgica 2 - 0 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 1 - 2 Egipto
Argentina 2 - 0 Austria
Francia 2 - 0 Irak
Noruega 1 - 1 Senegal
Jordania 0 - 1 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 2 - 1 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Rodrigo Soca

Canadá 1 - 2 Suiza
Bosnia y Herzegovina 2 - 0 Qatar
Escocia 0 - 2 Brasil
Marruecos 2 - 0 Haití
México 1 - 0 Chequia
Sudáfrica 0 - 1 Corea del Sur
Curazao 0 - 1 Costa de Marfil
Ecuador 0 - 2 Alemania
Japón 3 - 1 Suecia
Túnez 0 - 4 Países Bajos
Turquía 0 - 2 Estados Unidos
Paraguay 1 - 0 Australia
Noruega 1 - 3 Francia
Irak 0 - 1 Senegal
Cabo Verde 0 - 1 Arabia Saudita
Uruguay 0 - 2 España
Egipto 2 - 0 Irán
Nueva Zelanda 0 - 1 Bélgica
Panamá 0 - 2 Inglaterra
Croacia 2 - 1 Ghana
Colombia 1 - 2 Portugal
RD Congo 0 - 0 Uzbekistán
Argelia 1 - 1 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Rodrigo Talarico

México 0 - 0 Sudáfrica
Corea del Sur 0 - 1 Chequia
Canadá 2 - 0 Bosnia y Herzegovina
Estados Unidos 0 - 1 Paraguay
Qatar 1 - 2 Suiza
Brasil 1 - 0 Marruecos
Haití 0 - 2 Escocia
Australia 1 - 1 Turquía
Alemania 3 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 1 - 0 Túnez
España 1 - 1 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 0 - 0 Uruguay
Irán 1 - 0 Nueva Zelanda
Francia 2 - 1 Senegal
Irak 1 - 1 Noruega
Argentina 1 - 0 Argelia
Austria 2 - 1 Jordania
Portugal 1 - 0 RD Congo
Inglaterra 1 - 1 Croacia
Ghana 1 - 2 Panamá
Uzbekistán 0 - 1 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Rodrigo Talarico

Chequia 2 - 0 Sudáfrica
Suiza 3 - 1 Bosnia y Herzegovina
Canadá 1 - 0 Qatar
México 2 - 0 Corea del Sur
Estados Unidos 1 - 0 Australia
Escocia 1 - 1 Marruecos
Brasil 2 - 0 Haití
Turquía 0 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 3 - 0 Costa de Marfil
Ecuador 2 - 1 Curazao
Túnez 0 - 1 Japón
España 3 - 0 Arabia Saudita
Bélgica 3 - 0 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 0 - 2 Egipto
Argentina 1 - 0 Austria
Francia 3 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 0 - 1 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 4 - 0 Ghana
Panamá 0 - 1 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Rodrigo Talarico

Canadá 2 - 1 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 1 - 2 Brasil
Marruecos 3 - 0 Haití
México 2 - 1 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 1 - 1 Alemania
Japón 1 - 0 Suecia
Túnez 1 - 3 Países Bajos
Turquía 1 - 2 Estados Unidos
Paraguay 1 - 0 Australia
Noruega 0 - 2 Francia
Irak 0 - 2 Senegal
Cabo Verde 0 - 1 Arabia Saudita
Uruguay 1 - 1 España
Egipto 1 - 0 Irán
Nueva Zelanda 0 - 3 Bélgica
Panamá 0 - 1 Inglaterra
Croacia 2 - 0 Ghana
Colombia 1 - 1 Portugal
RD Congo 3 - 2 Uzbekistán
Argelia 1 - 0 Austria
Jordania 0 - 2 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Santi

México 2 - 0 Sudáfrica
Corea del Sur 1 - 0 Chequia
Canadá 1 - 1 Bosnia y Herzegovina
Estados Unidos 2 - 1 Paraguay
Qatar 0 - 0 Suiza
Brasil 2 - 0 Marruecos
Haití 0 - 3 Escocia
Australia 2 - 2 Turquía
Alemania 3 - 0 Curazao
Países Bajos 1 - 1 Japón
Costa de Marfil 0 - 2 Ecuador
Suecia 1 - 1 Túnez
España 2 - 0 Cabo Verde
Bélgica 1 - 0 Egipto
Arabia Saudita 2 - 2 Uruguay
Irán 0 - 1 Nueva Zelanda
Francia 3 - 0 Senegal
Irak 1 - 1 Noruega
Argentina 2 - 0 Argelia
Austria 1 - 1 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 2 - 2 Croacia
Ghana 0 - 1 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Santi

Chequia 0 - 1 Sudáfrica
Suiza 1 - 1 Bosnia y Herzegovina
Canadá 0 - 2 Qatar
México 0 - 1 Corea del Sur
Estados Unidos 1 - 0 Australia
Escocia 1 - 2 Marruecos
Brasil 3 - 0 Haití
Turquía 0 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 2 - 0 Costa de Marfil
Ecuador 1 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 2 Arabia Saudita
Bélgica 1 - 1 Irán
Uruguay 2 - 0 Cabo Verde
Nueva Zelanda 1 - 1 Egipto
Argentina 2 - 1 Austria
Francia 2 - 0 Irak
Noruega 2 - 2 Senegal
Jordania 0 - 1 Argelia
Portugal 1 - 0 Uzbekistán
Inglaterra 3 - 0 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 1 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Santi

Canadá 1 - 1 Suiza
Bosnia y Herzegovina 1 - 1 Qatar
Escocia 0 - 1 Brasil
Marruecos 2 - 0 Haití
México 2 - 0 Chequia
Sudáfrica 0 - 2 Corea del Sur
Curazao 0 - 1 Costa de Marfil
Ecuador 1 - 2 Alemania
Japón 0 - 0 Suecia
Túnez 0 - 2 Países Bajos
Turquía 0 - 3 Estados Unidos
Paraguay 1 - 1 Australia
Noruega 0 - 0 Francia
Irak 1 - 1 Senegal
Cabo Verde 1 - 0 Arabia Saudita
Uruguay 0 - 2 España
Egipto 1 - 0 Irán
Nueva Zelanda 0 - 1 Bélgica
Panamá 0 - 1 Inglaterra
Croacia 1 - 0 Ghana
Colombia 2 - 2 Portugal
RD Congo 2 - 0 Uzbekistán
Argelia 0 - 0 Austria
Jordania 0 - 2 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Verónica Lucchesi

México 2 - 0 Sudáfrica
Corea del Sur 1 - 0 Chequia
Canadá 2 - 1 Bosnia y Herzegovina
Estados Unidos 0 - 0 Paraguay
Qatar 0 - 2 Suiza
Brasil 2 - 1 Marruecos
Haití 0 - 3 Escocia
Australia 1 - 2 Turquía
Alemania 4 - 0 Curazao
Países Bajos 1 - 1 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 1 - 1 Túnez
España 4 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 1 - 0 Nueva Zelanda
Francia 2 - 0 Senegal
Irak 0 - 2 Noruega
Argentina 1 - 0 Argelia
Austria 2 - 0 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 2 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Verónica Lucchesi

Chequia 2 - 1 Sudáfrica
Suiza 2 - 1 Bosnia y Herzegovina
Canadá 2 - 0 Qatar
México 2 - 1 Corea del Sur
Estados Unidos 2 - 0 Australia
Escocia 1 - 1 Marruecos
Brasil 3 - 0 Haití
Turquía 1 - 1 Paraguay
Países Bajos 2 - 1 Suecia
Alemania 2 - 1 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 0 Arabia Saudita
Bélgica 1 - 1 Irán
Uruguay 1 - 0 Cabo Verde
Nueva Zelanda 1 - 2 Egipto
Argentina 2 - 1 Austria
Francia 3 - 0 Irak
Noruega 2 - 1 Senegal
Jordania 1 - 2 Argelia
Portugal 2 - 0 Uzbekistán
Inglaterra 3 - 1 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 0 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Verónica Lucchesi

Canadá 2 - 2 Suiza
Bosnia y Herzegovina 2 - 1 Qatar
Escocia 1 - 2 Brasil
Marruecos 2 - 0 Haití
México 2 - 1 Chequia
Sudáfrica 1 - 2 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 1 - 2 Alemania
Japón 2 - 2 Suecia
Túnez 0 - 3 Países Bajos
Turquía 1 - 3 Estados Unidos
Paraguay 2 - 1 Australia
Noruega 1 - 1 Francia
Irak 0 - 2 Senegal
Cabo Verde 2 - 1 Arabia Saudita
Uruguay 1 - 1 España
Egipto 1 - 1 Irán
Nueva Zelanda 1 - 2 Bélgica
Panamá 0 - 2 Inglaterra
Croacia 1 - 1 Ghana
Colombia 1 - 2 Portugal
RD Congo 2 - 0 Uzbekistán
Argelia 1 - 1 Austria
Jordania 0 - 3 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Yago

México 2 - 0 Sudáfrica
Corea del Sur 2 - 1 Chequia
Canadá 1 - 1 Bosnia y Herzegovina
Estados Unidos 1 - 1 Paraguay
Qatar 0 - 2 Suiza
Brasil 2 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 0 - 1 Turquía
Alemania 3 - 0 Curazao
Países Bajos 2 - 1 Japón
Costa de Marfil 0 - 1 Ecuador
Suecia 2 - 1 Túnez
España 4 - 0 Cabo Verde
Bélgica 2 - 1 Egipto
Arabia Saudita 0 - 1 Uruguay
Irán 0 - 0 Nueva Zelanda
Francia 2 - 0 Senegal
Irak 0 - 3 Noruega
Argentina 2 - 1 Argelia
Austria 2 - 0 Jordania
Portugal 4 - 0 RD Congo
Inglaterra 2 - 1 Croacia
Ghana 1 - 0 Panamá
Uzbekistán 0 - 1 Colombia

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 2
Participante: Yago

Chequia 1 - 0 Sudáfrica
Suiza 2 - 0 Bosnia y Herzegovina
Canadá 1 - 0 Qatar
México 1 - 1 Corea del Sur
Estados Unidos 2 - 1 Australia
Escocia 0 - 1 Marruecos
Brasil 2 - 0 Haití
Turquía 1 - 2 Paraguay
Países Bajos 2 - 0 Suecia
Alemania 2 - 0 Costa de Marfil
Ecuador 2 - 0 Curazao
Túnez 0 - 2 Japón
España 2 - 1 Arabia Saudita
Bélgica 1 - 0 Irán
Uruguay 3 - 1 Cabo Verde
Nueva Zelanda 0 - 2 Egipto
Argentina 2 - 1 Austria
Francia 3 - 1 Irak
Noruega 1 - 1 Senegal
Jordania 0 - 1 Argelia
Portugal 3 - 0 Uzbekistán
Inglaterra 1 - 0 Ghana
Panamá 0 - 2 Croacia
Colombia 2 - 1 RD Congo

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 3
Participante: Yago

Canadá 0 - 2 Suiza
Bosnia y Herzegovina 1 - 0 Qatar
Escocia 0 - 2 Brasil
Marruecos 3 - 0 Haití
México 2 - 0 Chequia
Sudáfrica 1 - 2 Corea del Sur
Curazao 0 - 2 Costa de Marfil
Ecuador 0 - 2 Alemania
Japón 1 - 1 Suecia
Túnez 0 - 2 Países Bajos
Turquía 1 - 2 Estados Unidos
Paraguay 1 - 0 Australia
Noruega 2 - 2 Francia
Irak 0 - 2 Senegal
Cabo Verde 1 - 2 Arabia Saudita
Uruguay 0 - 1 España
Egipto 2 - 1 Irán
Nueva Zelanda 0 - 2 Bélgica
Panamá 0 - 3 Inglaterra
Croacia 2 - 1 Ghana
Colombia 1 - 2 Portugal
RD Congo 2 - 0 Uzbekistán
Argelia 2 - 1 Austria
Jordania 0 - 4 Argentina

Prode TAFA Copa del Mundo 2026
Fecha: Fecha 1
Participante: Cristian Hantis

México 1 - 0 Sudáfrica
Corea del Sur 1 - 1 Chequia
Canadá 1 - 1 Bosnia y Herzegovina
Estados Unidos 1 - 1 Paraguay
Qatar 0 - 2 Suiza
Brasil 1 - 1 Marruecos
Haití 0 - 2 Escocia
Australia 0 - 2 Turquía
Alemania 4 - 0 Curazao
Países Bajos 1 - 0 Japón
Costa de Marfil 1 - 1 Ecuador
Suecia 0 - 1 Túnez
España 5 - 0 Cabo Verde
Bélgica 2 - 0 Egipto
Arabia Saudita 0 - 2 Uruguay
Irán 0 - 2 Nueva Zelanda
Francia 2 - 0 Senegal
Irak 0 - 2 Noruega
Argentina 2 - 1 Argelia
Austria 1 - 1 Jordania
Portugal 2 - 0 RD Congo
Inglaterra 1 - 1 Croacia
Ghana 2 - 0 Panamá
Uzbekistán 0 - 2 Colombia
`
  ],

  pronosticosGrupos: [
`
Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Cristian Hantis

Grupo A

1. México
2. Corea del Sur
3. Chequia
4. Sudáfrica

Grupo B

1. Suiza
2. Bosnia y Herzegovina
3. Canadá
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Estados Unidos
2. Turquía
3. Paraguay
4. Australia

Grupo E

1. Alemania
2. Costa de Marfil
3. Ecuador
4. Curazao

Grupo F

1. Países Bajos
2. Túnez
3. Japón
4. Suecia

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Cabo Verde
4. Arabia Saudita

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Ghana
3. Croacia
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Yago

Grupo A

1. Corea del Sur
2. México
3. Sudáfrica
4. Chequia

Grupo B

1. Suiza
2. Canadá
3. Qatar
4. Bosnia y Herzegovina

Grupo C

1. Marruecos
2. Brasil
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Estados Unidos
3. Turquía
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Nueva Zelanda
4. Irán

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Verónica Lucchesi

Grupo A

1. México
2. Corea del Sur
3. Chequia
4. Sudáfrica

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Estados Unidos
3. Turquía
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Túnez
4. Suecia

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Santi

Grupo A

1. México
2. Corea del Sur
3. Chequia
4. Sudáfrica

Grupo B

1. Suiza
2. Qatar
3. Canadá
4. Bosnia y Herzegovina

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Estados Unidos
2. Australia
3. Paraguay
4. Turquía

Grupo E

1. Alemania
2. Ecuador
3. Curazao
4. Costa de Marfil

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Nueva Zelanda
3. Egipto
4. Irán

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Croacia
3. Panamá
4. Ghana

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Rodrigo Talarico

Grupo A

1. México
2. Corea del Sur
3. Chequia
4. Sudáfrica

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Estados Unidos
3. Australia
4. Turquía

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Egipto
2. Bélgica
3. Nueva Zelanda
4. Irán

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Croacia
2. Inglaterra
3. Panamá
4. Ghana

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Rodrigo Soca

Grupo A

1. México
2. Chequia
3. Sudáfrica
4. Corea del Sur

Grupo B

1. Suiza
2. Bosnia y Herzegovina
3. Canadá
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Turquía
2. Paraguay
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Túnez
4. Suecia

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Renzo Badano

Grupo A

1. México
2. Corea del Sur
3. Sudáfrica
4. Chequia

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Australia
3. Turquía
4. Estados Unidos

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Arabia Saudita
3. Uruguay
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Colombia
2. Portugal
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Ghana
3. Croacia
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Pancho Muzzio

Grupo A

1. Corea del Sur
2. México
3. Chequia
4. Sudáfrica

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Turquía
2. Paraguay
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Japón
2. Países Bajos
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Nico Avalos

Grupo A

1. México
2. Corea del Sur
3. Sudáfrica
4. Chequia

Grupo B

1. Canadá
2. Bosnia y Herzegovina
3. Suiza
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Estados Unidos
2. Paraguay
3. Turquía
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Nueva Zelanda
4. Irán

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Colombia
2. Portugal
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Nahuel González

Grupo A

1. México
2. Chequia
3. Sudáfrica
4. Corea del Sur

Grupo B

1. Bosnia y Herzegovina
2. Canadá
3. Suiza
4. Qatar

Grupo C

1. Marruecos
2. Brasil
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Turquía
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Japón
2. Países Bajos
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Luciano Hufschmid

Grupo A

1. Chequia
2. México
3. Corea del Sur
4. Sudáfrica

Grupo B

1. Canadá
2. Suiza
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Estados Unidos
2. Paraguay
3. Turquía
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Japón
2. Países Bajos
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Lucas Insua

Grupo A

1. México
2. Chequia
3. Sudáfrica
4. Corea del Sur

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Marruecos
2. Brasil
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Turquía
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Lucas Aguilera

Grupo A

1. Corea del Sur
2. México
3. Chequia
4. Sudáfrica

Grupo B

1. Canadá
2. Suiza
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Marruecos
2. Brasil
3. Escocia
4. Haití

Grupo D

1. Turquía
2. Paraguay
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Irán
3. Egipto
4. Nueva Zelanda

Grupo H

1. España
2. Arabia Saudita
3. Uruguay
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Kraiizer

Grupo A

1. México
2. Corea del Sur
3. Sudáfrica
4. Chequia

Grupo B

1. Suiza
2. Canadá
3. Qatar
4. Bosnia y Herzegovina

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Australia
2. Turquía
3. Paraguay
4. Estados Unidos

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Suecia
3. Japón
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Nueva Zelanda
4. Irán

Grupo H

1. Uruguay
2. España
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Croacia
2. Inglaterra
3. Panamá
4. Ghana

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Kevin Sívori

Grupo A

1. Corea del Sur
2. Chequia
3. México
4. Sudáfrica

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Escocia
3. Marruecos
4. Haití

Grupo D

1. Estados Unidos
2. Turquía
3. Paraguay
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Jhose

Grupo A

1. México
2. Chequia
3. Corea del Sur
4. Sudáfrica

Grupo B

1. Canadá
2. Suiza
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Haití
4. Escocia

Grupo D

1. Paraguay
2. Estados Unidos
3. Turquía
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Nueva Zelanda
4. Irán

Grupo H

1. España
2. Arabia Saudita
3. Uruguay
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Irak
4. Senegal

Grupo J

1. Argentina
2. Argelia
3. Jordania
4. Austria

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Croacia
3. Panamá
4. Ghana

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Ignacio Cejas

Grupo A

1. Corea del Sur
2. México
3. Chequia
4. Sudáfrica

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Marruecos
2. Brasil
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Estados Unidos
3. Turquía
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Japón
2. Países Bajos
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Irán
3. Egipto
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Cabo Verde
4. Arabia Saudita

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Gabriel Talarico

Grupo A

1. México
2. Sudáfrica
3. Chequia
4. Corea del Sur

Grupo B

1. Suiza
2. Canadá
3. Qatar
4. Bosnia y Herzegovina

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Estados Unidos
2. Paraguay
3. Australia
4. Turquía

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Japón
2. Países Bajos
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Felipe Galante

Grupo A

1. Corea del Sur
2. México
3. Chequia
4. Sudáfrica

Grupo B

1. Canadá
2. Suiza
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Turquía
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Irán
3. Egipto
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Eze

Grupo A

1. México
2. Corea del Sur
3. Sudáfrica
4. Chequia

Grupo B

1. Suiza
2. Bosnia y Herzegovina
3. Canadá
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Estados Unidos
2. Paraguay
3. Turquía
4. Australia

Grupo E

1. Alemania
2. Costa de Marfil
3. Ecuador
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Cundo

Grupo A

1. Corea del Sur
2. México
3. Chequia
4. Sudáfrica

Grupo B

1. Canadá
2. Suiza
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Marruecos
2. Brasil
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Turquía
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Japón
2. Países Bajos
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Cristian Serpico

Grupo A

1. Corea del Sur
2. México
3. Sudáfrica
4. Chequia

Grupo B

1. Canadá
2. Suiza
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Haití
4. Escocia

Grupo D

1. Estados Unidos
2. Paraguay
3. Turquía
4. Australia

Grupo E

1. Ecuador
2. Alemania
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Irak
4. Senegal

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Inglaterra
2. Croacia
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Cami

Grupo A

1. Sudáfrica
2. Corea del Sur
3. México
4. Chequia

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Marruecos
2. Brasil
3. Escocia
4. Haití

Grupo D

1. Australia
2. Paraguay
3. Estados Unidos
4. Turquía

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Japón
2. Países Bajos
3. Suecia
4. Túnez

Grupo G

1. Nueva Zelanda
2. Bélgica
3. Egipto
4. Irán

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Austria
3. Jordania
4. Argelia

Grupo K

1. Colombia
2. Portugal
3. RD Congo
4. Uzbekistán

Grupo L

1. Croacia
2. Inglaterra
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Benja

Grupo A

1. México
2. Chequia
3. Corea del Sur
4. Sudáfrica

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Brasil
2. Marruecos
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Turquía
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Japón
3. Suecia
4. Túnez

Grupo G

1. Bélgica
2. Egipto
3. Irán
4. Nueva Zelanda

Grupo H

1. España
2. Uruguay
3. Arabia Saudita
4. Cabo Verde

Grupo I

1. Francia
2. Noruega
3. Senegal
4. Irak

Grupo J

1. Argentina
2. Austria
3. Argelia
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. RD Congo
4. Uzbekistán

Grupo L

1. Croacia
2. Inglaterra
3. Ghana
4. Panamá

Prode TAFA Copa del Mundo 2026
Pronóstico de grupos
Participante: Bruno Alonso

Grupo A

1. México
2. Corea del Sur
3. Chequia
4. Sudáfrica

Grupo B

1. Suiza
2. Canadá
3. Bosnia y Herzegovina
4. Qatar

Grupo C

1. Marruecos
2. Brasil
3. Escocia
4. Haití

Grupo D

1. Paraguay
2. Turquía
3. Estados Unidos
4. Australia

Grupo E

1. Alemania
2. Ecuador
3. Costa de Marfil
4. Curazao

Grupo F

1. Países Bajos
2. Suecia
3. Japón
4. Túnez

Grupo G

1. Bélgica
2. Irán
3. Egipto
4. Nueva Zelanda

Grupo H

1. España
2. Arabia Saudita
3. Uruguay
4. Cabo Verde

Grupo I

1. Francia
2. Senegal
3. Noruega
4. Irak

Grupo J

1. Argentina
2. Argelia
3. Austria
4. Jordania

Grupo K

1. Portugal
2. Colombia
3. Uzbekistán
4. RD Congo

Grupo L

1. Croacia
2. Inglaterra
3. Ghana
4. Panamá`
  ]
};

/*
  ============================================================
  PEGAR NUEVOS PRONOSTICOS ACA
  ============================================================

  Ejemplo:

  agregarPronosticoFecha(`
  Prode TAFA Copa del Mundo 2026
  Fecha: Fecha 2
  Participante: Nombre Apellido

  Mexico 1 - 0 Corea del Sur
  Estados Unidos 2 - 1 Australia
  `);

  agregarPronosticoGrupos(`
  Prode TAFA Copa del Mundo 2026
  Pronostico de grupos
  Participante: Nombre Apellido

  Grupo A

  1. Mexico
  2. Sudafrica
  3. Corea del Sur
  4. Chequia
  `);
*/
