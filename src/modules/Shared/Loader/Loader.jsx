import "./Loader.css";
// Props:
// fullScreen: cover viewport height
// height: custom fixed height region (overrides default padding variant)
// label: optional text under spinner
const Loader = ({ fullScreen = false, height, label }) => {
  const style = {};
  if (height) {
    const hValue = typeof height === "number" ? `${height}px` : height;
    style.minHeight = hValue;
    style.height = hValue;
  }
  const baseFlex = "d-flex justify-content-center align-items-center w-100";
  const classes = fullScreen
    ? baseFlex + " min-vh-100"
    : height
    ? baseFlex
    : baseFlex;
  if (!fullScreen && !height) style.padding = "3rem 0";
  return (
    <div className={classes} style={style} aria-busy="true" aria-live="polite">
      <div className="text-center">
        <div className="loader mx-auto mb-3" />
        {label && <div className="text-muted small fw-semibold">{label}</div>}
      </div>
    </div>
  );
};

export default Loader;
