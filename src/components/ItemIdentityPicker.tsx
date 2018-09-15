import { withLocaleClass } from '@dokuhero/react-18n-ts-helper'
import {
  createStyleSheet,
  SpaceKeys,
  withThemeClass
} from '@dokuhero/react-native-theme'
import React from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { WithThemeAndLocaleProps } from '../utils'
import { ColorPicker } from './ColorPicker'
import { ImagePicker } from './ImagePicker'
import { ItemIdentityAvatar } from './ItemIdentity'

export interface ItemIdentityPickerProps
  extends Partial<WithThemeAndLocaleProps> {
  value: ItemIdentityAvatar
  onChange: (item: ItemIdentityAvatar) => void
}

const DEFAULT_COLOR = '#1abc9c'

interface ItemIdentityPickerState {
  selectedTab: 'color' | 'image'
  color: string
  image: string | null
}

@withLocaleClass('common')
@withThemeClass()
export class ItemIdentityPicker extends React.Component<
  ItemIdentityPickerProps,
  ItemIdentityPickerState
> {
  static getDerivedStateFromProps(
    nextProps: ItemIdentityPickerProps
  ): ItemIdentityPickerState {
    const { colorOrUri, isImage } = nextProps.value

    return {
      selectedTab: isImage ? 'image' : 'color',
      color: isImage ? DEFAULT_COLOR : colorOrUri,
      image: isImage ? colorOrUri : null
    }
  }

  constructor(props: ItemIdentityPickerProps) {
    super(props)
    this.state = {
      selectedTab: 'color',
      color: DEFAULT_COLOR,
      image: null
    }
  }

  render() {
    const { selectedTab } = this.state
    const { t, theme } = this.props as Required<ItemIdentityPickerProps>

    return (
      <View style={styles.container}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            containerStyle={[
              styles.checkBox,
              { borderColor: theme.color.lighter }
            ]}
            center
            title={t('color')}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={selectedTab === 'color'}
            onPress={() => {
              this.setState({ selectedTab: 'color' })
            }}
            textStyle={{ fontFamily: theme.fontName.semiBold }}
          />
          <CheckBox
            containerStyle={[
              styles.checkBox,
              { borderColor: theme.color.lighter }
            ]}
            center
            title={t('image')}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={selectedTab === 'image'}
            onPress={() => {
              this.setState({ selectedTab: 'image' })
            }}
            textStyle={{ fontFamily: theme.fontName.semiBold }}
          />
        </View>
        {selectedTab === 'color' && this.renderColorPicker()}
        {selectedTab === 'image' && this.renderImagePicker()}
      </View>
    )
  }

  renderColorPicker() {
    return (
      <View>
        <ColorPicker
          containerStyle={{ marginLeft: 0, marginRight: 0 }}
          selectedColor={this.state.color}
          onChange={color => {
            this.setState({ color }, () => {
              this.props.onChange({
                colorOrUri: color,
                isImage: false
              })
            })
          }}
        />
      </View>
    )
  }

  renderImagePicker() {
    return (
      <View>
        <ImagePicker
          uri={this.state.image as string}
          onChange={uri => {
            this.setState({ image: uri }, () => {
              this.props.onChange({
                colorOrUri: uri,
                isImage: true
              })
            })
          }}
        />
      </View>
    )
  }
}

const styles = createStyleSheet({
  container: {
    marginHorizontal: SpaceKeys.small
  },
  checkBoxContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  checkBox: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dotted'
  }
})
