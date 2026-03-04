import React, { useState, useEffect } from "react";
import { View, Text, Pressable, DeviceEventEmitter } from "react-native";
import { X } from "lucide-react-native";

export const SHOW_TOAST_EVENT = "SHOW_TOAST";

export const Toaster = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener(SHOW_TOAST_EVENT, (msg: string) => {
            setMessage(msg);
            setShow(true);

            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            return () => clearTimeout(timer);
        });

        return () => subscription.remove();
    }, []);

    if (!show) return null;

    return (
        <View
            className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 pointer-events-none sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
            // @ts-ignore
            style={{ position: 'fixed', zIndex: 1000 }}
        >
            <View className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg border border-border bg-card text-foreground animate-in fade-in slide-in-from-top-full sm:slide-in-from-bottom-full duration-300">
                <View className="grid gap-1">
                    <Text className="text-sm font-semibold text-foreground">{message}</Text>
                </View>
                <Pressable
                    onPress={() => setShow(false)}
                    className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 group-hover:opacity-100 hover:text-foreground transition-opacity"
                    // @ts-ignore
                    style={{ cursor: 'pointer' }}
                >
                    <X size={16} className="text-foreground" />
                </Pressable>
            </View>
        </View>
    );
};
