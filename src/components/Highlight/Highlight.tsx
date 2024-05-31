export function Highlight({ text, highlight }: typeHighlightProps) {
	if (!highlight.trim()) {
	  return <span>{text}</span>
	}
	const regex = new RegExp(`(${highlight})`, 'gi')
	const parts = text.split(regex)
  
	return (
	  <span>
		{parts.map((part, index) =>
		  regex.test(part) ? (
			<mark key={index}>{part}</mark>
		  ) : (
			part
		  )
		)}
	  </span>
	)
}