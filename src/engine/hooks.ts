import { useEffect, useState, useRef } from 'react';
import { director, DirectorState } from './director';

export function useDirectorSubscribe(callback: (state: DirectorState) => void) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    return director.subscribe((state) => {
      cbRef.current(state);
    });
  }, []);
}

export function useWindowDimensions() {
  const [dim, setDim] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 820 : false,
  });

  useEffect(() => {
    const handleResize = () => {
      setDim({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 820,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dim;
}

