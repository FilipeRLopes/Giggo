import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function DashboardScreen() {
    return (
        <ScrollView className="flex-1">
            <View className="p-6 max-w-6xl mx-auto space-y-8">

                {/* Banner Section */}
                <Pressable className="relative rounded-2xl border border-border overflow-hidden h-56 sm:h-64 cursor-pointer bg-black">
                    {/* Abstract Background Design */}
                    <View className="absolute inset-y-0 left-0 w-1/2 bg-primary/10 -skew-x-12 -translate-x-1/2" />
                    <View className="absolute inset-y-0 right-0 w-1/2 bg-primary/5 skew-x-12 translate-x-1/2" />

                    <View className="absolute inset-0 w-full h-full justify-center items-center px-8">
                        <Text className="text-white text-4xl sm:text-5xl font-bold text-center leading-tight">
                            Score de Match{"\n"}aprimorado
                        </Text>
                    </View>

                    {/* Pagination Dots */}
                    <View className="absolute bottom-6 left-1/2 -ml-6 z-10 flex-row items-center gap-2">
                        <View className="w-2 h-2 rounded-full bg-white/20" />
                        <View className="w-2 h-2 rounded-full bg-primary" />
                        <View className="w-2 h-2 rounded-full bg-white/20" />
                    </View>
                </Pressable>

                {/* Trial Alert Section */}
                <View className="flex-row items-center gap-3 px-4 py-2.5 rounded-full border border-primary/20 bg-primary/5 self-start">
                    <View className="w-2 h-2 rounded-full bg-primary" />
                    <Text className="text-sm font-medium text-primary">
                        Trial • 0 dias restantes
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
                        <View key={idx} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                            <View className="p-5 rounded-2xl border border-border bg-card">
                                <Text className="text-sm text-muted-foreground mb-4">{card.label}</Text>
                                <Text className="text-3xl font-bold font-mono text-foreground">
                                    {card.value}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Filter Tabs */}
                <View className="flex-row items-center gap-6 pt-4">
                    <Pressable className="relative pb-2">
                        <Text className="text-sm font-semibold text-primary">Todas</Text>
                        <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    </Pressable>

                    <Pressable className="pb-2">
                        <Text className="text-sm font-medium text-muted-foreground">Novas</Text>
                    </Pressable>

                    <Pressable className="pb-2">
                        <Text className="text-sm font-medium text-muted-foreground">Visualizadas</Text>
                    </Pressable>

                    <Pressable className="pb-2 hidden sm:flex">
                        <Text className="text-sm font-medium text-muted-foreground">Aplicadas</Text>
                    </Pressable>
                </View>

                {/* Empty State */}
                <View className="items-center justify-center py-20">
                    <Text className="text-base text-muted-foreground text-center font-medium">
                        Nenhuma vaga encontrada ainda.
                    </Text>
                    <Text className="text-sm text-muted-foreground/60 text-center mt-2 max-w-sm">
                        Configure suas preferências em Configurações para começar a receber vagas.
                    </Text>
                </View>

            </View>
        </ScrollView>
    );
}
