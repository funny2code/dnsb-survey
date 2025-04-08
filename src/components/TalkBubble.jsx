import "../css/TalkBubble.css";
export default function TalkBubble({ props }) {
  return (
    <div className="container-svg">
      <img className="image-svg" src="/assets/Artboard 1 1.svg" />
      <div className="talk-bubble-content">{props}</div>
    </div>
  );
}
