import {
  createStyleSheet,
  RadiusKeys,
  SpaceKeys
} from '@dokuhero/react-native-theme'
import React from 'react'
import { Keyboard, TouchableOpacity, ViewStyle } from 'react-native'
import { Icon } from 'react-native-elements'
import GridView, { SuperGridProps } from 'react-native-super-grid'

export interface ColorPickerProps {
  dimension?: number
  selectedColor?: string
  onChange: (color: string) => void
  superGridProps?: Partial<SuperGridProps<string>>
  containerStyle?: ViewStyle
}

interface ColorPickerState {
  selectedColor: string
}

export class ColorPicker extends React.Component<
  ColorPickerProps,
  ColorPickerState
> {
  constructor(props: ColorPickerProps) {
    super(props)
    this.state = {
      selectedColor: props.selectedColor || '#1abc9c'
    }
  }

  render() {
    const dimension = this.props.dimension || 40

    // Taken from https://flatuicolors.com/
    const items = [
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#34495e',
      '#16a085',
      '#27ae60',
      '#2980b9',
      '#2c3e50',
      '#f1c40f',
      '#e67e22',
      '#e74c3c',
      '#ecf0f1',
      '#95a5a6',
      '#f39c12',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d'
    ]

    return (
      <GridView
        itemDimension={dimension}
        items={items}
        style={[styles.container, this.props.containerStyle]}
        renderItem={(item: string) => (
          <TouchableOpacity
            style={[
              styles.itemContainer,
              { height: dimension, backgroundColor: item }
            ]}
            onPress={() => {
              Keyboard.dismiss()
              this.setState({ selectedColor: item })
              this.props.onChange(item)
            }}
          >
            {this.state.selectedColor === item ? (
              <Icon name="check" type="font-awesome" color="#fff" />
            ) : null}
          </TouchableOpacity>
        )}
      />
    )
  }
}

const styles = createStyleSheet({
  container: {
    marginLeft: SpaceKeys.small,
    marginRight: SpaceKeys.small
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: RadiusKeys.small,
    padding: SpaceKeys.small
  }
})
