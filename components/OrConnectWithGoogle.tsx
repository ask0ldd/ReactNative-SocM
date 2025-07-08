import { useServicesContext } from '@/hooks/context/useServices';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from './expo/ThemedText';
import { ThemedView } from './expo/ThemedView';

export default function OrConnectWithGoogle({marginTop, setErrorMessage} : {marginTop : number, setErrorMessage : React.Dispatch<React.SetStateAction<string>>}){

    const colorScheme = useColorScheme()
    const {authService, storageService} = useServicesContext()

    // !!! should later evolve to universal google sign : https://react-native-google-signin.github.io/docs/one-tap
    async function handleGoogleConnect(){
        // !!! move most logic to the auth service
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
            const response = await GoogleSignin.signIn()

            if (isSuccessResponse(response)) {
                if(!response.data || !response.data.idToken) throw new Error("Google Signin failed to return the expected User or TokenId datas.") // !!!
                const googleCredential = authService.GoogleAuthProvider.credential(response.data?.idToken)
                authService.signInWithGoogleCredential(googleCredential)
                const user = response.data.user
                console.log(JSON.stringify(user))
                const identity = {
                    lastname : user.familyName ?? '', 
                    firstname : user.givenName ?? '',
                    username : '',
                    gender : 'NC',
                    dateOfBirth : {
                        day : 0,
                        month : 0,
                        year : 0
                    }
                }
                // retrieve and store the firstname and the lastname of the user (put at disposal by google)
                // data is then used to auto-populate the same fields of the onboarding step 1 form
                await storageService.set("onboarding-user", JSON.stringify(identity))
                router.push('/(onboarding)/user-form')
            } else {
                // sign in was cancelled by the user
                console.error("Google SignIn process canceled by the user.")
            }
        } catch (error) {
            const message = parseGoogleSignInError(error)
            setErrorMessage(message)
        }
    }

    return(
        <View style={{flexDirection:'column', width:'100%', marginTop}}>
            <ThemedView style={{...styles.orContainer}}>
                <ThemedView style={colorScheme === "dark" ? {...styles.orLine, ...styles.orLineDark} : styles.orLine} />
                <ThemedText style={{fontSize:14, fontFamily:'Jost_600SemiBold'}}>OU</ThemedText>
                <ThemedView style={colorScheme === "dark" ? {...styles.orLine, ...styles.orLineDark} : styles.orLine} />
            </ThemedView>

            <Pressable style={{width:'100%'}} onPress={handleGoogleConnect}>
                <ThemedView style={colorScheme === "dark" ? {...styles.googleConnectContainer, ...styles.googleConnectContainerDark} :  {...styles.googleConnectContainer}}>
                    <Image source={require('@/assets/icons/google.png')} resizeMode="contain" style={{width: 20, height: 21 }}/>
                    <ThemedText style={{fontSize:16, fontFamily:"Jost_400Regular"}}>Continuer avec Google</ThemedText>
                </ThemedView>
            </Pressable>
        </View>
    )
}

// isolated logic dealing with Google SignIn errors
function parseGoogleSignInError(error: unknown): string {
    if (isErrorWithCode(error)) {
        switch (error.code) {
            case statusCodes.IN_PROGRESS:
                // sign in already in progress
                return "Google SignIn déjà en cours."
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                // Android : play services not available or outdated
                return "Google Play indisponible ou version obsolète."
            default:
                // some other error happened
                return error.message
        }
    } 
    return JSON.stringify(error)
}

const styles = StyleSheet.create({
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 15,
        width:'100%',
        alignSelf:'center'
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#CDD3D8AA',
    },
    orLineDark:{
        backgroundColor:'#383A3D'
    },
    googleConnectContainer: {
        height:50,
        width:'100%',
        backgroundColor:'#F4F4F5',
        borderWidth: 1,
        borderColor: '#CDD3D8',
        borderStyle: 'dashed',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        flexDirection:'row',
        columnGap:16,
        alignSelf:'center',
        marginTop:20,
    },
    googleConnectContainerDark:{
        backgroundColor:'#303336',
        borderColor:'#43464A',
        borderStyle:'solid',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
    },
});