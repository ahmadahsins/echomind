import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { ResultCard } from "../components/ResultCard";
import { analyzeSentiment, SentimentResult } from "../services/sentimentApi";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeSentiment(text.trim());
      setResult(data);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          "Gagal terhubung ke server. Pastikan backend berjalan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="items-center mt-8 mb-8">
            <View className="w-16 h-16 rounded-full bg-emerald-500/15 items-center justify-center mb-4">
              <Text className="text-3xl">🧠</Text>
            </View>
            <Text className="text-4xl font-extrabold text-white tracking-tighter">
              Echo<Text className="text-emerald-400">Mind</Text>
            </Text>
            <Text className="text-slate-400 text-base mt-2 text-center">
              Analisis sentimen teks menggunakan AI
            </Text>
          </View>

          {/* Section Label */}
          <Text className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Masukkan Teks
          </Text>

          {/* Input */}
          <InputField value={text} onChangeText={setText} />

          {/* Submit Button */}
          <View className="mt-5">
            <SubmitButton
              onPress={handleAnalyze}
              loading={loading}
              disabled={!text.trim() || loading}
            />
          </View>

          {/* Result */}
          {result && (
            <View className="mt-6">
              <ResultCard result={result} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
