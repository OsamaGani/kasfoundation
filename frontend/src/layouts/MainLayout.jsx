import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import FloatingActions from "../components/FloatingActions";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";

function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleCopy = (event) => {
      event.preventDefault();
    };

    const handleCut = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      // F12
      if (event.key === "F12") {
        event.preventDefault();
        return;
      }

      // Ctrl + Shift + I
      if (
        event.ctrlKey &&
        event.shiftKey &&
        key === "i"
      ) {
        event.preventDefault();
        return;
      }

      // Ctrl + Shift + J
      if (
        event.ctrlKey &&
        event.shiftKey &&
        key === "j"
      ) {
        event.preventDefault();
        return;
      }

      // Ctrl + Shift + C
      if (
        event.ctrlKey &&
        event.shiftKey &&
        key === "c"
      ) {
        event.preventDefault();
        return;
      }

      // Ctrl + U
      if (
        event.ctrlKey &&
        key === "u"
      ) {
        event.preventDefault();
        return;
      }
    };

    document.addEventListener(
      "contextmenu",
      handleContextMenu
    );

    document.addEventListener(
      "copy",
      handleCopy
    );

    document.addEventListener(
      "cut",
      handleCut
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "contextmenu",
        handleContextMenu
      );

      document.removeEventListener(
        "copy",
        handleCopy
      );

      document.removeEventListener(
        "cut",
        handleCut
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="website">
      {loading && <PageLoader />}

      <Navbar />

      <main className="page-content">
        <Outlet />
      </main>

      <FloatingActions />

      <Footer />
    </div>
  );
}

export default MainLayout;