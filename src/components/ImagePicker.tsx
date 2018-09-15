import { withLocaleClass } from '@dokuhero/react-18n-ts-helper'
import { withThemeClass } from '@dokuhero/react-native-theme'
import { ImagePicker as IP, Permissions } from 'expo'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { WithThemeAndLocaleProps } from '../utils'
import { ButtonGroup } from './ButtonGroup'

export interface ImagePickerProps extends Partial<WithThemeAndLocaleProps> {
  uri: string
  onChange: (uri: string) => void
}

interface ImagePickerState {
  uri: string | null
}

const IMAGE_SIZE = 160

@withLocaleClass('common')
@withThemeClass()
export class ImagePicker extends React.Component<
  ImagePickerProps,
  ImagePickerState
> {
  static getDerivedStateFromProps(
    nextProps: ImagePickerProps,
    prevState: ImagePickerState
  ): ImagePickerState {
    if (nextProps.uri !== prevState.uri) {
      return {
        ...prevState,
        uri: nextProps.uri
      }
    }

    return prevState
  }

  constructor(props: ImagePickerProps) {
    super(props)
    this.selectPicture = this.selectPicture.bind(this)
    this.takePicture = this.takePicture.bind(this)
    this.setValue = this.setValue.bind(this)

    this.state = {
      uri: null
    }
  }

  render() {
    const {
      t,
      theme: { color, space }
    } = this.props as Required<ImagePickerProps>
    const { uri } = this.state

    return (
      <View>
        <View
          style={{
            alignItems: 'center',
            paddingTop: space.small,
            paddingHorizontal: space.small
          }}
        >
          <View
            style={{
              width: '100%',
              height: IMAGE_SIZE + 2,
              borderWidth: 1,
              borderStyle: 'dotted',
              borderColor: color.lighter,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 10
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center'
              }}
            >
              {uri ? (
                <Image
                  source={{ uri }}
                  style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                />
              ) : (
                <Text style={{ color: color.lighter }}>
                  {t('pleaseSelectImage')}
                </Text>
              )}
            </View>
          </View>
        </View>
        <ButtonGroup
          buttons={[
            {
              title: t('takePicture'),
              icon: { name: 'camera', type: 'feather' },
              onPress: this.takePicture
            },
            {
              title: t('selectPicture'),
              icon: { name: 'file', type: 'feather' },
              onPress: this.selectPicture
            }
          ]}
        />
      </View>
    )
  }

  /**
   * Select picture from image library
   */
  async selectPicture() {
    const result = await IP.launchImageLibraryAsync({
      aspect: [IMAGE_SIZE, IMAGE_SIZE],
      allowsEditing: true,
      mediaTypes: 'Images'
    })
    if (!result.cancelled) {
      await this.setValue(result.uri)
    }
  }

  /**
   * Get picture from camera
   */
  async takePicture() {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    )
    if (
      cameraRollPermission.status === 'granted' &&
      cameraPermission.status === 'granted'
    ) {
      const result = await IP.launchCameraAsync({
        aspect: [IMAGE_SIZE, IMAGE_SIZE],
        allowsEditing: true
      })
      if (!result.cancelled) {
        await this.setValue(result.uri)
      }
    }
  }

  /**
   * Dispay picture
   * @param {string} uri
   */
  setValue(uri: string) {
    const { onChange } = this.props
    this.setState({ uri }, () => {
      if (onChange) {
        onChange(uri)
      }
    })
  }
}
