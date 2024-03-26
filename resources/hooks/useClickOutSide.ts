import { useEffect } from "react";

export const useClickOutSide = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    if (
      e.target.dataset.value == "account" ||
      e.target.dataset.value == "accDropdown" ||
      e.target.dataset.value == "search" ||
      e.target.dataset.value == "searchDropdown"
    ) {
      return;
    }
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};
