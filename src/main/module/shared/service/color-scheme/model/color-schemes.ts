export const ColorSchemes = {
    LIGHT: 'light-mode',
    DARK: 'dark-mode',
    AUTO: 'light-dark-mode'
} as const;

export type ColorSchemes = typeof ColorSchemes[keyof typeof ColorSchemes];
