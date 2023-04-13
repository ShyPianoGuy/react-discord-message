import React, { Children, ReactElement, ReactNode, cloneElement, useContext } from 'react'
import DiscordDefaultOptions from '../context/discordDefaultOptions.js'
import DiscordOptionsContext from '../context/discordOptionsContext.js'
import '../css/discordMessages.css'

type DiscordMessagesFunction = {
	children: ReactElement,
	compactMode?: boolean,
	lightTheme?: boolean,
}

function DiscordMessages({ children, compactMode, lightTheme }: DiscordMessagesFunction) {
	const options = useContext(DiscordOptionsContext) || DiscordDefaultOptions

	lightTheme = lightTheme === true || (options.defaultTheme === 'light' && lightTheme !== false)
	compactMode = compactMode === true || (options.defaultMode === 'compact' && compactMode !== false)

	let classes = 'discord-messages'
	if (lightTheme) classes += ' discord-light-theme'
	if (compactMode) classes += ' discord-compact-mode'

	const messages = Children.map(children, (element: ReactElement, index) => {
		return cloneElement(element, { compactMode, key: index })
	})

	return (
		<div className={classes}>
			{messages}
		</div>
	)
}

export default DiscordMessages
