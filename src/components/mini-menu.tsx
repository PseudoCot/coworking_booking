import { MouseEvent as ReactMouseEvent, PropsWithChildren, RefObject, useEffect, useState } from 'react';

type MiniMenuProps = PropsWithChildren<{
  menuBtnClasses: string;
  menuClasses: string;

  rootRef: RefObject<HTMLDivElement>;
}>;

export default function MiniMenu({ menuBtnClasses = '', menuClasses = '', rootRef, children }: MiniMenuProps): JSX.Element {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleButtonClick = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsMenuOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !rootRef.current?.contains(e.target)) {
        setIsMenuOpened(false);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [rootRef]);

  return (
    <>
      <button className={`${menuBtnClasses} mini-menu-btn btn-reset`} onClick={handleButtonClick}>
        <span className="mini-menu-btn-dot" />
        <span className="mini-menu-btn-dot" />
        <span className="mini-menu-btn-dot" />
      </button>
      <div className={`${menuClasses} ${isMenuOpened ? 'mini-menu--opened' : ''} mini-menu`}>
        {children}
      </div>
    </>
  );
}
