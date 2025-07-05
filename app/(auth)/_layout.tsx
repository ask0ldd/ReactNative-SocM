import { Stack } from 'expo-router';

export default function AuthLayout() {

  return (
      <Stack initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false, statusBarStyle: 'light' }}/>
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }}/>
      </Stack>
  );
}