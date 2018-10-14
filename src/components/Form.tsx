import React from 'react'
import { ScrollView, StyleProp, ViewStyle } from 'react-native'
import validate from 'validate.js'

export type FormValidationErrors<T> = { [K in keyof T]: string[] }

export interface FormChildrenProps<T> {
  fields: T
  errors: FormValidationErrors<T>
  setValue(key: keyof T, value?: any): void
  setValue(state: Partial<T>): void
  submit(): void
  clearError(key: keyof T): void
  validate(): void
}

export interface FormProps<T> {
  fields: T
  children: (props: FormChildrenProps<T>) => React.ReactNode
  validator: Partial<Pick<any, keyof T>>
  onSubmit?: (values: T) => void
  onChange?: (
    values: T,
    validate: () => void,
    clearError: (key: keyof T) => void
  ) => void
  onError?: (errors: FormValidationErrors<T>) => void
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  resetOnInitialValueChanged?: boolean
}

interface State<T> {
  fields: T
  errors: FormValidationErrors<T> | any
}

export class Form<T = {}> extends React.Component<FormProps<T>, State<T>> {
  static getDerivedStateFromProps(
    props: FormProps<{}>
  ): Partial<State<{}>> | null {
    if (props.resetOnInitialValueChanged) {
      return {
        fields: props.fields
      }
    }
    return null
  }

  constructor(props: FormProps<T>) {
    super(props)
    this.state = {
      fields: props.fields,
      errors: {}
    }
    this.clearError = this.clearError.bind(this)
    this.getValue = this.getValue.bind(this)
    this.setValue = this.setValue.bind(this)
    this.submit = this.submit.bind(this)
    this.validate = this.validate.bind(this)
    this.reset = this.reset.bind(this)
  }

  render() {
    const { children, style, containerStyle } = this.props
    return (
      <ScrollView
        style={containerStyle}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={style}
      >
        {children({
          fields: this.state.fields,
          setValue: this.setValue,
          submit: this.submit,
          errors: this.state.errors,
          clearError: this.clearError,
          validate: this.validate
        })}
      </ScrollView>
    )
  }

  reset() {
    this.setState({ fields: this.props.fields })
  }

  setValue(state: {}, val?: any): void
  setValue(key: keyof T, value: any): void {
    const { onChange } = this.props
    const newVal = typeof key === 'string' ? { [key]: value } : (key as any)
    const fields = { ...(this.state.fields as any), ...newVal }
    this.setState({ fields }, () => {
      if (onChange) {
        onChange(fields, this.validate, this.clearError)
      }
    })
  }

  getValue(key: keyof T): any {
    return this.state.fields[key]
  }

  submit() {
    const { onSubmit, onError } = this.props
    this.validate().then(valid => {
      if (valid) {
        if (onSubmit) {
          onSubmit(this.state.fields)
        }
      } else if (onError) {
        onError(this.state.errors)
      }
    })
  }

  validate(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const errors = validate.validate(
        this.state.fields,
        this.props.validator,
        {
          fullMessages: false
        }
      )

      this.setState({ errors: errors || {} })
      resolve(!!!errors)
    })
  }

  clearError(key: keyof T) {
    const toClear = { [key]: undefined }
    this.setState({ errors: { ...this.state.errors, ...toClear } })
  }
}
