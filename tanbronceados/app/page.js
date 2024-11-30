import Head from "next/head";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../components/Navbar.js';
import Banner from "@/components/Banner.js";
import Footer from "@/components/Footer.js";
import Main from "@/components/Main.js";
import CallToActionRegister from "@/components/CallToActionRegister.js";


export default function Home() {
  return (
    <>
      <div className="landing is-preload">
        <Head>
          <title>TAN Bronceados</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="/styles/Home.css" />
          <link rel="stylesheet" href="/assets/css/fontawesome-all.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,300italic,400italic" />
        </Head>
        <div id="page-wrapper">
          <Navbar />
          <Banner />
          <Main />
          <CallToActionRegister />

          <Footer />
        </div>
      </div>
    </>
  );
}
