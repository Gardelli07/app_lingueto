import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  buscarTempoProfessor,
  enviarMensagemProfessor,
  expiracaoNoAparelho,
  formatarTempo,
  LIMITE_MENSAGEM,
  NOME_PROFESSOR,
} from "../services/professor";
import { useTheme, useThemedStyles } from "../theme";

// Mesmo banner do topo do app (routes.js).
const HEADER_BG = require("../../assets/Home/background-header.png");
// Perfil: circulo que ocupa o quadrado todo, com os cantos preenchidos (sem
// transparencia). Adesivo: corpo inteiro com fundo transparente. As duas sao
// 1254x1254.
const PERFIL_PROFESSOR = require("../../assets/IA/perfil_lingueto_professor.png");
const ADESIVO_PROFESSOR = require("../../assets/IA/lingueto_professor.png");
// Amplia o perfil dentro do recorte redondo pra borda antisserrilhada da
// imagem (que puxa pro branco dos cantos) ficar do lado de fora.
const ZOOM_PERFIL = 1.06;

// Azul do banner do topo, pra bolha do aluno e o enviar combinarem com o header.
const GRADIENTE_ALUNO = ["#1F6BFF", "#3A3DF2"];

// Tocar numa sugestao so preenche o campo: enviar direto dispararia o
// cronometro do dia sem o aluno querer.
const SUGESTOES = [
  "Qual a diferença entre do e does?",
  "Corrija: She have two dogs.",
  "Como se diz \"saudade\" em inglês?",
  "Vamos conversar em inglês sobre viagens?",
];

// A partir daqui o campo mostra quantos caracteres faltam.
const AVISO_CARACTERES = LIMITE_MENSAGEM - 200;

// status 0 = sem resposta da API (rede, timeout ou URL nao configurada): a
// mensagem montada em api.js ja explica qual dos casos foi.
function mensagemDeErro(error) {
  const status = error?.status ?? 0;
  if (status === 0) return error?.message || "Sem conexão com o servidor.";
  if (status === 404) {
    return `O ${NOME_PROFESSOR} ainda não está disponível neste servidor.`;
  }
  // A rota do Professor ja responde com texto pronto pro aluno (limite de
  // perguntas, Gemini fora do ar...); so o 500 generico fica com o daqui.
  if (status !== 500 && error?.data?.message) return error.data.message;
  if (status === 429) {
    return "O Professor atingiu o limite de perguntas por agora. Tente novamente em alguns minutos.";
  }
  return "O Professor não conseguiu responder agora. Tente novamente.";
}

// O Gemini responde em Markdown, mas o balao so precisa de um pedaco dele:
// negrito, italico, tachado e listas viram estilo; titulos, citacoes e
// separadores perdem a marcacao pra nao aparecer "**" ou "###" solto.
const MARCAS_INLINE = /(\*\*[^*\n]+?\*\*|~~[^~\n]+?~~|`[^`\n]+?`|\*[^*\s][^*\n]*?\*)/;

function analisarLinhas(texto) {
  const linhas = [];
  for (const bruta of texto.replace(/\r/g, "").split("\n")) {
    const linha = bruta.replace(/^(\s*>\s?)+/, "").trimEnd();
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(linha)) continue;
    if (!linha.trim()) {
      if (linhas.length && linhas[linhas.length - 1].tipo !== "vazia") {
        linhas.push({ tipo: "vazia" });
      }
      continue;
    }
    const titulo = linha.match(/^\s*#{1,6}\s+(.*)$/);
    if (titulo) {
      linhas.push({ tipo: "titulo", texto: titulo[1] });
      continue;
    }
    const item = linha.match(/^(\s*)[-*+•]\s+(.*)$/);
    if (item) {
      linhas.push({ tipo: "item", recuo: item[1].length >= 2, texto: item[2] });
      continue;
    }
    linhas.push({ tipo: "texto", texto: linha.trim() });
  }
  while (linhas[linhas.length - 1]?.tipo === "vazia") linhas.pop();
  return linhas;
}

function trechosInline(texto, styles) {
  return texto
    .split(MARCAS_INLINE)
    .filter(Boolean)
    .map((parte, i) => {
      if (/^\*\*.+\*\*$/.test(parte)) {
        return <Text key={i} style={styles.negrito}>{parte.slice(2, -2)}</Text>;
      }
      if (/^~~.+~~$/.test(parte)) {
        return <Text key={i} style={styles.tachado}>{parte.slice(2, -2)}</Text>;
      }
      if (/^`.+`$/.test(parte)) return parte.slice(1, -1);
      if (/^\*[^*].*\*$/.test(parte)) {
        return <Text key={i} style={styles.italico}>{parte.slice(1, -1)}</Text>;
      }
      // "**" sem par (ex.: negrito quebrado em duas linhas)
      return parte.replace(/\*\*/g, "");
    });
}

function TextoFormatado({ texto, style }) {
  const styles = useThemedStyles(makeStyles);
  const linhas = useMemo(() => analisarLinhas(texto), [texto]);

  return (
    <Text style={style} selectable>
      {linhas.map((linha, i) => {
        const fim = i < linhas.length - 1 ? "\n" : "";
        if (linha.tipo === "vazia") return <Text key={i}>{fim}</Text>;
        if (linha.tipo === "titulo") {
          return (
            <Text key={i} style={styles.negrito}>
              {trechosInline(linha.texto, styles)}
              {fim}
            </Text>
          );
        }
        return (
          <Text key={i}>
            {linha.tipo === "item" && (linha.recuo ? "    ◦ " : "•  ")}
            {trechosInline(linha.texto, styles)}
            {fim}
          </Text>
        );
      })}
    </Text>
  );
}

function AvatarProfessor({ tamanho = 32, style }) {
  const styles = useThemedStyles(makeStyles);
  const lado = tamanho * ZOOM_PERFIL;

  return (
    <View
      style={[styles.avatar, { width: tamanho, height: tamanho }, style]}
      accessibilityIgnoresInvertColors
    >
      <Image
        source={PERFIL_PROFESSOR}
        style={{ width: lado, height: lado }}
        // Android: reduz a imagem antes de decodificar (o original tem 1254px).
        resizeMethod="resize"
      />
    </View>
  );
}

// Adesivo do Professor: entra com um "pop" e fica flutuando de leve.
function AdesivoProfessor({ tamanho }) {
  const pop = useRef(new Animated.Value(0)).current;
  const flutua = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(pop, {
      toValue: 1,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flutua, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(flutua, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pop, flutua]);

  return (
    <Animated.Image
      source={ADESIVO_PROFESSOR}
      resizeMode="contain"
      resizeMethod="resize"
      accessible
      accessibilityLabel={NOME_PROFESSOR}
      accessibilityIgnoresInvertColors
      style={{
        width: tamanho,
        height: tamanho,
        opacity: pop,
        transform: [
          { scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) },
          {
            translateY: flutua.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -6],
            }),
          },
        ],
      }}
    />
  );
}

function Cronometro({ restanteMs, iniciado, esgotado }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const final = iniciado && !esgotado && restanteMs <= 60000;
  const cor = final ? CORES.ON_GOLD : CORES.WHITE;

  return (
    <View
      style={[
        styles.cronometro,
        final && styles.cronometroFinal,
        esgotado && styles.cronometroEsgotado,
      ]}
      accessibilityRole="timer"
      accessibilityLabel={`Tempo restante: ${formatarTempo(restanteMs)}`}
    >
      <MaterialCommunityIcons
        name={esgotado ? "timer-off-outline" : iniciado ? "timer-sand" : "timer-outline"}
        size={18}
        color={cor}
      />
      <Text style={[styles.cronometroTxt, { color: cor }]}>
        {formatarTempo(restanteMs)}
      </Text>
    </View>
  );
}

function BoasVindas({ minutos, mostrarSugestoes, onSugestao }) {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.hero}>
      <AdesivoProfessor tamanho={118} />
      <Text style={styles.heroTitulo}>Olá! Sou o {NOME_PROFESSOR} 👋</Text>
      <Text style={styles.heroTxt}>
        Tire dúvidas de gramática, vocabulário, pronúncia e tradução. Você tem{" "}
        <Text style={styles.negrito}>{minutos} minutos por dia</Text>, contados a
        partir da sua primeira mensagem.
      </Text>

      {mostrarSugestoes && (
        <>
          <Text style={styles.sugestoesTitulo}>EXPERIMENTE PERGUNTAR</Text>
          <View style={styles.sugestoes}>
            {SUGESTOES.map((sugestao) => (
              <TouchableOpacity
                key={sugestao}
                style={styles.sugestao}
                onPress={() => onSugestao(sugestao)}
                activeOpacity={0.8}
              >
                <Text style={styles.sugestaoTxt}>{sugestao}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

function Bolha({ mensagem }) {
  const styles = useThemedStyles(makeStyles);
  const doAluno = mensagem.autor === "aluno";
  const entrada = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entrada, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [entrada]);

  return (
    <Animated.View
      style={[
        styles.linha,
        doAluno && styles.linhaAluno,
        {
          opacity: entrada,
          transform: [
            {
              translateY: entrada.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}
    >
      {doAluno ? (
        <LinearGradient
          colors={GRADIENTE_ALUNO}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bolha, styles.bolhaAluno]}
        >
          <Text style={[styles.bolhaTxt, styles.bolhaTxtAluno]} selectable>
            {mensagem.texto}
          </Text>
        </LinearGradient>
      ) : (
        <>
          <AvatarProfessor />
          <View style={[styles.bolha, styles.bolhaProfessor]}>
            <TextoFormatado
              texto={mensagem.texto}
              style={[styles.bolhaTxt, styles.bolhaTxtProfessor]}
            />
          </View>
        </>
      )}
    </Animated.View>
  );
}

function Digitando() {
  const styles = useThemedStyles(makeStyles);
  const pontos = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  // Os tres pontos pulam em sequencia; o ciclo de cada um tem a mesma duracao
  // pra eles nao saírem de compasso.
  useEffect(() => {
    const animacoes = pontos.map((valor, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(valor, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(valor, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay((2 - i) * 150 + 200),
        ]),
      ),
    );
    animacoes.forEach((animacao) => animacao.start());
    return () => animacoes.forEach((animacao) => animacao.stop());
  }, [pontos]);

  return (
    <View
      style={styles.linha}
      accessible
      accessibilityLabel="O Professor está escrevendo"
    >
      <AvatarProfessor />
      <View style={[styles.bolha, styles.bolhaProfessor, styles.digitando]}>
        {pontos.map((valor, i) => (
          <Animated.View
            key={i}
            style={[
              styles.ponto,
              {
                opacity: valor.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.35, 1],
                }),
                transform: [
                  {
                    translateY: valor.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -5],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export default function ProfessorLingueto({ navigation }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const insets = useSafeAreaInsets();

  // Historico so da sessao: some ao sair da tela.
  const [mensagens, setMensagens] = useState([]);
  const [rascunho, setRascunho] = useState("");
  const [enviando, setEnviando] = useState(false);
  // { texto, mensagem, historico } da ultima tentativa que falhou, pra
  // "Tentar novamente" refazer exatamente a mesma pergunta.
  const [erro, setErro] = useState(null);
  // Tempo diario. expiraEm ja vem no relogio do aparelho e fica null enquanto
  // o aluno nao mandou a primeira mensagem do dia.
  const [limiteSegundos, setLimiteSegundos] = useState(300);
  const [expiraEm, setExpiraEm] = useState(null);
  const [agora, setAgora] = useState(Date.now());

  const listaRef = useRef(null);
  const inputRef = useRef(null);
  const proximoId = useRef(0);
  // O state demora um render pra refletir; o ref segura toques repetidos no
  // enviar antes disso.
  const enviandoRef = useRef(false);
  const ativoRef = useRef(true);

  useEffect(() => {
    ativoRef.current = true;
    return () => {
      ativoRef.current = false;
    };
  }, []);

  const aplicarTempo = (tempo) => {
    if (!tempo) return;
    setLimiteSegundos(tempo.limite_segundos);
    setExpiraEm(expiracaoNoAparelho(tempo));
  };

  // forcar: depois de um erro o cronometro local pode ter comecado sem o
  // servidor ter recebido a mensagem. Fora isso, nao atropela um envio em curso.
  const carregarTempo = (forcar = false) => {
    buscarTempoProfessor()
      .then((tempo) => {
        if (ativoRef.current && (forcar || !enviandoRef.current)) {
          aplicarTempo(tempo);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    carregarTempo();
  }, []);

  useEffect(() => {
    if (expiraEm === null) return undefined;
    setAgora(Date.now());
    const id = setInterval(() => {
      const instante = Date.now();
      setAgora(instante);
      if (instante >= expiraEm) clearInterval(id);
    }, 500);
    return () => clearInterval(id);
  }, [expiraEm]);

  const limiteMs = limiteSegundos * 1000;
  const iniciado = expiraEm !== null;
  const restanteMs = iniciado ? Math.max(0, expiraEm - agora) : limiteMs;
  const esgotado = iniciado && restanteMs <= 0;
  const ultimoMinuto = iniciado && !esgotado && restanteMs <= 60000;
  const minutosDiarios = Math.round(limiteSegundos / 60);
  // Conferido na hora do toque: o state "agora" anda de meio em meio segundo.
  const tempoAcabou = () => expiraEm !== null && Date.now() >= expiraEm;

  useEffect(() => {
    if (esgotado) Keyboard.dismiss();
  }, [esgotado]);

  const novaMensagem = (autor, texto) => {
    proximoId.current += 1;
    return { id: String(proximoId.current), autor, texto };
  };

  // Uma resposta que ja estava sendo gerada quando o tempo acaba chega
  // normalmente; so novos envios ficam bloqueados.
  const pedirResposta = async (mensagem, historico) => {
    enviandoRef.current = true;
    setEnviando(true);
    setErro(null);
    try {
      const { resposta, tempo } = await enviarMensagemProfessor({
        mensagem,
        historico,
      });
      if (!ativoRef.current) return;
      aplicarTempo(tempo);
      setMensagens((atual) => [...atual, novaMensagem("professor", resposta)]);
    } catch (error) {
      if (!ativoRef.current) return;
      const tempo = error?.data?.detalhes?.tempo;
      if (tempo) aplicarTempo(tempo);
      else carregarTempo(true);
      setErro({ texto: mensagemDeErro(error), mensagem, historico });
    } finally {
      enviandoRef.current = false;
      if (ativoRef.current) setEnviando(false);
    }
  };

  const handleEnviar = () => {
    const texto = rascunho.trim();
    if (!texto || enviandoRef.current || tempoAcabou()) return;

    // O cronometro corre a partir do toque; a resposta do servidor acerta a hora.
    if (expiraEm === null) setExpiraEm(Date.now() + limiteMs);

    const historico = mensagens;
    setMensagens((atual) => [...atual, novaMensagem("aluno", texto)]);
    setRascunho("");
    pedirResposta(texto, historico);
  };

  const handleTentarDeNovo = () => {
    if (!erro || enviandoRef.current || tempoAcabou()) return;
    pedirResposta(erro.mensagem, erro.historico);
  };

  const handleSugestao = (sugestao) => {
    setRascunho(sugestao);
    inputRef.current?.focus();
  };

  const podeEnviar = rascunho.trim().length > 0 && !enviando && !esgotado;
  const alunoJaEnviou = mensagens.some((m) => m.autor === "aluno");
  const subtitulo = esgotado
    ? "Tempo de hoje esgotado"
    : ultimoMinuto
      ? "Último minuto!"
      : iniciado
        ? "Online · tempo restante de hoje"
        : `Online · ${minutosDiarios} min por dia`;
  const corBarra = ultimoMinuto ? CORES.HOME_AMBER : CORES.WHITE;

  return (
    <View style={styles.tela}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <Image
          source={HEADER_BG}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        <View style={styles.headerLinha}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            style={styles.headerBotao}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={CORES.WHITE}
            />
          </Pressable>
          <View>
            <AvatarProfessor tamanho={42} style={styles.headerAvatar} />
            {!esgotado && <View style={styles.onlineDot} />}
          </View>
          <View style={styles.headerTextos}>
            {/* divide a linha com o cronometro: em tela estreita a fonte
                encolhe em vez de cortar o nome */}
            <Text
              style={styles.headerTitulo}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {NOME_PROFESSOR}
            </Text>
            <Text style={styles.headerSub} numberOfLines={1}>
              {subtitulo}
            </Text>
          </View>
          <Cronometro
            restanteMs={restanteMs}
            iniciado={iniciado}
            esgotado={esgotado}
          />
        </View>

        <View style={styles.barraTrilho}>
          <View
            style={[
              styles.barraFill,
              {
                width: `${(restanteMs / limiteMs) * 100}%`,
                backgroundColor: corBarra,
              },
            ]}
          />
        </View>
      </View>

      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <FlatList
          ref={listaRef}
          data={mensagens}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => <Bolha mensagem={item} />}
          ListHeaderComponent={
            <BoasVindas
              minutos={minutosDiarios}
              mostrarSugestoes={!alunoJaEnviou && !esgotado}
              onSugestao={handleSugestao}
            />
          }
          ListFooterComponent={enviando ? <Digitando /> : null}
          contentContainerStyle={styles.lista}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            listaRef.current?.scrollToEnd({ animated: true })
          }
        />

        {esgotado ? (
          <View
            style={[
              styles.esgotado,
              { marginBottom: Math.max(insets.bottom, 12) },
            ]}
          >
            <Image
              source={ADESIVO_PROFESSOR}
              style={styles.esgotadoAdesivo}
              resizeMode="contain"
              resizeMethod="resize"
              accessibilityIgnoresInvertColors
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.esgotadoTitulo}>Até amanhã! 👋</Text>
              <Text style={styles.esgotadoTxt}>
                Seus {minutosDiarios} minutos de hoje com o Professor acabaram.
                Volte amanhã para continuar praticando.
              </Text>
            </View>
          </View>
        ) : (
          <>
            {erro && (
              <View style={styles.erro}>
                <MaterialCommunityIcons
                  name="alert-circle-outline"
                  size={18}
                  color={CORES.HOME_DANGER}
                />
                <Text style={styles.erroTxt}>{erro.texto}</Text>
                <TouchableOpacity
                  onPress={handleTentarDeNovo}
                  disabled={enviando}
                  activeOpacity={0.85}
                  style={styles.erroBotao}
                >
                  <Text style={styles.erroBotaoTxt}>Tentar novamente</Text>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={[
                styles.composer,
                { paddingBottom: Math.max(insets.bottom, 10) },
              ]}
            >
              <View style={styles.campo}>
                <TextInput
                  ref={inputRef}
                  value={rascunho}
                  onChangeText={setRascunho}
                  placeholder="Escreva sua dúvida de inglês..."
                  placeholderTextColor={CORES.HOME_FAINT}
                  style={styles.input}
                  multiline
                  maxLength={LIMITE_MENSAGEM}
                />
                {rascunho.length >= AVISO_CARACTERES && (
                  <Text style={styles.contador}>
                    {rascunho.length}/{LIMITE_MENSAGEM}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={handleEnviar}
                disabled={!podeEnviar}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Enviar"
                style={!podeEnviar && styles.enviarOff}
              >
                <LinearGradient
                  colors={GRADIENTE_ALUNO}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.enviar}
                >
                  <MaterialCommunityIcons
                    name="send"
                    size={20}
                    color={CORES.WHITE}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

/* -------------------------------- styles --------------------------------- */
const makeStyles = (CORES) =>
  StyleSheet.create({
    tela: { flex: 1, backgroundColor: CORES.HOME_BG },

    header: {
      paddingBottom: 14,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      overflow: "hidden",
      backgroundColor: "#1F4FF0",
    },
    headerLinha: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingRight: 14,
    },
    headerBotao: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 99,
    },
    headerAvatar: {
      borderWidth: 2,
      borderColor: "rgba(255,255,255,0.85)",
    },
    onlineDot: {
      position: "absolute",
      right: -1,
      bottom: -1,
      width: 13,
      height: 13,
      borderRadius: 99,
      backgroundColor: "#3DDC84",
      borderWidth: 2,
      borderColor: "#1F4FF0",
    },
    headerTextos: { flex: 1, minWidth: 0, marginLeft: 10, marginRight: 8 },
    headerTitulo: { fontSize: 18, fontWeight: "900", color: CORES.WHITE },
    headerSub: {
      fontSize: 12.5,
      fontWeight: "700",
      color: "rgba(255,255,255,0.82)",
      marginTop: 1,
    },

    cronometro: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 99,
      backgroundColor: "rgba(255,255,255,0.18)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.35)",
    },
    cronometroFinal: {
      backgroundColor: CORES.HOME_AMBER,
      borderColor: CORES.HOME_AMBER,
    },
    cronometroEsgotado: {
      backgroundColor: CORES.HOME_DANGER,
      borderColor: CORES.HOME_DANGER,
    },
    // tabular-nums: os digitos tem a mesma largura e o relogio nao "treme"
    cronometroTxt: {
      fontSize: 20,
      fontWeight: "900",
      fontVariant: ["tabular-nums"],
    },
    barraTrilho: {
      height: 5,
      marginTop: 12,
      marginHorizontal: 16,
      borderRadius: 99,
      backgroundColor: "rgba(255,255,255,0.22)",
      overflow: "hidden",
    },
    barraFill: { height: "100%", borderRadius: 99 },

    lista: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },

    hero: {
      alignItems: "center",
      backgroundColor: CORES.SURFACE,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
      paddingHorizontal: 18,
      paddingTop: 14,
      paddingBottom: 18,
      marginBottom: 18,
    },
    heroTitulo: {
      fontSize: 18,
      fontWeight: "900",
      color: CORES.HOME_NAVY,
      marginTop: 6,
      textAlign: "center",
    },
    heroTxt: {
      fontSize: 14,
      lineHeight: 20,
      color: CORES.HOME_MUTED,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 6,
    },
    sugestoesTitulo: {
      alignSelf: "flex-start",
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 0.5,
      color: CORES.HOME_FAINT,
      marginTop: 18,
      marginBottom: 8,
    },
    sugestoes: { alignSelf: "stretch", gap: 8 },
    sugestao: {
      paddingHorizontal: 14,
      paddingVertical: 11,
      borderRadius: 14,
      backgroundColor: CORES.HOME_FILTER_BG,
      borderWidth: 1,
      borderColor: CORES.HOME_BADGE_BG,
    },
    sugestaoTxt: {
      fontSize: 14,
      fontWeight: "700",
      color: CORES.HOME_PRIMARY,
    },

    linha: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 8,
      marginBottom: 12,
    },
    linhaAluno: { justifyContent: "flex-end" },
    avatar: {
      borderRadius: 99,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: CORES.HOME_BADGE_BG,
    },
    bolha: {
      maxWidth: "80%",
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 11,
    },
    bolhaAluno: { borderBottomRightRadius: 6 },
    bolhaProfessor: {
      flexShrink: 1,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
      borderBottomLeftRadius: 6,
    },
    bolhaTxt: { fontSize: 15, lineHeight: 22 },
    bolhaTxtAluno: { color: CORES.WHITE, fontWeight: "600" },
    bolhaTxtProfessor: { color: CORES.HOME_NAVY },
    negrito: { fontWeight: "800" },
    italico: { fontStyle: "italic" },
    tachado: { textDecorationLine: "line-through" },
    digitando: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingVertical: 15,
    },
    ponto: {
      width: 8,
      height: 8,
      borderRadius: 99,
      backgroundColor: CORES.HOME_PRIMARY,
    },

    erro: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginHorizontal: 16,
      marginBottom: 8,
      padding: 12,
      borderRadius: 14,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1,
      borderColor: CORES.HOME_DANGER,
    },
    erroTxt: {
      flex: 1,
      color: CORES.HOME_NAVY,
      fontWeight: "600",
      fontSize: 13,
    },
    erroBotao: { paddingVertical: 4, paddingHorizontal: 6 },
    erroBotaoTxt: { color: CORES.HOME_PRIMARY, fontWeight: "800", fontSize: 13 },

    composer: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 10,
      paddingHorizontal: 12,
      paddingTop: 10,
      backgroundColor: CORES.SURFACE,
      borderTopWidth: 1,
      borderTopColor: CORES.HOME_BORDER,
    },
    campo: {
      flex: 1,
      borderRadius: 24,
      backgroundColor: CORES.HOME_BG,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
    },
    input: {
      maxHeight: 120,
      minHeight: 46,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 12,
      color: CORES.HOME_NAVY,
      fontSize: 15,
    },
    contador: {
      alignSelf: "flex-end",
      marginTop: -6,
      marginRight: 14,
      marginBottom: 6,
      fontSize: 11,
      fontWeight: "700",
      color: CORES.HOME_FAINT,
    },
    enviar: {
      width: 46,
      height: 46,
      borderRadius: 99,
      alignItems: "center",
      justifyContent: "center",
    },
    enviarOff: { opacity: 0.45 },

    esgotado: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginHorizontal: 16,
      marginTop: 4,
      padding: 14,
      borderRadius: 20,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1.5,
      borderColor: CORES.HOME_DANGER,
    },
    esgotadoAdesivo: { width: 68, height: 68 },
    esgotadoTitulo: { fontSize: 16, fontWeight: "900", color: CORES.HOME_NAVY },
    esgotadoTxt: {
      fontSize: 13.5,
      lineHeight: 19,
      fontWeight: "600",
      color: CORES.HOME_MUTED,
      marginTop: 2,
    },
  });
