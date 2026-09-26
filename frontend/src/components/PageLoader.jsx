import "./PageLoader.css";

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader-spinner"></div>
      <span>LOADING...</span>
    </div>
  );
}

export default PageLoader;