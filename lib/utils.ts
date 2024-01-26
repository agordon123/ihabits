import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import queryString from 'query-string'
import { DateTime } from 'luxon'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const get12HourTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

const getNextHalfHour = () => {
  const date = new Date()
  const currentMinutes = date.getMinutes()
  const minutesToAdd = 30 - (currentMinutes % 30 || 0)

  date.setMinutes(date.getMinutes() + minutesToAdd)
  return date
}

const getOneHourFromPassedTimestamp = (timestamp: DateTime) => {
  const date = new Date(timestamp.toJSDate())
  date.setHours(timestamp.toJSDate().getHours() + 1)

  return date
}

const getUnixTimestamp = (date: DateTime) => {
  return Math.floor(date.toJSDate().getTime() / 1000)
}

export const displayMeetingTime = (timeframe: any) => {
  const [startTime, endTime] = [timeframe.start_time, timeframe.end_time].map(timestamp => {
    return get12HourTime(timestamp).toLowerCase()
  })

  return `${
    startTime.slice(-2) === endTime.slice(-2) ? startTime.slice(0, -3) : startTime
  } - ${endTime}`
}

export const convertUTCDate = (date: Date) => {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)

  const offset = date.getTimezoneOffset() / 60
  const hours = date.getHours()

  utcDate.setHours(hours - offset)

  return utcDate
}

export const applyTimezone = (date: Date) => {
  const localizedDate = DateTime.fromJSDate(date)

  return getUnixTimestamp(localizedDate)
}

export const getTodaysDateTimestamp = () => {
  const date = new Date()
  return applyTimezone(convertUTCDate(date))
}

export const getSevenDaysFromTodayDateTimestamp = () => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return applyTimezone(convertUTCDate(new Date(date)))
}

export const getEventDate = (calendarEvent: any) => {
  return new Date(
    calendarEvent.when.object === 'date'
      ? calendarEvent.when.date
      : calendarEvent.when.start_time * 1000
  )
}

export const getFormattedDate = (event: any) => {
  const date = getEventDate(event)
  const month = date.toLocaleString('en-US', { month: 'long' })
  const day = date.getDate()
  return `${month} ${day}`
}

export const getTimezoneCode = () => {
  return DateTime.local().toFormat('ZZZZ')
}

export const getDefaultEventStartTime = () => {
  const startDate = getNextHalfHour()
  return convertUTCDate(startDate)
}

export const getDefaultEventEndTime = () => {
  const startDate = getNextHalfHour()
  const endDate = getOneHourFromPassedTimestamp(DateTime.fromJSDate(startDate))
  return convertUTCDate(endDate)
}

export const getMinimumEventEndTime = (inputDate: any) => {
  const date = new Date(inputDate)
  date.setMinutes(date.getMinutes() + 1)
  return date
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}
export const getTimestamp = (createdAt: Date): string => {
  const now = new Date()
  const timeDifference = now.getTime() - createdAt.getTime()

  // Define time intervals in milliseconds
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000)
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  } else {
    const years = Math.floor(timeDifference / year)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  }
}

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1)
    return `${formattedNum}M`
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1)
    return `${formattedNum}K`
  } else {
    return num.toString() as string
  }
}
export const getJoinedDate = (date: Date): string => {
  // Extract the month and year from the Date object
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`

  return joinedDate
}
interface URLQueryParams {
  params: string
  key: string
  value: string | null
}
export const formUrlQuery = ({ params, key, value }: URLQueryParams) => {
  const currentURL = queryString.parse(params)
  currentURL[key] = value
  return queryString.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true }
  )
}
interface RemoveURLQueryParams {
  params: string
  keysToRemove: string[]
}
export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveURLQueryParams) => {
  const currentURL = queryString.parse(params)
  keysToRemove.forEach(key => delete currentURL[key])
  return queryString.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true }
  )
}
