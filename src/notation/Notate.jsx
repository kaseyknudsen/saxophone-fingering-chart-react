import { useRef, useEffect } from "react";
import { Vex } from "vexflow";
const { Renderer, Stave } = Vex.Flow;

const Notate = () => {
  const notationRef = useRef(null); // Using a ref to reference the div.

  useEffect(() => {
    if (notationRef.current) {
      //sets up space to render music
      const renderer = new Renderer(
        notationRef.current.id,
        Renderer.Backends.SVG
      );
      renderer.resize(900, 250);
      //context does the drawing
      const context = renderer.getContext();
      //x, y, width
      const stave = new Stave(110, 60, 200);
      stave.addClef("treble");
      stave.setContext(context).draw();
    }

    // Optional: Cleanup function if needed on unmount.
    return () => {
      if (notationRef.current) {
        notationRef.current.innerHTML = ""; // Clear the notation.
      }
    };
  }, []); // The empty dependency array means this useEffect runs once when the component is mounted and the cleanup runs when it's unmounted.

  return (
    <>
      <div ref={notationRef} id="notation-root"></div>
    </>
  );
};

export default Notate;
