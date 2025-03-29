export default function componentStyleOverrides(theme: any) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '6px',
          boxShadow: 'none',
        },
        disabled: {},
        containedPrimary: {
          color: '#ffffff',
          '&.Mui-disabled': {
            backgroundColor: theme.colors.primary200,
            color: '#ffffff',
          },
        },
        containedGreen: {
          color: '#ffffff',
          fontWeight: 600,
        },
        containedYellow: {
          color: '#ffffff',
          fontWeight: 600,
        },
        sizeLarge: {
          padding: '12px',
        },
        sizeSmall: {
          fontSize: '12px',
          padding: '8px 12px',
          lineHeight: '18px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '20px',
        },
        rounded: {
          borderRadius: `12px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDark,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            '&:hover': {
              backgroundColor: theme.menuSelectedBack,
            },
            '& .MuiListItemIcon-root': {
              color: theme.menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: theme.menuSelectedBack,
            color: theme.menuSelected,
            '& .MuiListItemIcon-root': {
              color: theme.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,
          '&::placeholder': {
            color: theme.grey500,
            fontSize: '0.875rem',
          },
        },
        sizeSmall: {
          input: {
            padding: '14px 16px !important',
            borderRadius: '6px',
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '6px',
            borderColor: '#707070 !important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: '#ffffff',
          padding: '20px',
          borderRadius: `12px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `12px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: theme.paper,
          width: '4px',
        },
        valueLabel: {
          color: theme?.colors?.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.paper,
          background: theme.colors?.grey700,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          th: {
            fontWeight: '700',
            color: theme.colors?.grey700,
            borderBottom: `1px dashed ${theme.divider}`,
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          td: {
            color: theme.colors?.grey800,
            fontWeight: '700',
            borderBottom: `1px dashed ${theme.divider}`,
          },
        },
      },
    },
  }
}
