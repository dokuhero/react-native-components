import {
  createStyleSheet,
  FontNameKeys,
  FontSizesKeys
} from '@dokuhero/react-native-theme'

export const globalStyles = createStyleSheet({
  container: {
    flex: 1
  },
  centerize: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  inputText: {
    fontFamily: FontNameKeys.regular,
    fontSize: FontSizesKeys.medium,
    fontWeight: 'normal'
  }
})
