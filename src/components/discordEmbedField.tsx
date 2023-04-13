import React, { ReactNode } from 'react'
import '../css/discordEmbedField.css'

type DiscordEmbedFieldFunction = {
	children: ReactNode;
	fieldTitle?: string;
	inline?: boolean
}

function DiscordEmbedField({ children, fieldTitle, inline }: DiscordEmbedFieldFunction) {
	let classes = 'discord-embed-field'
	if (inline) classes += ' discord-inline-field'

	return (
		<div className={classes}>
			<div className="discord-field-title">{fieldTitle}</div>
			{children}
		</div>
	)
}

export default DiscordEmbedField
