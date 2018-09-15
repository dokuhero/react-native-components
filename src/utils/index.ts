import { Permissions, Region } from 'expo'

export {
  DrawerNavOptions,
  TabNavOptions,
  WithThemeAndLocaleProps
} from './interface'

export type LOCATION_NOT_FOUND_REASON =
  | 'SERVICE_IS_OFF'
  | 'NEED_PERMISSION'
  | 'OTHER'

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = 0.01

export class Utils {
  static toUpper(str: string | undefined) {
    return str ? str.toUpperCase() : ''
  }

  static getDatesInMonth(date: Date): number[] {
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate()
    const results = []
    for (let d = 1; d <= lastDate; d++) {
      results.push(d)
    }

    return results
  }

  static firstTimeInMonth(date: Date): Date {
    const d = new Date(date)
    d.setDate(1)
    return this.firstTimeInDate(d)
  }

  static lastTimeInMonth(date: Date): Date {
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return this.lastTimeInDate(d)
  }

  static firstTimeInDate(date: Date): Date {
    const d = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    )
    // d.setHours(0, 0, 0, 0)
    return d
  }

  static lastTimeInDate(date: Date): Date {
    const d = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      59
    )
    // d.setHours(23, 59, 59, 59)
    return d
  }

  static async getCurrentPosition(
    onNotFound?: (reason: LOCATION_NOT_FOUND_REASON) => void,
    onBusy?: () => void
  ): Promise<Region | undefined> {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      if (onNotFound) {
        onNotFound('NEED_PERMISSION')
      }
    }

    let locationFound = false
    const busyTimer = setTimeout(() => {
      if (onBusy) {
        onBusy()
      }
    }, 1200)

    return new Promise<Region | undefined>((resolve, reject) => {
      const timeoutTimer = setTimeout(() => {
        if (!locationFound) {
          if (onNotFound) {
            onNotFound('SERVICE_IS_OFF')
          }
          clearTimeout(busyTimer)
          resolve()
        }
      }, 7000)

      try {
        navigator.geolocation.getCurrentPosition(
          position => {
            locationFound = true
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
            clearTimeout(busyTimer)
            clearTimeout(timeoutTimer)
            resolve(region)
          },
          error => {
            resolve()
            clearTimeout(busyTimer)
            switch (error.code) {
              case 1:
                if (onNotFound) {
                  onNotFound('NEED_PERMISSION')
                }
                break
              default:
                if (onNotFound) {
                  onNotFound('OTHER')
                }
            }
          }
        )
      } catch (e) {
        clearTimeout(busyTimer)
        reject(e)
      }
    })
  }
}
