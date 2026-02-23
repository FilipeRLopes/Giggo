import { Slot, usePathname } from "expo-router";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import "../global.css";

export default function RootLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change (for mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <View style={{ flex: 1 }} className="bg-background text-foreground flex-row overflow-hidden">
            {/* Sidebar Global */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Area de Conteudo Principal */}
            <View className="flex-1 relative min-h-screen">
                <Header onMenuPress={() => setIsSidebarOpen(true)} />
                <View className="flex-1">
                    <Slot />
                </View>
            </View>
        </View>
    );
}
