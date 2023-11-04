import Vex from "vexflow";
import { useEffect, useRef } from "react";
import AddNotes from "./AddNotes";
import noteArray from "./noteData";
import { addTickables } from "./addTickables";
import AddAudio from "../audio/AddAudio";
const { Renderer, Stave } = Vex.Flow;

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
      const renderer = new Renderer(
        notationRef.current.id,
        Renderer.Backends.SVG
      );
      renderer.resize(renderWidth, renderHeight);
      const context = renderer.getContext();
      const stave = new Stave(staveX, staveY, staveWidth)
        .addClef(clef)
        // .addTimeSignature(noteArray.length.toString() + "/4")
        .setContext(context)
        .draw();
      const notes = AddNotes(noteArray);
      addTickables(noteArray, notes, context, stave);

      return () => {
        notationRef.current.innerHTML = "";
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
