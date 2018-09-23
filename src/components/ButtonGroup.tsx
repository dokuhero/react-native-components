import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { ButtonGroup as BtnGroup } from 'react-native-elements'
import { Button, ButtonProps } from './Button'

export interface ButtonGroupProps {
  selectedIndex?: number
  width?: number | string
  height?: number | string
  buttons: ButtonProps[]
  onPress?: (index: number) => void
  containerStyle?: StyleProp<ViewStyle>
  textColor?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  fontSize?: number
}

export const ButtonGroup = withTheme<ButtonGroupProps>(
  ({
    buttons,
    width,
    height,
    theme,
    selectedIndex,
    onPress,
    containerStyle,
    textColor,
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    fontSize
  }) => {
    // width = width || '100%'
    height = height || 45

    borderColor = borderColor === undefined ? theme.color.grey : borderColor
    borderWidth = borderWidth === undefined ? 2 : borderWidth
    borderRadius = borderRadius === undefined ? theme.radius.big : borderRadius

    return (
      <BtnGroup
        selectedIndex={selectedIndex || -1}
        onPress={i => {
          if (onPress) {
            onPress(i)
          }
        }}
        innerBorderStyle={{
          color: borderColor,
          width: borderWidth
        }}
        containerBorderRadius={borderRadius}
        buttonStyle={{ flex: 1 }}
        buttons={buttons.map((b, i) => ({
          element: () => (
            <Button
              buttonStyle={{ backgroundColor }}
              textStyle={{
                fontSize: fontSize || theme.fontSize.medium,
                color: textColor || theme.color.white
              }}
              {...b}
              onPress={() => {
                if (onPress) {
                  onPress(i)
                }
                if (b.onPress) {
                  b.onPress()
                }
              }}
              containerViewStyle={[
                {
                  width: '100%',
                  height: '100%',
                  borderRadius: 0
                },
                b.containerViewStyle
              ]}
              borderRadius={0}
            />
          )
        }))}
        containerStyle={[
          {
            flexGrow: 1,
            height,
            width,
            borderRadius,
            backgroundColor,
            borderColor,
            borderWidth,
            borderStyle: 'solid'
          },
          containerStyle
        ]}
      />
    )
  }
)
