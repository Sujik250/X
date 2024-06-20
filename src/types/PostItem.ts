export type typePostItem = {
	name: string;
	date: string;
	shortPostText: string;
	likeInfo: {
		isLike: boolean;
		likeCount: number; 
	};
	reactionInfo: {
		usedReactions: typeReactionData[],
		usedReactionPacks: string[],
	};
	comments: Omit<typePostItem, 'comments' | 'reactionInfo' | 'likeInfo'>[]
	id: string;
}

export type typePropsPostItem = {
	posts: typePostItem[];
	setPosts: React.Dispatch<React.SetStateAction<typePostItem[]>>
	searchValue: string;
}

export type typeReactionData = {
	reaction: string;
	count: number;
	selected: boolean;
}