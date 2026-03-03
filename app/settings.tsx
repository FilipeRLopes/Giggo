import { View, Text, ScrollView, Pressable, TextInput, Switch } from "react-native";
import { Check, Volume2, Play, ChevronDown, Save } from "lucide-react-native";
import { useState } from "react";

const SOUND_OPTIONS = ["Padrão", "Suave", "Alegre", "Alerta", "Digital", "Sino"];

function CustomSelect({ value, onValueChange, options, zIndex = 50, isOpen, onToggle }: { value: string, onValueChange: (val: string) => void, options: string[], zIndex?: number, isOpen: boolean, onToggle: () => void }) {
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    return (
        <View className="relative w-full" style={{ zIndex }}>
            <Pressable
                onPress={onToggle}
                className={`h-10 w-full flex-row items-center justify-between rounded-md border ${isOpen ? 'border-primary ring-1 ring-primary' : 'border-input'} px-3 py-2 bg-background hover:bg-muted/50 active:bg-muted transition-colors`}
                accessibilityRole="combobox"
                // @ts-ignore: cursor para web
                style={{ cursor: 'pointer' }}
            >
                <Text className="text-sm text-foreground flex-1" numberOfLines={1}>{value}</Text>
                <ChevronDown size={16} className="text-muted-foreground opacity-50" />
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
            <View className="px-4 py-8 md:p-8 max-w-4xl mx-auto space-y-8 w-full">

                {/* Plataformas Monitoradas */}
                <View className="space-y-4">
                    <Text className="text-base font-semibold text-foreground">Plataformas Monitoradas</Text>
                    <View className="flex-row flex-wrap -m-1.5">
                        {(Object.keys(platforms) as Array<PlatformKeys>).map((platform) => (
                            <View key={platform} className="w-1/2 md:w-1/3 p-1.5">
                                <Pressable
                                    onPress={() => togglePlatform(platform)}
                                    className="w-full flex-row items-center gap-3 p-4 rounded-xl border border-border bg-card active:opacity-70"
                                >
                                    <View className={`h-4 w-4 rounded-sm border items-center justify-center ${platforms[platform] ? 'bg-primary border-primary' : 'border-primary'}`}>
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
                            className="flex-row items-center justify-between p-4 rounded-xl border border-border bg-card active:opacity-70"
                            onPress={() => setNotifications({ ...notifications, email: !notifications.email })}
                        >
                            <View className="flex-row items-center gap-3">
                                <View className={`h-4 w-4 rounded-sm border items-center justify-center ${notifications.email ? 'bg-primary border-primary' : 'border-primary'}`}>
                                    {notifications.email && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
                                </View>
                                <Text className="text-sm text-foreground font-medium">Email</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            className="flex-row items-center justify-between p-4 rounded-xl border border-border bg-card active:opacity-70"
                            onPress={() => setNotifications({ ...notifications, push: !notifications.push })}
                        >
                            <View className="flex-row items-center gap-3">
                                <View className={`h-4 w-4 rounded-sm border items-center justify-center ${notifications.push ? 'bg-primary border-primary' : 'border-primary'}`}>
                                    {notifications.push && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
                                </View>
                                <Text className="text-sm text-foreground font-medium">Push no Navegador</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            className="flex-row items-center justify-between p-4 rounded-xl border border-border bg-card active:opacity-70"
                            onPress={() => setNotifications({ ...notifications, whatsapp: !notifications.whatsapp })}
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
                                            onValueChange={setDefaultSound}
                                            options={SOUND_OPTIONS}
                                            isOpen={openDropdown === 'default'}
                                            onToggle={() => setOpenDropdown(prev => prev === 'default' ? null : 'default')}
                                        />
                                    </View>
                                    <Pressable className="h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-muted/50 active:bg-muted transition-colors">
                                        <Play size={16} className="text-foreground" />
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
                                                <Pressable className="h-10 w-10 shrink-0 items-center justify-center rounded-md border border-input bg-background hover:bg-muted/50 active:bg-muted transition-colors">
                                                    <Play size={14} className="text-foreground" />
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
                        className="bg-primary h-11 px-8 rounded-md flex-row items-center justify-center gap-2 hover:opacity-90 active:opacity-80 transition-opacity"
                        // @ts-ignore
                        style={{ cursor: 'pointer' }}
                    >
                        <Save size={16} className="text-primary-foreground" />
                        <Text className="text-primary-foreground font-semibold text-base">Salvar Configurações</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
}
