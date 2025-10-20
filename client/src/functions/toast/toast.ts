import type { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

export interface ToastOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: any;
}
export interface AxiosErrorResponse extends AxiosError {
  response: AxiosResponse<{
    error: string;
  }>;
}

export interface ProcessingToastOptions extends ToastOptions {
  loadingText?: string;
  successText?: string | ((data: any) => string);
  errorText?: string | ((data: AxiosErrorResponse["response"]) => string);
}

class ToastManager {
  private defaultDuration = 4000;
 

  success(message: string, options?: ToastOptions) {
    return sonnerToast.success(message, {
      duration: options?.duration || this.defaultDuration,
      dismissible: options?.dismissible !== false,
      action: options?.action,
      cancel: options?.cancel,
    });
  }

  error(message: string, options?: ToastOptions) {
    return sonnerToast.error(message, {
      duration: options?.duration || this.defaultDuration + 2000,
      dismissible: options?.dismissible !== false,
      action: options?.action,
      cancel: options?.cancel,
    });
  }

  warning(message: string, options?: ToastOptions) {
    return sonnerToast.warning(message, {
      duration: options?.duration || this.defaultDuration + 1000,
      dismissible: options?.dismissible !== false,
      action: options?.action,
      cancel: options?.cancel,
    });
  }

  info(message: string, options?: ToastOptions) {
    return sonnerToast.info(message, {
      duration: options?.duration || this.defaultDuration,
      dismissible: options?.dismissible !== false,
      action: options?.action,
      cancel: options?.cancel,
    });
  }

  processing<T>(
    promise: Promise<T>,
    options: ProcessingToastOptions & {
      loadingText: string;
      successText: string | ((data: T) => string);
      errorText: string | ((data: AxiosErrorResponse["response"]) => string);
    }
  ) {
    return sonnerToast.promise(promise, {
      loading: options.loadingText,
      success: (data) => {
        return typeof options.successText === "function"
          ? options.successText(data)
          : options.successText;
      },
      error: (error) => {
        return typeof options.errorText === "function"
          ? options.errorText(error)
          : options.errorText;
      },
      duration: options.duration || this.defaultDuration,
      action: options.action,
      cancel: options.cancel,
    });
  }
}

export const toast = new ToastManager();
