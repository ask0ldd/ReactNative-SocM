import CustomButton from '@/components/CustomButton';
import CustomFormInput from '@/components/CustomFormInput';
import { ThemedText } from '@/components/expo/ThemedText';
import { ThemedView } from '@/components/expo/ThemedView';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

export default function ResetPasswordScreen() {
  return (
    <KeyboardAvoidingView 
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={0}
          >
              <ScrollView 
                  contentContainerStyle={styles.scrollView}
                  keyboardShouldPersistTaps="handled"
              >
                  <ThemedView style={styles.mainContainer}>
                      <ThemedView style={styles.form}>
                          <ThemedText style={{fontFamily:'Jost_600SemiBold', fontSize:24, lineHeight:32}}>REGISTER</ThemedText>
                          <CustomFormInput
                              style={{fontSize:16, fontFamily:'Jost_400Regular'}}
                              active={focus === "email"}
                              placeholder={focus === "email" ? "" : "Email"}
                              value={form.email}
                              onChangeText={(email: string) => setForm(prevForm => ({...prevForm, email}))}
                              keyboardType="email-address"
                              autoCapitalize="none"
                              containerStyle={{...styles.input, columnGap : 10, marginTop:10}}
                              accessibilityLabel="Champ email"
                              placeholderTextColor={'#8E8E93'}
                              onFocus={() => setFocus("email")}
                              onBlur={() => setFocus(null)}
                          />
                          <CustomButton gradient={{
                              colors: colorScheme === "dark" ? ['#007AFF', '#007AFF'] : ['#007AFF', '#007AFF'],
                              start: { x: 0, y: 0 },
                              end: { x: 1, y: 0 }}} 
                              title={'Register'} 
                              onPress={handleRegisterFormSubmit}
                              styles={{button: styles.sendButton, text:{color : '#ffffff', fontSize:16, fontFamily:'Jost_600SemiBold'}}}
                          />
                      </ThemedView>
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
