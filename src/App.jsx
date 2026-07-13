import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"

// --- BANCO DE TEMAS DE DEBATE FUTBOLERO (400 CONCEPTOS) ---
const TEMAS_FUTBOL = [
  {
    categoria: "Directores Técnicos",
    conceptos: [
      "Pep Guardiola", "Alex Ferguson", "Carlo Ancelotti", "Lionel Scaloni", "José Mourinho", 
      "Jürgen Klopp", "Zinedine Zidane", "Cholo Simeone", "Luis Aragonés", "Vicente del Bosque",
      "Arsène Wenger", "Louis van Gaal", "Jupp Heynckes", "Marcello Lippi", "Fabio Capello",
      "Guus Hiddink", "Rafael Benítez", "Antonio Conte", "Massimiliano Allegri", "Roberto Mancini",
      "Thomas Tuchel", "Hansi Flick", "Luis Enrique", "Xavi Hernández", "Mikel Arteta",
      "Unai Emery", "Mauricio Pochettino", "Marcelo Bielsa", "Marcelo Gallardo", "Tite",
      "Luiz Felipe Scolari", "Carlos Bilardo", "César Menotti", "Alfio Basile", "Jorge Sampaoli",
      "José Pékerman", "Manuel Pellegrini", "Claudio Ranieri", "Maurizio Sarri", "Gian Piero Gasperini",
      "Simone Inzaghi", "Stefano Pioli", "Luciano Spalletti", "Rafa Márquez", "Steven Gerrard",
      "Frank Lampard", "Wayne Rooney", "Patrick Vieira", "Thierry Henry", "Didier Deschamps",
      "Laurent Blanc", "Rudi García", "Christophe Galtier", "Zlatko Dalić", "Roberto Martínez",
      "Gareth Southgate", "Erik ten Hag", "Ole Gunnar Solskjær", "Ralf Rangnick", "Julian Nagelsmann",
      "Dominico Tedesco", "Oliver Glasner", "Marco Rose", "Edin Terzić", "Xabi Alonso",
      "Vincent Kompany", "Thiago Motta", "Daniele De Rossi", "Andrea Pirlo", "Gennaro Gattuso",
      "Filippo Inzaghi", "Hernán Crespo", "Martín Demichelis", "Fernando Gago", "Gabriel Milito",
      "Diego Simeone", "Eduardo Coudet", "Gustavo Alfaro", "Ricardo Gareca", "Sergio Markarián",
      "Jorge Fossati", "Reinaldo Rueda", "Juan Carlos Osorio", "Tata Martino", "Santiago Solari",
      "Jorge Jesus", "Abel Ferreira", "Rúben Amorim", "Sérgio Conceição", "Marco Silva",
      "Nuno Espírito Santo", "Brendan Rodgers", "David Moyes", "Roy Hodgson", "Sam Allardyce",
      "Sean Dyche", "Graham Potter", "Eddie Howe", "Ange Postecoglou", "Luciano Spalletti"
    ]
  },
  {
    categoria: "Jugadores Retirados",
    conceptos: [
      "Sergio Agüero", "Gonzalo Higuaín", "Javier Mascherano", "Carlos Tevez", "Ezequiel Lavezzi",
      "Gareth Bale", "Eden Hazard", "Arjen Robben", "Franck Ribéry", "Mesut Özil",
      "Wayne Rooney", "Zlatan Ibrahimović", "Gerard Piqué", "Jordi Alba", "Sergio Busquets",
      "Cesc Fàbregas", "David Silva", "Juan Mata", "Fernando Torres", "David Villa",
      "Samuel Eto'o", "Didier Drogba", "Yaya Touré", "Michael Essien", "Kolo Touré",
      "Emmanuel Adebayor", "Asamoah Gyan", "Petr Čech", "Edwin van der Sar", "Iker Casillas",
      "Víctor Valdés", "Gianluigi Buffon", "Dida", "Júlio César", "Rogerio Ceni",
      "Chilavert", "Claudio Taffarel", "Oliver Kahn", "Jens Lehmann", "Manuel Almunia",
      "Andrea Pirlo", "Daniele De Rossi", "Claudio Marchisio", "Giorgio Chiellini", "Leonardo Bonucci",
      "Andrea Barzagli", "Ignazio Abate", "Christian Maggio", "Antonio Cassano", "Mario Balotelli",
      "Wesley Sneijder", "Robin van Persie", "Klaas-Jan Huntelaar", "Dirk Kuyt", "Rafael van der Vaart",
      "Nigel de Jong", "John Heitinga", "Giovanni van Bronckhorst", "Philipp Lahm", "Bastian Schweinsteiger",
      "Sami Khedira", "Mario Gómez", "Miroslav Klose", "Lukas Podolski", "Per Mertesacker",
      "Jérôme Boateng", "Mats Hummels", "Michael Ballack", "Oliver Bierhoff", "John Terry",
      "Rio Ferdinand", "Jamie Carragher", "Gary Neville", "Ashley Cole", "Steven Gerrard",
      "Frank Lampard", "Paul Scholes", "David Beckham", "Michael Owen", "Robbie Keane",
      "Ryan Giggs", "Guti", "Raúl González", "Michel Salgado", "Joan Capdevila",
      "Carles Puyol", "Alvaro Arbeloa", "Santi Cazorla", "Mikel Arteta", "Xabi Alonso",
      "Diego Forlán", "Luis Suárez (Miramontes)", "Franck de Boer", "Ronald de Boer", "Patrick Kluivert"
    ]
  },
  {
    categoria: "Jugadores que ganaron un mundial",
    conceptos: [
      "Lionel Messi", "Ángel Di María", "Rodrigo De Paul", "Emiliano Martínez", "Enzo Fernández",
      "Alexis Mac Allister", "Julián Álvarez", "Lautaro Martínez", "Cristian Romero", "Nicolás Otamendi",
      "Nahuel Molina", "Nicolas Tagliafico", "Gonzalo Montiel", "Marcos Acuña", "Leandro Paredes",
      "Kylian Mbappé", "Antoine Griezmann", "Paul Pogba", "N'Golo Kanté", "Raphaël Varane",
      "Samuel Umtiti", "Lucas Hernández", "Benjamin Pavard", "Hugo Lloris", "Blaise Matuidi",
      "Olivier Giroud", "Ousmane Dembélé", "Thomas Müller", "Philipp Lahm", "Bastian Schweinsteiger",
      "Manuel Neuer", "Toni Kroos", "Mats Hummels", "Jérôme Boateng", "Mesut Özil",
      "Mario Götze", "Miroslav Klose", "Sami Khedira", "Lukas Podolski", "Andrés Iniesta",
      "Xavi Hernández", "Iker Casillas", "Carles Puyol", "Gerard Piqué", "Sergio Ramos",
      "Joan Capdevila", "Sergio Busquets", "Xabi Alonso", "Cesc Fàbregas", "Fernando Torres",
      "David Villa", "Pedro Rodríguez", "Jesús Navas", "Cafú", "Roberto Carlos",
      "Ronaldo Nazário", "Ronaldinho", "Rivaldo", "Lúcio", "Roque Júnior",
      "Edmílson", "Gilberto Silva", "Kléberson", "Marcos", "Zinedine Zidane",
      "Thierry Henry", "Patrick Vieira", "Didier Deschamps", "Laurent Blanc", "Lilian Thuram",
      "Marcel Desailly", "Bixente Lizarazu", "Fabien Barthez", "Youri Djorkaeff", "David Trezeguet",
      "Romário", "Bebeto", "Dunga", "Mauro Silva", "Zinho",
      "Jorginho", "Branco", "Aldair", "Taffarel", "Diego Maradona",
      "Jorge Burruchaga", "Jorge Valdano", "Oscar Ruggeri", "Sergio Batista", "Ricardo Giusti",
      "Julio Olarticoechea", "Nery Pumpido", "Daniel Passarella", "Mario Kempes", "Ubaldo Fillol"
    ]
  },
  {
    categoria: "Jugadores Leyendas",
    conceptos: [
      "Pelé", "Diego Maradona", "Lionel Messi", "Cristiano Ronaldo", "Johan Cruyff",
      "Alfredo Di Stéfano", "Franz Beckenbauer", "Zinedine Zidane", "Ronaldo Nazário", "Michel Platini",
      "Gerd Müller", "Eusébio", "George Best", "Bobby Charlton", "Ferenc Puskás",
      "Garrincha", "Zico", "Sócrates", "Romário", "Ronaldinho",
      "Rivaldo", "Kaká", "Neymar Jr", "Luis Suárez", "Edinson Cavani",
      "Diego Forlán", "Enzo Francescoli", "Carlos Valderrama", "Iván Zamorano", "Marcelo Salas",
      "Alexis Sánchez", "Arturo Vidal", "Hugo Sánchez", "Rafa Márquez", "Keylor Navas",
      "Radamel Falcao", "James Rodríguez", "Teófilo Cubillas", "Paolo Guerrero", "Claudio Pizarro",
      "Alex Morgan", "Marta", "Lev Yashin", "Gianluigi Buffon", "Iker Casillas",
      "Manuel Neuer", "Dino Zoff", "Peter Schmeichel", "Oliver Kahn", "Gordon Banks",
      "Paolo Maldini", "Franco Baresi", "Alessandro Nesta", "Fabio Cannavaro", "Giorgio Chiellini",
      "Carles Puyol", "Sergio Ramos", "Gerard Piqué", "John Terry", "Rio Ferdinand",
      "Virgil van Dijk", "Philipp Lahm", "Javier Zanetti", "Dani Alves", "Cafú",
      "Roberto Carlos", "Marcelo", "Andrea Pirlo", "Xavi Hernández", "Andrés Iniesta",
      "Luka Modrić", "Toni Kroos", "Kevin De Bruyne", "Steven Gerrard", "Frank Lampard",
      "Paul Scholes", "David Beckham", "Ryan Giggs", "Roy Keane", "Patrick Vieira",
      "Thierry Henry", "Wayne Rooney", "Michael Owen", "Harry Kane", "Alan Shearer",
      "Zlatan Ibrahimović", "Robert Lewandowski", "Karim Benzema", "Gareth Bale", "Luis Figo",
      "Rui Costa", "Deco", "Michael Ballack", "Miroslav Klose", "Thomas Müller",
      "Marco van Basten", "Ruud Gullit", "Frank Rijkaard", "Dennis Bergkamp", "Ruud van Nistelrooy"
    ]
  }
]

function App() {
  const [pantalla, setPantalla] = useState("inicio")
  const [nombre, setNombre] = useState("")
  const [esCreador, setEsCreador] = useState(false)
  const [salaId, setSalaId] = useState("")
  const [listaJugadores, setListaJugadores] = useState([])
  const [categoriaActual, setCategoriaActual] = useState("")
  const [conceptoActual, setConceptoActual] = useState("")
  const [rolPropio, setRolPropio] = useState("")
  const [votoSeleccionado, setVotoSeleccionado] = useState("")
  const [votoConfirmado, setVotoConfirmado] = useState(false)
  const [ganadorPartida, setGanadorPartida] = useState("")
  const [impostorNombre, setImpostorNombre] = useState("")
  const [textoVeredictoVar, setTextoVeredictoVar] = useState("")
  const [tipoResultadoVar, setTipoResultadoVar] = useState("")

  // --- CÁLCULO DINÁMICO DEL HOST ACTIVO ---
  // 1. Buscamos al primer jugador de la lista que siga vivo (eliminado === false) y tenga es_creador.
  // Si ese fue eliminado, elegimos al primer sobreviviente disponible de la lista.
  const jugadorHostActivo = listaJugadores.find(j => !j.eliminado && j.es_creador) 
    || listaJugadores.find(j => !j.eliminado);

  // 2. Evaluamos si yo soy ese Host activo de la partida
  const soyElHostActivo = jugadorHostActivo?.nombre === nombre.trim();

  useEffect(() => {
    if (!salaId) return;

    const traerJugadoresActuales = async () => {
      const { data } = await supabase
        .from("jugadores")
        .select("*")
        .eq("sala_id", salaId)
        .order("conectado_en", { ascending: true });
      
      if (data) {
        setListaJugadores(data);
        if (pantalla === "votacion") {
          const jugadoresVivos = data.filter(j => j.eliminado === false);
          const todosLosVivosVotaron = jugadoresVivos.every(j => j.voto_por !== null && j.voto_por !== "");
          if (todosLosVivosVotaron && esCreador) {
            procesarVotosAutomaticamente(data);
          }
        }
      }
    };

    const chequearEstadoSala = async () => {
      const { data } = await supabase.from("salas").select("*").eq("id", salaId).single();
      if (!data) return;

      if (data.estado === "juego") {
        setCategoriaActual(data.categoria);
        setConceptoActual(data.concepto);
        const { data: lista } = await supabase.from("jugadores").select("*").eq("sala_id", salaId);
        const yo = lista?.find(j => j.nombre === nombre.trim());
        if (yo) {
          setRolPropio(yo.eliminado ? "ESPECTADOR" : yo.rol);
          setPantalla("juego");
          setVotoConfirmado(false);
          setVotoSeleccionado("");
        }
      }

      if (data.estado === "votacion" && pantalla !== "votacion") {
        setPantalla("votacion");
      }

      if (data.estado === "veredicto" && pantalla !== "veredicto") {
        if (data.var_texto) setTextoVeredictoVar(data.var_texto);
        if (data.var_tipo) setTipoResultadoVar(data.var_tipo);
        setPantalla("veredicto");
      }

      if (data.estado === "resultados" && pantalla !== "resultados") {
        if (data.impostor_nombre_final) setImpostorNombre(data.impostor_nombre_final);
        if (data.resultado_ganador) setGanadorPartida(data.resultado_ganador);
        setPantalla("resultados");
      }

      if (data.estado === "lobby" && (pantalla === "juego" || pantalla === "votacion" || pantalla === "veredicto" || pantalla === "resultados") && !esCreador) {
        alert("El Host ha terminado la partida.");
        resetearTodoAInicio();
      }
    };

    traerJugadoresActuales();
    chequearEstadoSala();

    const canalJugadores = supabase
      .channel("cambios-sala")
      .on("postgres_changes", { event: "*", schema: "public", table: "jugadores" }, () => { traerJugadoresActuales(); })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "salas", filter: `id=eq.${salaId}` }, () => { chequearEstadoSala(); })
      .subscribe();

    return () => { supabase.removeChannel(canalJugadores); };
  }, [salaId, pantalla, esCreador]);

  const resetearTodoAInicio = () => {
    setPantalla("inicio"); setSalaId(""); setListaJugadores([]); setEsCreador(false);
    setVotoSeleccionado(""); setVotoConfirmado(false); setGanadorPartida("");
    setImpostorNombre(""); setTextoVeredictoVar(""); setTipoResultadoVar("");
  }

  const manejarCrearSala = async () => {
    if (nombre.trim() === "") return alert("Ingresa tu nombre")
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let codigoSala = ""
    for (let i = 0; i < 4; i++) codigoSala += letras.charAt(Math.floor(Math.random() * letras.length))
    try {
      await supabase.from("salas").insert([{ id: codigoSala, estado: "lobby" }])
      await supabase.from("jugadores").insert([{ sala_id: codigoSala, nombre: nombre.trim(), es_creador: true, rol: null }])
      setSalaId(codigoSala); setEsCreador(true); setPantalla("lobby")
    } catch (error) { console.error(error) }
  }

  const manejarUnirseASala = async () => {
    if (nombre.trim() === "" || salaId.trim().length !== 4) return alert("Datos inválidos")
    const codigoLimpio = salaId.trim().toUpperCase()
    try {
      const { data: salaEncontrada } = await supabase.from("salas").select("*").eq("id", codigoLimpio).single()
      if (!salaEncontrada) return alert("La sala no existe.")
      await supabase.from("jugadores").insert([{ sala_id: codigoLimpio, nombre: nombre.trim(), es_creador: false, rol: null }])
      setSalaId(codigoLinter => codigoLimpio); setEsCreador(false); setPantalla("lobby")
    } catch (error) { console.error(error) }
  }

  const salirDeLaSalaYLimpiar = async () => {
    try {
      if (esCreador) await supabase.from("salas").update({ estado: "lobby" }).eq("id", salaId);
      await supabase.from("jugadores").delete().eq("sala_id", salaId).eq("nombre", nombre.trim());
      resetearTodoAInicio();
    } catch (error) { console.error(error); resetearTodoAInicio(); }
  }

  const iniciarPartidaDelJuego = async () => {
    try {
      const { data: todosLosInscritos } = await supabase.from("jugadores").select("*").eq("sala_id", salaId);
      if (!todosLosInscritos || todosLosInscritos.length < 3) {
        alert("¡Mínimo 3 jugadores en la cancha para empezar!"); return;
      }
      const temaElegido = TEMAS_FUTBOL[Math.floor(Math.random() * TEMAS_FUTBOL.length)]
      const conceptoElegido = temaElegido.conceptos[Math.floor(Math.random() * temaElegido.conceptos.length)]
      const indiceImpostor = Math.floor(Math.random() * todosLosInscritos.length);
      
      for (let i = 0; i < todosLosInscritos.length; i++) {
        await supabase.from("jugadores").update({ 
          rol: i === indiceImpostor ? "IMPOSTOR" : "PANELISTA", voto_por: null, eliminado: false 
        }).eq("id", todosLosInscritos[i].id);
      }
      await supabase.from("salas").update({
        estado: "juego", categoria: temaElegido.categoria, concepto: conceptoElegido,
        resultado_ganador: null, impostor_nombre_final: null, var_texto: null, var_tipo: null
      }).eq("id", salaId);
    } catch (error) { console.error(error) }
  }

  const cambiarConceptoDeLaMesa = async () => {
    try {
      if (!soyElHostActivo) return; // Solo el host activo puede hacer el cambio
      
      // 1. Elegimos una categoría y concepto al azar del banco de datos
      const temaElegido = TEMAS_FUTBOL[Math.floor(Math.random() * TEMAS_FUTBOL.length)];
      const conceptoElegido = temaElegido.conceptos[Math.floor(Math.random() * temaElegido.conceptos.length)];
      
      // 2. Actualizamos solo la categoría y el concepto en la base de datos para esta sala
      await supabase.from("salas").update({
        categoria: temaElegido.categoria,
        concepto: conceptoElegido
      }).eq("id", salaId);
      
    } catch (error) {
      console.error("Error al cambiar de concepto:", error);
    }
  }

  const abrirInstanciaVotacion = async () => {
    try {
      await supabase.from("jugadores").update({ voto_por: null }).eq("sala_id", salaId);
      await supabase.from("salas").update({ estado: "votacion" }).eq("id", salaId);
    } catch (error) { console.error(error) }
  }

  const emitirVotoAJugador = async () => {
    if (!votoSeleccionado) return;
    try {
      await supabase.from("jugadores").update({ voto_por: votoSeleccionado }).eq("sala_id", salaId).eq("nombre", nombre.trim());
      setVotoConfirmado(true);
    } catch (error) { console.error(error) }
  }

  const procesarVotosAutomaticamente = async (jugadoresActuales) => {
    try {
      let conteo = {};
      jugadoresActuales.forEach(j => { if (j.voto_por) conteo[j.voto_por] = (conteo[j.voto_por] || 0) + 1; });
      let masVotadoNombre = "", maxVotos = -1, empate = false;
      Object.keys(conteo).forEach(nom => {
        if (conteo[nom] > maxVotos) { maxVotos = conteo[nom]; masVotadoNombre = nom; empate = false; }
        else if (conteo[nom] === maxVotos) { empate = true; }
      });
      const impostorDeLaSala = jugadoresActuales.find(j => j.rol === "IMPOSTOR");
      const nombreDelImpostor = impostorDeLaSala ? impostorDeLaSala.nombre : "";

      if (empate || !masVotadoNombre) {
        await supabase.from("salas").update({ estado: "veredicto", var_tipo: "EMPATE", var_texto: "¡Voto anulado! Hubo un empate en la votación. Nadie abandona la cancha." }).eq("id", salaId);
        return;
      }
      const expulsado = jugadoresActuales.find(j => j.nombre === masVotadoNombre);
      if (expulsado.rol === "IMPOSTOR") {
        await supabase.from("salas").update({ estado: "resultados", resultado_ganador: "PANELISTAS", impostor_nombre_final: nombreDelImpostor }).eq("id", salaId);
        return;
      }
      await supabase.from("jugadores").update({ eliminado: true }).eq("id", expulsado.id);
      const { data: todos } = await supabase.from("jugadores").select("*").eq("sala_id", salaId);
      const sobrevivientes = todos.filter(j => j.eliminado === false);
      if (sobrevivientes.length <= 2 && sobrevivientes.some(j => j.rol === "IMPOSTOR")) {
        await supabase.from("salas").update({ estado: "resultados", resultado_ganador: "IMPOSTOR", impostor_nombre_final: nombreDelImpostor }).eq("id", salaId);
        return;
      }
      await supabase.from("salas").update({ estado: "veredicto", var_tipo: "INOCENTE", var_texto: `⚠️ ¡Pésimo arbitraje! Expulsaron a "${expulsado.nombre}"... pero era un JUGADOR INOCENTE.` }).eq("id", salaId);
    } catch (error) { console.error(error) }
  }

  const regresarAlDebateOrdinario = async () => {
    try { await supabase.from("jugadores").update({ voto_por: null }).eq("sala_id", salaId);
      await supabase.from("salas").update({ estado: "juego", var_texto: null, var_tipo: null }).eq("id", salaId);
    } catch (error) { console.error(error) }
  }

  // --- CONTENEDOR MAESTRO ESTILO PIZARRA DE VESTUARIO MÓVIL ---
  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-950 via-slate-950 to-black text-slate-100 font-sans p-3 flex flex-col items-center justify-center selection:bg-green-500 selection:text-black">
      <div className={`w-full max-w-sm bg-slate-900/90 backdrop-blur-md rounded-2xl border p-4 sm:p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] ${
        pantalla === "juego" && rolPropio === "IMPOSTOR" ? "border-red-500/60 shadow-red-950/20" : "border-slate-800"
      }`}>
        
        {/* PANTALLA 1: INICIO */}
        {pantalla === "inicio" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white via-green-400 to-emerald-500 bg-clip-text text-transparent">
                EL IMPOSTOR
              </h1>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Debate de Vestuario</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-400">Tu Nombre de Crack:</label>
              <input type="text" placeholder="Ej: Davo, Cobra, Messi..." value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all" />
            </div>
            <button onClick={manejarCrearSala} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-green-900/30 transition-all active:scale-[0.98]">
              👑 Crear Vestuario (Host)
            </button>
            <div className="flex items-center text-xs text-slate-600 uppercase font-bold"><div className="flex-grow border-t border-slate-800"></div><span className="mx-3">O ingresa a uno</span><div className="flex-grow border-t border-slate-800"></div></div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-2">
              <input type="text" placeholder="CÓDIGO (4 LETRAS)" value={salaId} onChange={(e) => setSalaId(e.target.value.toUpperCase())} maxLength={4} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-center font-mono text-lg font-bold text-yellow-400 tracking-widest focus:outline-none focus:border-yellow-500 uppercase" />
              <button onClick={manejarUnirseASala} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 px-4 rounded-lg transition-all">
                🏃 Unirse al Grupo
              </button>
            </div>
          </div>
        )}

        {/* PANTALLA 2: LOBBY */}
        {pantalla === "lobby" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-center">
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border border-slate-700">Sala de Espera</span>
              <div className="mt-2 text-3xl font-black font-mono tracking-widest text-yellow-400 bg-slate-950 inline-block px-4 py-1 rounded-xl border border-slate-800">{salaId}</div>
              <p className="text-xs text-green-400 font-medium mt-1">✓ Listo como: <span className="font-bold">{nombre}</span></p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Convocados ({listaJugadores.length}):</p>
              <div className="divide-y divide-slate-900">
                {listaJugadores.map(j => (
                  <div key={j.id} className="py-1.5 flex items-center justify-between text-xs text-slate-300">
                    <span>⚽ {j.nombre}</span>
                    {j.es_creador && <span className="bg-green-500/10 text-green-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-green-500/20">HOST</span>}
                  </div>
                ))}
              </div>
            </div>
            {esCreador && (
              <button onClick={iniciarPartidaDelJuego} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-bold py-2.5 px-4 rounded-xl shadow-md transition-all">
                🚀 Saltar a la Cancha
              </button>
            )}
            <button onClick={salirDeLaSalaYLimpiar} className="w-full bg-slate-800/60 hover:bg-slate-800 text-slate-400 text-xs py-1.5 px-4 rounded-xl transition-all">Abandonar Vestuario</button>
          </div>
        )}

        {/* PANTALLA 3: DEBATE */}
        {pantalla === "juego" && (
          <div className="space-y-4 animate-fadeIn">
            {rolPropio === "ESPECTADOR" ? (
              <div className="bg-red-950/20 border border-red-900 text-center p-4 rounded-xl space-y-1">
                <span className="text-xl">🟥</span>
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-wide">Tarjeta Roja Directa</h3>
                <p className="text-xs text-slate-400">Fuiste expulsado. Mira el debate táctico desde el banco de suplentes.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Categoría:</span>
                  <span className="text-xs font-black text-green-400 uppercase">{categoriaActual}</span>
                </div>
                {rolPropio === "IMPOSTOR" ? (
                  <div className="bg-gradient-to-b from-red-950/50 to-slate-950 border border-red-500/40 p-4 rounded-xl text-center space-y-2 animate-pulse">
                    <span className="text-xs bg-red-500 text-white font-black px-2 py-0.5 rounded uppercase">FALSO REFUERZO</span>
                    <h3 className="text-xl font-black text-red-500 uppercase">¡ERES EL IMPOSTOR!</h3>
                    <p className="text-xs text-slate-300 leading-normal">No sabes el concepto. ¡Guitarreala, miente, inventa estadísticas y haz que echen a un inocente!</p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-yellow-500/20 p-4 rounded-xl text-center space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-yellow-500 uppercase">Concepto Secreto</span>
                    
                    {/* CANDADO DE SEGURIDAD ANTIPARPADEO */}
                    {rolPropio === "PANELISTA" && conceptoActual ? (
                      <h3 className="text-2xl font-black text-yellow-400 tracking-tight my-1 drop-shadow-[0_2px_10px_rgba(234,179,8,_0.2)] animate-fadeIn">
                        {conceptoActual}
                      </h3>
                    ) : (
                      <h3 className="text-sm font-bold text-slate-500 tracking-tight my-2 animate-pulse">
                        Sincronizando VAR...
                      </h3>
                    )}
                    
                    <p className="text-[10px] text-slate-500">Los jugadores inocentes debaten sobre este nombre.</p>
                  </div>
                )}
              </>
            )}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-left">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">En Cancha:</span>
              <div className="flex flex-wrap gap-1.5">
                {listaJugadores.map(j => (
                  <span key={j.id} className={`text-[10px] px-2 py-0.5 rounded font-medium border ${j.eliminado ? "bg-red-950/20 border-red-900 text-red-400 line-through" : "bg-slate-900 border-slate-800 text-slate-300"}`}>👤 {j.nombre}</span>
                ))}
              </div>
            </div>
            {soyElHostActivo && rolPropio !== "ESPECTADOR" && (
              <div className="space-y-2">
                <button onClick={abrirInstanciaVotacion} className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-md transition-all active:scale-95">
                  🖥️ Detener Partido e ir al VAR
                </button>

                <button onClick={cambiarConceptoDeLaMesa} className="w-full bg-slate-800 hover:bg-slate-700 text-yellow-400 text-[11px] font-bold py-2 px-4 rounded-xl border border-slate-700 transition-all active:scale-95">
                  🎲 Cambiar Personaje (Nadie lo conoce)
                </button>
              </div>
            )}
            <button onClick={salirDeLaSalaYLimpiar} className="w-full text-slate-500 hover:text-slate-400 text-[10px] uppercase font-bold py-1 tracking-wider transition-all">Abandonar Juego</button>
          </div>
        )}

        {/* PANTALLA 4: VOTACIÓN */}
        {pantalla === "votacion" && (
          <div className="space-y-4 animate-fadeIn">
            {rolPropio === "ESPECTADOR" ? (
              <div className="text-center py-6 space-y-2">
                <div className="text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-400">
                  ⏳ El VAR está revisando la jugada en la cancha. No puedes votar por estar suspendido...
                </div>
              </div>
            ) : (
              <>
                <div className="text-center space-y-1">
                  <span className="text-[9px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Mesa de Acusación</span>
                  <h2 className="text-lg font-black uppercase">¿A quién expulsamos?</h2>
                </div>
                <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-0.5">
                  {listaJugadores.filter(j => !j.eliminado).map((jugador) => (
                    <button key={jugador.id} disabled={votoConfirmado} onClick={() => setVotoSeleccionado(jugador.nombre)} className={`w-full text-left px-3 py-2 text-xs rounded-xl border transition-all ${votoSeleccionado === jugador.nombre ? "bg-gradient-to-r from-yellow-600 to-amber-600 border-yellow-400 text-white font-bold" : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"}`}>
                      🛡️ Acusar a: <span className="font-bold text-white">{jugador.nombre}</span> {jugador.nombre === nombre && "(Tú)"}
                    </button>
                  ))}
                </div>
                {!votoConfirmado ? (
                  <button onClick={emitirVotoAJugador} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold py-2 rounded-xl active:scale-95 transition-all">Confirmar Dictamen</button>
                ) : (
                  <div className="bg-slate-950 border border-green-900/50 p-2 rounded-xl text-green-400 text-center text-xs font-semibold animate-pulse">✓ Sobre cerrado enviado al árbitro principal...</div>
                )}
              </>
            )}
            <div className="border-t border-slate-800 pt-3 text-left">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Monitoreo de Sobrevivientes:</p>
              <div className="grid grid-cols-2 gap-1 bg-slate-950 p-2 rounded-xl border border-slate-850">
                {listaJugadores.filter(j => !j.eliminado).map(j => (
                  <div key={j.id} className="text-[10px] flex items-center justify-between px-1 text-slate-400">
                    <span className="truncate max-w-[80px]">👤 {j.nombre}</span>
                    <span className={j.voto_por ? "text-green-400 font-bold" : "text-yellow-500 text-[9px]"}>{j.voto_por ? "LISTO" : "PENSANDO"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANTALLA 5: VEREDICTO */}
        {pantalla === "veredicto" && (
          <div className="space-y-4 animate-fadeIn text-center">
            <span className="bg-white/5 border border-slate-700 text-slate-300 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest">
              🖥️ Análisis del VAR
            </span>
            <div className={`p-4 rounded-xl border text-xs font-bold leading-relaxed ${tipoResultadoVar === "EMPATE" ? "bg-cyan-950/40 border-cyan-500/30 text-cyan-200" : "bg-amber-950/40 border-amber-500/30 text-amber-200"}`}>
              {textoVeredictoVar}
            </div>
            <p className="text-[10px] text-slate-500 italic">
              {esCreador ? "Presiona continuar para reanudar el debate ordinario." : "Esperando que el Host ordene el regreso a las acciones..."}
            </p>
            {soyElHostActivo && (
              <button onClick={regresarAlDebateOrdinario} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md">
                🏃‍♂️ Reanudar Partido (Volver al Debate)
              </button>
            )}
          </div>
        )}

       {/* PANTALLA 6: RESULTADOS FINAL DE PARTIDA */}
        {pantalla === "resultados" && (
          <div className="space-y-4 animate-fadeIn text-center">
            <h2 className="text-4xl font-black italic tracking-tighter bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              FIN DEL PARTIDA
            </h2>
            <div className={`text-sm font-black uppercase tracking-wider py-1 px-4 rounded-lg inline-block ${ganadorPartida === "PANELISTAS" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"}`}>
              {ganadorPartida === "PANELISTAS" ? "🏆 ¡GANAN LOS JUGADORES!" : "🚨 ¡GANÓ EL IMPOSTOR!"}
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">El Vendehumo Desenmascarado:</p>
                <h3 className="text-2xl font-black text-red-500 uppercase tracking-tight">{impostorNombre}</h3>
              </div>
              <div className="border-t border-slate-900 pt-2">
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">El Concepto de la Mesa:</p>
                <h3 className="text-sm font-bold text-yellow-400 uppercase">{conceptoActual}</h3>
              </div>
            </div>
            {soyElHostActivo && (
              <button onClick={iniciarPartidaDelJuego} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all">
                🔄 Jugar Nueva Fecha (Revancha)
              </button>
            )}
            <button onClick={salirDeLaSalaYLimpiar} className="w-full bg-slate-800 text-slate-400 hover:text-slate-300 text-xs py-1.5 rounded-xl transition-all">Menú Principal</button>
          </div>
        )}

      </div> {/* Cierra la caja del juego */}

      {/* BLOQUE DE PUBLICIDAD */}
      <div className="w-full max-w-sm mt-4 p-2 bg-slate-900/40 rounded-xl border border-slate-800/60 text-center">
        <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest block mb-1">Publicidad</span>
        <div className="min-h-[60px] flex items-center justify-center text-xs text-slate-500 italic bg-slate-950/50 rounded-lg border border-dashed border-slate-800">
          <ins className="adsbygoogle"
               style={{ display: "block" }}
               data-ad-client="ca-pub-1382224669385414"
               data-ad-slot="YYYYYYYYYYYY"
               data-ad-format="horizontal"
               data-full-width-responsive="true">
          </ins>
        </div>
      </div>

    </div> /* Cierra el contenedor de pantalla completa */
  )
}

export default App

