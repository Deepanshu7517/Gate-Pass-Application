import { type ComponentChildren, createContext } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";

interface AlertDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(undefined);

const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialog components must be used within AlertDialog");
  }
  return context;
};

interface AlertDialogProps {
  children: ComponentChildren;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AlertDialog = ({ children, open: controlledOpen, onOpenChange }: AlertDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = onOpenChange || setUncontrolledOpen;

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

interface AlertDialogTriggerProps {
  children: ComponentChildren;
  asChild?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

export const AlertDialogTrigger = ({ children, asChild, className, onClick }: AlertDialogTriggerProps) => {
  const { setOpen } = useAlertDialog();

  const handleClick = (e: MouseEvent) => {
    setOpen(true);
    onClick?.(e);
  };

  if (asChild) {
    return <div onClick={handleClick}>{children}</div>;
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

interface AlertDialogPortalProps {
  children: ComponentChildren;
}

export const AlertDialogPortal = ({ children }: AlertDialogPortalProps) => {
  const { open } = useAlertDialog();
  
  if (!open) return null;

  return <div>{children}</div>;
};

interface AlertDialogOverlayProps {
  className?: string;
}

export const AlertDialogOverlay = ({ className }: AlertDialogOverlayProps) => {
  const { open } = useAlertDialog();

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      data-state={open ? "open" : "closed"}
    />
  );
};

interface AlertDialogContentProps {
  children: ComponentChildren;
  className?: string;
}

export const AlertDialogContent = ({ className, children }: AlertDialogContentProps) => {
  const { open, setOpen } = useAlertDialog();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <div
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg bg-white",
          className
        )}
        data-state={open ? "open" : "closed"}
      >
        {children}
      </div>
    </AlertDialogPortal>
  );
};

interface AlertDialogHeaderProps {
  children: ComponentChildren;
  className?: string;
}

export const AlertDialogHeader = ({ className, children }: AlertDialogHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
  >
    {children}
  </div>
);

interface AlertDialogFooterProps {
  children: ComponentChildren;
  className?: string;
}

export const AlertDialogFooter = ({ className, children }: AlertDialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ",
      className
    )}
  >
    {children}
  </div>
);

interface AlertDialogTitleProps {
  children: ComponentChildren;
  className?: string;
}

export const AlertDialogTitle = ({ className, children }: AlertDialogTitleProps) => (
  <h2 className={cn("text-lg font-semibold", className)}>
    {children}
  </h2>
);

interface AlertDialogDescriptionProps {
  children: ComponentChildren;
  className?: string;
}

export const AlertDialogDescription = ({ className, children }: AlertDialogDescriptionProps) => (
  <p className={cn("text-sm text-gray-500", className)}>
    {children}
  </p>
);

interface AlertDialogActionProps {
  children: ComponentChildren;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

export const AlertDialogAction = ({ className, children, onClick }: AlertDialogActionProps) => {
  const { setOpen } = useAlertDialog();

  const handleClick = (e: MouseEvent) => {
    onClick?.(e);
    setOpen(false);
  };

  return (
    <button
      className={cn(buttonVariants(), className)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

interface AlertDialogCancelProps {
  children: ComponentChildren;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

export const AlertDialogCancel = ({ className, children, onClick }: AlertDialogCancelProps) => {
  const { setOpen } = useAlertDialog();

  const handleClick = (e: MouseEvent) => {
    onClick?.(e);
    setOpen(false);
  };

  return (
    <button
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};