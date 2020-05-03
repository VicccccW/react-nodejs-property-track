import React, { useEffect } from 'react';
import { useGlobalState } from '../hooks/globalHook';
import SLDSGreyBoxWrap from './SLDSGreyBoxWrap';
import SLDSGreyBox from './SLDSGreyBox';
import NoAuth from './NoAuth';

function PropertyMap() {

  const intro = `Below is a LWC using lightning out technique and expose to this react component.`;

  const { auth } = useGlobalState();

  async function renderLWC() {
    const baseScriptElement = document.createElement('script');
    const baseScriptSrc = await fetch('/api/auth/propertyMapBaseScriptUrl')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (baseScriptSrc) {
      baseScriptElement.src = `${baseScriptSrc}`;
      document.body.appendChild(baseScriptElement);
    }

    // // return () => {
    // //   document.body.removeChild(baseScript);
    // // }

    const ltnoutScriptElement = document.createElement('script');
    const ltnoutScript = await fetch('/api/auth/propertyMapLtnOutJs')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    ltnoutScriptElement.innerText = `${ltnoutScript}`;
    document.body.appendChild(ltnoutScriptElement);
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      renderLWC();
    }
  }, []);

  return (
    <>
      {auth.isLoggedIn ? (
        <>
          <SLDSGreyBoxWrap>
            <SLDSGreyBox detail={intro} />
          </SLDSGreyBoxWrap>
          <div id="propertyMap"></div>
        </>
      ) : (
          <NoAuth />
        )}
    </>
  );
}

export default PropertyMap;
