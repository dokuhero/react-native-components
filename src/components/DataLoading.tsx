import { withLocale } from '@dokuhero/react-18n-ts-helper'
import { ThemeConsumer } from '@dokuhero/react-native-theme'
import React from 'react'
import { InjectedTranslateProps } from 'react-i18next'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Text } from './Text'

export interface DataLoadingProps extends Partial<InjectedTranslateProps> {
  text?: string
  visible: boolean
}

export const DataLoading = withLocale<DataLoadingProps>('common')(
  ({ visible, t, text }) =>
    visible ? (
      <ThemeConsumer>
        {({ color }) => (
          <View style={styles.container}>
            <View>
              <ActivityIndicator size="large" color={color.primary} />
              <Text>{text || t('loading')}</Text>
            </View>
          </View>
        )}
      </ThemeConsumer>
    ) : null
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})
