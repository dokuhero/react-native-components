import { withLocale } from '@dokuhero/react-18n-ts-helper'
import { ThemeConsumer } from '@dokuhero/react-native-theme'
import React from 'react'
import { InjectedTranslateProps } from 'react-i18next'
import { Alert } from 'react-native'
import { CalculatorInput } from 'react-native-calculator'
import { globalStyles } from '../styles'
import { FormField, FormFieldProps } from './FormField'

export interface InputPercentProps
  extends FormFieldProps,
    Partial<InjectedTranslateProps> {
  value: number
  onChange: (value: number) => void
  max?: number
}

export const InputPercent = withLocale<InputPercentProps>('common')(
  ({ value, label, errors, onChange, t, max }) => {
    if (max) {
      max = 100
    }

    return (
      <ThemeConsumer>
        {({ color }) => (
          <FormField label={label} errors={errors}>
            <CalculatorInput
              value={value}
              fieldContainerStyle={{
                marginLeft: 20,
                paddingBottom: 7,
                borderBottomColor: color.lighter
              }}
              fieldTextStyle={globalStyles.inputText}
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
