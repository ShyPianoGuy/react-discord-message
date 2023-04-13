import React, { Fragment, ReactElement, ReactNode, isValidElement, useContext } from 'react'
import AuthorInfo from './authorInfo'
import DiscordDefaultOptions from '../context/discordDefaultOptions'
import DiscordOptionsContext from '../context/discordOptionsContext'
import { elementsWithoutSlot, findSlot, parseTimestamp } from '../util'
import './discordMessage.css'

const now = new Date()

type DiscordMessageFunction = {
	author?: string,
	avatar?: string,
	bot?: boolean,
	children?: ReactNode,
	compactMode?: boolean,
	edited?: boolean,
	profile?: string,
	roleColor?: string,
	timestamp?: Date,
}

function DiscordMessage({
	author,
	avatar,
	bot,
	children,
	compactMode,
	edited,
	profile: profileKey,
	roleColor,
	timestamp,
}: DiscordMessageFunction) {
	const options = useContext(DiscordOptionsContext) || DiscordDefaultOptions

	const profileDefaults = { author, bot, roleColor, avatar }
	const resolveAvatar = (userAvatar: string) => options.avatars[userAvatar as keyof typeof options.avatars] || userAvatar || options.avatars.default

	profileDefaults.avatar = resolveAvatar(avatar);
	const profile = { ...profileDefaults }

	const authorInfo = {
		comfy: (
			<div>
				<AuthorInfo author={profile.author} bot={profile.bot} roleColor={profile.roleColor} />
				<span className="discord-message-timestamp">
					{parseTimestamp(timestamp)}
				</span>
			</div>
		),
		compact: (
			<Fragment>
				<span className="discord-message-timestamp">
					{parseTimestamp(timestamp)}
				</span>
				<AuthorInfo author={profile.author} bot={profile.bot} roleColor={profile.roleColor} />
			</Fragment>
		),
	}

	const checkHighlight = (elements: ReactElement[]) => {
		if (!Array.isArray(elements)) return false
		return elements.some(({ props: childProps = {} }) => childProps.highlight && childProps.type !== 'channel')
	}

	let messageClasses = 'discord-message'
	if (children && checkHighlight(children as ReactElement[])) messageClasses += ' discord-highlight-mention'

	const slots = {
		'default': children,
		embeds: findSlot(children, 'embeds'),
	}

	if (slots.embeds) {
		if (!isValidElement(slots.embeds)) {
			throw new Error('Element with slot name "embeds" should be a valid DiscordEmbed component.')
		}

		slots.default = elementsWithoutSlot(slots.default as ReactElement[], 'embeds')
	}

	return (
		<div className={messageClasses}>
			<div className="discord-author-avatar">
				<img src={profile.avatar} alt={profile.author} />
			</div>
			<div className="discord-message-content">
				{!compactMode ? authorInfo.comfy : null}
				<div className="discord-message-body">
					{compactMode ? authorInfo.compact : null}
					{slots.default}
					{edited
						? <span className="discord-message-edited">(edited)</span>
						: null
					}
				</div>
				{slots.embeds}
			</div>
		</div>
	)
}

export default DiscordMessage
