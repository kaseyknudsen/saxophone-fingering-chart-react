import Vex from "vexflow";
import { useEffect, useRef } from "react";
import AddNotes from "./AddNotes";
import AddModifier from "./AddModifier";
import noteArray from "./noteData";
const { Renderer, Stave, Accidental } = Vex.Flow;
const CreateMeasure = ({
  renderWidth,
  renderHeight,
  staveX,
  staveY,
  staveWidth,
  clef,
  timeSignature,
}) => {
  const notationRef = useRef(null);

  useEffect(() => {
    if (notationRef.current) {
      console.log(noteArray);
      const renderer = new Renderer(
        notationRef.current.id,
        Renderer.Backends.SVG
      );
      renderer.resize(renderWidth, renderHeight);
      const context = renderer.getContext();
      const stave = new Stave(staveX, staveY, staveWidth);
      stave.addClef(clef).addTimeSignature(timeSignature);
      stave.setContext(context).draw();

      AddNotes(10, 4, context, stave, noteArray);

      return () => {
        if (notationRef.current) {
          notationRef.current.innerHTML = "";
        }
      };
    }
  }, [
    renderWidth,
    renderHeight,
    staveX,
    staveY,
    staveWidth,
    clef,
    timeSignature,
  ]);

  return (
    <>
      <div ref={notationRef} id="notation-root"></div>
    </>
  );
};

export default CreateMeasure;
