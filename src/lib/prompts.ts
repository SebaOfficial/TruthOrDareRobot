import { AVAILABLE_LANGUAGES, Language } from '../i18n';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import getNthShuffledElement from '../utils/shuffle';
import { PromptType } from '../types/promptType';
import { mode } from '../types/mode';

export default class Prompts {
	private readonly PROMPTS_PATH = '../../data';
	private prompts: Record<Language, Record<PromptType, Record<mode, string[]>>> = {} as any;
	private seedMap: Map<string, number> = new Map();

	constructor() {
		const promptTypes: PromptType[] = ['truth', 'dare'];

		AVAILABLE_LANGUAGES.forEach((lang) => {
			this.prompts[lang] = Object.fromEntries(
				promptTypes.map((type) => {
					const filePath = resolve(__dirname, this.PROMPTS_PATH, lang, `${type}.json`);
					const contents = JSON.parse(readFileSync(filePath, 'utf-8')) as Record<mode, string[]>;
					return [type, contents];
				}),
			) as Record<PromptType, Record<mode, string[]>>;
		});
	}

	getRandomPrompt(lang: Language, type: PromptType, mode: mode, userSeed: string) {
		const nth = (this.seedMap.get(userSeed) ?? -1) + 1;
		this.seedMap.set(userSeed, nth);

		return getNthShuffledElement(this.prompts[lang][type][mode], userSeed, nth);
	}
}
