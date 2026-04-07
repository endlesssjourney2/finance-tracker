import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

//new context for alert system, to show alerts from any component

type AlertSeverity = "success" | "info" | "warning" | "error";

type AlertOptions = {
  severity?: AlertSeverity;
  duration?: number;
};

type AlertState = {
  open: boolean;
  message: string;
  severity: AlertSeverity;
  duration: number;
};

type AlertContextType = {
  showAlert: (message: string, options?: AlertOptions) => void;
  hideAlert: () => void;
};

const DEFAULT_DURATION = 3000;

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: "info",
    duration: DEFAULT_DURATION,
  });

  const hideAlert = useCallback(() => {
    setAlertState((prev) => ({ ...prev, open: false }));
  }, []);

  const showAlert = useCallback((message: string, options?: AlertOptions) => {
    setAlertState({
      open: true,
      message,
      severity: options?.severity ?? "info",
      duration: options?.duration ?? DEFAULT_DURATION,
    });
  }, []);

  const value = useMemo(
    () => ({
      showAlert,
      hideAlert,
    }),
    [showAlert, hideAlert],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={alertState.open}
        autoHideDuration={alertState.duration}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={hideAlert}
          severity={alertState.severity}
          variant="filled"
          sx={{
            borderRadius: "18px",
          }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
};
