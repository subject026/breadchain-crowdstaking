import { ReactNode } from "react";
import { useAccount } from "wagmi";
import { formatAddress } from "@/util";
import { DesktopNavigation } from "../Navigation";
import Logo from "./Logo";
import MobileNavigationToggle from "./MobileNavigationToggle";
import * as WalletDisplay from "./WalletDisplay";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <header className="bg-breadgray-100">
      <div className="max-w-6xl m-0 mx-auto p-6 md:px-8 flex h-24">
        {children}
      </div>
    </header>
  );
};

const Header = () => {
  const { address: accountAddress } = useAccount();

  return (
    <Container>
      <Logo />
      <DesktopNavigation />
      <WalletDisplay.Container>
        {<WalletDisplay.Network />}
        {accountAddress && (
          <WalletDisplay.Address>
            {formatAddress(accountAddress)}
          </WalletDisplay.Address>
        )}
      </WalletDisplay.Container>
      <MobileNavigationToggle />
    </Container>
  );
};

export default Header;
