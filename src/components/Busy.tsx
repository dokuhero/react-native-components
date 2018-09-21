import {
  ColorKeys,
  createStyleSheet,
  FontNameKeys,
  FontSizesKeys,
  RadiusKeys,
  SpaceKeys
} from '@dokuhero/react-native-theme'
import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Modal } from './Modal'
import { Text } from './Text'

export interface BusyProps {
  visible: boolean
  text?: string
  layout?: 'full' | 'top' | 'bottom'
}

export const Busy: React.SFC<BusyProps> = ({ visible, text, layout }) => {
  if (!layout || layout === 'full') {
    return (
      <Modal visible={visible}>
        <View>
          <ActivityIndicator size="large" />
          {text && <Text style={styles.text}>{text}</Text>}
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
        styles.container,
        layout === 'top' ? { top: 80 } : { bottom: 20 }
      ]}
    >
      <View style={styles.innerContainer}>
        <ActivityIndicator size="small" style={{ marginRight: 10 }} />
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View>
    </View>
  )
}

const styles = createStyleSheet({
  container: {
    position: 'absolute',
    left: 15,
    right: 15,
    margin: 10,
    zIndex: 99
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    backgroundColor: ColorKeys.semiTransparent,
    borderRadius: RadiusKeys.medium,
    paddingLeft: SpaceKeys.small,
    paddingRight: SpaceKeys.small
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    color: ColorKeys.white,
    fontStyle: FontSizesKeys.medium,
    fontFamily: FontNameKeys.regular
  }
})
