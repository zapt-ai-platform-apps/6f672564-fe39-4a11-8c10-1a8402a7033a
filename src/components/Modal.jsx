function Modal(props) {
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {props.children}
      </div>
    </div>
  );
}

export default Modal;