// Theme configuration based on Figma design
export const theme = {
  // Color palette from Figma design
  colors: {
    primary: '#37274B',      // Deep purple (primary brand color)
    secondary: '#6D60F8',    // Bright purple (accent color)
    tertiary: '#A091FC',     // Light purple
    background: '#F9F8FF',   // Light background
    white: '#FFFFFF',
    black: '#1A1A1A',
    gray: {
      light: '#F2F2F2',
      medium: '#D9D9D9',
      dark: '#808080'
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
      light: '#999999'
    },
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#FF5252',
    card: {
      meditation: '#F0EEFF',
      breathing: '#E0F7FF',
      community: '#FFF0F5',
      progress: '#F0F8FF'
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: 'Epilogue',
      secondary: 'Inter'
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 28,
      display: 32
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700'
    }
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  
  // Border radius
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 999
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 3
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5
    }
  }
};

// Common styled components
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  screenPadding: {
    paddingHorizontal: theme.spacing.lg
  }
};
