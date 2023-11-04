import Vex from "vexflow";
const { Stave, Accidental, Renderer, StaveNote, Voice, Formatter } = Vex.Flow;
import { useEffect, useRef } from "react";
import B from "../audio/chr_scale/Middle-B.mp3";

const Test = () => {
  const noteRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    //create staff
    const renderer = new Renderer(noteRef.current, Renderer.Backends.SVG);
    renderer.resize(600, 600);
    const context = renderer.getContext();
    const stave = new Stave(10, 40, 400);
    stave.addClef("treble").setContext(context).draw();
    const note = [new StaveNote({ keys: ["b/4"], duration: "q" })];
    const voice = new Voice({ num_beats: 1, beat_value: 4 });
    voice.addTickables(note);
    new Formatter().joinVoices([voice]).format([voice], 150);
    voice.draw(context, stave);
    //add audio
    audioContextRef.current = new AudioContext();
    return () => {
      noteRef.current.innerHTML = "";
    };
  }, []);

  return (
    <>
      <div ref={noteRef} id="notation-root"></div>
    </>
  );
};

export default Test;
//sax-fingering-chart/src/audio/alto_sax_chromatic_scale /Low-Bb.mp3
