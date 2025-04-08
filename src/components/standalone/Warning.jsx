import React, { useEffect, useState } from "react";
import "../../css/Warning.css";

export default function Warning({ message, style }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (!visible) return null;

  return <div className={style}>{message}</div>;
}
