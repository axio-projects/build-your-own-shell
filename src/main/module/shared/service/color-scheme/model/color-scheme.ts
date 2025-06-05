export const ColorScheme = {
    LIGHT: 'light-mode',
    DARK: 'dark-mode',
    LIGHT_DARK: 'light-dark-mode'
} as const;

export type ColorScheme = typeof ColorScheme[keyof typeof ColorScheme];
