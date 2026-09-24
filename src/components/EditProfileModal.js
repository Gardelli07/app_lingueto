import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Svg, { Path } from "react-native-svg";
import { useTheme, useThemedStyles } from "../theme";
import { API_URL } from "../services/api";
import { atualizarFotoPerfil, atualizarNomeExibicao } from "../services/perfil";

const IconCamera = ({ size = 18, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" />
    <Path d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
  </Svg>
);

// Editar perfil: troca de foto e de nome de exibicao acontecem juntas nesse
// modal, mas cada uma so dispara sua propria chamada se o dado mudou —
// evita subir a foto de novo so porque o nome foi editado (e vice-versa).
export default function EditProfileModal({ visible, user, onClose, onSaved }) {
  const displayName = user?.nome_exibicao?.trim() || user?.login || "";
  const currentAvatarUri = user?.foto_url ? `${API_URL}${user.foto_url}` : null;

  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [nome, setNome] = useState(displayName);
  const [novaFotoLocal, setNovaFotoLocal] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (visible) {
      setNome(displayName);
      setNovaFotoLocal(null);
    }
  }, [visible, displayName]);

  const handlePickPhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: "photo",
        cropping: true,
        width: 600,
        height: 600,
        compressImageQuality: 0.8,
        cropperToolbarTitle: "Editar foto",
        cropperToolbarColor: CORES.PROFILE_BLUE,
        cropperToolbarWidgetColor: CORES.WHITE,
        cropperActiveWidgetColor: CORES.PROFILE_BLUE,
        cropperStatusBarLight: CORES.mode === "dark",
      });
      setNovaFotoLocal({ uri: image.path, mimeType: image.mime });
    } catch (error) {
      if (error.code === "E_PICKER_CANCELLED") return;
      if (error.code === "E_NO_LIBRARY_PERMISSION") {
        Alert.alert(
          "Permissão necessária",
          "Ative o acesso às fotos nas configurações do sistema para trocar a foto de perfil.",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Abrir configurações", onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }
      Alert.alert("Erro", "Não foi possível abrir a galeria de fotos.");
    }
  };

  const handleSave = async () => {
    const nomeTrimmed = nome.trim();
    if (!nomeTrimmed) {
      Alert.alert("Nome inválido", "O nome de exibição não pode ficar em branco.");
      return;
    }

    const nomeMudou = nomeTrimmed !== displayName;
    const fotoMudou = !!novaFotoLocal;

    if (!nomeMudou && !fotoMudou) {
      onClose?.();
      return;
    }

    setSalvando(true);
    try {
      const atualizacoes = {};

      if (fotoMudou) {
        const usuarioAtualizado = await atualizarFotoPerfil(novaFotoLocal.uri, novaFotoLocal.mimeType);
        Object.assign(atualizacoes, usuarioAtualizado);
      }
      if (nomeMudou) {
        const usuarioAtualizado = await atualizarNomeExibicao(nomeTrimmed);
        Object.assign(atualizacoes, usuarioAtualizado);
      }

      onSaved?.(atualizacoes);
      onClose?.();
    } catch (error) {
      const titulo = error.status === 409 ? "Nome em uso" : "Erro";
      Alert.alert(titulo, error.message || "Não foi possível salvar as alterações.");
    } finally {
      setSalvando(false);
    }
  };

  const avatarUri = novaFotoLocal?.uri || currentAvatarUri;

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Editar perfil</Text>

          <Pressable style={styles.avatarWrap} onPress={handlePickPhoto}>
            <View style={styles.avatar}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarInitial}>{(nome || "U").charAt(0).toUpperCase()}</Text>
              )}
            </View>
            <View style={styles.cameraBadge}>
              <IconCamera />
            </View>
          </Pressable>
          <Text style={styles.avatarHint}>Toque na foto para trocar</Text>

          <Text style={styles.label}>Nome de exibição</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor={CORES.PROFILE_MUTED_LIGHT}
            maxLength={40}
            editable={!salvando}
          />

          <Pressable
            style={[styles.saveBtn, salvando && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color={CORES.ON_ACCENT} />
            ) : (
              <Text style={styles.saveText}>Salvar</Text>
            )}
          </Pressable>

          <Pressable style={styles.cancelBtn} onPress={onClose} hitSlop={8} disabled={salvando}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: CORES.OVERLAY,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: CORES.SURFACE_HIGH,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: CORES.mode === "dark" ? 1 : 0,
    borderColor: CORES.BORDER,
  },
  title: {
    fontSize: 19,
    fontWeight: "900",
    color: CORES.PROFILE_NAVY,
    marginBottom: 18,
  },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: CORES.ACCENT_FILL,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: { width: 88, height: 88 },
  avatarInitial: { color: CORES.ON_ACCENT, fontSize: 36, fontWeight: "900" },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: CORES.ACCENT_FILL,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: CORES.SURFACE_HIGH,
  },
  avatarHint: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "600",
    color: CORES.PROFILE_MUTED_LIGHT,
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 22,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "800",
    color: CORES.PROFILE_MUTED,
  },
  input: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: CORES.BORDER_STRONG,
    backgroundColor: CORES.INPUT_BG,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "700",
    color: CORES.PROFILE_NAVY,
  },
  saveBtn: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    backgroundColor: CORES.ACCENT_FILL,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  saveBtnDisabled: { opacity: 0.7 },
  saveText: { color: CORES.ON_ACCENT, fontWeight: "900", fontSize: 16 },
  cancelBtn: { marginTop: 14, padding: 4 },
  cancelText: { color: CORES.PROFILE_MUTED_LIGHT, fontWeight: "700", fontSize: 14 },
  });
