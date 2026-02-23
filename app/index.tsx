import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function DashboardScreen() {
    return (
        <View className="flex-1 bg-background flex-row h-full">
            {/* Sidebar (Desktop) */}
            <Sidebar />

            {/* Main Content Area */}
            <View className="flex-1 lg:ml-64 relative min-h-screen">
                <Header />

                <ScrollView className="flex-1">
                    <View className="p-6 max-w-4xl mx-auto space-y-6">

                        {/* Banner Section */}
                        <Pressable className="relative rounded-xl border border-border overflow-hidden h-40 sm:h-48">
                            {/* Note: In a real app we would load from a URL or local asset */}
                            <View className="absolute inset-0 w-full h-full bg-muted justify-center items-center">
                                <Text className="text-muted-foreground font-semibold">Banner Image Space</Text>
                            </View>
                            {/* Pagination Dots */}
                            <View className="absolute bottom-3 left-1/2 -ml-6 z-10 flex-row items-center gap-1.5">
                                <View className="w-2 h-2 rounded-full bg-white/50 transition-all" />
                                <View className="w-4 h-2 rounded-full bg-primary transition-all" />
                                <View className="w-2 h-2 rounded-full bg-white/50 transition-all" />
                            </View>
                        </Pressable>

                        {/* Trial Alert Section */}
                        <View className="flex-row items-center gap-3 px-4 py-3 rounded-lg border border-primary/20 bg-primary/5 mt-6 mb-6">
                            <View className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <Text className="text-sm font-bold text-primary">Trial • 0 dias restantes</Text>
                        </View>

                        {/* KPI Cards Grid */}
                        <View className="flex-row flex-wrap -mx-2">
                            <View className="w-1/2 lg:w-1/4 p-2">
                                <View className="p-4 rounded-xl border border-border bg-card">
                                    <Text className="text-xs text-muted-foreground">Vagas Hoje</Text>
                                    <Text className="text-2xl font-bold font-mono mt-1 text-foreground">0</Text>
                                </View>
                            </View>

                            <View className="w-1/2 lg:w-1/4 p-2">
                                <View className="p-4 rounded-xl border border-border bg-card">
                                    <Text className="text-xs text-muted-foreground">Novas</Text>
                                    <Text className="text-2xl font-bold font-mono mt-1 text-foreground">0</Text>
                                </View>
                            </View>

                            <View className="w-1/2 lg:w-1/4 p-2">
                                <View className="p-4 rounded-xl border border-border bg-card">
                                    <Text className="text-xs text-muted-foreground">Match Médio</Text>
                                    <Text className="text-2xl font-bold font-mono mt-1 text-foreground">0%</Text>
                                </View>
                            </View>

                            <View className="w-1/2 lg:w-1/4 p-2">
                                <View className="p-4 rounded-xl border border-border bg-card">
                                    <Text className="text-xs text-muted-foreground">Status</Text>
                                    <Text className="text-2xl font-bold font-mono mt-1 text-foreground">Trial</Text>
                                </View>
                            </View>
                        </View>

                        {/* Filter Tabs */}
                        <View className="flex-row items-center gap-2 mt-6">
                            <Pressable className="px-4 py-1.5 rounded-lg bg-primary/10">
                                <Text className="text-sm font-medium text-primary">Todas</Text>
                            </Pressable>

                            <Pressable className="px-4 py-1.5 rounded-lg hover:bg-muted">
                                <Text className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Novas</Text>
                            </Pressable>

                            <Pressable className="px-4 py-1.5 rounded-lg hover:bg-muted">
                                <Text className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Visualizadas</Text>
                            </Pressable>

                            <Pressable className="px-4 py-1.5 rounded-lg hover:bg-muted hidden sm:flex">
                                <Text className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Aplicadas</Text>
                            </Pressable>
                        </View>

                        {/* Empty State */}
                        <View className="items-center justify-center py-12 mt-4 space-y-1">
                            <Text className="text-sm text-muted-foreground text-center">Nenhuma vaga encontrada ainda.</Text>
                            <Text className="text-xs text-muted-foreground text-center mt-1">Configure suas preferências em Configurações para começar a receber vagas.</Text>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
