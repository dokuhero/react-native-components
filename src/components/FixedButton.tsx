import { createStyleSheet, SpaceKeys } from '@dokuhero/react-native-theme'
import React from 'react'
import { Icon } from 'react-native-elements'

export interface FixedButtonProps {
  name: string
  color?: string
  onPress(): void
}

export const FixedButton: React.SFC<FixedButtonProps> = ({
  color,
  name,
  onPress
}) => {
  return (
    <Icon
      reverse
      color={color}
      name={name}
      raised
      onPress={onPress}
      containerStyle={styles.container}
    />
  )
}

const styles = createStyleSheet({
  container: {
    position: 'absolute',
    right: SpaceKeys.small,
    bottom: SpaceKeys.small
  }
})
