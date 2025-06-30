import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import CustomFormInput from '@/components/CustomFormInput';
import { ThemedText } from '@/components/expo/ThemedText';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function LoginScreen() {

    const [form, setForm] = useState<{email : string, password : string}>({email : "", password : ""})

    const [focus, setFocus] = useState<"email" | "password" | null>(null)

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <ScrollView style={styles.scrollView}>
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
                    placeholderTextColor={'#545454'}
                    onFocus={() => setFocus("email")}
                    onBlur={() => setFocus(null)}
                />
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
    input:{
        backgroundColor:'#F4F4F5',
        borderWidth: 1,
        borderColor: '#CDD3D8',
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
