import Vex from "vexflow";
const { StaveNote, Formatter, Voice } = Vex.Flow;

export const AddNotes = (num_beats, beat_value, context, stave, notesArray) => {
  const notes = notesArray.map((note, idx) => {
    return new StaveNote({ keys: note.keys, duration: note.duration });
  });
  const voice = new Voice({ num_beats, beat_value });
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], 150);
  voice.draw(context, stave);
};

export default AddNotes;
