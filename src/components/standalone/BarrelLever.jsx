import "../../css/barrelLever.css";
export default function Lever({ isDescending, onClick, widgetInAnimation, widgetOutAnimation }) {
  const className = `${widgetOutAnimation ? widgetOutAnimation : widgetInAnimation} barrel-lever barrel-lever-`;
  if (isDescending) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}/assets/sorted.svg`}
        className={isDescending ? className + "sort" : ""}
        onClick={onClick}
      />
    );
  }
  return (
    <img
      src={`${import.meta.env.BASE_URL}/assets/unsorted.svg`}
      className={!isDescending ? className + "unsort" : ""}
      onClick={onClick}
    />
  );
}
