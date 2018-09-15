import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { TextStyle, TouchableOpacity } from 'react-native'
import { Text } from './Text'

interface TextButtonProps {
  onPress: () => void
  text: string
  textStyle?: TextStyle
}

export const TextButton = withTheme<TextButtonProps>(
  ({ onPress, text, textStyle, theme }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            {
              color: theme.color.white
            },
            textStyle
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    )
  }
)
