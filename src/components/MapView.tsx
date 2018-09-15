import { ThemeConsumer } from '@dokuhero/react-native-theme'
import {
  MapView as MV,
  MapViewProps as MVProps,
  Permissions,
  Region
} from 'expo'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { LOCATION_NOT_FOUND_REASON, Utils } from '../utils'
import { Busy } from './Busy'
import { MyLocationButton } from './MyLocationButton'

export interface MapViewProps extends MVProps {
  containerStyle?: StyleProp<ViewStyle>
  goToMyLocationOnReady?: boolean
  onCurrentLocationNotFound?: (reason: LOCATION_NOT_FOUND_REASON) => void
}

interface State {
  ready: boolean
  busy: boolean
}

export class MapView extends React.Component<MapViewProps, State> {
  map!: MV | null

  constructor(props: MapViewProps) {
    super(props)
    this.state = {
      ready: false,
      busy: false
    }
    this.goToMyLocation = this.goToMyLocation.bind(this)
  }

  render() {
    const {
      containerStyle,
      goToMyLocationOnReady,
      onMapReady,
      onCurrentLocationNotFound
    } = this.props as Required<MapViewProps>

    const props = { ...this.props }

    delete props.onMapReady
    delete props.containerStyle
    delete props.goToMyLocationOnReady

    return (
      <ThemeConsumer>
        {({ mapStyle }) => (
          <View style={[{ flex: 1 }, containerStyle]}>
            <MV
              ref={e => (this.map = e as MV)}
              style={StyleSheet.absoluteFillObject}
              customMapStyle={mapStyle}
              onMapReady={async () => {
                const { status } = await Permissions.askAsync(
                  Permissions.LOCATION
                )
                if (status !== 'granted') {
                  if (onCurrentLocationNotFound) {
                    onCurrentLocationNotFound('NEED_PERMISSION')
                  }
                }

                this.setState({ ready: true }, async () => {
                  if (goToMyLocationOnReady) {
                    await this.goToMyLocation()
                  }
                  if (onMapReady) {
                    onMapReady()
                  }
                })
              }}
              showsMyLocationButton={false}
              showsUserLocation
              {...props}
            />
            <MyLocationButton onPress={this.goToMyLocation} />
            <Busy
              visible={this.state.busy}
              text="Mencari lokasi saat ini..."
              layout="bottom"
            />
          </View>
        )}
      </ThemeConsumer>
    )
  }

  async goToMyLocation() {
    if (!this.state.ready || !this.map) {
      return
    }

    const region = await Utils.getCurrentPosition(
      this.props.onCurrentLocationNotFound,
      () => {
        this.setState({ busy: true })
      }
    )
    this.setState({ busy: false })
    if (region) {
      this.map.animateToRegion(region)
    }
  }

  animateToRegion(region: Region, duration?: number) {
    if (!this.map) {
      return
    }

    this.map.animateToRegion(region, duration)
  }
}
