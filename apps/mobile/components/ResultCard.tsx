import { View, Text } from "react-native";
import { SentimentResult } from "../services/sentimentApi";

interface ResultCardProps {
  result: SentimentResult;
}

const sentimentConfig = {
  Positif: {
    emoji: "😊",
    label: "Positif",
    cardBg: "rgba(52, 211, 153, 0.08)",
    cardBorder: "rgba(52, 211, 153, 0.25)",
    textColorClass: "text-emerald-400",
    barColor: "#34d399",
  },
  Negatif: {
    emoji: "😔",
    label: "Negatif",
    cardBg: "rgba(251, 113, 133, 0.08)",
    cardBorder: "rgba(251, 113, 133, 0.25)",
    textColorClass: "text-rose-400",
    barColor: "#fb7185",
  },
  Netral: {
    emoji: "😐",
    label: "Netral",
    cardBg: "rgba(148, 163, 184, 0.08)",
    cardBorder: "rgba(148, 163, 184, 0.25)",
    textColorClass: "text-slate-400",
    barColor: "#94a3b8",
  },
};

export function ResultCard({ result }: ResultCardProps) {
  const config =
    sentimentConfig[result.sentiment as keyof typeof sentimentConfig] ||
    sentimentConfig.Netral;

  const confidencePercent = Math.round(result.confidence_score * 100);

  return (
    <View
      className="rounded-2xl p-5"
      style={{
        backgroundColor: config.cardBg,
        borderWidth: 1,
        borderColor: config.cardBorder,
      }}
    >
      {/* Sentiment Header */}
      <View className="flex-row items-center">
        <View
          className="w-13 h-13 rounded-full items-center justify-center mr-3.5"
          style={{ backgroundColor: config.cardBg, width: 52, height: 52 }}
        >
          <Text className="text-3xl">{config.emoji}</Text>
        </View>
        <View>
          <Text className="text-[11px] font-semibold text-slate-500 tracking-widest">
            SENTIMEN
          </Text>
          <Text className={`text-2xl font-extrabold ${config.textColorClass}`}>
            {config.label}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-slate-700/20 my-4" />

      {/* Confidence Score */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-slate-400 font-medium">
            Confidence Score
          </Text>
          <Text className={`text-sm font-bold ${config.textColorClass}`}>
            {confidencePercent}%
          </Text>
        </View>
        <View className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <View
            className="h-full rounded-full"
            style={{
              width: `${confidencePercent}%`,
              backgroundColor: config.barColor,
            }}
          />
        </View>
      </View>

      {/* Explanation */}
      <View className="bg-dark-900/50 rounded-xl p-4">
        <Text className="text-xs font-semibold text-slate-500 mb-2">
          💡 Penjelasan
        </Text>
        <Text className="text-sm text-slate-200 leading-6">
          {result.explanation}
        </Text>
      </View>

      {/* Timestamp */}
      {result.timestamp && (
        <Text className="text-[11px] text-dark-600 text-right mt-3">
          {new Date(result.timestamp).toLocaleString("id-ID")}
        </Text>
      )}
    </View>
  );
}
