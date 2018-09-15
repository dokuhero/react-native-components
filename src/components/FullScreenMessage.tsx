import { withLocaleClass } from '@dokuhero/react-18n-ts-helper'
import { withThemeClass } from '@dokuhero/react-native-theme'
import React from 'react'
import { InjectedTranslateProps } from 'react-i18next'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { Icon, IconProps } from 'react-native-elements'
import { styles } from '../styles'
import { WithThemeAndLocaleProps } from '../utils'

interface FullScreenMessageState {
  refreshing: boolean
}

export interface FullScreenMessageProps
  extends Partial<InjectedTranslateProps & WithThemeAndLocaleProps> {
  message?: string
  icon?: IconProps
  onRefresh?: () => Promise<any>
  backgroundColor?: string
  textColor?: string
}

@withLocaleClass('common')
@withThemeClass()
export class FullScreenMessage extends React.Component<
  FullScreenMessageProps,
  FullScreenMessageState
> {
  constructor(props: FullScreenMessageProps) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  render() {
    const {
      t,
      message,
      onRefresh,
      theme,
      icon,
      backgroundColor,
      textColor
    } = this.props as Required<FullScreenMessageProps>

    return (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          styles.centerize,
          { backgroundColor: backgroundColor || theme.color.white }
        ]}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={async () => {
                this.setState({ refreshing: true })
                await onRefresh()
                this.setState({ refreshing: false })
              }}
            />
          ) : (
            undefined
          )
        }
      >
        <View>
          <Icon
            name="ios-cafe-outline"
            type="ionicon"
            color={textColor || theme.color.whiteReverse}
            size={40}
            {...icon}
          />
          <Text>{message || t('empty')}</Text>
        </View>
      </ScrollView>
    )
  }
}
