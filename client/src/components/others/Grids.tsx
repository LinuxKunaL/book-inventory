import maskGrid from "@assets/maskGrid.svg";
import perspectiveGrid from "@assets/perspectiveGrid.png";

type Props = {
  variant: "perspective" | "mask";
  height?: string;
};

function Grids({ variant, height }: Props) {
  if (variant === "perspective") {
    return (
      <img
        src={perspectiveGrid}
        className="absolute dark:opacity-25 self-center md:min-w-auto min-w-[50pc]"
        alt="grid perspective"
      />
    );
  }

  if (variant === "mask") {
    return (
      <img
        src={maskGrid}
        alt="grid mask"
        style={{ height }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 object-cover opacity-75 dark:opacity-50 invert-[90%] dark:invert-[20%] z-0 min-w-[50pc]"
      />
    );
  }
}

export default Grids;
