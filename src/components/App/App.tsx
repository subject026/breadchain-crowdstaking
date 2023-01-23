import { Route, Routes } from 'react-router-dom';

import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import About from '../../routes/about';
import Bake from '../../routes/bake';
import Footer from '../Footer';
import FooterNav from '../FooterNav';
import Header from '../Header';
import Modal from '../Modal';
import { Pantry } from '../Pantry';
import PantryLink from '../PantryLink/PantryLink';
import SiteTitle from '../SiteTitle/SiteTitle';
import Toast from '../Toast/Toast';
import AppContainer from './ui/AppContainer';
import * as Main from './ui/Main';

function App() {
  const { state: modal } = useModal();

  const { state: toast } = useToast();

  return (
    <AppContainer>
      {modal && (
        <Modal type={modal.type} title={modal.title} status={modal.status} />
      )}
      {toast && <Toast type={toast.type} message={toast.message} />}

      <Header />

      <SiteTitle />
      <Main.Main>
        <Routes>
          <Route path="/" element={<Bake />} />
          <Route path="/about" element={<About />} />
          <Route path="/pantry" element={<Pantry />} />
        </Routes>
      </Main.Main>

      <Footer>
        <PantryLink />
        <FooterNav />
      </Footer>
    </AppContainer>
  );
}

export default App;
