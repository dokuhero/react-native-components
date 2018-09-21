import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { CheckBox as RNCheckBox, CheckBoxProps } from 'react-native-elements'
import { globalStyles } from '../styles'

export const CheckBox = withTheme<CheckBoxProps>(({ theme, ...rest }) => {
  return (
    <RNCheckBox
      containerStyle={{
        borderWidth: 0,
        backgroundColor: theme.color.transparent
      }}
      textStyle={globalStyles.inputText}
      {...rest}
    />
  )
})

export { CheckBoxProps }
