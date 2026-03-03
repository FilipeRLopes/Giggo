import { View, Text, ScrollView, Pressable } from "react-native";
import {
    Globe,
    BarChart2,
    Bell,
    Shield,
    History,
    Zap,
    CreditCard,
    Plus,
    Calendar,
    Receipt,
    ChevronDown
} from "lucide-react-native";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function BillingScreen() {
    return (
        <View className="px-4 py-8 md:p-8 max-w-4xl mx-auto space-y-8 w-full">

            {/* Current Plan Card */}
            <View className="rounded-xl border border-border bg-card overflow-hidden">
                <View className="p-5 sm:p-6">
                    <View className="flex-row items-start justify-between">
                        <View>
                            <Text className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Plano atual</Text>
                            <Text className="text-xl font-bold mt-1 text-foreground">Radar Freelancer</Text>
                            <View className="self-start mt-2 px-2.5 py-1 rounded-full bg-primary/10">
                                <Text className="text-xs font-semibold text-primary">Trial • 0 dias restantes</Text>
                            </View>
                        </View>
                        <View className="items-end">
                            <Text className="text-3xl font-bold font-mono text-foreground">R$29,90</Text>
                            <Text className="text-xs text-muted-foreground">/mês</Text>
                        </View>
                    </View>
                    <View className="mt-4 pt-3 border-t border-border">
                        <Text className="text-xs text-muted-foreground">
                            Após o trial, a cobrança de R$29,90/mês será iniciada automaticamente.
                        </Text>
                    </View>
                </View>

                {/* Features List Layout - Gray bg area */}
                <View className="border-t border-border bg-muted/30 px-5 sm:px-6 py-4">
                    <View className="flex-row flex-wrap gap-y-3">
                        {[
                            { icon: Globe, text: "Monitoramento de 6 plataformas" },
                            { icon: BarChart2, text: "Score de compatibilidade automático" },
                            { icon: Bell, text: "Notificações email, push, WhatsApp e Telegram" },
                            { icon: Shield, text: "Alertas de alta concorrência" },
                            { icon: History, text: "Histórico completo de vagas" },
                            { icon: Zap, text: "Acesso prioritário a novas funcionalidades" },
                        ].map((feature, idx) => (
                            <View key={idx} className="w-1/2 sm:w-1/3">
                                <View className="flex-row items-center gap-2 pr-2">
                                    <feature.icon size={14} className="text-primary shrink-0" />
                                    <Text className="text-xs text-muted-foreground">
                                        {feature.text}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View className="flex-col sm:flex-row gap-4">
                {/* Payment Method */}
                <View className="flex-1 rounded-xl border border-border bg-card p-5">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center gap-2">
                            <CreditCard size={16} className="text-primary" />
                            <Text className="text-sm font-semibold text-foreground">Forma de Pagamento</Text>
                        </View>
                        <Pressable className="h-9 px-3 rounded-md border border-input bg-background flex-row items-center gap-1.5 active:opacity-70">
                            <Plus size={14} className="text-foreground" />
                            <Text className="text-sm font-medium text-foreground">Adicionar</Text>
                        </Pressable>
                    </View>
                    <Text className="text-sm text-muted-foreground">Nenhum cartão cadastrado.</Text>
                </View>

                {/* Due Date */}
                <View className="flex-1 rounded-xl border border-border bg-card p-5">
                    <View className="flex-row items-center gap-2 mb-4">
                        <Calendar size={16} className="text-primary" />
                        <Text className="text-sm font-semibold text-foreground">Data de Vencimento</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <Pressable className="h-10 w-32 border border-input rounded-md px-3 bg-background flex-row items-center justify-between active:opacity-70">
                            <Text className="text-sm text-foreground">Dia 10</Text>
                            <ChevronDown size={16} className="text-muted-foreground" />
                        </Pressable>
                        <Pressable className="h-9 px-3 rounded-md border border-input bg-background flex-row items-center justify-center active:opacity-70">
                            <Text className="text-sm font-medium text-foreground">Salvar</Text>
                        </Pressable>
                    </View>
                    <Text className="text-xs text-muted-foreground mt-3">
                        A cobrança será realizada no dia 10 de cada mês.
                    </Text>
                </View>
            </View>

            {/* Payment History */}
            <View className="rounded-xl border border-border bg-card p-5">
                <View className="flex-row items-center gap-2 mb-4">
                    <Receipt size={16} className="text-primary" />
                    <Text className="text-sm font-semibold text-foreground">Histórico de Pagamentos</Text>
                </View>
                <View className="py-6">
                    <Text className="text-sm text-muted-foreground text-center">Nenhum pagamento registrado.</Text>
                </View>
            </View>

        </View>
    );
}
