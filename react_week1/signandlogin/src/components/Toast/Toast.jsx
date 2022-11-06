import "./Toast.css";
import "../SignupForm/SignupForm.css";
export function Toast({ toast, hideToastBar }) {
  return (
    <div className={`toast ${toast.isVisible}`}>
      {toast.message}
      <button className="icon--button" onClick={() => hideToastBar()}>
        <em className="fa fa-xmark icon--xmark"></em>
      </button>
    </div>
  );
}
