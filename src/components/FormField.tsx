import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import { FormLabel, FormValidationMessage } from 'react-native-elements'

export interface FormFieldProps {
  label?: string
  errors?: string[]
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
}

export const FormField = withTheme<FormFieldProps>(
  ({ containerStyle, labelStyle, label, children, errors, theme }) => (
    <View style={containerStyle}>
      {label && (
        <FormLabel
          fontFamily={theme.fontName.semiBold}
          labelStyle={[{ fontFamily: theme.fontName.semiBold }, labelStyle]}
        >
          {label}
        </FormLabel>
      )}
      {children}
      {errors &&
        errors.map((err, idx) => (
          <FormValidationMessage
            key={`errmsg-${idx}`}
            fontFamily={theme.fontName.regular}
            labelStyle={{
              color: theme.color.danger,
              fontFamily: theme.fontName.regular
            }}
          >
            {err}
          </FormValidationMessage>
        ))}
    </View>
  )
)
