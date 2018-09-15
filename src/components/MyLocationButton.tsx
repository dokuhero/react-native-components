import { withTheme } from '@dokuhero/react-native-theme'
import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { styles } from '../styles'

export interface MyLocationButtonProps {
  onPress: () => void
}

export const MyLocationButton = withTheme<MyLocationButtonProps>(
  ({ theme, onPress }) => {
    return (
      <TouchableOpacity
        style={[
          {
            position: 'absolute',
            width: 40,
            height: 40,
            bottom: 20,
            right: 20,
            zIndex: 10,
            backgroundColor: theme.color.semiTransparent,
            borderRadius: 10
          },
          styles.centerize
        ]}
        onPress={onPress}
      >
        <Icon
          color={theme.color.white}
          name="my-location"
          type="material-icons"
        />
      </TouchableOpacity>
    )
  }
)
