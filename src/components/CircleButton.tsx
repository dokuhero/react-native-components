import React from 'react'
import { Icon, IconProps } from 'react-native-elements'

export interface CircleButtonProps extends IconProps {}

export const CircleButton: React.SFC<CircleButtonProps> = props => {
  return (
    <Icon
      name="menu"
      reverse
      size={16}
      containerStyle={{
        top: 5
      }}
      iconStyle={{
        fontSize: 24
      }}
      {...props}
    />
  )
}
