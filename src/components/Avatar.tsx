import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { Image, ImagePropertiesSourceOptions, View } from 'react-native'

export interface AvatarProps {
  source: ImagePropertiesSourceOptions
  borderWidth?: number
  size?: number
  borderColor?: string
}

export const Avatar = withTheme<AvatarProps>(
  ({ source, borderWidth, size, borderColor, theme }) => {
    borderWidth = borderWidth || 0
    size = size || 140

    return (
      <View
        style={{
          width: size + borderWidth * 2,
          height: size + borderWidth * 2,
          borderRadius: (size + borderWidth * 2) / 2,
          borderWidth: 5,
          borderColor: borderColor || theme.color.white,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Image
          style={{
            borderRadius: size / 2,
            width: size,
            height: size
          }}
          source={source}
          resizeMode="contain"
        />
      </View>
    )
  }
)
