import { withLocaleClass } from '@dokuhero/react-18n-ts-helper'
import {
  createStyleSheet,
  SpaceKeys,
  withThemeClass
} from '@dokuhero/react-native-theme'
import React from 'react'
import { Modal, TouchableWithoutFeedback, View } from 'react-native'
import { ButtonGroup, Card } from 'react-native-elements'
import { Utils, WithThemeAndLocaleProps } from '../utils'
import { Button } from './Button'
import { DropdownPicker } from './DropdownPicker'
import { FormField } from './FormField'

export interface DateFilterProps extends Partial<WithThemeAndLocaleProps> {
  start: Date
  end: Date
  onAccept?: (result: DateFilterResult) => void
  onLoad?: (result: DateFilterResult) => void
}

export interface DateFilterResult {
  start: Date
  end: Date
}

interface DateFilterState {
  showModal: boolean
  year: number
  years: number[]
  month: number
  dates: number[]
  date?: number
  selectedMode: number
}

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

@withLocaleClass('common')
@withThemeClass()
export class DateFilter extends React.Component<
  DateFilterProps,
  DateFilterState
> {
  constructor(props: DateFilterProps) {
    super(props)
    this.hide = this.hide.bind(this)
    this.accept = this.accept.bind(this)

    const { start, end } = props
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()
    const years: number[] = []

    for (let index = startYear; index <= endYear; index++) {
      years.push(index)
    }

    this.state = {
      showModal: false,
      years,
      year: years[years.length - 1],
      month: end.getMonth() + 1,
      dates: Utils.getDatesInMonth(end),
      date: end.getDate(),
      selectedMode: 0
    }
  }

  componentDidMount() {
    const { onLoad } = this.props
    if (onLoad) {
      onLoad(this.getResult())
    }
  }

  render() {
    const { t, i18n, theme } = this.props as Required<DateFilterProps>
    const { year, month, date, selectedMode } = this.state

    let title = ''
    if (!date) {
      title = `${t('months:' + month)} ${year}`
    } else {
      title =
        i18n.language === 'en'
          ? `${t('months:' + month)} ${date}, ${year}`
          : `${date} ${t('months:' + month)} ${year}`
    }

    return (
      <View>
        <ButtonGroup
          containerStyle={{
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            borderWidth: 0
          }}
          // @ts-ignore
          selectedButtonStyle={{ backgroundColor: theme.primary }}
          selectedTextStyle={{ color: theme.color.white }}
          selectedIndex={selectedMode}
          buttons={[t('today'), t('thisMonth'), title]}
          onPress={mode => {
            const now = new Date()
            switch (mode) {
              case 0:
                // today
                this.setState(
                  {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                    date: now.getDate(),
                    selectedMode: mode
                  },
                  this.accept
                )
                break

              case 1:
                // this month
                this.setState(
                  {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                    date: undefined,
                    selectedMode: mode
                  },
                  this.accept
                )
                break

              default:
                // custom
                this.setState({ showModal: true, selectedMode: mode })
            }
          }}
        />
        {this.renderModal()}
      </View>
    )
  }

  renderModal() {
    const { showModal, years, year, month, dates, date } = this.state
    const { t } = this.props as Required<DateFilterProps>

    return (
      <Modal transparent visible={showModal} onRequestClose={this.hide}>
        <TouchableWithoutFeedback onPress={this.hide}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'center'
            }}
          >
            <Card title={Utils.toUpper(t('selectDate'))}>
              <View style={styles.textContainer}>
                <FormField label={t('year')}>
                  <DropdownPicker
                    fieldContainerStyle={styles.dropdownField}
                    allowClear={false}
                    value={year}
                    options={years}
                    getOptionText={y => y.toString()}
                    onChange={v => {
                      this.setState({ year: v })
                    }}
                  />
                </FormField>
                <FormField label={t('month')}>
                  <DropdownPicker
                    fieldContainerStyle={styles.dropdownField}
                    allowClear={false}
                    value={month}
                    options={months}
                    getOptionText={m => t(`months:${m}`)}
                    onChange={v => {
                      this.setState({
                        month: v,
                        dates: Utils.getDatesInMonth(new Date(year, v - 1)),
                        date: undefined
                      })
                    }}
                  />
                </FormField>
                <FormField label={t('date')}>
                  <DropdownPicker
                    fieldContainerStyle={styles.dropdownField}
                    value={date}
                    options={dates}
                    getOptionText={m => m.toString()}
                    onChange={v => {
                      this.setState({
                        date: v
                      })
                    }}
                    placeholder={t('allDates')}
                  />
                </FormField>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  containerViewStyle={styles.button}
                  kind="primary"
                  title={t('ok')}
                  onPress={() => {
                    this.hide()
                    this.accept()
                  }}
                />
                <Button
                  containerViewStyle={styles.button}
                  title={t('cancel')}
                  onPress={this.hide}
                />
              </View>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  accept() {
    const { onAccept } = this.props
    if (onAccept) {
      onAccept(this.getResult())
    }
  }

  getResult(): DateFilterResult {
    const { year, month, date } = this.state
    const d = new Date(year, month - 1, date || 1)

    return {
      start: date ? Utils.firstTimeInDate(d) : Utils.firstTimeInMonth(d),
      end: date ? Utils.lastTimeInDate(d) : Utils.lastTimeInMonth(d)
    }
  }

  hide() {
    this.setState({ showModal: false })
  }
}

const styles = createStyleSheet({
  textContainer: {
    marginBottom: SpaceKeys.small
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 0
  },
  button: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    padding: 0
  },
  dropdownField: {
    marginLeft: -SpaceKeys.small,
    marginRight: -SpaceKeys.small
  }
})
