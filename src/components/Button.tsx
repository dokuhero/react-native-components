import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { Button as Btn, ButtonProps as BtnProps } from 'react-native-elements'

export interface ButtonProps extends BtnProps {
  reverseColor?: boolean
  full?: boolean
  kind?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export const Button = withTheme<ButtonProps>(
  ({
    backgroundColor,
    color,
    containerViewStyle,
    theme,
    reverseColor,
    kind,
    ...rest
  }) => {
    switch (kind) {
      case 'primary':
        backgroundColor = theme.color.primary
        color = theme.color.primaryReverse
        break
      case 'secondary':
        backgroundColor = theme.color.secondary
        color = theme.color.secondaryReverse
        break
      case 'success':
        backgroundColor = theme.color.success
        color = theme.color.successReverse
        break
      case 'warning':
        backgroundColor = theme.color.warning
        color = theme.color.warningReverse
        break
      case 'danger':
        backgroundColor = theme.color.danger
        color = theme.color.dangerReverse
        break
      default:
        backgroundColor = backgroundColor || theme.color.grey
        color = color || theme.color.greyReverse
    }

    if (reverseColor) {
      const bClr = backgroundColor

      backgroundColor = color
      color = bClr
    }

    let style = {}
    if (rest.full) {
      style = {
        width: '100%',
        marginLeft: 0,
        marginRight: 0
      }
    }

    return (
      <Btn
        borderRadius={theme.radius.big}
        fontFamily={theme.fontName.semiBold}
        fontSize={theme.fontSize.medium}
        {...rest}
        containerViewStyle={[
          style,
          { borderRadius: theme.radius.big },
          containerViewStyle
        ]}
        backgroundColor={backgroundColor}
        color={color}
      />
    )
  }
)
