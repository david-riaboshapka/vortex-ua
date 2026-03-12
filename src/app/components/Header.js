"use client";

import Link from "next/link";
import { useModalStore } from '@/store/useModalStore';

const Header = () => {
  const openModal = useModalStore((state) => state.openModal);
  return (
    <header>
      <div className="container">
        <div className="planet-container" aria-hidden="true">
          <img className="planet-img" src="https://us8w2gtarj9lxoe8.public.blob.vercel-storage.com/header-planet%201.png" alt="planet_alt" data-translate-alt="planet_alt" />
          <img className="planet-line line2" src="https://us8w2gtarj9lxoe8.public.blob.vercel-storage.com/header-planet%202.png" alt="planet_line2_alt" data-translate-alt="planet_line2_alt" />
          <img className="planet-line line3" src="https://us8w2gtarj9lxoe8.public.blob.vercel-storage.com/header-planet%203.png" alt="planet_line3_alt" data-translate-alt="planet_line3_alt" />
        </div>
        <div className="hero-cont">
          <span>[VORTEX AGENCY...]</span>
          <h1>
            Minimalism<br></br>
            <span>Adaptivity</span><br></br>
            Mindfulness<br></br>
          </h1>
          <p>We create elegant, high-performance websites for brands that value clarity, speed, and substance.</p>
          <div className="btn-hero">
            <Link href='/projects' className="button light">Projects</Link>
            <button className="red" onClick={openModal}>Get in touch</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
