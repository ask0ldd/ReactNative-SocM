import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/expo/ThemedText';
import { ThemedView } from '@/components/expo/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';

export default function ResetPasswordScreen() {
  return (
    <KeyboardAvoidingView>
        <ScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Explore</ThemedText>
            </ThemedView>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
