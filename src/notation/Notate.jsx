import { useRef, useEffect } from "react";
import Vex from "vexflow";
const { Factory } = Vex.Flow;

const Notate = () => {
  const notationRef = useRef(null); // Using a ref to reference the div.

  useEffect(() => {
    if (notationRef.current) {
      const vf = new Factory({
        renderer: {
          elementId: notationRef.current.id,
          width: 900,
          height: 200,
        },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [
            score.voice(score.notes("C#5/q, B4, A4, G#4", { stem: "up" })),
          ],
        })
        .addClef("treble")
        .addTimeSignature("4/4");

      vf.draw(); // Ensure you call this to render the notation.
    }

    // Optional: Cleanup function if needed on unmount.
  }, []); // The empty dependency array means this useEffect runs once when the component is mounted and the cleanup runs when it's unmounted.

  return (
    <div ref={notationRef} id="notation-root">
    </div>
  );
};

export default Notate;
