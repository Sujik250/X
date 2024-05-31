type typeChatData = {
	name: string | string[];
	messagesInfo:
		{
			yourMessage: boolean;
			message: string;
			checked: boolean;
			date: string;
			delivered: boolean;
		}[];
}