import Vex from "vexflow";
const { Stave, Renderer, StaveNote, Voice, Formatter } = Vex.Flow;
import { useEffect, useRef, useState } from "react";
import noteArray from "./noteData";

const Test = () => {
  const noteRef = useRef(null);
  //   const audioContextRef = useRef(null);
  const [audioContext] = useState(() => new AudioContext());
  //   const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);

  useEffect(() => {
    const loadAudio = async () => {
      const response = await fetch(noteArray[13].audioPath);
      const arrayBuffer = await response.arrayBuffer();
      audioContext.decodeAudioData(arrayBuffer, (buffer) => {
        setAudioBuffer(buffer);
      });
    };

    loadAudio();
  }, [audioContext]);

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
      console.log(idx);
      svg.addEventListener("click", playAudio);
    });

    // cleanup Event listener for notes

    return () => {
      allSVGgs.forEach((svg) => {
        svg.removeEventListener("click", playAudio);
      });

      noteRef.current.innerHTML = "";
      //   audioContext.close();
    };
  }, []);
  //   const newContext = new AudioContext();

  //   /* create buffer source -> update state -> connect source to destination -> start source*/
  const playAudio = async () => {
    /* create AudioContext -> update context state -> fetch audio -> create AudioBuffer for MP3 file -> decode buffer -> update buffer state -> load audio*/
    if (audioBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      if (audioContext.state === "suspended") {
        await audioContext.resume(); // Resume the audio context on user interaction
      }
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
