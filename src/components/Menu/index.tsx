import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from '../Hamburger';
import Toggle from '@choco-cat/react-toggle';
import cl from './menu.module.scss';

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  const chooseLang = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('choose Lang', e.target.checked);
  };

  return (
    <div ref={node}>
      <nav className={`${cl.usermenu} ${open ? cl['usermenu-open'] : ''}`}>
        <Link onClick={() => close()} className={cl.usermenu_button} to="/login">
          Login
        </Link>
        <Link onClick={() => close()} className={cl.usermenu_button} to="/signup">
          Sign Up
        </Link>
        <Link onClick={() => close()} className={cl.usermenu_button} to="/profile">
          Edit profile
        </Link>
        <Link onClick={() => close()} className={cl.usermenu_button} to="">
          New board
        </Link>
        <label className="react-toggle-label">
          <Toggle
            defaultChecked={false}
            icons={{ checked: 'en', unchecked: 'ru' }}
            onChange={chooseLang}
          />
        </label>
      </nav>
      <Hamburger open={open} setOpen={setOpen} />
    </div>
  );
};

export default Menu;
