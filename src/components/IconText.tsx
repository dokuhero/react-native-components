import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { Icon } from 'react-native-elements'

export interface IconTextProps {
  name: string
  type?: string
  color?: string
  text: string
  containerStyle?: ViewStyle
  textStyle?: TextStyle
}

export const IconText = withTheme<IconTextProps>(
  ({ color, name, type, text, textStyle, containerStyle, theme }) => {
    const clr = color || theme.color.darker
    return (
      <View
        style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}
      >
        <Icon name={name} type={type} color={clr} />
        <Text style={[{ marginLeft: 7, color: clr }, textStyle]}>{text}</Text>
      </View>
    )
  }
)
