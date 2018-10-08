import { withLocaleClass } from '@dokuhero/react-18n-ts-helper'
import {
  ColorKeys,
  createStyleSheet,
  FontNameKeys,
  FontSizesKeys,
  SpaceKeys,
  withThemeClass
} from '@dokuhero/react-native-theme'
import React from 'react'
import {
  FlatList,
  RefreshControl,
  StyleProp,
  Text,
  View,
  ViewStyle
} from 'react-native'
import { Icon, IconObject, List } from 'react-native-elements'
import { globalStyles } from '../styles'
import { WithThemeAndLocaleProps } from '../utils'

export interface ListViewProps<T> {
  data: T[]
  key?: keyof T
  renderItem: (item: T) => React.ReactElement<any>
  onRefresh?: () => Promise<any>
  containerStyle?: StyleProp<ViewStyle>
  title?: string
  noTopBorder?: boolean
  emptyComponent?: string | React.ReactNode
  emptyIcon?: IconObject
  loadingComponent?: string | React.ReactNode
  loadingIcon?: IconObject
  isLoading?: boolean
}

interface ListViewState {
  refreshing: boolean
}

@withThemeClass()
@withLocaleClass('common')
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
      title,
      noTopBorder,
      isLoading
    } = this.props

    return (
      <List
        containerStyle={[
          styles.container,
          noTopBorder ? { borderTopWidth: 0 } : {},
          containerStyle
        ]}
      >
        {title && <Text style={styles.title}>{title}</Text>}

        {!isLoading && data && data.length ? (
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
        ) : isLoading ? (
          this.renderLoadingData()
        ) : (
          this.renderEmptyData()
        )}
      </List>
    )
  }

  renderLoadingData() {
    const {
      t,
      theme: { color }
    } = this.props as ListViewProps<T> & WithThemeAndLocaleProps

    let { loadingComponent } = this.props
    if (!loadingComponent) {
      loadingComponent = t('Loading data...')
    }

    return (
      <View style={[globalStyles.container, globalStyles.centerize]}>
        {typeof loadingComponent === 'string' ? (
          <View>
            <Icon name="md-time" type="ionicon" size={65} color={color.grey} />
            {loadingComponent && (
              <Text style={styles.emptyDataText}>{t(loadingComponent)}</Text>
            )}
          </View>
        ) : (
          loadingComponent
        )}
      </View>
    )
  }

  renderEmptyData() {
    const {
      t,
      theme: { color },
      onRefresh
    } = this.props as ListViewProps<T> & WithThemeAndLocaleProps

    let { emptyComponent } = this.props
    if (!emptyComponent) {
      emptyComponent = 'Data is empty'
    }

    return (
      <View style={[globalStyles.container, globalStyles.centerize]}>
        <View>
          {typeof emptyComponent === 'string' ? (
            <View>
              <Icon
                name="ios-refresh"
                type="ionicon"
                size={65}
                color={color.grey}
                onPress={onRefresh}
              />
              {emptyComponent && (
                <Text style={styles.emptyDataText}>{t(emptyComponent)}</Text>
              )}
            </View>
          ) : (
            emptyComponent
          )}
          {/* {onRefresh && (
            <Button
              kind="primary"
              containerViewStyle={styles.refreshButtonContainer}
              title={t('Refresh')}
              onPress={onRefresh}
            />
          )} */}
        </View>
      </View>
    )
  }
}

const styles = createStyleSheet({
  container: { flex: 1, marginTop: 0, backgroundColor: 'transparent' },
  emptyDataContainer: {},
  emptyDataText: {
    textAlign: 'center',
    fontFamily: FontNameKeys.semiBold,
    color: ColorKeys.grey
  },
  title: {
    marginHorizontal: SpaceKeys.medium,
    marginTop: SpaceKeys.small,
    fontSize: FontSizesKeys.medium,
    fontFamily: FontNameKeys.semiBold
  },
  refreshButtonContainer: {
    marginTop: SpaceKeys.small
  }
})
