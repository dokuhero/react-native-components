import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { Text as Txt, TextProps as TxtProps } from 'react-native-elements'

export interface TextProps extends TxtProps {
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  color?: string
  paragraph?: boolean
  title?: boolean
}

export const Text = withTheme<TextProps>(
  ({ align, color, paragraph, title, style, theme, ...rest }) => {
    return (
      <Txt
        fontFamily={title ? theme.fontName.semiBold : theme.fontName.regular}
        {...rest}
        style={[
          {
            textAlign: align,
            fontSize: title ? 24 : 14,
            color,
            marginBottom: paragraph ? 20 : undefined
          },
          style
        ]}
      />
    )
  }
)
