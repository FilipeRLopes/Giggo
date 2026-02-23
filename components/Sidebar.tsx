import { View, Text, Pressable, Platform } from "react-native";
import { Link, usePathname } from "expo-router";
import { Radar, LayoutDashboard, Settings, CreditCard, LogOut } from "lucide-react-native";

export function Sidebar() {
    const pathname = usePathname();

    const isDashboard = pathname === "/" || pathname === "/dashboard";
    const isSettings = pathname === "/settings";
    const isBilling = pathname === "/billing";

    return (
        <View className="hidden lg:flex w-64 border-r border-border bg-card flex-col h-full absolute left-0 top-0 bottom-0">
            {/* Header / Logo */}
            <View className="p-6 flex-row items-center gap-2 border-b border-border">
                <Radar size={24} className="text-primary" />
                <Text className="font-bold text-lg text-foreground">
                    Radar <Text className="text-primary">Freelancer</Text>
                </Text>
            </View>

            {/* Navigation */}
            <View className="flex-1 p-4 gap-1">
                <Link href="/" asChild>
                    <Pressable
                        className={`flex-row items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isDashboard ? "bg-primary/10" : "hover:bg-muted"
                            }`}
                    >
                        <LayoutDashboard size={16} className={isDashboard ? "text-primary" : "text-muted-foreground"} />
                        <Text className={`text-sm ${isDashboard ? "text-primary font-medium" : "text-muted-foreground"}`}>
                            Dashboard
                        </Text>
                    </Pressable>
                </Link>

                <Link href="/settings" asChild>
                    <Pressable
                        className={`flex-row items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isSettings ? "bg-primary/10" : "hover:bg-muted"
                            }`}
                    >
                        <Settings size={16} className={isSettings ? "text-primary" : "text-muted-foreground"} />
                        <Text className={`text-sm ${isSettings ? "text-primary font-medium" : "text-muted-foreground"}`}>
                            Configurações
                        </Text>
                    </Pressable>
                </Link>

                <Link href="/billing" asChild>
                    <Pressable
                        className={`flex-row items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isBilling ? "bg-primary/10" : "hover:bg-muted"
                            }`}
                    >
                        <CreditCard size={16} className={isBilling ? "text-primary" : "text-muted-foreground"} />
                        <Text className={`text-sm ${isBilling ? "text-primary font-medium" : "text-muted-foreground"}`}>
                            Assinatura
                        </Text>
                    </Pressable>
                </Link>
            </View>

            {/* User Profile */}
            <View className="p-4 border-t border-border gap-2">
                <View className="flex-row items-center gap-3 px-4 py-2">
                    <View className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Text className="text-primary text-sm font-bold">M</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-foreground truncate">Miguel Lopes</Text>
                        <Text className="text-xs text-muted-foreground">Trial • 0 dias</Text>
                    </View>
                </View>

                <Pressable className="flex-row items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-muted w-full">
                    <LogOut size={16} className="text-muted-foreground" />
                    <Text className="text-sm text-muted-foreground">Sair</Text>
                </Pressable>
            </View>
        </View>
    );
}
