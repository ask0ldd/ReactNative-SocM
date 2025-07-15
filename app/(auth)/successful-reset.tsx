import CustomButton from '@/components/CustomButton';
import { ThemedText } from '@/components/expo/ThemedText';
import { ThemedView } from '@/components/expo/ThemedView';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useColorScheme } from 'react-native';

export default function SuccessfullResetScreen() {

  const colorScheme = useColorScheme()

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
                          <ThemedText style={{fontFamily:'Jost_600SemiBold', fontSize:24, lineHeight:32}}>SUCCESS</ThemedText>
                          <CustomButton gradient={{
                              colors: colorScheme === "dark" ? ['#007AFF', '#007AFF'] : ['#007AFF', '#007AFF'],
                              start: { x: 0, y: 0 },
                              end: { x: 1, y: 0 }}} 
                              title={'Register'} 
                              onPress={() => router.push("/(auth)/login")}
                              styles={{button: styles.sendButton, text:{color : '#ffffff', fontSize:16, fontFamily:'Jost_600SemiBold'}}}
                          />
                      </ThemedView>
                  </ThemedView>
              </ScrollView>
          </KeyboardAvoidingView>
  );
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
