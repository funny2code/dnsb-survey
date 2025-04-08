export default function timerArrow(percentage) {
  let arrowColor, timerLabel;

  if (percentage <= 100) {
    arrowColor = "#5DFFA2";
    timerLabel = "MOVER";
  }
  if (percentage <= 95) {
    arrowColor = "#845300";
    timerLabel = "LAGGARD";
  }
  if (percentage <= 70) {
    arrowColor = "#FFF400";
    timerLabel = "ARCHETYPE";
  }
  if (percentage <= 20) {
    arrowColor = "#9BAAEF";
    timerLabel = "TOAST";
  }
  if (percentage <= 1) {
    arrowColor = "#9BAAEF";
    timerLabel = "DANDY";
  }

  return { arrowColor, timerLabel };
}
