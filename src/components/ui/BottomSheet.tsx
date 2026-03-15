import { useSpring, animated } from "@react-spring/web";
import { useCallback, useState, type ReactNode } from "react";

interface BottomSheetProps {
  onClose: () => void;
  children: (close: () => void) => ReactNode;
}

const BottomSheet = ({ onClose, children }: BottomSheetProps) => {
  const [terminate, setTerminate] = useState(false);

  const springs = useSpring({
    from: { height: terminate ? "60%" : "0", opacity: terminate ? "1" : "0" },
    to: { height: terminate ? "0" : "60%", opacity: terminate ? "0" : "1" },
  });

  const deemSprings = useSpring({
    from: { opacity: terminate ? 0.2 : 0 },
    to: { opacity: terminate ? 0 : 0.2 },
  });

  const close = useCallback(() => {
    setTerminate(true);
    setTimeout(() => {
      onClose();
    }, 500);
  }, [onClose]);

  return (
    <div>
      <animated.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000",
          ...deemSprings,
        }}
        onClick={close}
      />
      <animated.div
        style={{
          width: "470px",
          padding: "40px 0px",
          borderRadius: "10px 10px 0 0",
          position: "absolute",
          overflow: "hidden",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          ...springs,
        }}
      >
        {children(close)}
      </animated.div>
    </div>
  );
};

export default BottomSheet;
