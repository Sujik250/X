export type typePostItem = {
	name: string;
	userImg?: string;
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
	id: number;
}

export type typePropsPostItem = {
	posts: typePostItem[];
	setPosts: (posts: typePostItem[]) => void;
	searchValue: string;
}

export type typeReactionData = {
	reaction: string;
	count: number;
	selected: boolean;
}