// Thanks to: https://github.com/Andr3wHur5t/react-native-keyboard-spacer

import React from 'react'
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  ScrollView,
  View
} from 'react-native'

export interface KeyboardSafeViewProps {
  keyboardVerticalOffset?: number
  spacerBackgroundColor?: string
}

interface KeyboardSafeViewState {
  spacerHeight: number
}

const keyboardShowEvt =
  Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow'
const keyboardHideEvt =
  Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide'

export class KeyboardSafeView extends React.Component<
  KeyboardSafeViewProps,
  KeyboardSafeViewState
> {
  showListenerTimout!: any

  constructor(props: KeyboardSafeViewProps) {
    super(props)
    this.state = {
      spacerHeight: 0
      // childHeight: Dimensions.get('window').height
    }

    this.keyboardHideListener = this.keyboardHideListener.bind(this)
    this.keyboardShowListener = this.keyboardShowListener.bind(this)
  }

  keyboardShowListener(e: any) {
    if (!e || !e.endCoordinates) {
      return
    }

    this.showListenerTimout = setTimeout(() => {
      const { keyboardVerticalOffset } = this.props

      const animationConfig = LayoutAnimation.create(
        1000,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
      LayoutAnimation.configureNext(animationConfig)
      this.setState({
        spacerHeight: e.endCoordinates.height + (keyboardVerticalOffset || 0)
      })
    }, 300)
  }

  keyboardHideListener() {
    clearTimeout(this.showListenerTimout)

    const animationConfig = LayoutAnimation.create(
      500,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity
    )
    LayoutAnimation.configureNext(animationConfig)

    this.setState({ spacerHeight: 0 })
  }

  componentDidMount() {
    Keyboard.addListener(keyboardShowEvt, this.keyboardShowListener)
    Keyboard.addListener(keyboardHideEvt, this.keyboardHideListener)
  }

  componentWillUnmount() {
    Keyboard.removeListener(keyboardShowEvt, this.keyboardShowListener)
    Keyboard.removeListener(keyboardHideEvt, this.keyboardHideListener)
  }

  public render() {
    const { spacerBackgroundColor } = this.props
    const { spacerHeight } = this.state

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            // scrollEnabled={height > 0}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={false}
          >
            {this.props.children}
          </ScrollView>
        </View>
        <View
          style={{
            backgroundColor: spacerBackgroundColor,
            left: 0,
            right: 0,
            bottom: 0,
            height: spacerHeight
          }}
        />
      </View>
    )
  }
}
