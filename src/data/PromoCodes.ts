type TPromoCodes = {
	code: string,
	coins: number,
	maxUsage?: number | 'inf',
}

export const PROMOCODES: TPromoCodes[] = [
	{
		code: '0GIVE-AMILL-IONXC',
		coins: 1000000,
	},
	{
		code: 'HAPPY-SUMME-R2024',
		coins: 5,
	},
	// {
	// 	code: '',
	// 	coins: 0,
	// },
]