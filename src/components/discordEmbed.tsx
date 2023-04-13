import React, { ReactElement, ReactNode, isValidElement } from 'react'
import { elementsWithoutSlot, findSlot, parseTimestamp } from '../util.js'
import './discordEmbed.css'

type DiscordEmbedFunction = {
	authorImage?: string;
	authorName?: string;
	authorUrl?: string;
	children: ReactNode;
	color?: string;
	footerImage?: string;
	image?: string;
	thumbnail?: string;
	timestamp?: Date;
	title?: string;
	url?: string;
}

function DiscordEmbed({
	authorImage,
	authorName,
	authorUrl,
	children,
	color,
	footerImage,
	image,
	thumbnail,
	timestamp,
	title,
	url,
}: DiscordEmbedFunction) {
	const slots = {
		'default': children,
		fields: findSlot(children, 'fields'),
		footer: findSlot(children, 'footer'),
	}

	if (slots.fields) {
		if (!isValidElement(slots.fields)) {
			throw new Error('Element with slot name "fields" should be a valid DiscordEmbedFields component.')
		}

		slots.default = elementsWithoutSlot(slots.default as ReactElement[], 'fields')
	}

	if (slots.footer) slots.default = elementsWithoutSlot(slots.default as ReactElement, 'footer')

	const content = {
		author: (
			<div className="discord-embed-author">
				{authorImage ? <img src={authorImage} alt="" className="discord-author-image" /> : null}
				{authorUrl ? <a href={authorUrl} target="_blank" rel="noopener noreferrer">{authorName}</a> : <span>{authorName}</span>}
			</div>
		),
		footer: (
			<div className="discord-embed-footer">
				{slots.footer && footerImage
					? <img src={footerImage} alt="" className="discord-footer-image" />
					: null
				}
				<span>
					{slots.footer}
					{slots.footer && timestamp
						? <span className="discord-footer-separator">&bull;</span>
						: null
					}
					{timestamp ? <span>{parseTimestamp(timestamp)}</span> : null}
				</span>
			</div>
		),
		title: (
			<div className="discord-embed-title">
				{url ? <a href={url} target="_blank" rel="noopener noreferrer">{title}</a> : <span>{title}</span>}
			</div>
		),
	}

	return (
		<div className="discord-embed">
			<div style={{ backgroundColor: color }} className="discord-left-border"></div>
			<div className="discord-embed-container">
				<div className="discord-embed-content">
					<div>
						{authorName ? content.author : null}
						{title ? content.title : null}
						<div className="discord-embed-description">
							{slots.default}
						</div>
						{slots.fields}
						{image ? <img src={image} alt="" className="discord-embed-image" /> : null}
					</div>
					{thumbnail ? <img src={thumbnail} alt="" className="discord-embed-thumbnail" /> : null}
				</div>
				{slots.footer || timestamp ? content.footer : null}
			</div>
		</div>
	)
}

export default DiscordEmbed
