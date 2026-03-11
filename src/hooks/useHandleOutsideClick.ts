import { type RefObject, useEffect } from "react";

export const useHandleOutsideClick = ({
  ref,
  onClose,
}: {
  ref: RefObject<HTMLElement | null>;
  onClose: () => void;
}) => {
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        (e.target as HTMLElement).id !== "addBtn"
      ) {
        onClose();
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, onClose]);
};
