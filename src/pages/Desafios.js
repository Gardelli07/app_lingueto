import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { fetchAmigos } from "../services/amizades";
import {
  fetchMetasDesafio,
  fetchDesafioAtivo,
  fetchEstatisticasDesafios,
  criarDesafio,
  aceitarDesafio,
  recusarDesafio,
  cancelarDesafio,
} from "../services/desafios";
import { useTheme, useThemedStyles } from "../theme";

// O backend derruba convite nao respondido nesse prazo (PRAZO_PEDIDO_HORAS em
// desafios.service.ts). Replicado aqui so para mostrar a contagem regressiva.
const HORAS_PEDIDO = 24;
const MS_POR_HORA = 60 * 60 * 1000;

/* ============================ helpers de meta ============================ */

function ehMetaXp(meta) {
  return meta?.tipo === "xp_total";
}

function plural(valor, singular, pluralTxt) {
  return valor === 1 ? singular : pluralTxt;
}

// "500 XP" ou "5 aulas" — o alvo muda de unidade conforme o tipo da meta.
function alvoTexto(meta) {
  if (!meta) return "";
  if (ehMetaXp(meta)) return `${meta.valor_alvo} XP`;
  return `${meta.valor_alvo} ${plural(meta.valor_alvo, "aula", "aulas")}`;
}

function unidadeTexto(meta, valor) {
  if (ehMetaXp(meta)) return "XP";
  return plural(valor, "aula", "aulas");
}

function percentual(progresso, alvo) {
  if (!alvo || alvo <= 0) return 0;
  return Math.min(100, Math.max(0, (progresso / alvo) * 100));
}

// Quem esta na frente, e por quanto — na unidade certa da meta.
function situacaoDuelo(meuProgresso, progressoRival, meta) {
  const diferenca = meuProgresso - progressoRival;
  const absoluto = Math.abs(diferenca);

  if (diferenca > 0) {
    return {
      estado: "frente",
      icone: "trending-up",
      texto: `Você está na frente por ${absoluto} ${unidadeTexto(meta, absoluto)}`,
    };
  }
  if (diferenca < 0) {
    return {
      estado: "atras",
      icone: "arrow-down-right",
      texto: `${plural(absoluto, "Falta", "Faltam")} ${absoluto} ${unidadeTexto(meta, absoluto)} pra virar o jogo`,
    };
  }
  return {
    estado: "empate",
    icone: "equal",
    texto: `Empate técnico — ${meuProgresso} ${unidadeTexto(meta, meuProgresso)} cada`,
  };
}

/* ============================ helpers de prazo ============================ */

function horasAte(data) {
  if (!data) return null;
  const alvo = new Date(data).getTime();
  if (Number.isNaN(alvo)) return null;
  return (alvo - Date.now()) / MS_POR_HORA;
}

// Prazo do duelo: vira alerta vermelho no último dia.
function prazoDuelo(expiraEm) {
  const horas = horasAte(expiraEm);
  if (horas == null) return null;
  if (horas <= 0) return { urgente: true, icone: "fire", texto: "PRAZO ENCERRADO" };
  if (horas <= 24) {
    const arredondado = Math.max(1, Math.round(horas));
    return { urgente: true, icone: "fire", texto: `${plural(arredondado, "FALTA", "FALTAM")} ${arredondado} H` };
  }
  const dias = Math.ceil(horas / 24);
  return {
    urgente: false,
    icone: "clock-outline",
    texto: `${dias} ${plural(dias, "DIA RESTANTE", "DIAS RESTANTES")}`,
  };
}

function prazoConvite(criadoEm) {
  if (!criadoEm) return null;
  const limite = new Date(criadoEm).getTime() + HORAS_PEDIDO * MS_POR_HORA;
  const horas = (limite - Date.now()) / MS_POR_HORA;
  if (horas <= 0) return "EXPIRANDO";
  if (horas < 1) return "EXPIRA EM MENOS DE 1 H";
  return `EXPIRA EM ${Math.round(horas)} H`;
}

function formatarXp(valor) {
  const numero = Number(valor) || 0;
  if (numero >= 1000) return `${(numero / 1000).toFixed(1).replace(".0", "")}k XP`;
  return `${numero} XP`;
}

/* ============================== componentes ============================== */

function Avatar({ uri, nome, size = 44, style, textSize, textColor }) {
  const styles = useThemedStyles(makeStyles);
  const fonte = textSize || Math.round(size * 0.38);

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size }} />
      ) : (
        <Text
          style={[
            styles.avatarInitial,
            { fontSize: fonte },
            textColor && { color: textColor },
          ]}
        >
          {(nome || "U").charAt(0).toUpperCase()}
        </Text>
      )}
    </View>
  );
}

function fotoDe(usuario) {
  return usuario?.foto_url ? `${API_URL}${usuario.foto_url}` : null;
}

function ChipTipoMeta({ meta, styles, CORES, compacto }) {
  const xp = ehMetaXp(meta);
  return (
    <View style={[styles.chip, xp ? styles.chipTipoXp : styles.chipTipoAcc]}>
      <MaterialCommunityIcons
        name={xp ? "lightning-bolt" : "target"}
        size={compacto ? 12 : 13}
        color={xp ? CORES.DES_TIPO_XP_TXT : CORES.DES_TIPO_ACC_TXT}
      />
      <Text
        style={[
          styles.chipTxt,
          xp ? styles.chipTipoXpTxt : styles.chipTipoAccTxt,
          compacto && { fontSize: 10.5 },
        ]}
      >
        {xp ? "CORRIDA DE XP" : "AULAS CAPRICHADAS"}
      </Text>
    </View>
  );
}

/* ---------- arena: o duelo em andamento ---------- */
function ArenaDuelo({ desafio, souDesafiante, styles, CORES }) {
  const meta = desafio.meta;
  const eu = souDesafiante ? desafio.desafiante : desafio.desafiado;
  const rival = souDesafiante ? desafio.desafiado : desafio.desafiante;

  const meuPercent = percentual(eu.progresso, meta.valor_alvo);
  const percentRival = percentual(rival.progresso, meta.valor_alvo);
  const situacao = situacaoDuelo(eu.progresso, rival.progresso, meta);
  const prazo = prazoDuelo(desafio.expira_em);

  const faixaSituacao =
    situacao.estado === "frente"
      ? styles.situacaoFrente
      : situacao.estado === "atras"
        ? styles.situacaoAtras
        : styles.situacaoEmpate;

  const corSituacao =
    situacao.estado === "frente"
      ? CORES.DES_LEAD_TXT
      : situacao.estado === "atras"
        ? CORES.DES_RIVAL_TXT
        : CORES.WHITE;

  return (
    <LinearGradient
      colors={[CORES.DES_ARENA_FROM, CORES.DES_ARENA_TO]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.arena}
    >
      <View style={styles.arenaTopo}>
        <View style={styles.arenaTag}>
          <MaterialCommunityIcons name="sword-cross" size={13} color={CORES.WHITE} />
          <Text style={styles.arenaTagTxt}>DUELO ATIVO</Text>
        </View>
        <View style={{ flex: 1 }} />
        {!!prazo && (
          <View style={[styles.chip, prazo.urgente ? styles.chipUrgente : styles.chipPrazo]}>
            <MaterialCommunityIcons
              name={prazo.icone}
              size={13}
              color={prazo.urgente ? CORES.DES_URGENT_TXT : CORES.DES_DEADLINE_TXT}
            />
            <Text
              style={[
                styles.chipTxt,
                { color: prazo.urgente ? CORES.DES_URGENT_TXT : CORES.DES_DEADLINE_TXT },
              ]}
            >
              {prazo.texto}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.arenaLados}>
        <View style={styles.arenaLado}>
          <Avatar
            uri={fotoDe(eu)}
            nome="Você"
            size={60}
            textSize={22}
            textColor={CORES.DES_ME_AVATAR_TXT}
            style={styles.arenaAvatarEu}
          />
          <Text style={styles.arenaNome}>Você</Text>
          <View style={styles.arenaValorLinha}>
            <Text style={styles.arenaValor}>{eu.progresso}</Text>
            <Text style={styles.arenaAlvo}>/ {alvoTexto(meta)}</Text>
          </View>
        </View>

        <View style={styles.arenaVsColuna}>
          <View style={styles.arenaVs}>
            <Text style={styles.arenaVsTxt}>VS</Text>
          </View>
        </View>

        <View style={styles.arenaLado}>
          <Avatar
            uri={fotoDe(rival)}
            nome={rival.nome}
            size={60}
            textSize={22}
            style={styles.arenaAvatarRival}
          />
          <Text style={styles.arenaNome} numberOfLines={1}>
            {rival.nome}
          </Text>
          <View style={styles.arenaValorLinha}>
            <Text style={[styles.arenaValor, styles.arenaValorRival]}>
              {rival.progresso}
            </Text>
            <Text style={styles.arenaAlvo}>/ {alvoTexto(meta)}</Text>
          </View>
        </View>
      </View>

      {/* cabo de guerra: cada lado cresce da sua borda para o centro */}
      <View style={styles.tugTrilho}>
        <View style={[styles.tugMeu, { width: `${meuPercent / 2}%` }]} />
        <View style={{ flex: 1 }} />
        <View style={[styles.tugRival, { width: `${percentRival / 2}%` }]} />
        <View style={styles.tugCentro} />
      </View>

      <View style={styles.tugLegenda}>
        <Text style={styles.tugPercent}>{Math.round(meuPercent)}%</Text>
        <Text style={styles.tugPercent}>{Math.round(percentRival)}%</Text>
      </View>

      <View style={[styles.situacao, faixaSituacao]}>
        <MaterialCommunityIcons name={situacao.icone} size={15} color={corSituacao} />
        <Text style={[styles.situacaoTxt, { color: corSituacao }]}>{situacao.texto}</Text>
      </View>
    </LinearGradient>
  );
}

/* ---------- card da meta do duelo em andamento ---------- */
function CardMetaAtiva({ desafio, styles, CORES }) {
  const meta = desafio.meta;
  const xp = ehMetaXp(meta);

  return (
    <View style={styles.card}>
      <View style={styles.cardTopo}>
        <ChipTipoMeta meta={meta} styles={styles} CORES={CORES} />
        <View style={{ flex: 1 }} />
        <View style={[styles.chip, styles.chipNeutro]}>
          <MaterialCommunityIcons
            name="calendar-blank-outline"
            size={13}
            color={CORES.PROFILE_MUTED}
          />
          <Text style={[styles.chipTxt, styles.chipNeutroTxt]}>
            {meta.prazo_dias} {plural(meta.prazo_dias, "DIA", "DIAS")}
          </Text>
        </View>
      </View>

      <Text style={styles.cardTitulo}>{meta.titulo}</Text>
      {xp && !!meta.descricao && (
        <Text style={styles.cardDesc}>{meta.descricao}</Text>
      )}

      {!xp && (
        <View style={styles.avisoPrecisao}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={17}
            color={CORES.DES_TIPO_ACC_TXT}
          />
          <Text style={styles.avisoPrecisaoTxt}>
            Só contam aulas terminadas com{" "}
            <Text style={styles.avisoPrecisaoForte}>
              {meta.precisao_minima}% ou mais
            </Text>{" "}
            de acerto. Abaixo disso não soma.
          </Text>
        </View>
      )}

      <View style={styles.premioLinha}>
        <View style={styles.premio}>
          <MaterialCommunityIcons
            name="trophy-variant"
            size={18}
            color={CORES.DES_PRIZE_TXT}
          />
          <View>
            <Text style={styles.premioValor}>+{desafio.xp_recompensa} XP</Text>
            <Text style={styles.premioLabel}>PRA QUEM VENCER</Text>
          </View>
        </View>
        <View style={styles.premioNota}>
          <MaterialCommunityIcons
            name="information-outline"
            size={14}
            color={CORES.PROFILE_MUTED_LIGHT}
          />
          <Text style={styles.premioNotaTxt}>
            {xp
              ? "Só conta o XP feito depois do aceite."
              : "Só contam aulas feitas depois do aceite."}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ---------- resumo da meta dentro dos cards de convite ---------- */
function ResumoMeta({ meta, xpRecompensa, styles, CORES }) {
  return (
    <View style={styles.resumoMeta}>
      <View style={styles.cardTopo}>
        <ChipTipoMeta meta={meta} styles={styles} CORES={CORES} compacto />
        <View style={{ flex: 1 }} />
        <Text style={styles.resumoPremio}>+{xpRecompensa} XP</Text>
      </View>
      <Text style={styles.resumoTitulo}>{meta.titulo}</Text>
      <View style={styles.resumoChips}>
        <View style={[styles.chip, styles.chipNeutro]}>
          <MaterialCommunityIcons
            name="flag-checkered"
            size={12}
            color={CORES.PROFILE_MUTED}
          />
          <Text style={[styles.chipTxt, styles.chipNeutroTxt]}>{alvoTexto(meta)}</Text>
        </View>
        {!ehMetaXp(meta) && (
          <View style={[styles.chip, styles.chipAcc]}>
            <Text style={[styles.chipTxt, styles.chipAccTxt]}>
              mín. {meta.precisao_minima}%
            </Text>
          </View>
        )}
        <View style={[styles.chip, styles.chipNeutro]}>
          <MaterialCommunityIcons
            name="calendar-blank-outline"
            size={12}
            color={CORES.PROFILE_MUTED}
          />
          <Text style={[styles.chipTxt, styles.chipNeutroTxt]}>
            {meta.prazo_dias} {plural(meta.prazo_dias, "dia", "dias")}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ---------- convite recebido ---------- */
function ConviteRecebido({ desafio, rival, minhaFoto, onAceitar, onRecusar, processando, styles, CORES }) {
  const prazo = prazoConvite(desafio.criado_em);

  return (
    <>
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>CONVITE RECEBIDO</Text>
        <View style={styles.secaoLinha} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardTopo}>
          <View style={[styles.chip, styles.chipDesafio]}>
            <MaterialCommunityIcons
              name="sword-cross"
              size={13}
              color={CORES.BRAND_STRONG}
            />
            <Text style={[styles.chipTxt, styles.chipDesafioTxt]}>TE DESAFIARAM</Text>
          </View>
          <View style={{ flex: 1 }} />
          {!!prazo && (
            <View style={[styles.chip, styles.chipEspera]}>
              <MaterialCommunityIcons
                name="timer-sand"
                size={13}
                color={CORES.DES_PRIZE_TXT}
              />
              <Text style={[styles.chipTxt, styles.chipEsperaTxt]}>{prazo}</Text>
            </View>
          )}
        </View>

        <View style={styles.duplaAvatar}>
          <Avatar uri={fotoDe(rival)} nome={rival.nome} size={56} style={styles.avatarDestaque} />
          <View style={[styles.vsPequeno, { marginLeft: -24 }]}>
            <Text style={styles.vsPequenoTxt}>VS</Text>
          </View>
          <Avatar uri={minhaFoto} nome="V" size={44} />
          <View style={styles.duplaTexto}>
            <Text style={styles.duplaTitulo} numberOfLines={1}>
              {rival.nome} te desafiou
            </Text>
            {/* /desafios/ativo nao devolve xp_total do rival — so mostra se vier */}
            {rival.xp_total != null && (
              <Text style={styles.duplaSub}>
                {formatarXp(rival.xp_total)} no total
              </Text>
            )}
          </View>
        </View>

        <ResumoMeta
          meta={desafio.meta}
          xpRecompensa={desafio.xp_recompensa}
          styles={styles}
          CORES={CORES}
        />

        <View style={styles.acoesDupla}>
          <Pressable
            onPress={onAceitar}
            disabled={processando}
            style={({ pressed }) => [
              styles.botaoPrincipal,
              { flex: 1 },
              pressed && styles.botaoPressionado,
            ]}
          >
            {processando ? (
              <ActivityIndicator color={CORES.WHITE} />
            ) : (
              <>
                <MaterialCommunityIcons name="check-bold" size={17} color={CORES.WHITE} />
                <Text style={styles.botaoPrincipalTxt}>Aceitar duelo</Text>
              </>
            )}
          </Pressable>

          <Pressable
            onPress={onRecusar}
            disabled={processando}
            style={({ pressed }) => [
              styles.botaoNeutro,
              processando && styles.botaoNeutroInativo,
              pressed && styles.botaoNeutroPressionado,
            ]}
          >
            <Text style={styles.botaoNeutroTxt}>Recusar</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

/* ---------- convite enviado ---------- */
function ConviteEnviado({ desafio, rival, minhaFoto, onCancelar, processando, styles, CORES }) {
  const prazo = prazoConvite(desafio.criado_em);

  return (
    <>
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>CONVITE ENVIADO</Text>
        <View style={styles.secaoLinha} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardTopo}>
          <View style={[styles.chip, styles.chipEsperaSuave]}>
            <MaterialCommunityIcons
              name="timer-sand"
              size={13}
              color={CORES.DES_PRIZE_TXT}
            />
            <Text style={[styles.chipTxt, styles.chipEsperaTxt]}>AGUARDANDO RESPOSTA</Text>
          </View>
          <View style={{ flex: 1 }} />
          {!!prazo && <Text style={styles.prazoSolto}>{prazo}</Text>}
        </View>

        <View style={styles.duplaAvatar}>
          <Avatar uri={minhaFoto} nome="V" size={44} />
          <View style={[styles.vsPequeno, { marginLeft: -18 }]}>
            <Text style={styles.vsPequenoTxt}>VS</Text>
          </View>
          <View style={styles.avatarPendente}>
            <Text style={styles.avatarPendenteTxt}>
              {(rival.nome || "U").charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.duplaTexto}>
            <Text style={styles.duplaTitulo} numberOfLines={1}>
              Você desafiou {rival.nome}
            </Text>
            <Text style={styles.duplaSub} numberOfLines={1}>
              {desafio.meta.titulo} · {desafio.meta.prazo_dias}{" "}
              {plural(desafio.meta.prazo_dias, "dia", "dias")}
            </Text>
          </View>
        </View>

        <View style={styles.avisoEspera}>
          <View style={styles.avisoEsperaIcone}>
            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={17}
              color={CORES.DES_PRIZE_TXT}
            />
          </View>
          <Text style={styles.avisoEsperaTxt}>
            O duelo começa quando {rival.nome} aceitar. Se não responder em{" "}
            {HORAS_PEDIDO} h, o convite cai sozinho.
          </Text>
        </View>

        <Pressable
          onPress={onCancelar}
          disabled={processando}
          style={({ pressed }) => [
            styles.botaoNeutroLargo,
            pressed && styles.botaoNeutroPressionado,
          ]}
        >
          {processando ? (
            <ActivityIndicator color={CORES.PROFILE_MUTED} />
          ) : (
            <>
              <MaterialCommunityIcons name="close" size={16} color={CORES.PROFILE_MUTED} />
              <Text style={styles.botaoNeutroTxt}>Cancelar convite</Text>
            </>
          )}
        </Pressable>
      </View>
    </>
  );
}

/* ---------- faixa de estatísticas ---------- */
function FaixaEstatisticas({ stats, styles, CORES }) {
  return (
    <LinearGradient
      colors={[CORES.DES_STATS_FROM, CORES.DES_STATS_TO]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.stats}
    >
      <View>
        <View style={styles.statsValorLinha}>
          <Text style={styles.statsValor}>{stats.vitorias}</Text>
          <Text style={styles.statsUnidade}>
            {plural(stats.vitorias, "vitória", "vitórias")}
          </Text>
        </View>
        <Text style={styles.statsSub}>
          em {stats.total} {plural(stats.total, "desafio", "desafios")}
        </Text>
      </View>

      <View style={styles.statsDivisor} />

      <View>
        <View style={styles.statsValorLinha}>
          <Text style={styles.statsValor}>{stats.percentualVitorias}</Text>
          <Text style={styles.statsPercent}>%</Text>
        </View>
        <Text style={styles.statsSub}>de aproveitamento</Text>
      </View>

      <View style={styles.statsIcone}>
        <MaterialCommunityIcons name="sword-cross" size={22} color={CORES.WHITE} />
      </View>
    </LinearGradient>
  );
}

/* ---------- skeleton ---------- */
function SkeletonSelecao({ styles }) {
  const pulse = useRef(new Animated.Value(0.55)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.55,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const bloco = (style) => (
    <Animated.View style={[styles.skBloco, style, { opacity: pulse }]} />
  );

  return (
    <View style={styles.bloco}>
      <Animated.View style={[styles.skStats, { opacity: pulse }]} />

      <View style={styles.secao}>
        {bloco({ width: 140, height: 10 })}
        <View style={styles.secaoLinha} />
      </View>

      <View style={styles.skAmigos}>
        {[1, 0.75, 0.45].map((opacity, index) => (
          <View key={index} style={[styles.skAmigo, { opacity }]}>
            {bloco({ width: 52, height: 52, borderRadius: 99 })}
            {bloco({ width: 52, height: 10, marginTop: 8 })}
            {bloco({ width: 44, height: 14, marginTop: 8 })}
          </View>
        ))}
      </View>

      <View style={styles.secao}>
        {bloco({ width: 120, height: 10 })}
        <View style={styles.secaoLinha} />
      </View>

      {[1, 0.75, 0.45].map((opacity, index) => (
        <View key={index} style={[styles.skMeta, { opacity }]}>
          {bloco({ width: 40, height: 40, borderRadius: 14 })}
          <View style={{ flex: 1, marginLeft: 12 }}>
            {bloco({ width: "65%", height: 12 })}
            {bloco({ width: "40%", height: 10, marginTop: 8 })}
          </View>
          {bloco({ width: 52, height: 14 })}
        </View>
      ))}
    </View>
  );
}

/* ================================ tela ================================ */

export default function Desafios({ route, navigation }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { user } = useAuth();
  const currentUserId = user?.id;
  const amigoPreSelecionado = route?.params?.amigoId ?? null;

  const [carregando, setCarregando] = useState(true);
  const [desafioAtual, setDesafioAtual] = useState(null);
  const [amigos, setAmigos] = useState([]);
  const [metas, setMetas] = useState([]);
  const [stats, setStats] = useState(null);
  const [amigoId, setAmigoId] = useState(
    amigoPreSelecionado ? String(amigoPreSelecionado) : null,
  );
  const [metaId, setMetaId] = useState(null);
  const [processando, setProcessando] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const atual = await fetchDesafioAtivo();
      setDesafioAtual(atual);
      if (!atual) {
        const [listaAmigos, listaMetas, estatisticas] = await Promise.all([
          fetchAmigos(),
          fetchMetasDesafio(),
          fetchEstatisticasDesafios().catch(() => null),
        ]);
        setAmigos(listaAmigos);
        setMetas(listaMetas);
        setStats(estatisticas);
      }
    } catch {
      // mantem o ultimo estado bom
    } finally {
      setCarregando(false);
    }
  }, []);

  React.useEffect(() => {
    const sub = navigation.addListener("focus", carregar);
    return sub;
  }, [navigation, carregar]);

  const executar = async (acao, mensagemErro) => {
    setProcessando(true);
    try {
      await acao();
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || mensagemErro);
    } finally {
      setProcessando(false);
    }
  };

  const handleAceitar = () =>
    executar(
      () => aceitarDesafio(desafioAtual.id),
      "Não foi possível aceitar o desafio.",
    );

  const handleRecusar = () =>
    executar(
      () => recusarDesafio(desafioAtual.id),
      "Não foi possível recusar o desafio.",
    );

  const handleCancelar = () =>
    executar(
      () => cancelarDesafio(desafioAtual.id),
      "Não foi possível cancelar o desafio.",
    );

  const handleEnviarDesafio = () => {
    if (!amigoId || !metaId) return;
    return executar(
      () => criarDesafio(amigoId, metaId),
      "Não foi possível criar o desafio.",
    );
  };

  const minhaFoto = user?.foto_url ? `${API_URL}${user.foto_url}` : null;
  const souDesafiante =
    desafioAtual && String(desafioAtual.desafiante.id) === String(currentUserId);
  const rival = desafioAtual
    ? souDesafiante
      ? desafioAtual.desafiado
      : desafioAtual.desafiante
    : null;

  const amigoSelecionado = amigos.find(
    (amigo) => String(amigo.id) === String(amigoId),
  );
  const podeDesafiar = Boolean(amigoId && metaId);
  const rotuloBotao = !amigoId
    ? "Escolha um amigo"
    : !metaId
      ? "Escolha uma meta"
      : `Desafiar ${amigoSelecionado?.nome || "amigo"}`;

  const mostrarSeletor = !carregando && !desafioAtual && amigos.length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle={CORES.statusBarStyle} />

      <View style={styles.header}>
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
            color={CORES.PROFILE_NAVY}
          />
        </Pressable>
        <Text style={styles.headerTitulo}>Desafios</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          mostrarSeletor && styles.scrollComRodape,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {carregando ? (
          <SkeletonSelecao styles={styles} />
        ) : desafioAtual && desafioAtual.status === "ativo" ? (
          <View style={styles.bloco}>
            <ArenaDuelo
              desafio={desafioAtual}
              souDesafiante={souDesafiante}
              styles={styles}
              CORES={CORES}
            />
            <CardMetaAtiva desafio={desafioAtual} styles={styles} CORES={CORES} />
            <View style={styles.rodapeAviso}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={14}
                color={CORES.PROFILE_MUTED_LIGHT}
              />
              <Text style={styles.rodapeAvisoTxt}>
                Avisamos por notificação quando alguém bater a meta.
              </Text>
            </View>
          </View>
        ) : desafioAtual && !souDesafiante ? (
          <View style={styles.bloco}>
            <ConviteRecebido
              desafio={desafioAtual}
              rival={rival}
              minhaFoto={minhaFoto}
              onAceitar={handleAceitar}
              onRecusar={handleRecusar}
              processando={processando}
              styles={styles}
              CORES={CORES}
            />
          </View>
        ) : desafioAtual ? (
          <View style={styles.bloco}>
            <ConviteEnviado
              desafio={desafioAtual}
              rival={rival}
              minhaFoto={minhaFoto}
              onCancelar={handleCancelar}
              processando={processando}
              styles={styles}
              CORES={CORES}
            />
          </View>
        ) : amigos.length === 0 ? (
          <View style={styles.vazio}>
            <View style={styles.vazioAnelExterno}>
              <View style={styles.vazioAnelInterno}>
                <View style={styles.vazioNucleo}>
                  <MaterialCommunityIcons
                    name="account-multiple-plus"
                    size={32}
                    color={CORES.WHITE}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.chip, styles.chipEspera]}>
              <MaterialCommunityIcons
                name="sword-cross"
                size={14}
                color={CORES.DES_PRIZE_TXT}
              />
              <Text style={[styles.chipTxt, styles.chipEsperaTxt]}>
                DUELO É COISA DE DOIS
              </Text>
            </View>

            <Text style={styles.vazioTitulo}>Ninguém pra desafiar ainda</Text>
            <Text style={styles.vazioTexto}>
              Adicione alguém como amigo na comunidade e o duelo 1x1 abre aqui.
              Dá pra apostar até 100 XP por rodada.
            </Text>

            <Pressable
              onPress={() => navigation.navigate("Tabs", { screen: "Comunidade" })}
              style={({ pressed }) => [
                styles.botaoPrincipalGrande,
                pressed && styles.botaoPressionado,
              ]}
            >
              <MaterialCommunityIcons
                name="account-search"
                size={20}
                color={CORES.WHITE}
              />
              <Text style={styles.botaoPrincipalGrandeTxt}>Ir para a comunidade</Text>
            </Pressable>

            <View style={styles.vazioDica}>
              <View style={styles.vazioDicaIcone}>
                <MaterialCommunityIcons
                  name="lightbulb-on-outline"
                  size={19}
                  color={CORES.BRAND_STRONG}
                />
              </View>
              <Text style={styles.vazioDicaTxt}>
                Enquanto isso, o XP das suas aulas continua contando pro seu total.
              </Text>
            </View>
          </View>
        ) : (
          <>
            {!!stats && stats.total > 0 && (
              <View style={styles.bloco}>
                <FaixaEstatisticas stats={stats} styles={styles} CORES={CORES} />
              </View>
            )}

            <View style={[styles.bloco, styles.secao]}>
              <View style={styles.passo}>
                <Text style={styles.passoTxt}>1</Text>
              </View>
              <Text style={styles.secaoTitulo}>ESCOLHA O RIVAL</Text>
              <View style={styles.secaoLinha} />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.amigosLinha}
            >
              {amigos.map((amigo) => {
                const selecionado = String(amigo.id) === String(amigoId);
                return (
                  <Pressable
                    key={amigo.id}
                    onPress={() => setAmigoId(String(amigo.id))}
                    style={[styles.amigo, selecionado && styles.amigoSelecionado]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: selecionado }}
                  >
                    <Avatar uri={fotoDe(amigo)} nome={amigo.nome} size={52} textSize={20} />
                    {selecionado && (
                      <View style={styles.amigoCheck}>
                        <MaterialCommunityIcons
                          name="check-bold"
                          size={12}
                          color={CORES.WHITE}
                        />
                      </View>
                    )}
                    <Text style={styles.amigoNome} numberOfLines={1}>
                      {amigo.nome}
                    </Text>
                    <View
                      style={[
                        styles.amigoXp,
                        selecionado && styles.amigoXpSelecionado,
                      ]}
                    >
                      <Text
                        style={[
                          styles.amigoXpTxt,
                          selecionado && styles.amigoXpTxtSelecionado,
                        ]}
                      >
                        {formatarXp(amigo.xp_total)}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={[styles.bloco, styles.secao, { marginTop: 14 }]}>
              <View style={styles.passo}>
                <Text style={styles.passoTxt}>2</Text>
              </View>
              <Text style={styles.secaoTitulo}>ESCOLHA A META</Text>
              <View style={styles.secaoLinha} />
            </View>

            <View style={styles.bloco}>
              {metas.map((meta) => {
                const selecionado = String(meta.id) === String(metaId);
                const xp = ehMetaXp(meta);

                return (
                  <Pressable
                    key={meta.id}
                    onPress={() => setMetaId(String(meta.id))}
                    style={[
                      styles.meta,
                      selecionado &&
                        (xp ? styles.metaSelecionadaXp : styles.metaSelecionadaAcc),
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: selecionado }}
                  >
                    <View
                      style={[
                        styles.metaIcone,
                        xp ? styles.metaIconeXp : styles.metaIconeAcc,
                        selecionado && !xp && styles.metaIconeAccSelecionado,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={xp ? "lightning-bolt" : "target"}
                        size={20}
                        color={xp ? CORES.DES_TIPO_XP_TXT : CORES.DES_TIPO_ACC_TXT}
                      />
                    </View>

                    <View style={styles.metaTexto}>
                      <Text style={styles.metaTitulo}>{meta.titulo}</Text>
                      <View style={styles.metaChips}>
                        <View
                          style={[
                            styles.chipMini,
                            selecionado &&
                              (xp ? styles.chipMiniSelXp : styles.chipMiniSelAcc),
                          ]}
                        >
                          <Text
                            style={[
                              styles.chipMiniTxt,
                              styles.chipMiniAlvo,
                              selecionado && !xp && styles.chipMiniTxtAcc,
                            ]}
                          >
                            {alvoTexto(meta)}
                          </Text>
                        </View>

                        {!xp && (
                          <View
                            style={[
                              styles.chipMini,
                              styles.chipAcc,
                              selecionado && styles.chipMiniSelAcc,
                            ]}
                          >
                            <Text
                              style={[
                                styles.chipMiniTxt,
                                styles.chipAccTxt,
                                selecionado && styles.chipMiniTxtAcc,
                              ]}
                            >
                              mín. {meta.precisao_minima}%
                            </Text>
                          </View>
                        )}

                        <View
                          style={[
                            styles.chipMini,
                            selecionado &&
                              (xp ? styles.chipMiniSelXp : styles.chipMiniSelAcc),
                          ]}
                        >
                          <Text
                            style={[
                              styles.chipMiniTxt,
                              selecionado && !xp && styles.chipMiniTxtAcc,
                            ]}
                          >
                            {meta.prazo_dias} {plural(meta.prazo_dias, "dia", "dias")}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {selecionado ? (
                      <View
                        style={[
                          styles.metaCheck,
                          !xp && styles.metaCheckAcc,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name="check-bold"
                          size={14}
                          color={CORES.WHITE}
                        />
                      </View>
                    ) : (
                      <View style={styles.metaPremio}>
                        <Text style={styles.metaPremioValor}>
                          +{meta.xp_recompensa} XP
                        </Text>
                        <Text style={styles.metaPremioLabel}>PRÊMIO</Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      {mostrarSeletor && (
        <View style={styles.rodape} pointerEvents="box-none">
          <LinearGradient
            colors={[CORES.DES_FADE, CORES.PROFILE_BG]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <Pressable
            onPress={handleEnviarDesafio}
            disabled={!podeDesafiar || processando}
            style={({ pressed }) => [
              styles.botaoEnviar,
              !podeDesafiar && styles.botaoEnviarInativo,
              podeDesafiar && pressed && styles.botaoPressionado,
              processando && styles.botaoProcessando,
            ]}
          >
            {processando ? (
              <>
                <ActivityIndicator color={CORES.WHITE} />
                <Text style={styles.botaoEnviarTxt}>Enviando…</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons
                  name="sword-cross"
                  size={19}
                  color={podeDesafiar ? CORES.WHITE : CORES.DES_DISABLED_TXT}
                />
                <Text
                  style={[
                    styles.botaoEnviarTxt,
                    !podeDesafiar && styles.botaoEnviarTxtInativo,
                  ]}
                >
                  {rotuloBotao}
                </Text>
              </>
            )}
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const makeStyles = (CORES) => {
  const escuro = CORES.mode === "dark";

  const sombraCard = {
    shadowColor: CORES.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: escuro ? 0 : 0.1,
    shadowRadius: 12,
    elevation: escuro ? 0 : 2,
  };

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: CORES.PROFILE_BG },

    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 12,
      paddingTop: 6,
      paddingBottom: 10,
    },
    headerBotao: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 99,
    },
    headerTitulo: { fontSize: 19, fontWeight: "900", color: CORES.PROFILE_NAVY },

    scroll: { paddingBottom: 28 },
    scrollComRodape: { paddingBottom: 104 },
    bloco: { paddingHorizontal: 16 },

    /* ---------- chips genéricos ---------- */
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 99,
    },
    chipTxt: { fontSize: 11, fontWeight: "900", letterSpacing: 0.3 },
    chipNeutro: { backgroundColor: CORES.PROFILE_CHIP_BG },
    chipNeutroTxt: { color: CORES.PROFILE_MUTED },
    chipTipoXp: { backgroundColor: CORES.DES_TIPO_XP_BG },
    chipTipoXpTxt: { color: CORES.DES_TIPO_XP_TXT },
    chipTipoAcc: { backgroundColor: CORES.DES_TIPO_ACC_BG },
    chipTipoAccTxt: { color: CORES.DES_TIPO_ACC_TXT },
    chipAcc: { backgroundColor: CORES.DES_TIPO_ACC_BG },
    chipAccTxt: { color: CORES.DES_TIPO_ACC_TXT },
    chipPrazo: { backgroundColor: CORES.DES_DEADLINE_BG },
    chipUrgente: { backgroundColor: CORES.DES_URGENT_BG },
    chipDesafio: { backgroundColor: CORES.DES_SEL_BG },
    chipDesafioTxt: { color: CORES.BRAND_STRONG },
    chipEspera: { backgroundColor: CORES.DES_PRIZE_BG },
    chipEsperaSuave: { backgroundColor: CORES.DES_WAIT_BG },
    chipEsperaTxt: { color: CORES.DES_PRIZE_TXT },

    /* ---------- arena ---------- */
    arena: {
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
      borderWidth: escuro ? 1 : 0,
      borderColor: CORES.BORDER,
      shadowColor: CORES.DES_STATS_TO,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: escuro ? 0 : 0.26,
      shadowRadius: 20,
      elevation: escuro ? 0 : 5,
    },
    arenaTopo: { flexDirection: "row", alignItems: "center", gap: 8 },
    arenaTag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 99,
      backgroundColor: "rgba(255,255,255,0.16)",
    },
    arenaTagTxt: {
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 0.4,
      color: CORES.WHITE,
    },

    arenaLados: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      marginTop: 16,
    },
    arenaLado: { flex: 1, alignItems: "center", gap: 6 },
    arenaAvatarEu: {
      backgroundColor: CORES.DES_ME_AVATAR_BG,
      borderWidth: 3,
      borderColor: CORES.DES_ME_RING,
    },
    arenaAvatarRival: {
      borderWidth: 3,
      borderColor: "rgba(255,255,255,0.32)",
    },
    arenaNome: {
      fontSize: 13,
      fontWeight: "900",
      color: CORES.WHITE,
      maxWidth: 112,
    },
    arenaValorLinha: { flexDirection: "row", alignItems: "baseline", gap: 4 },
    arenaValor: {
      fontSize: 26,
      fontWeight: "900",
      color: CORES.WHITE,
      lineHeight: 28,
    },
    arenaValorRival: { color: CORES.DES_RIVAL_TXT },
    arenaAlvo: { fontSize: 12, fontWeight: "800", color: CORES.DES_ARENA_SUB },
    arenaVsColuna: { width: 42, alignItems: "center", paddingTop: 16 },
    arenaVs: {
      width: 38,
      height: 38,
      borderRadius: 99,
      backgroundColor: "rgba(255,255,255,0.16)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.28)",
      alignItems: "center",
      justifyContent: "center",
    },
    arenaVsTxt: { fontSize: 14, fontWeight: "900", color: CORES.WHITE },

    tugTrilho: {
      marginTop: 16,
      height: 16,
      borderRadius: 99,
      backgroundColor: CORES.DES_ARENA_TRACK,
      flexDirection: "row",
      overflow: "hidden",
    },
    tugMeu: { backgroundColor: CORES.DES_ME, borderRadius: 99 },
    tugRival: { backgroundColor: CORES.DES_RIVAL, borderRadius: 99 },
    tugCentro: {
      position: "absolute",
      left: "50%",
      top: 0,
      width: 2,
      height: 16,
      marginLeft: -1,
      backgroundColor: "rgba(255,255,255,0.55)",
    },
    tugLegenda: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 7,
    },
    tugPercent: { fontSize: 11, fontWeight: "800", color: CORES.DES_ARENA_SUB },

    situacao: {
      marginTop: 12,
      height: 32,
      borderRadius: 99,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    situacaoFrente: { backgroundColor: CORES.DES_LEAD_BG },
    situacaoAtras: { backgroundColor: CORES.DES_BEHIND_BG },
    situacaoEmpate: { backgroundColor: "rgba(255,255,255,0.16)" },
    situacaoTxt: { fontSize: 12, fontWeight: "900" },

    /* ---------- cards ---------- */
    card: {
      backgroundColor: CORES.SURFACE,
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
      borderWidth: escuro ? 1 : 0,
      borderColor: CORES.BORDER,
      ...sombraCard,
    },
    cardTopo: { flexDirection: "row", alignItems: "center", gap: 8 },
    cardTitulo: {
      marginTop: 12,
      fontSize: 17,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
      lineHeight: 21,
    },
    cardDesc: {
      marginTop: 3,
      fontSize: 12,
      fontWeight: "700",
      color: CORES.PROFILE_MUTED_LIGHT,
      lineHeight: 16,
    },

    avisoPrecisao: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 14,
      backgroundColor: CORES.DES_TIPO_ACC_SEL_BG,
      borderWidth: 1,
      borderColor: CORES.DES_TIPO_ACC_CHIP,
    },
    avisoPrecisaoTxt: {
      flex: 1,
      fontSize: 12,
      fontWeight: "800",
      color: CORES.DES_TIPO_ACC_CHIP_TXT,
      lineHeight: 16,
    },
    avisoPrecisaoForte: { color: CORES.DES_TIPO_ACC_TXT },

    premioLinha: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    premio: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 14,
      backgroundColor: CORES.DES_PRIZE_BG,
    },
    premioValor: {
      fontSize: 18,
      fontWeight: "900",
      color: CORES.DES_PRIZE_TXT,
      lineHeight: 20,
    },
    premioLabel: {
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 0.4,
      color: CORES.DES_PRIZE_TXT,
      opacity: 0.85,
    },
    premioNota: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 },
    premioNotaTxt: {
      flex: 1,
      fontSize: 11,
      fontWeight: "700",
      color: CORES.PROFILE_MUTED_LIGHT,
      lineHeight: 14,
    },

    rodapeAviso: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingTop: 2,
    },
    rodapeAvisoTxt: {
      fontSize: 11.5,
      fontWeight: "700",
      color: CORES.PROFILE_MUTED_LIGHT,
    },

    /* ---------- convites ---------- */
    secao: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    },
    secaoTitulo: {
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 0.7,
      color: CORES.PROFILE_MUTED,
    },
    secaoLinha: { flex: 1, height: 1, backgroundColor: CORES.ERR_DIVIDER },

    passo: {
      width: 20,
      height: 20,
      borderRadius: 99,
      backgroundColor: CORES.HOME_BADGE_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    passoTxt: { fontSize: 11, fontWeight: "900", color: CORES.PROFILE_NAVY },

    avatar: {
      backgroundColor: CORES.ACCENT_FILL,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    avatarInitial: { color: CORES.WHITE, fontWeight: "900" },
    avatarDestaque: {
      borderWidth: 3,
      borderColor: CORES.SURFACE,
    },
    avatarPendente: {
      width: 56,
      height: 56,
      borderRadius: 99,
      marginLeft: -6,
      backgroundColor: CORES.HOME_DAILY_BG,
      borderWidth: 3,
      borderStyle: "dashed",
      borderColor: CORES.PROFILE_ARROW,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarPendenteTxt: {
      fontSize: 20,
      fontWeight: "900",
      color: CORES.PROFILE_MUTED_LIGHT,
    },

    duplaAvatar: {
      marginTop: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    vsPequeno: {
      width: 30,
      height: 30,
      borderRadius: 99,
      backgroundColor: CORES.PROFILE_CHIP_BG,
      borderWidth: 2,
      borderColor: CORES.SURFACE,
      alignItems: "center",
      justifyContent: "center",
    },
    vsPequenoTxt: { fontSize: 11, fontWeight: "900", color: CORES.PROFILE_MUTED },
    duplaTexto: { flex: 1, minWidth: 0 },
    duplaTitulo: {
      fontSize: 17,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
      lineHeight: 20,
    },
    duplaSub: {
      marginTop: 2,
      fontSize: 12,
      fontWeight: "700",
      color: CORES.PROFILE_MUTED_LIGHT,
    },
    prazoSolto: {
      fontSize: 11,
      fontWeight: "900",
      color: CORES.PROFILE_MUTED_LIGHT,
    },

    resumoMeta: {
      marginTop: 14,
      borderRadius: 16,
      padding: 12,
      backgroundColor: CORES.SURFACE_ALT,
    },
    resumoPremio: { fontSize: 15, fontWeight: "900", color: CORES.DES_PRIZE_TXT },
    resumoTitulo: {
      marginTop: 8,
      fontSize: 15,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
    },
    resumoChips: { marginTop: 6, flexDirection: "row", flexWrap: "wrap", gap: 8 },

    avisoEspera: {
      marginTop: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderRadius: 16,
      padding: 12,
      backgroundColor: CORES.DES_WAIT_BG,
    },
    avisoEsperaIcone: {
      width: 34,
      height: 34,
      borderRadius: 99,
      backgroundColor: CORES.DES_PRIZE_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    avisoEsperaTxt: {
      flex: 1,
      fontSize: 12,
      fontWeight: "700",
      color: CORES.DES_WAIT_TXT,
      lineHeight: 16,
    },

    /* ---------- botões ---------- */
    acoesDupla: { marginTop: 14, flexDirection: "row", gap: 10 },
    botaoPrincipal: {
      height: 44,
      borderRadius: 99,
      backgroundColor: CORES.ACCENT_FILL,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      shadowColor: CORES.ACCENT_FILL,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: escuro ? 0 : 0.28,
      shadowRadius: 10,
      elevation: escuro ? 0 : 2,
    },
    botaoPrincipalTxt: { fontSize: 14, fontWeight: "800", color: CORES.WHITE },
    botaoPressionado: { backgroundColor: CORES.DES_ACTION_PRESSED },
    botaoNeutro: {
      width: 112,
      height: 44,
      borderRadius: 99,
      backgroundColor: CORES.PROFILE_CHIP_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    botaoNeutroLargo: {
      marginTop: 14,
      height: 44,
      borderRadius: 99,
      backgroundColor: CORES.PROFILE_CHIP_BG,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
    },
    botaoNeutroTxt: { fontSize: 14, fontWeight: "800", color: CORES.PROFILE_MUTED },
    botaoNeutroInativo: { opacity: 0.6 },
    botaoNeutroPressionado: { backgroundColor: CORES.SURFACE_MUTED },

    botaoPrincipalGrande: {
      height: 48,
      paddingHorizontal: 22,
      borderRadius: 99,
      backgroundColor: CORES.ACCENT_FILL,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      shadowColor: CORES.ACCENT_FILL,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: escuro ? 0 : 0.28,
      shadowRadius: 14,
      elevation: escuro ? 0 : 3,
    },
    botaoPrincipalGrandeTxt: { fontSize: 15, fontWeight: "800", color: CORES.WHITE },

    /* ---------- estado vazio ---------- */
    vazio: { alignItems: "center", paddingHorizontal: 30, paddingTop: 60, gap: 18 },
    vazioAnelExterno: {
      width: 132,
      height: 132,
      borderRadius: 99,
      backgroundColor: CORES.HOME_DAILY_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    vazioAnelInterno: {
      width: 96,
      height: 96,
      borderRadius: 99,
      backgroundColor: CORES.HOME_BADGE_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    vazioNucleo: {
      width: 66,
      height: 66,
      borderRadius: 99,
      backgroundColor: CORES.ACCENT_FILL,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: CORES.ACCENT_FILL,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: escuro ? 0 : 0.38,
      shadowRadius: 14,
      elevation: escuro ? 0 : 3,
    },
    vazioTitulo: {
      fontSize: 24,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
      textAlign: "center",
      lineHeight: 28,
      marginBottom: -10,
    },
    vazioTexto: {
      fontSize: 14,
      fontWeight: "600",
      color: CORES.PROFILE_MUTED,
      textAlign: "center",
      lineHeight: 20,
    },
    vazioDica: {
      marginTop: 6,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderRadius: 20,
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: CORES.SURFACE,
      borderWidth: escuro ? 1 : 0,
      borderColor: CORES.BORDER,
      ...sombraCard,
    },
    vazioDicaIcone: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: CORES.DES_SEL_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    vazioDicaTxt: {
      flex: 1,
      fontSize: 12,
      fontWeight: "700",
      color: CORES.PROFILE_MUTED,
      lineHeight: 16,
    },

    /* ---------- faixa de estatísticas ---------- */
    stats: {
      borderRadius: 22,
      paddingVertical: 16,
      paddingHorizontal: 18,
      marginBottom: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      shadowColor: CORES.DES_STATS_TO,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: escuro ? 0 : 0.24,
      shadowRadius: 16,
      elevation: escuro ? 0 : 4,
    },
    statsValorLinha: { flexDirection: "row", alignItems: "baseline", gap: 5 },
    statsValor: {
      fontSize: 32,
      fontWeight: "900",
      color: CORES.WHITE,
      lineHeight: 35,
    },
    statsUnidade: { fontSize: 13, fontWeight: "800", color: CORES.WHITE },
    statsPercent: { fontSize: 15, fontWeight: "900", color: CORES.WHITE },
    statsSub: {
      marginTop: 2,
      fontSize: 11.5,
      fontWeight: "700",
      color: CORES.DES_STATS_SUB,
    },
    statsDivisor: {
      width: 1,
      height: 40,
      backgroundColor: "rgba(255,255,255,0.28)",
    },
    statsIcone: {
      marginLeft: "auto",
      width: 44,
      height: 44,
      borderRadius: 99,
      backgroundColor: "rgba(255,255,255,0.16)",
      alignItems: "center",
      justifyContent: "center",
    },

    /* ---------- seleção de amigo ---------- */
    amigosLinha: { paddingHorizontal: 16, gap: 10, paddingBottom: 4 },
    amigo: {
      width: 92,
      borderRadius: 18,
      paddingVertical: 10,
      paddingHorizontal: 6,
      alignItems: "center",
      gap: 6,
      backgroundColor: CORES.SURFACE,
      borderWidth: 2,
      borderColor: escuro ? CORES.BORDER : "transparent",
      shadowColor: CORES.SHADOW,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: escuro ? 0 : 0.08,
      shadowRadius: 12,
      elevation: escuro ? 0 : 2,
    },
    amigoSelecionado: {
      backgroundColor: CORES.DES_SEL_BG,
      borderColor: CORES.DES_SEL_BORDER,
    },
    amigoCheck: {
      position: "absolute",
      top: 6,
      right: 6,
      width: 20,
      height: 20,
      borderRadius: 99,
      backgroundColor: CORES.DES_SEL_BORDER,
      alignItems: "center",
      justifyContent: "center",
    },
    amigoNome: {
      fontSize: 12,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
      maxWidth: 80,
    },
    amigoXp: {
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 99,
      backgroundColor: CORES.PROFILE_CHIP_BG,
    },
    amigoXpSelecionado: { backgroundColor: CORES.DES_TIPO_XP_BG },
    amigoXpTxt: { fontSize: 10, fontWeight: "900", color: CORES.PROFILE_MUTED },
    amigoXpTxtSelecionado: { color: CORES.DES_TIPO_XP_TXT },

    /* ---------- seleção de meta ---------- */
    meta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderRadius: 18,
      padding: 12,
      marginBottom: 10,
      backgroundColor: CORES.SURFACE,
      borderWidth: 2,
      borderColor: escuro ? CORES.BORDER : "transparent",
      shadowColor: CORES.SHADOW,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: escuro ? 0 : 0.08,
      shadowRadius: 12,
      elevation: escuro ? 0 : 2,
    },
    metaSelecionadaXp: {
      backgroundColor: CORES.DES_SEL_BG,
      borderColor: CORES.DES_SEL_BORDER,
    },
    metaSelecionadaAcc: {
      backgroundColor: CORES.DES_TIPO_ACC_SEL_BG,
      borderColor: CORES.DES_TIPO_ACC_TXT,
    },
    metaIcone: {
      width: 40,
      height: 40,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    metaIconeXp: { backgroundColor: CORES.DES_TIPO_XP_BG },
    metaIconeAcc: { backgroundColor: CORES.DES_TIPO_ACC_BG },
    metaIconeAccSelecionado: { backgroundColor: CORES.DES_TIPO_ACC_CHIP },
    metaTexto: { flex: 1, minWidth: 0 },
    metaTitulo: {
      fontSize: 14.5,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
      lineHeight: 18,
    },
    metaChips: { marginTop: 5, flexDirection: "row", flexWrap: "wrap", gap: 6 },
    chipMini: {
      paddingVertical: 3,
      paddingHorizontal: 9,
      borderRadius: 99,
      backgroundColor: CORES.PROFILE_CHIP_BG,
    },
    chipMiniTxt: { fontSize: 10.5, fontWeight: "900", color: CORES.PROFILE_MUTED },
    chipMiniAlvo: { color: CORES.ERR_COUNT_LABEL },
    chipMiniSelXp: { backgroundColor: CORES.HOME_BADGE_BG },
    chipMiniSelAcc: { backgroundColor: CORES.DES_TIPO_ACC_CHIP },
    chipMiniTxtAcc: { color: CORES.DES_TIPO_ACC_CHIP_TXT },
    metaCheck: {
      width: 24,
      height: 24,
      borderRadius: 99,
      backgroundColor: CORES.DES_SEL_BORDER,
      alignItems: "center",
      justifyContent: "center",
    },
    metaCheckAcc: { backgroundColor: CORES.DES_TIPO_ACC_TXT },
    metaPremio: { alignItems: "flex-end" },
    metaPremioValor: { fontSize: 15, fontWeight: "900", color: CORES.DES_PRIZE_TXT },
    metaPremioLabel: {
      fontSize: 9.5,
      fontWeight: "800",
      letterSpacing: 0.3,
      color: CORES.DES_PRIZE_LABEL,
    },

    /* ---------- rodapé fixo ---------- */
    rodape: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 16,
      paddingTop: 14,
      paddingBottom: 22,
    },
    botaoEnviar: {
      height: 52,
      borderRadius: 99,
      backgroundColor: CORES.ACCENT_FILL,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      shadowColor: CORES.ACCENT_FILL,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: escuro ? 0 : 0.28,
      shadowRadius: 14,
      elevation: escuro ? 0 : 3,
    },
    botaoEnviarInativo: {
      backgroundColor: CORES.DES_DISABLED_BG,
      shadowOpacity: 0,
      elevation: 0,
    },
    botaoProcessando: { backgroundColor: CORES.DES_ACTION_PRESSED },
    botaoEnviarTxt: { fontSize: 15, fontWeight: "800", color: CORES.WHITE },
    botaoEnviarTxtInativo: { color: CORES.DES_DISABLED_TXT },

    /* ---------- skeleton ---------- */
    skStats: {
      height: 92,
      borderRadius: 22,
      backgroundColor: CORES.DES_SKELETON,
      marginBottom: 14,
    },
    skBloco: { borderRadius: 99, backgroundColor: CORES.DES_SKELETON_SOFT },
    skAmigos: { flexDirection: "row", gap: 10, marginBottom: 14 },
    skAmigo: {
      width: 92,
      height: 118,
      borderRadius: 18,
      backgroundColor: CORES.SURFACE,
      alignItems: "center",
      paddingVertical: 10,
      borderWidth: escuro ? 1 : 0,
      borderColor: CORES.BORDER,
    },
    skMeta: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 18,
      padding: 12,
      marginBottom: 10,
      backgroundColor: CORES.SURFACE,
      borderWidth: escuro ? 1 : 0,
      borderColor: CORES.BORDER,
    },
  });
};
