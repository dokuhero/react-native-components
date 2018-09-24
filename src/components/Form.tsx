import React from 'react'
import { ScrollView, StyleProp, ViewStyle } from 'react-native'
import validate from 'validate.js'

export type FormValidationErrors<T> = { [K in keyof T]: string[] }

export interface FormChildrenProps<T> {
  fields: T
  setValue: (key: keyof T, value: any) => void
  submit: () => void
  errors: FormValidationErrors<T>
}

export interface FormProps<T> {
  fields: T
  children: (props: FormChildrenProps<T>) => React.ReactNode
  validator: Partial<Pick<any, keyof T>>
  onSubmit?: (values: T) => void
  onChange?: (values: T) => void
  onError?: (errors: FormValidationErrors<T>) => void
  style?: StyleProp<ViewStyle>
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
    this.setValue = this.setValue.bind(this)
    this.submit = this.submit.bind(this)
    this.validate = this.validate.bind(this)
    this.reset = this.reset.bind(this)
  }

  render() {
    const { children, style } = this.props
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={style}
      >
        {children({
          fields: this.state.fields,
          setValue: this.setValue,
          submit: this.submit,
          errors: this.state.errors
        })}
      </ScrollView>
    )
  }

  reset() {
    this.setState({ fields: this.props.fields })
  }

  setValue(key: keyof T, value: any) {
    const { onChange } = this.props
    const newVal = { [key]: value }
    const fields = { ...(this.state.fields as any), ...newVal }
    this.setState({ fields }, () => {
      if (onChange) {
        onChange(fields)
      }
    })
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
}
