import Vex from "vexflow";

const { StaveNote, Formatter, Voice } = Vex.Flow;

const AddNotes = (
  num_beats,
  beat_value,
  width_between_notes,
  context,
  stave,
  keys,
  duration
) => {
  const notes = [new StaveNote({ keys, duration })];
  const voice = new Voice({ num_beats, beat_value });
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], width_between_notes);
  voice.draw(context, stave);
  return { notes, voice };
};

export default AddNotes;
