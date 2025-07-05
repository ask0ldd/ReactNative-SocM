import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import CustomFormInput from '@/components/CustomFormInput';
import { ThemedText } from '@/components/expo/ThemedText';
import { ThemedView } from '@/components/expo/ThemedView';
import { useState } from 'react';

export default function LoginScreen() {

    const [form, setForm] = useState<{email : string, password : string}>({email : "", password : ""})

    const [focus, setFocus] = useState<"email" | "password" | null>(null)

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
                <ThemedText type="title">Login</ThemedText>
                    <CustomFormInput
                        style={{fontSize:16, fontFamily:'Jost_400Regular'}}
                        active={focus === "email"}
                        placeholder={focus === "email" ? "" : "Email"}
                        value={form.email}
                        onChangeText={(email: string) => setForm(prevForm => ({...prevForm, email}))}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        containerStyle={{...styles.input, columnGap : 10}}
                        accessibilityLabel="Champ email"
                        placeholderTextColor={'#8E8E93'}
                        onFocus={() => setFocus("email")}
                        onBlur={() => setFocus(null)}
                    />
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollView :{ 
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    mainContainer:{
        flex:1, 
        width:'100%', 
        flexDirection:'column', 
        alignItems:'center', 
        padding: 20,
        fontFamily:'Jost_400Regular',
    },
    input:{
        backgroundColor:'#F2F2F7',
        borderWidth: 1,
        borderColor: '#D1D1D6',
        borderStyle: 'solid',
        paddingHorizontal : 15,
        borderRadius:8,
        height:50,
        color:'#323232',
        fontFamily:'Jost_400Regular',
        fontSize:16
    },
    form:{
        flexDirection:'column', 
        rowGap:20,
        marginTop:30,
        width:'100%'
    },
});
