import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { FormInput, FormInputProps } from 'react-native-elements'
import { globalStyles } from '../styles'
import { FormField, FormFieldProps } from './FormField'

export interface InputProps extends FormInputProps {}

export const Input = withTheme<InputProps & FormFieldProps>(
  ({ theme, label, errors, inputStyle, ...rest }) => {
    return (
      <FormField
        label={label}
        errors={errors}
        containerStyle={{ paddingBottom: 4 }}
      >
        <FormInput
          underlineColorAndroid={theme.color.grey}
          {...rest}
          inputStyle={[
            {
              paddingHorizontal: 5,
              color: theme.color.darker,
              width: '100%'
            },
            globalStyles.inputText,
            inputStyle
          ]}
          containerStyle={[globalStyles.container, rest.containerStyle]}
        />
      </FormField>
    )
  }
)
