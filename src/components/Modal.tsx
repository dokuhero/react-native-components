import { withThemeClass, WithThemeProps } from '@dokuhero/react-native-theme'
import React from 'react'
import { Modal as Mdl, View } from 'react-native'

export interface ModalProps extends Partial<WithThemeProps> {
  visible: boolean
  onAccept?: () => void
  children: React.ReactNode[] | React.ReactNode
  hideOnBackgroundPress?: boolean
}

interface ModalState {
  visible: boolean
}

@withThemeClass()
export class Modal extends React.Component<ModalProps, ModalState> {
  static defaultProps: Partial<ModalProps> = {
    hideOnBackgroundPress: true,
    visible: false
  }

  static getDerivedStateFromProps(
    props: ModalProps,
    state: ModalState
  ): ModalState | null {
    if (props.visible === state.visible) {
      return null
    }

    return {
      visible: props.visible
    }
  }

  constructor(props: ModalProps) {
    super(props)
    this.state = {
      visible: props.visible
    }
    this.hide = this.hide.bind(this)
  }

  render() {
    const { visible } = this.state
    const { theme, children, hideOnBackgroundPress } = this.props as Required<
      ModalProps
    >

    return (
      <Mdl
        transparent
        visible={visible}
        onRequestClose={hideOnBackgroundPress ? this.hide : () => false}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.color.semiTransparent,
            justifyContent: 'center'
          }}
        >
          {children}
        </View>
      </Mdl>
    )
  }

  hide() {
    this.setState({ visible: false })
  }
}
