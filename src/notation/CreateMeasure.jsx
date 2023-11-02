import Vex from "vexflow";
import { useEffect, useRef } from "react";
import AddNotes from "./AddNotes";
const { Renderer, Stave } = Vex.Flow;

const CreateMeasure = () => {
  const notationRef = useRef(null);

  useEffect(() => {
    if (notationRef.current) {
      const renderer = new Renderer(
        notationRef.current.id,
        Renderer.Backends.SVG
      );
      renderer.resize(900, 250);
      const context = renderer.getContext();
      const stave = new Stave(110, 60, 275);
      stave.addClef("treble").addTimeSignature("4/4");
      stave.setContext(context).draw();

      AddNotes(1, 4, 150, context, stave, ["c/4"], "q");

      return () => {
        if (notationRef.current) {
          notationRef.current.innerHTML = "";
        }
      };
    }
  }, []);

  return (
    <>
      <div ref={notationRef} id="notation-root"></div>
    </>
  );
};

export default CreateMeasure;
