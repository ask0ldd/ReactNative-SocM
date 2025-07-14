import CustomButton from '@/components/CustomButton';
import CustomFormInput from '@/components/CustomFormInput';
import { ThemedText } from '@/components/expo/ThemedText';
import { ThemedView } from '@/components/expo/ThemedView';
import { isNativeFirebaseError } from '@/guards/isNativeFirebaseError';
import { useServicesContext } from '@/hooks/context/useServices';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import z, { ZodError } from 'zod/v4';

export default function ResetPasswordScreen() {
  
  const {storageService, authService} = useServicesContext()
  
  const [email, setEmail] = useState<string>("")
  
  const [focus, setFocus] = useState<"email" | "password" | "passwordCheck" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const colorScheme = useColorScheme()

  async function handleRegisterFormSubmit(){
    setErrorMessage("")
    try{
        z.email().parse(email)
        // checks by default if the email is available
        const emailSent = await authService.sendPasswordResetEmail(email)
        if(emailSent) return router.push('/(auth)')
        throw new Error("Couldn't send a reset email to this address.")
    }catch(error : unknown){
        const message = parseResetPasswordFormError(error)
        setErrorMessage(message)
        console.error(message)
    }
  };

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
                              value={email}
                              onChangeText={setEmail}
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

function parseResetPasswordFormError(error: unknown): string {
    if (isNativeFirebaseError(error)) {
        if (error.code === 'auth/email-already-in-use') return "Email indisponible.";
        if (error.code === 'auth/invalid-credential') return "Identifiants inconnus.";
        if (error.code === 'auth/invalid-email') return "Email inconnu.";
        return error.message;
    }
    if (error instanceof ZodError) {
        return JSON.parse(error.message)[0].message
    }
    return `${error}`;
}

const styles = StyleSheet.create({
  scrollView :{ 
      flexGrow: 1, 
      flexDirection:'column',
      justifyContent: 'center', 
      alignItems: 'center',
  },
  mainContainer:{
      width:'100%', 
      flex: 1,
      flexDirection:'column', 
      paddingHorizontal: 20,
      paddingBottom:20,
      fontFamily:'Jost_400Regular',
  },
  input:{
      backgroundColor:'#F2F2F7',
      borderWidth: 1,
      borderColor: '#D1D1D6',
      borderStyle: 'solid',
      paddingHorizontal : 15,
      borderRadius:8,
      height:55,
      color:'#323232',
      fontFamily:'Jost_400Regular',
      fontSize:16,
  },
  form:{
      flexDirection:'column', 
      marginTop:20,
      width:'100%',
  },
  sendButton:{
      marginTop:20, 
      height:55,
      shadowColor:'#007AFF',
      elevation:4,
  }
});
