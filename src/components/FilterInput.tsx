import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { X } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { pixelHorizontal, pixelModerado, pixelVertical } from '../utils/responsive';

interface FilterInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export const FilterInput = ({ value, onChangeText, onSubmit }: FilterInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Search size={20} color={COLORS.icon} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Filter by initial letter..."
          placeholderTextColor={COLORS.placeholder}
          maxLength={1}
          autoCapitalize="none"
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          importantForAutofill="no"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}  accessibilityLabel="Clear filter input" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
            <X size={20} color={COLORS.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: pixelHorizontal(16),
    paddingVertical: pixelVertical(8),
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textButton,
    borderRadius: pixelModerado(8),
    paddingHorizontal: pixelHorizontal(12),
    height: pixelVertical(44),
  },
  icon: {
    marginRight: pixelHorizontal(8),
  },
  input: {
    flex: 1,
    fontSize: pixelModerado(16),
    color: COLORS.inputColor,
  },
  button: {
    marginLeft: pixelHorizontal(12),
    backgroundColor: COLORS.buttonActive,
    paddingHorizontal: pixelHorizontal(16),
    paddingVertical: pixelVertical(10),
    borderRadius: pixelModerado(8),
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
  },
  buttonText: {
    color: COLORS.textButton,
    fontWeight: '600',
  },
});
