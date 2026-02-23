import { View, Text, Pressable, Platform } from "react-native";
import { Menu, Radar, Bell } from "lucide-react-native";

export function Header() {
    return (
        <View className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-3xl px-4 sm:px-6 h-16 flex-row items-center justify-between">
            {/* Esquerda: Botão Menu (Mobile) / Logo (Mobile) / Título (Desktop) */}
            <View className="flex-row items-center gap-3">
                <Pressable className="h-10 w-10 lg:hidden flex items-center justify-center rounded-md active:bg-accent active:text-accent-foreground">
                    <Menu size={20} className="text-foreground" />
                </Pressable>

                {/* Titulo que aparece apenas no layout LG+ (Desktop) */}
                <Text className="text-lg font-semibold text-foreground hidden lg:block">
                    Dashboard
                </Text>

                {/* Logo que aparece apenas no layout menor que LG (Mobile/Tablet) */}
                <View className="flex-row items-center gap-2 lg:hidden">
                    <Radar size={20} className="text-primary" />
                    <Text className="font-bold text-sm text-foreground">Dashboard</Text>
                </View>
            </View>

            {/* Direita: Botão Notificações */}
            <Pressable className="h-10 w-10 flex items-center justify-center rounded-md active:bg-accent active:text-accent-foreground">
                <Bell size={20} className="text-foreground" />
            </Pressable>
        </View>
    );
}
