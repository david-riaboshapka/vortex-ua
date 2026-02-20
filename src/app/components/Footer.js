'use client';

import Link from 'next/link';
export default function Footer() {

  return (
    <footer>
      <div className="container">
        <Link href="/">VORTEX AGENCY</Link>
        <span>© 2024–2025 VORTEX AGENCY</span>

        <div className="cont-mess">
          <Link href='https://t.me/web_client0'>
            <img
              src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/Telegram.svg"
              alt="Telegram"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
