import Vex from "vexflow";
import AddAudio from "../audio/AddAudio";

const { StaveNote, Accidental } = Vex.Flow;

export const AddNotes = (noteArray) => {
  return noteArray.map((note, idx) => {
    const newNote = new StaveNote({
      keys: note.keys,
      duration: note.duration,
    });
    if (note.accidental) {
      newNote.addModifier(new Accidental(note.accidental));
    }
    <AddAudio />
    return newNote;
  });
};

export default AddNotes;
