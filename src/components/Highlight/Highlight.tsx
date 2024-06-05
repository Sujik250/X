import Link from "next/link";

export function Highlight({ text, searchHighlight, hashTagHighlight }: typeHighlightProps) {
	if (!searchHighlight.trim() && hashTagHighlight) {
	  const hashTagRegex = /(#\w+)/g;
	  const parts = text.split(hashTagRegex);
  
	  return (
		<span>
		  {parts.map((part, index) => {
			if (index % 2 === 1) {
			  return <Link 
			  			href={`search/htg=${part.slice(1, part.length)}`} 
						className='hashtag'
			  			key={index}
					  >
						{part}
					  </Link>;
			} else {
			  return part;
			}
		  })}
		</span>
	  );
	} else {
	  const regex = new RegExp(`(${searchHighlight})`, 'gi');
	  const parts = text.split(regex);
  
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
	  );
	}
  }