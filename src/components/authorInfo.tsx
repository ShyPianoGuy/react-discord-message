import React from 'react'
import './authorInfo.css'

type AuthorInfoFunction = {
	author: string;
	bot: boolean;
	roleColor: string;
}

function AuthorInfo({ author, bot, roleColor }: AuthorInfoFunction) {
	return (
		<span className="discord-author-info">
			<span style={{ color: roleColor }} className="discord-author-username">
				{author}
			</span>
			{bot ? <span className="discord-bot-tag">Bot</span> : null}
		</span>
	)
}

export default AuthorInfo
