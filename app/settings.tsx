import { View, Text, ScrollView } from "react-native";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function SettingsScreen() {
    return (
        <View className="flex-1 bg-background flex-row h-full">
            <Sidebar />
            <View className="flex-1 lg:ml-64 relative min-h-screen">
                <Header />
                <ScrollView className="flex-1">
                    <View className="p-6 max-w-4xl mx-auto">
                        <Text className="text-2xl font-bold text-foreground">Configurações</Text>
                        <Text className="text-muted-foreground mt-2">Gerencie suas preferências e conta aqui.</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
