import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

export default function CustomButton({
  title,
  onPress,
  styles,
  gradient,
}: ICustomButtonProps) {
  return (
    <Pressable
      style={styles?.button}
      onPress={onPress}
    >
      {gradient ? 
        <LinearGradient
          {...gradient}
          style={[
            { flex : 1, width :'100%', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 12 },
            gradient.style,
          ]}
        >
          <Text style={styles?.text}>{title}</Text>
        </LinearGradient>
       : 
        <View style={[{ justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 12 }]}>
          <Text style={styles?.text}>{title}</Text>
        </View>
      }
    </Pressable>
  );
}

interface ICustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void
  styles?: {
    button?: StyleProp<ViewStyle>
    text?: StyleProp<TextStyle>
  }
  gradient?: LinearGradientProps
}