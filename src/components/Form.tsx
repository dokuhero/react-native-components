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
  onError?: (errors: FormValidationErrors<T>) => void
  style?: StyleProp<ViewStyle>
}

export class Form<T = {}> extends React.Component<FormProps<T>, any> {
  constructor(props: FormProps<T>) {
    super(props)
    this.state = { ...(props.fields as {}), errors: {} }
    this.setValue = this.setValue.bind(this)
    this.submit = this.submit.bind(this)
    this.validate = this.validate.bind(this)
  }

  render() {
    const { children, style } = this.props
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={style}
      >
        {children({
          fields: this.state as T,
          setValue: this.setValue,
          submit: this.submit,
          errors: this.state.errors
        })}
      </ScrollView>
    )
  }

  setValue(key: keyof T, value: any) {
    this.setState({ [key]: value })
  }

  submit() {
    const { onSubmit, onError } = this.props
    this.validate().then(valid => {
      if (valid) {
        const fields = { ...this.state }
        delete fields.errors
        if (onSubmit) {
          onSubmit(fields as T)
        }
      } else if (onError) {
        onError(this.state.errors)
      }
    })
  }

  validate(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const errors = validate.validate(this.state, this.props.validator, {
        fullMessages: false
      })

      this.setState({ errors: errors || {} })
      resolve(!!!errors)
    })
  }
}
