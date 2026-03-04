import { View, Text, ScrollView, Pressable, TextInput, Platform, DeviceEventEmitter } from "react-native";
import { Check, Volume2, Play, Pause, ChevronDown, Save, X } from "lucide-react-native";
import { useState, useCallback, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import { SHOW_TOAST_EVENT } from "../components/Toaster";

const SOUND_FILES: Record<string, any> = {
    "Padrão": require("../assets/sounds/padrao.mp3"),
    "Suave": require("../assets/sounds/suave.mp3"),
    "Alegre": require("../assets/sounds/alegre.mp3"),
    "Alerta": require("../assets/sounds/alerta.mp3"),
    "Digital": require("../assets/sounds/digital.mp3"),
    "Sino": require("../assets/sounds/sino.mp3"),
};

const SOUND_OPTIONS = ["Padrão", "Suave", "Alegre", "Alerta", "Digital", "Sino"];

function CustomSelect({ value, onValueChange, options, zIndex = 50, isOpen, onToggle }: { value: string, onValueChange: (val: string) => void, options: string[], zIndex?: number, isOpen: boolean, onToggle: () => void }) {
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    return (
        <View className="relative w-full" style={{ zIndex }}>
            <Pressable
                onPress={onToggle}
                className="flex h-10 w-full flex-row items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-background flex-1 hover:bg-muted/50 active:bg-muted transition-colors"
                accessibilityRole="combobox"
                // @ts-ignore: cursor para web
                style={{ cursor: 'pointer' }}
            >
                <Text className="text-sm text-foreground flex-1" numberOfLines={1} style={{ pointerEvents: 'none' }}>
                    {value}
                </Text>
                <ChevronDown size={16} className="text-muted-foreground opacity-50" aria-hidden={true} />
            </Pressable>

            {isOpen && (
                <View className="absolute top-11 left-0 right-0 bg-[#161817] border border-border rounded-md shadow-lg py-1" style={{ zIndex: 100 }}>
                    <ScrollView className="max-h-48 custom-scrollbar" nestedScrollEnabled>
                        {options.map((option) => {
                            const isHovered = hoveredOption === option;
                            return (
                                <Pressable
                                    key={option}
                                    onPress={() => {
                                        onValueChange(option);
                                        onToggle();
                                    }}
                                    // @ts-ignore: onHoverIn/onHoverOut para React Native Web
                                    onHoverIn={() => setHoveredOption(option)}
                                    onHoverOut={() => setHoveredOption(null)}
                                    className={`flex-row items-center px-3 py-2 mx-1.5 my-0.5 rounded-md ${isHovered ? 'bg-primary' : 'active:bg-muted/70'}`}
                                    // @ts-ignore: cursor para web
                                    style={{ cursor: 'pointer' }}
                                >
                                    <View className="w-5 items-center justify-center mr-1">
                                        {value === option && <Check size={14} className={isHovered ? "text-primary-foreground" : "text-foreground"} strokeWidth={3} />}
                                    </View>
                                    <Text className={`text-sm ${isHovered ? 'text-primary-foreground font-medium' : 'text-foreground'}`}>
                                        {option}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

export default function SettingsScreen() {
    type PlatformKeys = "99Freelas" | "Workana" | "Freelancer.com" | "Upwork" | "Fiverr" | "GetNinjas";

    const [platforms, setPlatforms] = useState<Record<PlatformKeys, boolean>>({
        "99Freelas": false,
        "Workana": false,
        "Freelancer.com": false,
        "Upwork": false,
        "Fiverr": false,
        "GetNinjas": false,
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        whatsapp: false,
    });

    const [soundEnabled, setSoundEnabled] = useState(true);

    const [defaultSound, setDefaultSound] = useState("Padrão");
    const [platformSounds, setPlatformSounds] = useState<Record<PlatformKeys, string>>({
        "99Freelas": "Alerta",
        "Workana": "Padrão",
        "Freelancer.com": "Padrão",
        "Upwork": "Padrão",
        "Fiverr": "Padrão",
        "GetNinjas": "Padrão",
    });

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [playingKey, setPlayingKey] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const audioRef = useRef<any>(null);
    const timeoutRef = useRef<any>(null);
    const toastTimeoutRef = useRef<any>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
            if (audioRef.current) {
                if (Platform.OS === 'web') {
                    audioRef.current.pause();
                    audioRef.current.src = "";
                } else {
                    audioRef.current.unloadAsync();
                }
            }
        };
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        // Simular salvamento com delay
        setTimeout(() => {
            setIsSaving(false);
            DeviceEventEmitter.emit(SHOW_TOAST_EVENT, "Preferências salvas!");
        }, 800);
    };

    const playSound = useCallback(async (soundName: string, key: string) => {
        const source = SOUND_FILES[soundName];
        if (!source) return;

        // Cleanup previous sound/timer
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (audioRef.current) {
            try {
                if (Platform.OS === 'web') {
                    audioRef.current.pause();
                    audioRef.current.src = "";
                } else {
                    await audioRef.current.unloadAsync();
                }
            } catch (e) { }
        }

        setPlayingKey(key);

        if (Platform.OS === 'web') {
            try {
                const url = typeof source === 'string' ? source : source;
                // @ts-ignore
                const audio = new window.Audio(url);
                audioRef.current = audio;

                audio.onloadedmetadata = () => {
                    const durationMs = (audio.duration || 0) * 1000;
                    audio.play().catch(() => setPlayingKey(null));

                    if (durationMs > 0) {
                        timeoutRef.current = setTimeout(() => {
                            setPlayingKey((prev) => (prev === key ? null : prev));
                            audioRef.current = null;
                        }, durationMs);
                    }
                };

                audio.onended = () => {
                    setPlayingKey((prev) => (prev === key ? null : prev));
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    audioRef.current = null;
                };

                audio.onerror = () => {
                    setPlayingKey(null);
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    audioRef.current = null;
                };
            } catch (e) {
                console.warn("Erro ao reproduzir som (web):", e);
                setPlayingKey(null);
            }
        } else {
            try {
                await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
                const { sound, status } = await Audio.Sound.createAsync(source);
                audioRef.current = sound;

                const durationMs = (status.isLoaded && status.durationMillis) ? status.durationMillis : 0;

                await sound.playAsync();

                if (durationMs > 0) {
                    timeoutRef.current = setTimeout(() => {
                        setPlayingKey((prev) => (prev === key ? null : prev));
                        sound.unloadAsync();
                        audioRef.current = null;
                    }, durationMs);
                } else {
                    sound.setOnPlaybackStatusUpdate((s) => {
                        if (s.isLoaded && s.didJustFinish) {
                            setPlayingKey(null);
                            sound.unloadAsync();
                            audioRef.current = null;
                        }
                    });
                }
            } catch (e) {
                console.warn("Erro ao reproduzir som (native):", e);
                setPlayingKey(null);
            }
        }
    }, []);

    const togglePlatform = (key: PlatformKeys) => {
        setPlatforms(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {openDropdown && (
                <Pressable
                    className="absolute inset-0 z-[45]"
                    onPress={() => setOpenDropdown(null)}
                    // @ts-ignore
                    style={{ cursor: "default" }}
                />
            )}
            <View className="px-4 py-6 md:p-8 max-w-4xl mx-auto gap-6 w-full" style={{ zIndex: 50 }} pointerEvents="box-none">

                {/* Plataformas Monitoradas */}
                <View className="space-y-4">
                    <Text className="text-base font-semibold text-foreground">Plataformas Monitoradas</Text>
                    <View className="flex-row flex-wrap -m-1.5">
                        {(Object.keys(platforms) as Array<PlatformKeys>).map((platform) => (
                            <View key={platform} className="w-1/2 md:w-1/3 p-1.5">
                                <Pressable
                                    onPress={() => togglePlatform(platform)}
                                    className={`w-full flex-row items-center gap-3 p-4 rounded-xl border transition-all active:opacity-70 ${platforms[platform] ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'}`}
                                    // @ts-ignore
                                    style={{ cursor: 'pointer' }}
                                >
                                    <View className={`h-4 w-4 rounded-sm border items-center justify-center transition-colors ${platforms[platform] ? 'bg-primary border-primary' : 'border-primary'}`}>
                                        {platforms[platform] && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
                                    </View>
                                    <Text className="text-sm font-medium text-foreground">{platform}</Text>
                                </Pressable>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Categorias de Interesse */}
                <View className="space-y-4">
                    <Text className="text-base font-semibold text-foreground">Categorias de Interesse</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {["Programação", "Design", "Marketing", "Redação", "Tradução", "Vídeo", "Áudio", "Consultoria"].map((cat) => (
                            <Pressable key={cat} className="px-4 py-1.5 rounded-lg border border-border bg-background active:opacity-70">
                                <Text className="text-sm font-medium text-muted-foreground">{cat}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Preferências de Busca */}
                <View className="space-y-4">
                    <Text className="text-base font-semibold text-foreground">Preferências de Busca</Text>
                    <View className="flex-row flex-wrap -m-2">
                        <View className="w-full md:w-1/2 p-2">
                            <View className="space-y-2">
                                <Text className="text-sm font-medium text-foreground">Valor Mínimo (R$)</Text>
                                <TextInput
                                    className="h-10 w-full rounded-md border border-input px-3 bg-card text-foreground"
                                    placeholderTextColor="#9ca3af"
                                    placeholder="500"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View className="w-full md:w-1/2 p-2">
                            <View className="space-y-2">
                                <Text className="text-sm font-medium text-foreground">Idioma da Vaga</Text>
                                <Pressable className="h-10 w-full flex-row items-center justify-between rounded-md border border-input px-3 bg-card active:opacity-70">
                                    <Text className="text-sm text-foreground">Português</Text>
                                    <ChevronDown size={16} className="text-muted-foreground" />
                                </Pressable>
                            </View>
                        </View>
                        <View className="w-full p-2">
                            <View className="space-y-2">
                                <Text className="text-sm font-medium text-foreground">Palavras-chave (separadas por vírgula)</Text>
                                <TextInput
                                    className="h-10 w-full rounded-md border border-input px-3 bg-card font-mono text-sm text-foreground"
                                    placeholderTextColor="#9ca3af"
                                    placeholder="react, typescript, frontend"
                                />
                                <Text className="text-xs text-muted-foreground mt-1">Dica: use termos específicos para melhorar seu score de match</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Notificações */}
                <View className="space-y-4">
                    <Text className="text-base font-semibold text-foreground">Notificações</Text>
                    <View className="space-y-3">
                        <Pressable
                            className={`flex-row items-center justify-between p-4 rounded-xl border transition-all active:opacity-70 ${notifications.email ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'}`}
                            onPress={() => setNotifications({ ...notifications, email: !notifications.email })}
                            // @ts-ignore
                            style={{ cursor: 'pointer' }}
                        >
                            <View className="flex-row items-center gap-3">
                                <View className={`h-4 w-4 rounded-sm border items-center justify-center ${notifications.email ? 'bg-primary border-primary' : 'border-primary'}`}>
                                    {notifications.email && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
                                </View>
                                <Text className="text-sm text-foreground font-medium">Email</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            className={`flex-row items-center justify-between p-4 rounded-xl border transition-all active:opacity-70 ${notifications.push ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'}`}
                            onPress={() => setNotifications({ ...notifications, push: !notifications.push })}
                            // @ts-ignore
                            style={{ cursor: 'pointer' }}
                        >
                            <View className="flex-row items-center gap-3">
                                <View className={`h-4 w-4 rounded-sm border items-center justify-center ${notifications.push ? 'bg-primary border-primary' : 'border-primary'}`}>
                                    {notifications.push && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
                                </View>
                                <Text className="text-sm text-foreground font-medium">Push no Navegador</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            className={`flex-row items-center justify-between p-4 rounded-xl border transition-all active:opacity-70 ${notifications.whatsapp ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'}`}
                            onPress={() => setNotifications({ ...notifications, whatsapp: !notifications.whatsapp })}
                            // @ts-ignore
                            style={{ cursor: 'pointer' }}
                        >
                            <View className="flex-row items-center gap-3">
                                <View className={`h-4 w-4 rounded-sm border items-center justify-center ${notifications.whatsapp ? 'bg-primary border-primary' : 'border-primary'}`}>
                                    {notifications.whatsapp && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-sm text-foreground font-medium">WhatsApp</Text>
                                    <View className="px-2 py-0.5 rounded border border-primary/20 bg-primary/10">
                                        <Text className="text-[10px] font-mono text-primary font-bold">PREMIUM</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>

                {/* Notificação Sonora */}
                <View className="space-y-4" style={{ zIndex: 50 }}>
                    <View className="flex-row items-center gap-2">
                        <Volume2 size={16} className="text-primary" />
                        <Text className="text-base font-semibold text-foreground">Notificação Sonora</Text>
                    </View>

                    <View className="flex-row items-center justify-between p-4 rounded-xl border border-border bg-card">
                        <View className="flex-shrink flex-1 pr-4">
                            <Text className="text-sm font-medium text-foreground">Ativar notificações sonoras</Text>
                            <Text className="text-xs text-muted-foreground mt-0.5">Tocar um som quando novas vagas forem encontradas</Text>
                        </View>
                        <Pressable
                            className={`h-6 w-11 rounded-full border-2 border-transparent transition-colors justify-center px-0.5 ${soundEnabled ? 'bg-primary' : 'bg-input'}`}
                            onPress={() => setSoundEnabled(!soundEnabled)}
                        >
                            <View
                                className={`h-5 w-5 rounded-full bg-background shadow-sm transition-transform ${soundEnabled ? 'translate-x-[18px]' : 'translate-x-0'}`}
                            />
                        </Pressable>
                    </View>

                    {soundEnabled && (
                        <View className="space-y-4" style={{ zIndex: 50 }}>
                            <View className="p-4 rounded-xl border border-border bg-card flex-col" style={{ zIndex: 40 }}>
                                <Text className="text-sm font-medium text-foreground mb-3">Som Padrão</Text>
                                <View className="flex-row items-center gap-2" style={{ zIndex: 50 }}>
                                    <View className="flex-1" style={{ zIndex: 50 }}>
                                        <CustomSelect
                                            value={defaultSound}
                                            onValueChange={(val) => {
                                                setDefaultSound(val);
                                                // Sync all platforms to new default
                                                setPlatformSounds(prev => {
                                                    const next = { ...prev };
                                                    (Object.keys(next) as Array<PlatformKeys>).forEach(k => {
                                                        next[k] = val;
                                                    });
                                                    return next;
                                                });
                                            }}
                                            options={SOUND_OPTIONS}
                                            isOpen={openDropdown === 'default'}
                                            onToggle={() => setOpenDropdown(prev => prev === 'default' ? null : 'default')}
                                        />
                                    </View>
                                    <Pressable
                                        className="h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-muted/50 active:bg-muted transition-colors"
                                        onPress={() => playSound(defaultSound, 'default')}
                                        // @ts-ignore
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {playingKey === 'default'
                                            ? <Pause size={14} className="text-primary" fill="currentColor" />
                                            : <Play size={16} className="text-foreground" />}
                                    </Pressable>
                                </View>
                            </View>

                            <View className="p-4 rounded-xl border border-border bg-card flex-col" style={{ zIndex: 10 }}>
                                <Text className="text-sm font-medium text-foreground">Sons por Plataforma</Text>
                                <Text className="text-xs text-muted-foreground mt-1 mb-2">Deixe em "Padrão" para usar o som padrão configurado acima</Text>

                                <View className="space-y-2 mt-2" style={{ zIndex: 40 }}>
                                    {["99Freelas", "Workana", "Freelancer.com", "Upwork", "Fiverr", "GetNinjas"].map((platformStr, idx) => {
                                        const pKey = platformStr as PlatformKeys;
                                        return (
                                            <View key={platformStr} className="flex-row items-center gap-2 mt-2" style={{ zIndex: 40 - idx }}>
                                                <Text className="text-sm w-32 text-foreground font-medium">{platformStr}</Text>
                                                <View className="flex-1" style={{ zIndex: 40 - idx }}>
                                                    <CustomSelect
                                                        value={platformSounds[pKey]}
                                                        onValueChange={(val) => setPlatformSounds(prev => ({ ...prev, [pKey]: val }))}
                                                        options={SOUND_OPTIONS}
                                                        isOpen={openDropdown === pKey}
                                                        onToggle={() => setOpenDropdown(prev => prev === pKey ? null : pKey)}
                                                    />
                                                </View>
                                                <Pressable
                                                    className="h-10 w-10 shrink-0 items-center justify-center rounded-md border border-input bg-background hover:bg-muted/50 active:bg-muted transition-colors"
                                                    onPress={() => {
                                                        const s = platformSounds[pKey];
                                                        playSound(s === "Padrão" ? defaultSound : s, pKey);
                                                    }}
                                                    // @ts-ignore
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {playingKey === pKey
                                                        ? <Pause size={12} className="text-primary" fill="currentColor" />
                                                        : <Play size={14} className="text-foreground" />}
                                                </Pressable>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Salvar Botão */}
                <View className="mt-4 mb-8 items-start" style={{ zIndex: 10 }}>
                    <Pressable
                        onPress={handleSave}
                        disabled={isSaving}
                        className={`bg-primary h-11 px-8 rounded-md flex-row items-center justify-center gap-2 transition-all duration-200 ${isSaving ? 'opacity-70' : 'hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/20'}`}
                        // @ts-ignore
                        style={{ cursor: 'pointer' }}
                    >
                        <Save size={16} className="text-primary-foreground" />
                        <Text className="text-primary-foreground font-semibold text-base">
                            {isSaving ? "Salvando..." : "Salvar Configurações"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
}
