import Modal from './Modal';

function CustomerFormContent(props) {
  const { customer, setCustomer, loading, handleSubmit, onClose } = props;

  return (
    <Modal>
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Add New Customer</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={customer().name}
          onInput={(e) => setCustomer({ ...customer(), name: e.target.value })}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={customer().phone}
          onInput={(e) => setCustomer({ ...customer(), phone: e.target.value })}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={customer().email}
          onInput={(e) => setCustomer({ ...customer(), email: e.target.value })}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            class={`px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            } cursor-pointer`}
            disabled={loading()}
          >
            {loading() ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CustomerFormContent;