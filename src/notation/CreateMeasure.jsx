import Vex from "vexflow";
import { useEffect, useRef, useState } from "react";
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
  const [vexContext, setVexContext] = useState(null);
  const [vexStave, setVexStave] = useState(null);

  useEffect(() => {
    if (notationRef.current) {
      
      const renderer = new Renderer(
        notationRef.current.id,
        Renderer.Backends.SVG
      );
      const context = renderer.getContext();
      renderer.resize(renderWidth, renderHeight);
      setVexContext(renderer.getContext());
      const stave = new Stave(staveX, staveY, staveWidth)
        .addClef(clef)
        .addTimeSignature(timeSignature)
        .setContext(context)
        .draw();
      setVexContext(context);
      setVexStave(stave);

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
      <div ref={notationRef} id="notation-root">
        <AddNotes
          num_beats={noteArray.length}
          beat_value={4}
          context={vexContext}
          stave={vexStave}
          notesArray={noteArray}
        />
      </div>
    </>
  );
};

export default CreateMeasure;
