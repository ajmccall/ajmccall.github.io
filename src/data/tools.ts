export interface Tool {
	name: string;
	description: string;
	details: string;
	url: string;
}

export const tools: Tool[] = [
	{
		name: "ai-agent-template",
		description:
			"Managing multiple AI accounts safely.",
		details:
			"A system that lets me safely and easily use multiple AI accounts on the same device. Useful for contractors with multiple AI accounts, or for keeping personal accounts separate from enterprise ones.",
		url: "https://github.com/ajmccall/ai-agent-template",
	},
	{
		name: "ai-skills",
		description:
			"My growing list of AI skills.",
		details:
			"A library of reusable skills and patterns for AI agents. The aim is to make agent behaviour more consistent, composable, and useful when solving repeatable task types.",
		url: "https://github.com/ajmccall/ai-skills",
	},
	{
		name: "milkman",
		description:
			"A simple command-line Postman.",
		details:
			"A simple command-line tool to send and receive API calls. A very basic version of Postman, but really all I ever used Postman for.",
		url: "https://github.com/ajmccall/milkman",
	},
];
