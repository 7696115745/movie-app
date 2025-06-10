import { useEffect, useState } from "react";
import Loader from "../component/Loader";

export default function LoaderHandler() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const handleShow = () => setShowLoader(true);
    const handleHide = () => setShowLoader(false);

    document.addEventListener("loading-started", handleShow);
    document.addEventListener("loading-stopped", handleHide);
 
    return () => {
      document.removeEventListener("loading-started", handleShow);
      document.removeEventListener("loading-stopped", handleHide);
    };
  }, []);

  return showLoader ? <Loader /> : null;
}