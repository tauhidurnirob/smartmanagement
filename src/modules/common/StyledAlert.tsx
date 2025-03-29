import { Alert, alpha, styled } from "@mui/material";

const StyledAlert = styled(Alert)(({ theme }) => ({
  padding: "4px 8px",
  fontWeight: "bold",
  fontSize: "16px",
  alignItems: "center",

  ["&.MuiAlert-outlinedError"]: {
    backgroundColor: alpha(theme.palette.error.main, 0.1),
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    ["& .MuiAlert-icon"]: {
      color: theme.palette.error.main,
    },
  },

  ["&.MuiAlert-outlinedWarning"]: {
    backgroundColor: alpha(theme.palette.warning.main, 0.1),
    borderColor: theme.palette.warning.main,
    color: theme.palette.warning.main,
    ["& .MuiAlert-icon"]: {
      color: theme.palette.warning.main,
    },
  },

  ["&.MuiAlert-standardWarning"]: {
    color: theme.palette.warning.main,
    ["& .MuiAlert-icon"]: {
      color: theme.palette.warning.main,
    },
  },
  ["&.MuiAlert-standardError"]: {
    color: theme.palette.error.main,
    ["& .MuiAlert-icon"]: {
      color: theme.palette.error.main,
    },
  },

  ["& .MuiAlert-message"]: {
    padding: 0,
  },
  ["& .MuiAlert-icon"]: {
    padding: 0,
  },
}));

export default StyledAlert;
