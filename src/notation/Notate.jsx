import CreateMeasure from "./CreateMeasure";
const Notate = () => {
  return (
    <CreateMeasure
      renderWidth={900}
      renderHeight={450}
      staveX={110}
      staveY={60}
      staveWidth={1200}
      clef={"treble"}
    />
  );
};

export default Notate;
