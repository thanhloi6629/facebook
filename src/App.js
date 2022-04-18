import logo from './logo.svg';
import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import {CSSTransition} from 'react-transition-group';

const Navbar = (props) => {
  return  (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  )
}

const NavItem = (props) => {
  const [open, setOpen]= useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}> 
      {props.icon}
      </a> 
      {open && props.children}
    </li>
  )
}

const DropDownMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  const dropdownRef = useRef(null);


  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  const calcHeight =(el) =>{
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const DropDownItem = (props) =>{
    return (
      <a href='#' className='menu-item' onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className='icon-button'>{props.leftIcon}</span>
            {props.children}
          <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }
  return (
    <div className='dropdown' style={{height: menuHeight}} ref={dropdownRef}>
      <CSSTransition 
        in={activeMenu ==='main'}
        unmountOnExit
        timeout={500}
        classNames='menu-primary'
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropDownItem>My profile</DropDownItem>
          <DropDownItem 
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon/>}
            goToMenu="settings"
          >
            Setting
         </DropDownItem>
        </div>
      </CSSTransition>

      <CSSTransition 
        in={activeMenu ==='settings'}
        unmountOnExit
        timeout={500}
        classNames='menu-secondary'
        onEnter={calcHeight}

      >
        <div className='menu'>
          <DropDownItem 
            leftIcon={<ArrowIcon />}
            goToMenu="main"
          />

         <DropDownItem leftIcon={<CogIcon />}> Settings</DropDownItem>
         <DropDownItem>Setting 1</DropDownItem>
         <DropDownItem>Setting 1</DropDownItem>

        </div>
      </CSSTransition>
      
    </div>
  )

}


function App() {
  return (
      <Navbar>
        <NavItem icon={<PlusIcon/>}></NavItem>
        <NavItem icon="😍"></NavItem>

        <NavItem icon={<BellIcon/>}></NavItem>
        <NavItem icon={<MessengerIcon/>}></NavItem>
        <NavItem icon={<CaretIcon/>}>
           <DropDownMenu />
        </NavItem>
       

      </Navbar>
  );
}

export default App;
