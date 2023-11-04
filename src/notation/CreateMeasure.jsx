import Vex, { StaveNote } from "vexflow";
import { useEffect, useRef, useState } from "react";
import AddNotes from "./AddNotes";
import AddModifier from "./AddModifier";
import noteArray from "./noteData";
const { Renderer, Stave, Accidental, Voice, Formatter } = Vex.Flow;

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

  const noteArray = [
    { keys: ["a#/3"], duration: "q", accidental: "#" },
    { keys: ["b/3"], duration: "q" },
    { keys: ["c/4"], duration: "q" },
    { keys: ["c#/4"], duration: "q", accidental: "#" },
    { keys: ["d/4"], duration: "q" },
    { keys: ["d#/4"], duration: "q", accidental: "#" },
    { keys: ["e/4"], duration: "q" },
    { keys: ["f/4"], duration: "q" },
    { keys: ["f#/4"], duration: "q", accidental: "#" },
    { keys: ["g/4"], duration: "q" },
    { keys: ["g#/4"], duration: "q", accidental: "#" },
    { keys: ["a/4"], duration: "q" },
    { keys: ["a#/4"], duration: "q", accidental: "#" },
    { keys: ["b/4"], duration: "q" },
    { keys: ["b/4"], duration: "q" },
    { keys: ["c/5"], duration: "q" },
    { keys: ["c/5"], duration: "q" },
    { keys: ["c#/5"], duration: "q", accidental: "#" },
    { keys: ["d/5"], duration: "q" },
    { keys: ["d#/5"], duration: "q", accidental: "#" },
    { keys: ["e/5"], duration: "q" },
    { keys: ["f/5"], duration: "q" },
    { keys: ["f#/5"], duration: "q", accidental: "#" },
    { keys: ["g/5"], duration: "q" },
    { keys: ["g#/5"], duration: "q", accidental: "#" },
    { keys: ["a/5"], duration: "q" },
    { keys: ["a#/5"], duration: "q", accidental: "#" },
    { keys: ["b/5"], duration: "q" },
    { keys: ["c/6"], duration: "q" },
    { keys: ["c#/6"], duration: "q", accidental: "#" },
    { keys: ["d/6"], duration: "q" },
    { keys: ["d#/6"], duration: "q", accidental: "#" },
    { keys: ["e/6"], duration: "q" },
    { keys: ["f/6"], duration: "q" },
    { keys: ["f#/6"], duration: "q", accidental: "#" },
  ];

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
        .addTimeSignature(timeSignature)
        .setContext(context)
        .draw();

      //   const notes = [new StaveNote({ keys: noteArray[0].keys, duration: noteArray[0].duration })];
      const notes = noteArray.map((note, idx) => {
        const newNote = new StaveNote({
          keys: note.keys,
          duration: note.duration,
        });
        if (note.accidental) {
          newNote.addModifier(new Accidental(note.accidental));
        }
        return newNote;
      });
      const voice = new Voice({ num_beats: noteArray.length, beat_value: 4 });
      voice.addTickables(notes);
      new Formatter().joinVoices([voice]).format([voice], 350);
      voice.draw(context, stave);
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
