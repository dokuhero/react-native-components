import { withTheme } from '@dokuhero/react-native-theme'
import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Modal } from './Modal'
import { Text } from './Text'

export interface BusyProps {
  visible: boolean
  text?: string
  layout?: 'full' | 'top' | 'bottom'
}

export const Busy = withTheme<BusyProps>(
  ({ visible, theme: { color, space, radius }, text, layout }) => {
    if (!layout || layout === 'full') {
      return (
        <Modal visible={visible}>
          <View>
            <ActivityIndicator size="large" />
            {text && (
              <Text
                style={{ textAlign: 'center', marginTop: 10 }}
                color={color.white}
              >
                {text}
              </Text>
            )}
          </View>
        </Modal>
      )
    }

    if (!visible) {
      return null
    }

    return (
      <View
        style={[
          {
            position: 'absolute',
            left: 15,
            right: 15,
            margin: 10,
            zIndex: 99
          },
          layout === 'top' ? { top: 80 } : { bottom: 20 }
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 40,
            backgroundColor: color.semiTransparent,
            borderRadius: radius.medium,
            paddingLeft: space.small,
            paddingRight: space.small
          }}
        >
          <ActivityIndicator size="small" style={{ marginRight: 10 }} />
          {text ? (
            <Text
              style={{ textAlign: 'center', marginTop: 10 }}
              color={color.white}
            >
              {text}
            </Text>
          ) : null}
        </View>
      </View>
    )
  }
)
