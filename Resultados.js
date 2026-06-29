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
*/

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
Uzbekistán 0 - 1 Colombia`
  ],

  pronosticosGrupos: [
`Prode TAFA Copa del Mundo 2026
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
4. Panamá`
  ]
};
