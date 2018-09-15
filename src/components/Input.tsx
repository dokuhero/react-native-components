import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { FormInput, FormInputProps } from 'react-native-elements'
import { styles } from '../styles'
import { FormField, FormFieldProps } from './FormField'

export interface InputProps extends FormInputProps {}

export const Input = withTheme<InputProps & FormFieldProps>(
  ({ theme, label, errors, inputStyle, ...rest }) => {
    return (
      <FormField label={label} errors={errors}>
        <FormInput
          underlineColorAndroid={theme.color.lighter}
          {...rest}
          inputStyle={[
            {
              paddingHorizontal: 5,
              color: theme.color.darker,
              width: '100%',
              fontFamily: theme.fontName.regular
            },
            inputStyle
          ]}
          containerStyle={[styles.container, rest.containerStyle]}
        />
      </FormField>
    )
  }
)
