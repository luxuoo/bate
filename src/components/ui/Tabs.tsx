import { cn } from "@/lib/utils";
import { useState, useCallback, ReactNode } from "react";

interface TabsProps {
  defaultValue?: string;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

// 创建一个简单的上下文，不使用createContext以减少代码复杂度
const TabsContext = {
  _value: "",
  _onChange: (value: string) => {},
  Provider: ({ value, onValueChange, children }: { value: string; onValueChange: (value: string) => void; children: ReactNode }) => {
    TabsContext._value = value;
    TabsContext._onChange = onValueChange;
    return <>{children}</>;
  },
};

export function Tabs({ defaultValue = "", children, className }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  
  const onValueChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);
  
  return (
    <TabsContext.Provider value={value} onValueChange={onValueChange}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn("flex items-center justify-start rounded-lg bg-gray-100 dark:bg-gray-800 p-1", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const isSelected = TabsContext._value === value;
  
  return (
    <button
      type="button"
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        isSelected 
          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
        className
      )}
      onClick={() => TabsContext._onChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const isSelected = TabsContext._value === value;
  
  if (!isSelected) return null;
  
  return (
    <div className={cn("mt-4", className)}>
      {children}
    </div>
  );
}