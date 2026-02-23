import { Slot } from "expo-router";
import { View } from "react-native";
import "../global.css";

export default function RootLayout() {
    return (
        <View style={{ flex: 1 }} className="bg-background text-foreground">
            <Slot />
        </View>
    );
}
