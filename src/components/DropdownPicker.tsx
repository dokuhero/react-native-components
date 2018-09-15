import { withTheme } from '@dokuhero/react-native-theme'
import React from 'react'
import { ViewStyle } from 'react-native'
import { CustomPicker } from 'react-native-custom-picker'
import { Icon, IconObject, ListItem } from 'react-native-elements'
import { Utils } from '../utils'
import { ItemIdentity, ItemIdentityAvatar } from './ItemIdentity'

export interface DropdownPickerProps<T> {
  value?: T
  options: T[]
  title?: string
  allowClear?: boolean
  getOptionAvatar?: (item: T) => ItemIdentityAvatar
  getOptionText: (item: T) => string
  onChange: (item: T) => void
  footerText?: string
  footerIcon?: IconObject
  footerAction?: () => void
  containerStyle?: ViewStyle
  fieldContainerStyle?: ViewStyle
  optionContainerStyle?: ViewStyle
  placeholder?: string
}

export function DropdownPicker<T>(props: DropdownPickerProps<T>) {
  const DropdownPickerComponent = withTheme<DropdownPickerProps<T>>(
    ({
      theme,
      options,
      title,
      getOptionAvatar,
      getOptionText,
      allowClear,
      onChange,
      value,
      footerText,
      footerIcon,
      footerAction,
      containerStyle,
      fieldContainerStyle,
      optionContainerStyle,
      placeholder
    }) => {
      const smMargin = theme.space.small || 10

      const fieldTpl = (
        item: T,
        contrStyle?: ViewStyle,
        clearFn?: () => void,
        margin: number = 0
      ) => (
        <ListItem
          wrapperStyle={[
            {
              marginLeft: margin,
              marginRight: margin || -smMargin
            }
          ]}
          containerStyle={contrStyle}
          hideChevron={!!!clearFn}
          avatar={
            getOptionAvatar ? (
              <ItemIdentity avatar={getOptionAvatar(item)} size={28} />
            ) : (
              undefined
            )
          }
          title={getOptionText(item)}
          rightIcon={
            allowClear ? (
              <Icon
                name="x"
                type="feather"
                size={28}
                containerStyle={{
                  margin: 0,
                  width: 45
                }}
                onPress={allowClear ? clearFn : undefined}
              />
            ) : (
              undefined
            )
          }
        />
      )

      return (
        <CustomPicker
          style={{ marginHorizontal: smMargin * 2, ...containerStyle }}
          value={value}
          maxHeight={400}
          options={options || []}
          onValueChange={onChange}
          placeholder={placeholder || title}
          headerTemplate={
            title
              ? () => <ListItem hideChevron title={Utils.toUpper(title)} />
              : undefined
          }
          optionTemplate={({ item }) =>
            fieldTpl(item, optionContainerStyle, undefined, smMargin)
          }
          fieldTemplate={({ selectedItem, defaultText, clear }) => {
            return selectedItem ? (
              fieldTpl(selectedItem, fieldContainerStyle, clear)
            ) : (
              <ListItem
                title={defaultText}
                titleStyle={{
                  color: theme.color.lighter,
                  marginLeft: 0,
                  marginRight: 0
                }}
                wrapperStyle={{
                  marginLeft: 0,
                  marginRight: -smMargin
                }}
                containerStyle={fieldContainerStyle}
              />
            )
          }}
          footerTemplate={
            footerText
              ? ({ close }) => (
                  <ListItem
                    leftIcon={footerIcon}
                    title={footerText}
                    hideChevron
                    titleStyle={{
                      fontFamily: theme.fontName.semiBold,
                      color: theme.color.darker
                    }}
                    onPress={() => {
                      if (footerAction) {
                        footerAction()
                      }
                      close()
                    }}
                  />
                )
              : undefined
          }
        />
      )
    }
  )

  return <DropdownPickerComponent {...props} />
}
