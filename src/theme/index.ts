import darkTheme from "_/theme/dark";

export type ThemeColors = typeof darkTheme.colors;

const useTheme = () => darkTheme;

export default useTheme;
