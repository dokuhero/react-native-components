import React from 'react'
import { Image, View, ViewStyle } from 'react-native'

export interface ItemIdentityAvatar {
  isImage: boolean
  colorOrUri: string
}

export interface ItemIdentityProps {
  size?: number
  avatar: ItemIdentityAvatar
  containerStyle?: ViewStyle
}

export class ItemIdentity extends React.Component<ItemIdentityProps> {
  render() {
    const {
      avatar: { isImage, colorOrUri }
    } = this.props

    const size = this.props.size || 40
    const boxStyle = {
      width: size,
      height: size,
      opacity: 1
    }

    return (
      <View style={[boxStyle, this.props.containerStyle]}>
        {isImage ? (
          <Image
            style={boxStyle}
            source={
              typeof colorOrUri === 'string' ? { uri: colorOrUri } : colorOrUri
            }
          />
        ) : (
          <View style={{ ...boxStyle, backgroundColor: colorOrUri }} />
        )}
      </View>
    )
  }
}
