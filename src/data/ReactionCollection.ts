// 1 Эмодзи Стоит 2 XCoin

export const REACTIONPRODUCTS: typeReactinData[] = [
	{
		preview: '/HeartPack.png',
		name: 'Heart Pack',
		category: 'Reaction Pack',
		include: ['💗', '💓', '💝', '💘'],
		priceInfo: {
			price: 8,
			discount: 0,
		},
		id: crypto.randomUUID(),
	},
	{
		preview: '/MeowPack.png',
		name: 'Meow Pack',
		category: 'Reaction Pack',
		include: ['🙀', '😾', '😿', '😹', '😻'],
		priceInfo: {
			price: 10,
			discount: 0,
		},
		id: crypto.randomUUID(),
	},
	{
		preview: '/HalloweenPack.png',
		name: 'Halloween Pack',
		category: 'Reaction Pack',
		include: ['☠️', '🩸', '👻', '🎃'],
		priceInfo: {
			price: 8,
			discount: 0,
		},
		id: crypto.randomUUID(),
	},
	{
		preview: '/Vibe2024Pack.png',
		name: 'Vibe 2024 Pack',
		category: 'Reaction Pack',
		include: ['💏', '🐋', '🍷🗿', '🤫🧏‍♂️'],
		priceInfo: {
			price: 12,
			discount: 0,
		},
		id: crypto.randomUUID(),
	},
	{
		preview: '/ScopoPhobiaPack.png',
		name: 'ScopoPhobia Pack',
		category: 'Reaction Pack',
		include: ['👁', '👁‍🗨', '🧿', '🪬'],
		priceInfo: {
			price: 8,
			discount: 0,
		},
		id: crypto.randomUUID(),
	},

	// {
	// 	preview: '/Pack.png',
	// 	name: '',
	// 	category: 'Reaction Pack',
	// 	include: [''],
	// 	priceInfo: {
	// 		price: 0,
	// 		discount: 0,
	// 	},
	// 	id: crypto.randomUUID(),
	// },
]