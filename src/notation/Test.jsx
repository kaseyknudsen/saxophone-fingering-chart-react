import Vex from "vexflow";
const { Stave, Accidental, Renderer, StaveNote, Voice, Formatter } = Vex.Flow;
import { useEffect, useRef, useState } from "react";
import noteArray from "./noteData";

const Test = () => {
  const noteRef = useRef(null);
  //   const audioContextRef = useRef(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);

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

    // Event listener for notes
    const allSVGgs = noteRef.current.querySelectorAll("svg g.vf-notehead");
    allSVGgs.forEach((svg, idx) => {
      svg.addEventListener("click", playAudio);
    });
    /* create AudioContext -> update context state -> fetch audio -> create AudioBuffer for MP3 file -> decode buffer -> update buffer state -> load audio*/
    const newContext = new AudioContext();
    setAudioContext(newContext);
    const loadAudio = async () => {
      const response = await fetch(noteArray[13].audioPath); // The path to your MP3 file
      const arrayBuffer = await response.arrayBuffer();
      newContext.decodeAudioData(arrayBuffer, (buffer) => {
        setAudioBuffer(buffer);
      });
    };

    loadAudio();

    // cleanup Event listener for notes

    return () => {
      allSVGgs.forEach((svg) => {
        svg.removeEventListener("click", playAudio);
      });
      if (audioContext) {
        audioContext.close();
      }
      noteRef.current.innerHTML = "";
    };
  }, []);

  /* create buffer source -> update state -> connect source to destination -> start source*/
  const playAudio = () => {
    if (audioContext && audioBuffer) {
      // Create a buffer source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination); // Connect to the speakers
      source.start(0); // Play the sound now
    }
  };

  return (
    <>
      <div ref={noteRef} id="notation-root"></div>
    </>
  );
};

export default Test;
