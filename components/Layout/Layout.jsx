import dynamic from "next/dynamic";
import Head from "next/head";
const MainAlert = dynamic(
    () => import('./MainAlert'),
    { ssr: false }
)
// import { ToastContainer } from "react-toastify";
// import { Menu } from "@headlessui/react";
// import "react-toastify/dist/react-toastify.css";

// import DropdownLink from "../DropdownLink";
// import Navbar from "./Navbar";
const Navbar = dynamic(
    () => import('./Navbar'),
    { ssr: false }
)
// import { Open_Sans } from "@next/font/google";
// const open_Sans = Open_Sans({
//     weight: '400',
//     subsets: ['latin'],

// });
export default function Layout({ title, children })
{
    // const { status, data: session } = useSession();



    // const logoutClickHandler = () => {
    //   Cookies.remove("cart");
    //   dispatch({ type: "CART_RESET" });
    //   signOut({ callbackUrl: "/login" });
    // };
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
