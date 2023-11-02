import CreateMeasure from "./CreateMeasure";
const Notate = () => {

  return (
    <CreateMeasure
      renderWidth={900}
      renderHeight={250}
      staveX={110}
      staveY={60}
      staveWidth={275}
      clef={"treble"}
      timeSignature={"4/4"}
    />
  );
};

export default Notate;
