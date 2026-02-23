import { View, Text, Pressable, Platform } from "react-native";
import { Link, usePathname } from "expo-router";
import { Radar, LayoutDashboard, Settings, CreditCard, LogOut, X } from "lucide-react-native";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const isDashboard = pathname === "/" || pathname === "/dashboard";
    const isSettings = pathname === "/settings";
    const isBilling = pathname === "/billing";

    return (
        <>
            {/* Mobile Overlay (Backdrop) */}
            {isOpen && (
                <Pressable
                    className="lg:hidden absolute inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-500"
                    onPress={onClose}
                />
            )}

            {/* Sidebar Container */}
            <View
                className={`flex w-72 border-r border-border bg-card flex-col h-full absolute lg:relative left-0 top-0 bottom-0 z-50 shadow-2xl transition-transform ease-in-out duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    } ${!isOpen && "duration-300"}`}
            >
                {/* Header / Logo */}
                <View className="p-6 pt-8 flex-row items-center border-b border-border relative">
                    <View className="flex-row items-center gap-2">
                        <Radar size={24} className="text-primary" />
                        <Text className="font-bold text-lg text-foreground">
                            Radar <Text className="text-primary font-bold">Freelancer</Text>
                        </Text>
                    </View>

                    {/* Close button for mobile - Absolute positioned like Shadcn Sheet */}
                    <Pressable
                        className="lg:hidden absolute right-4 top-4 p-2 rounded-md active:bg-muted opacity-70 hover:opacity-100"
                        onPress={onClose}
                    >
                        <X size={20} className="text-foreground" />
                    </Pressable>
                </View>

                {/* Navigation */}
                <View className="flex-1 p-4 gap-1">
                    <Link href="/" asChild>
                        <Pressable
                            onPress={() => Platform.OS === "web" && onClose?.()}
                            className={`flex-row items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isDashboard ? "bg-primary/10" : "active:bg-muted"
                                }`}
                        >
                            <LayoutDashboard size={18} className={isDashboard ? "text-primary" : "text-muted-foreground"} />
                            <Text className={`text-sm ${isDashboard ? "text-primary font-medium" : "text-muted-foreground"}`}>
                                Dashboard
                            </Text>
                        </Pressable>
                    </Link>

                    <Link href="/settings" asChild>
                        <Pressable
                            onPress={() => Platform.OS === "web" && onClose?.()}
                            className={`flex-row items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isSettings ? "bg-primary/10" : "active:bg-muted"
                                }`}
                        >
                            <Settings size={18} className={isSettings ? "text-primary" : "text-muted-foreground"} />
                            <Text className={`text-sm ${isSettings ? "text-primary font-medium" : "text-muted-foreground"}`}>
                                Configurações
                            </Text>
                        </Pressable>
                    </Link>

                    <Link href="/billing" asChild>
                        <Pressable
                            onPress={() => Platform.OS === "web" && onClose?.()}
                            className={`flex-row items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isBilling ? "bg-primary/10" : "active:bg-muted"
                                }`}
                        >
                            <CreditCard size={18} className={isBilling ? "text-primary" : "text-muted-foreground"} />
                            <Text className={`text-sm ${isBilling ? "text-primary font-medium" : "text-muted-foreground"}`}>
                                Assinatura
                            </Text>
                        </Pressable>
                    </Link>
                </View>

                {/* User Profile */}
                <View className="p-4 gap-2 mb-4">
                    <View className="flex-row items-center gap-3 px-4 py-2">
                        <View className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <Text className="text-primary-foreground text-sm font-bold">M</Text>
                        </View>
                        <View className="flex-1 min-w-0">
                            <Text className="text-sm font-medium text-foreground truncate">Miguel Lopes</Text>
                            <Text className="text-xs text-muted-foreground">Trial • 0 dias</Text>
                        </View>
                    </View>

                    <View className="pt-2 border-t border-border">
                        <Pressable className="flex-row items-center gap-3 px-4 py-3 rounded-lg transition-colors active:bg-muted w-full">
                            <LogOut size={18} className="text-muted-foreground" />
                            <Text className="text-sm text-muted-foreground">Sair</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    );
}
