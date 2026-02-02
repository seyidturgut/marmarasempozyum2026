import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LiveEvents from './components/LiveEvents';
import About from './components/About';
import Events from './components/Events';
import Speakers from './components/Speakers';
import GuestOfHonor from './components/GuestOfHonor';
import Location from './components/Location';
import Stakeholders from './components/Stakeholders';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <LiveEvents />
      <Events />
      <Speakers />
      <GuestOfHonor />
      <Location />
      <Stakeholders />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
