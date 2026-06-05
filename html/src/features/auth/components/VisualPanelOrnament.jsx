const VisualPanelOrnament = () => (
  <svg
    className="vp-ornament"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="1" />
    <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="1" />
    <circle cx="200" cy="200" r="110" stroke="white" strokeWidth="1" />
    <circle cx="200" cy="200" r="70" stroke="white" strokeWidth="1.5" />
    <circle cx="200" cy="200" r="30" fill="white" fillOpacity="0.3" />
    <path
      d="M200 10 L200 390 M10 200 L390 200 M59 59 L341 341 M341 59 L59 341"
      stroke="white"
      strokeWidth="0.5"
    />
    <g fill="white" fillOpacity="0.6">
      <circle cx="200" cy="20" r="4" />
      <circle cx="200" cy="380" r="4" />
      <circle cx="20" cy="200" r="4" />
      <circle cx="380" cy="200" r="4" />
      <circle cx="66" cy="66" r="3" />
      <circle cx="334" cy="66" r="3" />
      <circle cx="66" cy="334" r="3" />
      <circle cx="334" cy="334" r="3" />
    </g>
    <text x="200" y="208" textAnchor="middle" fontSize="28" fill="white" fillOpacity="0.6">
      ♥
    </text>
  </svg>
);

export default VisualPanelOrnament;
