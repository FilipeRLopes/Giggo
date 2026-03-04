import { Slot, usePathname } from "expo-router";
import { View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Toaster } from "../components/Toaster";
import "../global.css";

export default function RootLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change (for mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const getTitle = () => {
        if (pathname === "/settings") return "Configurações";
        if (pathname === "/billing") return "Assinatura";
        return "Dashboard";
    };

    const showNotifications = pathname === "/" || pathname === "/dashboard";

    return (
        <View style={{ flex: 1 }} className="bg-background text-foreground flex-row overflow-hidden">
            {/* Sidebar Global */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <Toaster />

            {/* Area de Conteudo Principal */}
            <View className="flex-1 relative">
                <ScrollView
                    className="flex-1"
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={true}
                    bounces={false}
                    overScrollMode="never"
                >
                    <Header
                        title={getTitle()}
                        showNotifications={showNotifications}
                        onMenuPress={() => setIsSidebarOpen(true)}
                    />
                    <View className="flex-1">
                        <Slot />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
