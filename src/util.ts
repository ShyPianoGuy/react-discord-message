import { Children, ReactElement, ReactNode } from 'react'

export const elementsWithoutSlot = (elements: ReactElement | ReactElement[], name: string) => {
	return Children.map(elements, element => {
		if (element?.props?.slot === name) return
		return element
	})
}

export const findSlot = (elements: ReactNode | ReactNode[], name: string) => {
	return Children.toArray(elements).find((props) => (props as ReactElement['props']).slot === name)
}

export const parseTimestamp = (timestamp = new Date()) => {
	if (!(timestamp instanceof Date)) timestamp = new Date(timestamp)
	const [month, day, year] = [timestamp.getMonth() + 1, timestamp.getDate(), timestamp.getFullYear()]
	return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`
}
