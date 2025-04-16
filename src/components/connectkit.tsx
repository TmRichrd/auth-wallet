
'use client';

import React from 'react';
import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { wallet, type EntryPosition } from '@particle-network/connectkit/wallet';
import { solana, mainnet, base, arbitrum, avalanche, linea, bsc, optimism, polygon, arbitrumNova } from '@particle-network/connectkit/chains';
import { authWalletConnectors } from '@particle-network/connectkit/auth';
import { evmWalletConnectors, coinbaseWallet, injected, walletConnect } from '@particle-network/connectkit/evm';
import { solanaWalletConnectors,injected as solaInjected } from '@particle-network/connectkit/solana';


const config = createConfig({
  projectId: import.meta.env.VITE_PROJECTID,
  clientKey: import.meta.env.VITE_CLIENTKEY,
  appId: import.meta.env.VITE_APPID,
  appearance: {"recommendedWallets":[{"walletId":"metaMask","label":"Recommended"},{"walletId":"coinbaseWallet","label":"Popular"},{"walletId":"okxWallet","label":"none"},{"walletId":"phantom","label":"none"},{"walletId":"trustWallet","label":"none"},{"walletId":"bitKeep","label":"none"},{"walletId":"walletConnect","label":"none"}],"theme":{"--pcm-font-family":"'__Poppins_68bcaa', '__Poppins_Fallback_68bcaa'","--pcm-rounded-sm":"4px","--pcm-rounded-md":"8px","--pcm-rounded-lg":"11px","--pcm-rounded-xl":"22px"},"splitEmailAndPhone":false,"collapseWalletList":false,"hideContinueButton":false,"connectorsOrder":["email","wallet"],"language":"en-US","collapsePasskeyButton":true},
  walletConnectors: [
    
    evmWalletConnectors({
      metadata: { name: 'My App' },
      connectorFns: [injected({ target: "metaMask" }),injected({ target: "okxWallet" }),injected({ target: "trustWallet" }),injected({ target: "bitKeep" }),walletConnect({
        showQrModal: false,
      }),coinbaseWallet()],
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
  