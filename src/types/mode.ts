export const AVAILABLE_MODES = ['classic', 'hot'] as const;

export type mode = (typeof AVAILABLE_MODES)[number];

export const MODES_EMOJIS: Record<mode, string> = {
	classic: '🔏',
	hot: '🌶',
};

export const FALLBACK_MODE: mode = 'classic';
