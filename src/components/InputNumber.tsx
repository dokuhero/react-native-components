import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { CalculatorInput, CalculatorInputProps } from 'react-native-calculator'
import { globalStyles } from '../styles'
import { FormField, FormFieldProps } from './FormField'

export interface InputNumberProps extends FormFieldProps, CalculatorInputProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export const InputNumber = withTheme<InputNumberProps>(
  ({
    value,
    label,
    errors,
    onChange,
    theme,
    fieldTextStyle,
    containerStyle,
    disabled,
    ...rest
  }) => (
    <FormField
      label={label}
      errors={errors}
      containerStyle={[containerStyle, { paddingRight: 10 }]}
    >
      <CalculatorInput
        disabled={disabled}
        fieldDisabledTextStyle={{
          color: theme.color.grey,
          fontFamily: theme.fontName.semiBold
        }}
        value={value}
        fieldContainerStyle={[
          {
            marginLeft: 20,
            borderBottomColor: theme.color.grey
          },
          disabled ? { borderBottomWidth: 0 } : {}
        ]}
        fieldTextStyle={[
          globalStyles.inputText,
          { marginBottom: 6 },
          fieldTextStyle
        ]}
        borderColor={theme.color.lighter}
        acceptButtonBackgroundColor={theme.color.primary}
        calcButtonBackgroundColor={theme.color.secondary}
        onChange={(val: number) => {
          if (onChange) {
            onChange(val)
          }
        }}
        height={300}
        {...rest}
      />
    </FormField>
  )
)
