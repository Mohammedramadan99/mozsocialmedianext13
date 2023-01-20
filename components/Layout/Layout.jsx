import dynamic from "next/dynamic";
import Head from "next/head";
const MainAlert = dynamic(
    () => import('./MainAlert'),
    { ssr: false }
)
const Navbar = dynamic(
    () => import('./Navbar'),
    { ssr: false }
)
export default function Layout({ title, children })
{
    return (
        <>
            <Head>
                <title>Moz SM</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="flex min-h-screen flex-col justify-between ">
                    <header>
                        <MainAlert/>
                        <Navbar />
                    </header>
                    <main>{children}</main>
            </div>
        </>
    );
}
