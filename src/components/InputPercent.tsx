import { withLocale } from '@dokuhero/react-18n-ts-helper'
import { ThemeConsumer } from '@dokuhero/react-native-theme'
import React from 'react'
import { Alert } from 'react-native'
import { CalculatorInput, CalculatorInputProps } from 'react-native-calculator'
import { globalStyles } from '../styles'
import { FormField, FormFieldProps } from './FormField'

export interface InputPercentProps
  extends FormFieldProps,
    CalculatorInputProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export const InputPercent = withLocale<InputPercentProps>('common')(
  ({
    value,
    label,
    errors,
    onChange,
    t,
    max,
    containerStyle,
    fieldTextStyle
  }) => {
    if (max) {
      max = 100
    }

    return (
      <ThemeConsumer>
        {({ color }) => (
          <FormField
            label={label}
            errors={errors}
            containerStyle={[containerStyle, { paddingRight: 10 }]}
          >
            <CalculatorInput
              value={value}
              fieldContainerStyle={{
                marginLeft: 20,
                borderBottomColor: color.grey
              }}
              fieldTextStyle={[
                globalStyles.inputText,
                { marginBottom: 6 },
                fieldTextStyle
              ]}
              borderColor={color.lighter}
              acceptButtonBackgroundColor={color.primary}
              calcButtonBackgroundColor={color.secondary}
              suffix="%"
              onBeforeChange={val => {
                if (val > (max as number)) {
                  Alert.alert('', t('maxPercentIs', { percent: 100 }))
                  return false
                }

                return true
              }}
              onChange={val => {
                if (onChange) {
                  onChange(val)
                }
              }}
              height={300}
            />
          </FormField>
        )}
      </ThemeConsumer>
    )
  }
)
