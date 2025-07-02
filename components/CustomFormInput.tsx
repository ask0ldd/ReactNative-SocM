import { Colors } from "@/constants/Colors";
import { ReactNode, useRef } from "react";
import { ColorSchemeName, Pressable, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, useColorScheme, View, ViewStyle } from "react-native";

export default function CustomFormInput({leftIconElement, rightElement, active, containerStyle, style, ...inputProps} : TCustomFormInputProps)
{
    const colorScheme = useColorScheme()
    const textInputRef = useRef<TextInput|null>(null)

    const inputBackgroundColor = getInputBackgroundColor(colorScheme, active);
    const inputBorderColor = getInputBorderColor(colorScheme, active);
    const inputText = colorScheme === "dark" ? Colors.dark.inputText : Colors.light.inputText

    if(!leftIconElement && !rightElement && !containerStyle) return(
        <TextInput {...inputProps} style={[style, {backgroundColor : inputBackgroundColor, borderColor:inputBorderColor, color:inputText}]}/>
    )

    function handleFormInputContainerPress(){
      if(textInputRef.current) textInputRef.current.focus()
    }

    const flattenedStyle = StyleSheet.flatten(containerStyle)
    /*const containerWidth = flattenedStyle?.width
    const containerFlexBasis = flattenedStyle?.flexBasis
    const containerFlexGrow = flattenedStyle?.flexGrow
    const containerFlexShrink = flattenedStyle?.flexShrink*/

    const {width, flexBasis, flexGrow, flexShrink} = flattenedStyle

    return(
      <Pressable style={{width, flex : 1, flexBasis, flexGrow, flexShrink}} onPress={handleFormInputContainerPress}>
        <View style={[{ flexDirection: "row", alignItems: "center" }, containerStyle, {backgroundColor : inputBackgroundColor, borderColor:inputBorderColor, width:'100%'}]}>
            {leftIconElement}
            <TextInput ref={textInputRef}
                {...inputProps}
                style={[{ flex: 1, height:'100%', alignItems:'center'}, style, {color:inputText}]}
            />
            {rightElement}
        </View>
      </Pressable>
    )
}

function getInputBackgroundColor(colorScheme: ColorSchemeName, active: boolean) {
  if (colorScheme === "dark") {
    return active ? Colors.dark.inputActiveBackground : Colors.dark.inputBackground;
  }
  return active ? Colors.light.inputActiveBackground : Colors.light.inputBackground;
}

function getInputBorderColor(colorScheme: ColorSchemeName, active: boolean) {
  if (colorScheme === "dark") {
    return active ? Colors.dark.inputActiveBorder : Colors.dark.inputBorder;
  }
  return active ? Colors.light.inputActiveBorder : Colors.light.inputBorder;
}

type TCustomFormInputProps = {
    leftIconElement?: ReactNode
    rightElement?: ReactNode
    containerStyle?: StyleProp<ViewStyle>
    style?: StyleProp<TextStyle>
    active:boolean
} & TextInputProps