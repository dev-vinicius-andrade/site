type ValueType = string | { [key: string]: ValueType };
export interface LocaleMessagesComponents {
	components: {
		[key: string]: {
			[key: string]: ValueType;
		};
	};
}
