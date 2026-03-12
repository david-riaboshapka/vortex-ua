
import "../../public/styles/reset.css";
import "../../public/styles/variable.css";
import "./globals.css";
import Providers from "./providers";

import Nav from './components/Nav';
import Modal from './components/Modal';


export const metadata = {
  title: 'Vortex Agency', // Название вкладки в браузере
  description: 'professional website development', // Описание для Google
  icons: {
    icon: 'https://us8w2gtarj9lxoe8.public.blob.vercel-storage.com/favicon-16x16-1.jpg', // Путь к вашей иконке
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className='wrapper'>
          <Nav />
          
          <Modal />
          {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
