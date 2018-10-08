import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { CalculatorInput, CalculatorInputProps } from 'react-native-calculator'
import { globalStyles } from '../styles'
import { FormField, FormFieldProps } from './FormField'

export interface InputCurrencyProps
  extends FormFieldProps,
    CalculatorInputProps {
  currency?: string
  value: number
  onChange: (value: number) => void
}

export const InputCurrency = withTheme<InputCurrencyProps>(
  ({
    currency,
    value,
    label,
    errors,
    onChange,
    theme,
    fieldTextStyle,
    containerStyle,
    ...rest
  }) => (
    <FormField
      label={label}
      errors={errors}
      containerStyle={[containerStyle, { paddingRight: 10 }]}
    >
      <CalculatorInput
        value={value}
        fieldContainerStyle={{
          marginLeft: 20,
          borderBottomColor: theme.color.grey
        }}
        fieldTextStyle={[
          globalStyles.inputText,
          { marginBottom: 6 },
          fieldTextStyle
        ]}
        borderColor={theme.color.lighter}
        acceptButtonBackgroundColor={theme.color.primary}
        calcButtonBackgroundColor={theme.color.secondary}
        prefix={(currency || 'Rp') + ' '}
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
