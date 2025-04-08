import "../css/EdgeStanding.css";
export default function EdgeStanding({ src, alt, className }) {
  return (
    <div className="edge-standing">
      <img src={src} alt={alt} className={className} />
    </div>
  );
}
