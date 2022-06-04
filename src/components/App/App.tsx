import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import AppContainer from "./ui/AppContainer";
import Header from "../Header";
import * as Main from "./ui/Main";
import Footer from "../Footer";
import Modal from "../Modal";
import Logo from "../Header/Logo";
import * as Navigation from "../Header/Navigation";
import WalletDisplay from "../WalletDisplay";

import { getNetwork, ethInit } from "../../api";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setWalletAddress } from "../../features/wallet/walletSlice";
import {
  ENetwork,
  ENetworkConnectionState,
  setNetwork,
  setWalletConnected,
} from "../../features/network/networkSlice";
import { formatAddress } from "../../util/formatWalletAddress";
import { setIsLoaded } from "../../features/font/fontSlice";

import Toast from "../Toast/Toast";
import { Pantry } from "../Pantry";
import Index from "../../routes/Index";
import DesktopNavigation from "../DesktopNavigation/DesktopNavigation";
import About from "../../routes/Info";
import MobileNavigationToggle from "../Header/MobileNavigationToggle";
import SiteTitle from "../SiteTitle/SiteTitle";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state);

  const { modal, wallet, network, toast, font } = appState;

  /**
   * App Init
   */
  React.useEffect(() => {
    (async () => {
      document.fonts.ready.then(() => {
        if (!font.isLoaded) dispatch(setIsLoaded(true));
      });

      // getXr().then((data) => {
      //   dispatch(setXr(data));
      // });

      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        // !!! handle this error
        return;
      }

      if (ethereum.isConnected && !ethereum.isConnected()) {
        // this condition is met on MM mobile when initially loading the page for some reason
        // !!! handle this error
      }

      const network = await getNetwork();
      if (!network) {
        // !!! handle this error
        return;
      }

      dispatch(setNetwork(network));
      dispatch(setWalletConnected(ENetworkConnectionState.CONNECTED));

      // bind handlers for metamask events eg account change / network change
      ethInit(appState, dispatch);

      // If there is an address stored we can check how recently wallet was connected
      const storedAccount = localStorage.getItem("storedAccount");
      if (!storedAccount) return;

      const account = JSON.parse(storedAccount);
      // ignore stored account if more than an hour old
      if (Date.now() - account.timestamp > 360_000) {
        localStorage.removeItem("storedAccount");
        return;
      }

      dispatch(setWalletAddress(account.account));

      if (network === ENetwork.UNSUPPORTED) {
        ethInit(appState, dispatch);
        return;
      }
    })();
  }, []);

  return (
    <AppContainer>
      {modal.type !== null && <Modal modal={modal} />}
      {toast.type !== null && toast.message !== null && (
        <Toast type={toast.type} message={toast.message} />
      )}
      <Header>
        <Logo />
        <DesktopNavigation />
        <Navigation.Nav>
          {network.network && <Navigation.Network network={network.network} />}
          {wallet.address && (
            <WalletDisplay>{formatAddress(wallet.address)}</WalletDisplay>
          )}
        </Navigation.Nav>
        <MobileNavigationToggle />
      </Header>
      <SiteTitle />
      <Main.Main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pantry" element={<Pantry />} />
        </Routes>
      </Main.Main>

      <Footer>
        <Link to="/pantry" className="opacity-0 hover:opacity-100 px-4 py-2">
          pantry
        </Link>
      </Footer>
    </AppContainer>
  );
};

export default App;
