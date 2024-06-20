export type TPostItem = {
	name: string;
	date: string;
	shortPostText: string;
	likeInfo: {
		isLike: boolean;
		likeCount: number; 
	};
	reactionInfo: {
		usedReactions: TReactionData[],
		usedReactionPacks: string[],
	};
	comments: Omit<TPostItem, 'comments' | 'reactionInfo' | 'likeInfo'>[]
	id: string;
}

export type TReactionData = {
	reaction: string;
	count: number;
	selected: boolean;
}