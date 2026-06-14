/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Topbar, Banner, Hero, Services, Stats, Payments, FloatingWhatsApp } from './LandingPage';

export default function App() {
  return (
    <div className=" min-h-screen font-sans overflow-x-hidden">
      <main className="w-full relative">
        <Hero />
        <Services />
        <Stats />
        <Payments />
      </main>
      <FloatingWhatsApp />
    </div>
  );
}
