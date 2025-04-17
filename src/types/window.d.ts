interface Window {
  microApp: {
    removeGlobalDataListener: any;
    addGlobalDataListener: any;
    dispatch: (data: any) => void;
    getData: () => any;
    addDataListener: (listener: (data: any) => void, autoTrigger?: boolean) => void;
  };
  ethereum?: any;
} 