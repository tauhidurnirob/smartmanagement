import { createTheme, ThemeOptions } from '@mui/material/styles'

// assets
import colors from '../assets/scss/_themes-vars.module.scss'

// project imports
import componentStyleOverrides from './compStyleOverride'
import themePalette from './palette'
import themeTypography from './typography'

// type define

declare module '@mui/material/styles' {
    interface Palette {
      neutral: Palette['primary'];
      green: Palette['primary']
      yellow: Palette['primary']
    }
  
    // allow configuration using `createTheme`
    interface PaletteOptions {
      neutral?: PaletteOptions['primary'];
      green:  {
        [key: number]: string
      }
      yellow:  {
        [key: number]: string
      }
    }
  }
  
  // Update the Button's color prop options
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      green: true;
      yellow: true;
    }
  }

/**
 * Represent theme style and structure as per Material-UI
 */

export const theme = () => {
  const color = colors

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.background,
    background: color.background,
    darkTextPrimary: color.grey800,
    darkTextSecondary: color.grey600,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: '#D9D9D9',
  }

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  }

  const themes = createTheme(themeOptions)
  themes.components = componentStyleOverrides(themeOption)

  return themes
}

export default theme
