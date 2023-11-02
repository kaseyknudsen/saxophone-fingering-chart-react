import Vex from "vexflow";
const { Accidental } = Vex.Flow;

const AddModifier = ({ note, accidental }) => {
  note.addModifier(new Accidental(accidental));
};

export default AddModifier;
