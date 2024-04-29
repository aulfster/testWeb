import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/stackline_logo.svg';
import './header.css';

function Header(): JSX.Element {
  const [headerWidth, setHeaderWidth] = useState<number>(0);
  const resizeTimer = useRef<number>();

  const updateHeaderWidth = (): void => {
    const contentContainer = document.querySelector(
      '.App'
    ) as HTMLElement | null;
    if (contentContainer) {
      setHeaderWidth(contentContainer.scrollWidth);
    }
  };

  const debounce = (func: () => void, delay: number): (() => void) => {
    return () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = window.setTimeout(() => {
        func();
      }, delay);
    };
  };

  useEffect(() => {
    updateHeaderWidth();
    const debouncedResize = debounce(updateHeaderWidth, 200);
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer.current); // Clear the timer when the component unmounts
    };
  }, []);

  const headerStyle: React.CSSProperties = {
    width: `${headerWidth}px`,
  };

  return (
    <header className='header' style={headerStyle}>
      <Logo className='logo' />
    </header>
  );
}

export default Header;
