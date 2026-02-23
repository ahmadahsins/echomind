import { View, TextInput, Text } from "react-native";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
}

const MAX_LENGTH = 1000;

export function InputField({ value, onChangeText }: InputFieldProps) {
  return (
    <View>
      <View className="bg-dark-800 rounded-2xl border border-dark-600 overflow-hidden">
        <TextInput
          className="text-slate-100 text-base p-4 min-h-[140px]"
          placeholder="Tulis perasaanmu di sini..."
          placeholderTextColor="#475569"
          multiline
          maxLength={MAX_LENGTH}
          value={value}
          onChangeText={onChangeText}
          textAlignVertical="top"
          style={{ lineHeight: 24 }}
        />
      </View>
      <View className="flex-row justify-between items-center mt-2 px-1">
        <Text className="text-xs text-dark-600 italic">
          Contoh: "Hari ini sangat menyenangkan!"
        </Text>
        <Text
          className={`text-xs ${value.length > 900 ? "text-rose-400" : "text-dark-600"}`}
        >
          {value.length}/{MAX_LENGTH}
        </Text>
      </View>
    </View>
  );
}
