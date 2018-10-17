import {
  ColorKeys,
  createStyleSheet,
  FontNameKeys,
  FontSizesKeys,
  SpaceKeys
} from '@dokuhero/react-native-theme'
import * as React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { FormField } from './FormField'
import { Text } from './Text'

export interface StaticFieldProps {
  label?: string
  value: string
  containerStyle?: StyleProp<ViewStyle>
  valueStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

export const StaticField: React.SFC<StaticFieldProps> = ({
  label,
  value,
  containerStyle,
  valueStyle,
  labelStyle,
  onPress,
  children
}) => {
  return (
    <FormField
      label={label}
      containerStyle={containerStyle}
      labelStyle={labelStyle}
    >
      <Text style={[styles.text, valueStyle]} onPress={onPress}>
        {value}
      </Text>
      {children}
    </FormField>
  )
}

const styles = createStyleSheet({
  text: {
    marginTop: SpaceKeys.small,
    marginLeft: SpaceKeys.medium,
    fontFamily: FontNameKeys.semiBold,
    fontSize: FontSizesKeys.medium,
    color: ColorKeys.grey,
    marginBottom: 12
  }
})
