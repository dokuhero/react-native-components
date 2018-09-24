import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { CalculatorInput } from 'react-native-calculator'
import { globalStyles } from '../styles'
import { FormField, FormFieldProps } from './FormField'

export interface InputNumberProps extends FormFieldProps {
  value: number
  onChange: (value: number) => void
}

export const InputNumber = withTheme<InputNumberProps>(
  ({ value, label, errors, onChange, theme }) => (
    <FormField label={label} errors={errors}>
      <CalculatorInput
        value={value}
        fieldContainerStyle={{
          marginLeft: 20,
          paddingBottom: 7,
          borderBottomColor: theme.color.lighter
        }}
        fieldTextStyle={globalStyles.inputText}
        borderColor={theme.color.lighter}
        acceptButtonBackgroundColor={theme.color.primary}
        calcButtonBackgroundColor={theme.color.secondary}
        onChange={(val: number) => {
          if (onChange) {
            onChange(val)
          }
        }}
        height={300}
      />
    </FormField>
  )
)
