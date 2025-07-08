import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useColorScheme } from 'react-native';

import CustomButton from '@/components/CustomButton';
import CustomFormInput from '@/components/CustomFormInput';
import { ThemedText } from '@/components/expo/ThemedText';
import { ThemedView } from '@/components/expo/ThemedView';
import { useState } from 'react';

export default function LoginScreen() {

    const [form, setForm] = useState<{email : string, password : string}>({email : "", password : ""})

    const [focus, setFocus] = useState<"email" | "password" | null>(null)

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
                <Image 
                  source={colorScheme === "dark" ? require('@/assets/images/figma.png') : require('@/assets/images/figma.png')} 
                  resizeMode="cover" 
                  style={{width: '100%', height:325, opacity:70}}
                />
                <ThemedView style={styles.mainContainer}>
                    <ThemedView style={styles.form}>
                        <ThemedText style={{fontFamily:'Jost_600SemiBold', fontSize:24, lineHeight:32}}>LOGIN</ThemedText>
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
                        <CustomFormInput
                            style={{fontSize:16, fontFamily:'Jost_400Regular'}}
                            active={focus === "password"}
                            placeholder={focus === "password" ? "" : "Password"}
                            value={form.password}
                            onChangeText={(password: string) => setForm(prevForm => ({...prevForm, password}))}
                            keyboardType="default"
                            autoCapitalize="none"
                            containerStyle={{...styles.input, columnGap : 10, marginTop:20}}
                            accessibilityLabel="Champ password"
                            placeholderTextColor={'#8E8E93'}
                            onFocus={() => setFocus("password")}
                            onBlur={() => setFocus(null)}
                        />
                        <CustomButton gradient={{
                            colors: colorScheme === "dark" ? ['#007AFF', '#007AFF'] : ['#007AFF', '#007AFF'],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 0 }}} 
                            title={'Login'} 
                            onPress={() => void 0}
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
