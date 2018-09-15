import { withLocaleClass } from '@dokuhero/react-18n-ts-helper'
import { withThemeClass } from '@dokuhero/react-native-theme'
import React from 'react'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Utils, WithThemeAndLocaleProps } from '../utils'
import { Button } from './Button'
import { Text } from './Text'

export interface PopupMessageProps extends Partial<WithThemeAndLocaleProps> {
  title?: string
  message: string
  visible: boolean
  onAccept?: () => void
  onClose?: () => void
}

interface PopupMessageState {
  visible: boolean
}

@withLocaleClass('common')
@withThemeClass()
export class PopupMessage extends React.Component<
  PopupMessageProps,
  PopupMessageState
> {
  static getDerivedStateFromProps(
    props: PopupMessageProps,
    state: PopupMessageState
  ): PopupMessageState | null {
    if (props.visible === state.visible) {
      return null
    }

    return {
      visible: props.visible
    }
  }

  constructor(props: PopupMessageProps) {
    super(props)
    this.state = {
      visible: props.visible
    }
    this.hide = this.hide.bind(this)
  }

  render() {
    const { visible } = this.state
    const { title, message, t, onAccept, onClose, theme } = this
      .props as Required<PopupMessageProps>

    return (
      <Modal transparent visible={visible} onRequestClose={this.hide}>
        <TouchableWithoutFeedback onPress={this.hide}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'center'
            }}
          >
            <Card
              title={Utils.toUpper(title)}
              titleStyle={{ fontFamily: theme.fontName.bold }}
            >
              <View style={styles.textContainer}>
                <Text>{message}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  containerViewStyle={styles.button}
                  buttonStyle={{ backgroundColor: theme.color.primary }}
                  title={t('ok')}
                  onPress={() => {
                    // TODO: add loading animation while accepting
                    if (onAccept) {
                      onAccept()
                    }
                    if (onClose) {
                      onClose()
                    }
                  }}
                />
              </View>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  hide() {
    this.setState({ visible: false })
    const { onClose } = this.props
    if (onClose) {
      onClose()
    }
  }
}

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 0
  },
  button: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    padding: 0
  }
})
