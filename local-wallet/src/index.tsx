import React from 'react';
import ReactDOM from 'react-dom';
import { NativeAsset, ERC20Asset } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { HTTPGateway } from '@burner-wallet/core/gateways';
import ModernUI from '@burner-wallet/modern-ui';
import LegacyPlugin from '@burner-wallet/legacy-plugin';
import CarbonPlugin from 'carbon-burner-wallet-plugin';

const core = new BurnerCore({
  signers: [
    new InjectedSigner(),
    new LocalSigner({ privateKey: process.env.REACT_APP_PK, saveKey: false }),
  ],
  gateways: [
    new HTTPGateway('http://localhost:8545', '5777'),
  ],
  assets: [
    new ERC20Asset({
      id: 'localerc20',
      name: 'Local Token',
      network: '5777',
      // @ts-ignore
      address: process.env.REACT_APP_ERC20_ADDRESS,
    }),
    new NativeAsset({
      id: 'geth',
      name: 'Ganache ETH',
      network: '5777',
    }),
  ],
});

const BurnerWallet = () =>
  <ModernUI
    title="ETHWaterloo"
    core={core}
    plugins={[new LegacyPlugin(), new CarbonPlugin(process.env.REACT_APP_CARBON_API_KEY!)]}
  />


ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
