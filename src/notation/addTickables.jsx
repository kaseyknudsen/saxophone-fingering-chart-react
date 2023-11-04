import { Voice, Formatter } from "vexflow";

export const addTickables = (noteArray, notes, context, stave) => {
  const voice = new Voice({ num_beats: noteArray.length, beat_value: 4 });
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], 350);
  voice.draw(context, stave);
};
