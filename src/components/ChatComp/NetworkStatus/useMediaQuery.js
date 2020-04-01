import { useEffect, useState } from "react";
//import useMediaQuery from '@material-ui/core/useMediaQuery';

export function useMediaQuery(mediaQuery: string) {
  const mediaQueryList = window.matchMedia(mediaQuery);
  const [value, setValue] = useState(false);

  useEffect(() => {
    const mediaQueryListener = () => setValue(mediaQueryList.matches);

    mediaQueryList.addListener(() => mediaQueryListener);

    return () => mediaQueryList.removeListener(mediaQueryListener);
  }, [mediaQueryList]);

  return value;
}
