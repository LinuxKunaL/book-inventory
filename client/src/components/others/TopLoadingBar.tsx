import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";

function TopLoadingBar() {
  const loading = useSelector((state: any) => state.loadingSlice);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (loading) {
      ref.current?.continuousStart();
    } else {
      ref.current?.complete();
    }
  }, [loading]);

  return <LoadingBar  ref={ref} height={3} color="crimson" />;
}

export default TopLoadingBar;
