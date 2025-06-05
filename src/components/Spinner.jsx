import { BarLoader } from "react-spinners";

const Spinner = () => {
  return (
    <BarLoader
      color="#2b7fff"
      size={20}
      cssOverride={{ margin: "48px auto", textAlign: "center" }}
      loading={true}
    />
  );
};

export default Spinner;
