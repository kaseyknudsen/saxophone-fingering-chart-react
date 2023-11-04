import { useEffect, useRef } from "react";

const AddAudio = () => {
  const audioContextRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new AudioContext();

    return () => {
      audioContextRef.current.close();
    };
  }, []);

  const playSound = (audioPath) => {
    fetch(audioPath)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        audioContextRef.current.decodeAudioData(arrayBuffer)
      )
      .then((audioBuffer) => {
        const sourceNode = audioContextRef.current.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.connect(audioContextRef.current.destination);
        sourceNode.start();
      })
      .catch((err) => {
        console.error("Error with decoding audio data", err);
      });
  };

  const attachNoteClickListener = (ele, note) => {
    ele.addEventListener("click", () => playSound(note.audioPath));
    return () =>
      ele.removeEventListener("click", () => playSound(note.audioPath));
  };

  return attachNoteClickListener();
};

export default AddAudio;
