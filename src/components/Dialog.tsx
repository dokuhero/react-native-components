import { withLocaleClass } from '@dokuhero/react-18n-ts-helper'
import { withThemeClass, WithThemeProps } from '@dokuhero/react-native-theme'
import React, { ReactNode } from 'react'
import { InjectedTranslateProps } from 'react-i18next'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Utils } from '../utils'
import { ButtonProps } from './Button'
import { ButtonGroup } from './ButtonGroup'
import { Text } from './Text'

export interface DialogProps
  extends Partial<InjectedTranslateProps & WithThemeProps> {
  children?: ReactNode
  title?: string
  visible: boolean
  kind:
    | 'OK'
    | 'OKCancel'
    | 'YesNo'
    | 'YesNoCancel'
    | 'SaveCancel'
    | 'SaveDeleteCancel'
    | 'Custom'
  buttons?: ButtonProps[]
  onPress: (index: number) => void
  onShow?: () => void
  onDismiss?: () => void
}

interface DialogState {
  visible: boolean
}

@withLocaleClass('common')
@withThemeClass()
export class Dialog extends React.Component<DialogProps, DialogState> {
  static getDerivedStateFromProps(
    props: DialogProps,
    state: DialogState
  ): DialogState | null {
    if (props.visible === state.visible) {
      return null
    }

    return {
      visible: props.visible
    }
  }

  constructor(props: DialogProps) {
    super(props)
    this.state = {
      visible: props.visible
    }
    this.hide = this.hide.bind(this)
  }

  render() {
    const { visible } = this.state
    const { title, children, theme, onShow, onDismiss } = this
      .props as Required<DialogProps>

    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={this.hide}
        onShow={onShow}
        onDismiss={onDismiss}
      >
        <TouchableWithoutFeedback onPress={this.hide}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.color.semiTransparent,
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: theme.color.dark,
                borderRadius: 10,
                borderWidth: 0,
                marginHorizontal: 15,
                paddingVertical: 15
              }}
            >
              {title && (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: 30
                  }}
                >
                  <Text
                    style={{ textAlign: 'center', color: theme.color.white }}
                  >
                    {Utils.toUpper(title)}
                  </Text>
                </View>
              )}
              {children}
              <View style={styles.buttonContainer}>{this.renderButtons()}</View>
            </View>
            {/* </Card> */}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  renderButtons() {
    const { kind, onPress, t } = this.props as Required<DialogProps>
    let { buttons } = this.props

    switch (kind) {
      case 'OK':
        buttons = [
          {
            onPress: () => onPress(0),
            title: t('ok'),
            icon: {
              name: 'check',
              type: 'feather'
            }
          }
        ]
        break
      case 'OKCancel':
        buttons = [
          {
            onPress: () => onPress(0),
            title: t('ok'),
            icon: {
              name: 'check',
              type: 'feather'
            }
          },
          {
            onPress: () => onPress(1),
            title: t('cancel'),
            icon: {
              name: 'x',
              type: 'feather'
            }
          }
        ]
        break
      case 'YesNo':
        buttons = [
          {
            onPress: () => onPress(0),
            title: t('ok'),
            icon: {
              name: 'check',
              type: 'feather'
            }
          },
          {
            onPress: () => onPress(1),
            title: t('no'),
            icon: {
              name: 'slash',
              type: 'feather'
            }
          }
        ]
        break
      case 'YesNoCancel':
        buttons = [
          {
            onPress: () => onPress(0),
            title: t('ok'),
            icon: {
              name: 'check',
              type: 'feather'
            }
          },
          {
            onPress: () => onPress(1),
            title: t('no'),
            icon: {
              name: 'slash',
              type: 'feather'
            }
          },
          {
            onPress: () => onPress(2),
            title: t('cancel'),
            icon: {
              name: 'x',
              type: 'feather'
            }
          }
        ]
        break
      case 'SaveCancel':
        buttons = [
          {
            onPress: () => onPress(0),
            title: t('save'),
            icon: {
              name: 'check',
              type: 'feather'
            }
          },
          {
            onPress: () => onPress(1),
            title: t('cancel'),
            icon: {
              name: 'x',
              type: 'feather'
            }
          }
        ]
        break

      case 'SaveDeleteCancel':
        buttons = [
          {
            onPress: () => onPress(0),
            title: t('save'),
            icon: {
              name: 'check',
              type: 'feather'
            }
          },
          {
            onPress: () => onPress(1),
            title: t('delete'),
            icon: {
              name: 'trash',
              type: 'feather'
            }
          },
          {
            onPress: () => onPress(2),
            title: t('cancel'),
            icon: {
              name: 'x',
              type: 'feather'
            }
          }
        ]
        break
    }

    if (!buttons) {
      throw new Error('Custom dialog must have buttons properties!')
    }

    return <ButtonGroup buttons={buttons} />
  }

  hide() {
    this.setState({ visible: false })
  }
}

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5
  },
  button: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    padding: 0
  }
})
