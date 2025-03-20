
"use client";

// Particle imports
import { mainnet, polygon, sei, base, berachainTestnetbArtio } from "@particle-network/authkit/chains"; // Chains are imported here
import { AuthType } from "@particle-network/auth-core";
import {
  AuthCoreContextProvider,
  PromptSettingType,
} from "@particle-network/authkit"; 

export const ParticleAuthkit = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthCoreContextProvider
      options={{
        projectId: "43fdacab-dacb-4d94-9026-fd32573c1980",
        clientKey: 'cNFmDTYTb0JiorIBCyApd7G9kuFHpmGOBx37m2W6',
        appId: '1a8c4140-b087-44ff-89de-031cb40c2bf7',
        // No need for the authTypes array if you want to include all of the available social login options
        themeType: "dark",

        // List the chains you want to include
        chains: [mainnet, polygon, sei, base, berachainTestnetbArtio],

        // Optionally, switches the embedded wallet modal to reflect a smart account
        // erc4337: {
        //   name: "SIMPLE",
        //   version: "2.0.0",
        // },

        // You can prompt the user to set up extra security measures upon login or other interactions
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },

        wallet: {
          themeType: "dark", // Wallet modal theme

          // Set to false to remove the embedded wallet modal
          visible: true,
          customStyle: {
            supportUIModeSwitch: true,
            supportLanguageSwitch: false,
          },
        },
      }}
    >
      {children}
    </AuthCoreContextProvider>
  );
};

