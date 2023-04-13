import React, {  ReactNode, useEffect, useRef } from 'react'
import './discordMention.css'

type DiscordMentionFunction = {
	children: ReactNode;
	color: string;
	type: 'user' | 'channel' | 'role';
}


function DiscordMention({ children, color, type }: DiscordMentionFunction) {
	const roleColor = color

	const $el = useRef<HTMLSpanElement>(null);
	const setHoverColor = () => $el.current ? $el.current.style.backgroundColor = roleColor : null;
	const resetHoverColor = () => $el.current ? $el.current.style.backgroundColor = roleColor : null;

	const colorStyle = !roleColor || type !== 'role'
		? {}
		: {
			color: roleColor,
			backgroundColor: roleColor,
		}

	useEffect(() => {
		if ($el.current && roleColor && type === 'role') {
			$el.current.addEventListener('mouseover', setHoverColor)
			$el.current.addEventListener('mouseout', resetHoverColor)
		}

		return () => {
			if ($el.current && roleColor && type === 'role') {
				$el.current.removeEventListener('mouseover', setHoverColor)
				$el.current.removeEventListener('mouseout', resetHoverColor)
			}
		}
	}, [])

	const slots = { 'default': children }
	const mentionCharacter = type === 'channel' ? '#' : '@'

	return (
		<span style={colorStyle} className="discord-mention" ref={$el}>
			{mentionCharacter}{slots.default}
		</span>
	)
}

export default DiscordMention
