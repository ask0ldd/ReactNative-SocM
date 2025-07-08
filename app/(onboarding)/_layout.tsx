import { Stack } from 'expo-router';

export default function OnboardingLayout() {

  return (
      <Stack initialRouteName="user-form">
        <Stack.Screen name="user-form" options={{ headerShown: false, statusBarStyle: 'light' }}/>
      </Stack>
  );
}