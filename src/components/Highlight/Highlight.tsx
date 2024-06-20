import Link from "next/link";

interface IHighlightProps {
    text: string;
    searchHighlight: string;
    hashTagHighlight: string;
}

export function Highlight({ text, searchHighlight, hashTagHighlight }: IHighlightProps) {
	if (!searchHighlight.trim() && hashTagHighlight) {
	  const hashTagRegex = /(#\S+)/g;
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
		const escapedSearchHighlight = searchHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const regex = new RegExp(`(${escapedSearchHighlight})`, 'gi');
		const parts = text.split(regex);
	
		return (
		  <span>
			{parts.map((part, index) => 
			  part.match(regex) ? (
				<mark key={index}>{part}</mark>
			  ) : (
				part
			  )
			)}
		  </span>
		);
	  }
  }