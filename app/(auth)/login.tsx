import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import CustomButton from '@/components/CustomButton';
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
                    <ThemedText>Login</ThemedText>
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
                    <CustomFormInput
                        style={{fontSize:16, fontFamily:'Jost_400Regular'}}
                        active={focus === "password"}
                        placeholder={focus === "password" ? "" : "Password"}
                        value={form.password}
                        onChangeText={(password: string) => setForm(prevForm => ({...prevForm, password}))}
                        keyboardType="default"
                        autoCapitalize="none"
                        containerStyle={{...styles.input, columnGap : 10, marginTop:15}}
                        accessibilityLabel="Champ password"
                        placeholderTextColor={'#8E8E93'}
                        onFocus={() => setFocus("password")}
                        onBlur={() => setFocus(null)}
                    />
                    <CustomButton gradient={} title={'Login'} onPress={() => void 0}/>
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
        marginTop:30,
        width:'100%'
    },
});
