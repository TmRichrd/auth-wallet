
'use client';

import React from 'react';
import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { wallet, type EntryPosition } from '@particle-network/connectkit/wallet';
import { solana, mainnet, base, arbitrum, avalanche, linea, bsc, optimism, polygon, arbitrumNova } from '@particle-network/connectkit/chains';
import { authWalletConnectors } from '@particle-network/connectkit/auth';
import { evmWalletConnectors, coinbaseWallet, injected } from '@particle-network/connectkit/evm';
import { solanaWalletConnectors,injected as solaInjected } from '@particle-network/connectkit/solana';


const config = createConfig({
  projectId: import.meta.env.VITE_PROJECTID,
  clientKey: import.meta.env.VITE_CLIENTKEY,
  appId: import.meta.env.VITE_APPID,
  appearance: {"recommendedWallets":[{"walletId":"phantom","label":"none"}],"theme":{"--pcm-font-family":"'__Poppins_68bcaa', '__Poppins_Fallback_68bcaa'","--pcm-body-background":"#ffffff","--pcm-body-background-secondary":"#EFF0F2","--pcm-body-background-tertiary":"#F9F9FA","--pcm-body-color":"#181B1E","--pcm-body-color-secondary":"#8B8EA1","--pcm-body-color-tertiary":"#DCDFE6","--pcm-primary-button-bankground":"#181B1E","--pcm-primary-button-color":"#ffffff","--pcm-primary-button-hover-background":"#353738","--pcm-secondary-button-color":"#181B1E","--pcm-secondary-button-bankground":"#EFF0F2","--pcm-secondary-button-hover-background":"#F0F6FF","--pcm-body-action-color":"#999999","--pcm-button-border-color":"#F5F6FB","--pcm-accent-color":"#4f46e5","--pcm-rounded-sm":"4px","--pcm-rounded-md":"8px","--pcm-rounded-lg":"11px","--pcm-rounded-xl":"22px","--pcm-button-font-weight":"500","--pcm-modal-box-shadow":"0px 2px 4px rgba(0, 0, 0, 0.1)"},"splitEmailAndPhone":false,"collapseWalletList":false,"hideContinueButton":false,"connectorsOrder":["email","social","wallet"],"language":"en-US","collapsePasskeyButton":true},
  walletConnectors: [
    
    evmWalletConnectors({
      metadata: { name: 'My App' },
      connectorFns: [injected({ target: "phantom" })],
      multiInjectedProviderDiscovery: true,
    }),
    
    authWalletConnectors({
      authTypes: JSON.parse(import.meta.env.VITE_AUTHTYPES),
      fiatCoin: "USD",
      promptSettingConfig:{
      promptMasterPasswordSettingWhenLogin:1,
      promptPaymentPasswordSettingWhenSign:1,
      }
    }),
    
    solanaWalletConnectors({
      connectorFns: [solaInjected({ target: "phantom" })],
    }),
  ],
  plugins: [
    wallet({
      entryPosition: "bottom-right" as EntryPosition,
      visible: true,
      customStyle: {
        fiatCoin: "USD",
      },
    }),
    
  ],
  chains: [bsc, solana, mainnet, base, arbitrum, avalanche, linea, bsc, optimism, polygon, arbitrumNova],
});

// Wrap your application with this component.
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
  