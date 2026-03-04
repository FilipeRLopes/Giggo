import { View, Text, Pressable, Platform } from "react-native";
import { Menu, Radar, Bell } from "lucide-react-native";
import { useState } from "react";

interface HeaderProps {
    onMenuPress?: () => void;
    title?: string;
    showNotifications?: boolean;
}

export function Header({ onMenuPress, title = "Dashboard", showNotifications = false }: HeaderProps) {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    return (
        <>
            {/* Backdrop para fechar notificações ao clicar fora */}
            {isNotificationsOpen && showNotifications && (
                <Pressable
                    className="fixed inset-0 bg-transparent z-40"
                    onPress={() => setIsNotificationsOpen(false)}
                    // @ts-ignore - fixed is web-only but valid in react-native-web
                    style={{ position: Platform.OS === 'web' ? 'fixed' : 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'default' } as any}
                />
            )}

            <View className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl px-4 sm:px-6 h-16 flex-row items-center justify-between">
                {/* Esquerda: Botão Menu (Mobile) / Logo (Mobile) / Título (Desktop) */}
                <View className="flex-row items-center gap-3">
                    <Pressable
                        onPress={onMenuPress}
                        className="h-10 w-10 lg:hidden flex items-center justify-center rounded-md active:bg-accent active:text-accent-foreground"
                        // @ts-ignore
                        style={{ cursor: 'pointer' }}
                    >
                        <Menu size={20} className="text-foreground" />
                    </Pressable>

                    {/* Titulo que aparece apenas no layout LG+ (Desktop) */}
                    <Text className="text-lg font-semibold text-foreground hidden lg:block">
                        {title}
                    </Text>

                    {/* Logo que aparece apenas no layout menor que LG (Mobile/Tablet) */}
                    <View className="flex-row items-center gap-2 lg:hidden">
                        <Radar size={20} className="text-primary" />
                        <Text className="font-bold text-sm text-foreground">{title}</Text>
                    </View>
                </View>

                {/* Direita: Botão Notificações */}
                <View className="relative z-50">
                    {showNotifications && (
                        <Pressable
                            onPress={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className={`h-10 w-10 flex items-center justify-center rounded-md transition-colors hover:bg-primary active:bg-primary relative group ${isNotificationsOpen ? 'bg-primary' : ''}`}
                            // @ts-ignore
                            style={{ cursor: 'pointer' }}
                        >
                            <Bell
                                size={20}
                                color={isNotificationsOpen ? "#002414" : undefined}
                                className={isNotificationsOpen ? "" : "text-foreground group-hover:text-[#002414]"}
                            />
                        </Pressable>
                    )}

                    {/* Popover de Notificações */}
                    {isNotificationsOpen && showNotifications && (
                        <View
                            className="absolute right-0 top-14 w-80 bg-[#0c0c0c] border border-border rounded-xl shadow-2xl overflow-hidden z-50"
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.5,
                                shadowRadius: 20,
                                elevation: 10,
                            }}
                        >
                            <View className="p-4 border-b border-border">
                                <Text className="text-white font-bold text-base">Notificações</Text>
                            </View>
                            <View className="p-10 items-center justify-center">
                                <Text className="text-muted-foreground text-sm text-center">
                                    Nenhuma notificação ainda.
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </>
    );
}
