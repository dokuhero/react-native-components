import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { CalculatorInput } from 'react-native-calculator'
import { FormField, FormFieldProps } from './FormField'

export interface InputCurrencyProps extends FormFieldProps {
  currency?: string
  value: number
  onChange: (value: number) => void
}

export const InputCurrency = withTheme<InputCurrencyProps>(
  ({ currency, value, label, errors, onChange, theme }) => (
    <FormField label={label} errors={errors}>
      <CalculatorInput
        value={value}
        fieldContainerStyle={{
          marginLeft: 20,
          paddingBottom: 7,
          borderBottomColor: theme.color.lighter
        }}
        fieldTextStyle={{ fontSize: theme.fontSize.medium }}
        borderColor={theme.color.lighter}
        acceptButtonBackgroundColor={theme.color.primary}
        calcButtonBackgroundColor={theme.color.secondary}
        prefix={(currency || 'Rp') + ' '}
        onChange={val => {
          if (onChange) {
            onChange(val)
          }
        }}
        height={300}
      />
    </FormField>
  )
)