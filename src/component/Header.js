import React from "react";

const Header = () => (
  <div>
    <div>
      <a href="https://devoleum.com/" target="_blank" rel="noopener noreferrer">
        Devoleum
      </a>{" "}
      is a{" "}
      <a
        href="https://github.com/Devoleum"
        target="_blank"
        rel="noopener noreferrer"
      >
        open source
      </a>{" "}
      web app that organizes linked open data from physical or digital supply
      chains into authentic stories notarized on various blockchains. Here you can verify the stories showed on
      our platform notarized on Algorand.
    </div>
    <br />
    <div style={{wordBreak: 'break-all'}}>
      Donate to
      <br />
      ETH: 0xbf8d0d4be61De94EFCCEffbe5D414f911F11cBF8
      <br />
      ALGO: 5N22O3PIXAGNAGHBFSU6HQ22KGI4D3XEBACEFODVH3UOKCA4C2IBRD4ZDE
    </div>
    <br />
  </div>
);

export default Header;
