import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  loading: boolean;
  disabled: boolean;
}

export function SubmitButton({
  onPress,
  loading,
  disabled,
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      className={`py-4 rounded-2xl items-center justify-center ${
        disabled ? "bg-dark-700" : "bg-emerald-500"
      }`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={
        !disabled
          ? {
              shadowColor: "#10b981",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }
          : undefined
      }
    >
      {loading ? (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator color="#ffffff" size="small" />
          <Text className="text-white text-base font-semibold">
            Menganalisis...
          </Text>
        </View>
      ) : (
        <Text
          className={`text-base font-bold ${
            disabled ? "text-slate-500" : "text-white"
          }`}
        >
          Analisis Sentimen ✨
        </Text>
      )}
    </TouchableOpacity>
  );
}
