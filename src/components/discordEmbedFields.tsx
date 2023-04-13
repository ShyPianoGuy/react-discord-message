import React, { ReactNode } from 'react'
import '../css/discordEmbedFields.css'

type DiscordEmbedFieldsFunction = {
	children: ReactNode;
}


function DiscordEmbedFields({ children }: DiscordEmbedFieldsFunction) {
	return (
		<div className="discord-embed-fields">{children}</div>
	)
}

export default DiscordEmbedFields
