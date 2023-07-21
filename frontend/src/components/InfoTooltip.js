import error from "../images/error.svg";
import success from "../images/success.svg";

export default function InfoTooltip({ isSuccessfull, title, onClose, isOpen }) {
  return (
    <div className={`popup popup_tool ${isOpen ? "popup_opened" : ""}`} >
      <div className="popup__container">
        <img src={isSuccessfull ? success : error} className="popup__tool_image" />
        <h2 className="popup__tool_title">
          {title}
        </h2>
        <button
          className="popup__close" onClick={onClose}
        />
      </div>
    </div>
  )
}