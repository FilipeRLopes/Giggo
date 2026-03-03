import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function DashboardScreen() {
    return (
        <View className="px-4 py-8 md:p-8 max-w-4xl mx-auto space-y-8 w-full">

            {/* Banner Section */}
            <Pressable className="relative rounded-xl border border-border overflow-hidden h-40 sm:h-48 cursor-pointer bg-black">
                {/* Abstract Background Design */}
                <View className="absolute inset-y-0 left-0 w-1/2 bg-primary/10 -skew-x-12 -translate-x-1/2" />
                <View className="absolute inset-y-0 right-0 w-1/2 bg-primary/5 skew-x-12 translate-x-1/2" />

                <View className="absolute inset-0 w-full h-full justify-center items-center px-8">
                    <Text className="text-white text-2xl sm:text-3xl font-bold text-center leading-tight">
                        Score de Match{"\n"}aprimorado
                    </Text>
                </View>

                {/* Pagination Dots */}
                <View className="absolute bottom-3 left-1/2 z-10 flex-row items-center gap-1.5 -translate-x-1/2">
                    <View className="w-2 h-2 rounded-full bg-white/50" />
                    <View className="w-4 h-2 rounded-full bg-primary" />
                    <View className="w-2 h-2 rounded-full bg-white/50" />
                </View>
            </Pressable>

            {/* Trial Alert Section */}
            <View className="flex-row items-center gap-3 px-4 py-3 rounded-lg border border-primary/20 bg-primary/5">
                <View className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <Text className="text-sm text-foreground">
                    <Text className="font-bold text-primary">Trial • 0 dias restantes</Text>
                </Text>
            </View>

            {/* KPI Cards Grid */}
            <View className="flex-row flex-wrap -mx-2">
                {[
                    { label: "Vagas Hoje", value: "0" },
                    { label: "Novas", value: "0" },
                    { label: "Match Médio", value: "0%" },
                    { label: "Status", value: "Trial" }
                ].map((card, idx) => (
                    <View key={idx} className="w-1/2 lg:w-1/4 p-2">
                        <View className="p-4 rounded-xl border border-border bg-card">
                            <Text className="text-xs text-muted-foreground">{card.label}</Text>
                            <Text className="text-2xl font-bold font-mono mt-1 text-foreground">
                                {card.value}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Filter Tabs */}
            <View className="flex-row flex-wrap items-center gap-2">
                <Pressable className="px-4 py-1.5 rounded-lg bg-primary/10">
                    <Text className="text-sm font-medium text-primary">Todas</Text>
                </Pressable>
                <Pressable className="px-4 py-1.5 rounded-lg">
                    <Text className="text-sm font-medium text-muted-foreground">Novas</Text>
                </Pressable>
                <Pressable className="px-4 py-1.5 rounded-lg">
                    <Text className="text-sm font-medium text-muted-foreground">Visualizadas</Text>
                </Pressable>
                <Pressable className="px-4 py-1.5 rounded-lg">
                    <Text className="text-sm font-medium text-muted-foreground">Aplicadas</Text>
                </Pressable>
            </View>

            {/* Empty State */}
            <View className="space-y-3">
                <View className="items-center justify-center py-12">
                    <Text className="text-sm text-muted-foreground text-center">
                        Nenhuma vaga encontrada ainda.
                    </Text>
                    <Text className="text-xs text-muted-foreground text-center mt-1">
                        Configure suas preferências em Configurações para começar a receber vagas.
                    </Text>
                </View>
            </View>

        </View>
    );
}
