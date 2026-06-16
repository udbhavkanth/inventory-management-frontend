function SuccessMessage({ message, onDismiss }) {
  if (!message) {
    return null;
  }

  return (
    <div className="success-message" role="status" aria-live="polite">
      <p className="success-message__text">{message}</p>
      {onDismiss && (
        <button
          type="button"
          className="success-message__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss success message"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

export default SuccessMessage;
