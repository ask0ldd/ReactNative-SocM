import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useColorScheme } from 'react-native';

import CustomButton from '@/components/CustomButton';
import CustomFormInput from '@/components/CustomFormInput';
import { ThemedText } from '@/components/expo/ThemedText';
import { ThemedView } from '@/components/expo/ThemedView';
import { TIdentityForm } from '@/zod/forms/identityFormSchema';
import { useState } from 'react';

const defaultIdentityForm : TIdentityForm = {
    username : "",
    firstname : "",
    lastname : "",
    gender : "NC",
    dateOfBirth : {
        day: 0,
        month: 0,
        year: 0,
    }
}

export default function UserFormScreen() {

    const [form, setForm] = useState<TIdentityForm>(defaultIdentityForm)

    const [focus, setFocus] = useState<"username" | "firstname" | "lastname" | "gender" | "birthDay" | "birthMonth" | "birthYear" | null>(null)

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
                            active={focus === "username"}
                            placeholder={focus === "username" ? "" : "Username"}
                            value={form.username}
                            onChangeText={(username: string) => setForm(prevForm => ({...prevForm, username}))}
                            keyboardType="default"
                            autoCapitalize="none"
                            containerStyle={{...styles.input, columnGap : 10, marginTop:10}}
                            accessibilityLabel="Champ username"
                            placeholderTextColor={'#8E8E93'}
                            onFocus={() => setFocus("username")}
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
