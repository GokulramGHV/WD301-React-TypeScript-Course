import { ActiveLink, Link } from 'raviger';
import React from 'react';
import logo from './logo.svg';

export default function Header() {
  return (
    <div className="flex items-center m-1">
      <img
        src={logo}
        className="animate-spin w-16 h-16"
        alt="logo"
        style={{ animation: 'spin 2s linear infinite' }}
      />
      <ActiveLink
        className="text-center text-xl mr-1 font-worksans rounded-full px-4 py-2 hover:bg-slate-200 smooth-effect"
        href="/"
        exactActiveClass="text-blue-500"
      >
        Home
      </ActiveLink>
      <ActiveLink
        className="text-center text-xl mr-1 font-worksans rounded-full px-4 py-2 hover:bg-slate-200 smooth-effect"
        href="/about"
        exactActiveClass="text-blue-500"
      >
        About
      </ActiveLink>

      <div></div>
    </div>
  );
}
