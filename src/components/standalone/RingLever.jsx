export default function Lever({
  sorted,
  onClick,
  widgetOutAnimation,
  widgetInAnimationLeft,
}) {

  const className = `${
    widgetOutAnimation ? widgetOutAnimation : widgetInAnimationLeft
  } ring-lever ring-lever-`;
  if (sorted) {
    return (
      <img
        src="/assets/ring-unsort.png"
        className={sorted ? className + "unsort" : ""}
        onClick={onClick}
      />
    );
  }
  return (
    <img
      src="/assets/ring-sort.png"
      className={!sorted ? className + "sort" : ""}
      onClick={onClick}
    />
  );
}
