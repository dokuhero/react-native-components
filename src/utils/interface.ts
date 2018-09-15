import { WithLocaleProps } from '@dokuhero/react-18n-ts-helper'
import { WithThemeProps } from '@dokuhero/react-native-theme'
import {
  NavigationContainer,
  NavigationDrawerScreenOptions,
  NavigationScreenConfig,
  NavigationTabScreenOptions
} from 'react-navigation'

export type DrawerNavOptions = NavigationScreenConfig<
  NavigationDrawerScreenOptions
>

export type TabNavOptions = NavigationScreenConfig<NavigationTabScreenOptions>

export interface NavContainer<T> extends NavigationContainer {
  navigationOptions: T
}

export type WithThemeAndLocaleProps = WithThemeProps & WithLocaleProps
