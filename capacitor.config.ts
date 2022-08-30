import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.omanymessenger.app',
  appName: 'Omany Messenger',
  webDir: 'www',
  bundledWebRuntime: false,
   plugins: {
    Keyboard: {
      resize: "none"
    },
  },
};

export default config;
