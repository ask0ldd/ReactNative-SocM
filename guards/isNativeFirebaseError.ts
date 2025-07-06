import { ReactNativeFirebase } from "@react-native-firebase/app";

export function isNativeFirebaseError(error: any) : error is ReactNativeFirebase.NativeFirebaseError {
    if(!error) return false
    return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
}