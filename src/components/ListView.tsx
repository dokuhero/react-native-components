import React from 'react'
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ViewStyle
} from 'react-native'
import { List } from 'react-native-elements'

export interface ListViewProps<T> {
  data: T[]
  key?: keyof T
  renderItem: (item: T) => React.ReactElement<any>
  onRefresh?: () => Promise<any>
  containerStyle?: ViewStyle
  title?: string
}

interface ListViewState {
  refreshing: boolean
}

export class ListView<T> extends React.Component<
  ListViewProps<T>,
  ListViewState
> {
  constructor(props: ListViewProps<T>) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  render() {
    const {
      containerStyle,
      key,
      data,
      renderItem,
      onRefresh,
      title
    } = this.props

    return (
      <List containerStyle={[styles.container, containerStyle]}>
        {title && (
          <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 18 }}>
            {title}
          </Text>
        )}
        <FlatList
          data={data}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => {
            return key ? item[key].toString() : index.toString()
          }}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={async () => {
                  this.setState({ refreshing: true })
                  await onRefresh()
                  this.setState({ refreshing: false })
                }}
              />
            ) : (
              undefined
            )
          }
        />
      </List>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 0 }
})
