import Navbar from "../components/Layout/Navbar";
import "../styles/Style.scss";

import Providers from './providers'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
      <div className="flex min-h-screen flex-col justify-between ">
        <Providers>
          <header>
              {/* <MainAlert/> */}
              <Navbar />
          </header>
          <main>
            {children}
          </main>
        </Providers>
      </div>
      </body>
    </html>
  )
}
