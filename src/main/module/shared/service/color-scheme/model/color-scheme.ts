export const ColorScheme = {
    LIGHT: 'light-mode',
    DARK: 'dark-mode',
    AUTO: 'light-dark-mode'
} as const;

export type ColorScheme = typeof ColorScheme[keyof typeof ColorScheme];
