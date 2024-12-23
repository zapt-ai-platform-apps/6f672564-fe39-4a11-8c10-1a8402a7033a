import { createSignal } from 'solid-js';
import CustomerFormContent from './CustomerFormContent';

function CustomerForm(props) {
  const [customer, setCustomer] = createSignal({
    name: '',
    phone: '',
    email: '',
  });

  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/saveCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer()),
    });
    setLoading(false);
    if (response.ok) {
      props.onClose();
    } else {
      console.error('Failed to save customer');
    }
  };

  return (
    <CustomerFormContent
      customer={customer}
      setCustomer={setCustomer}
      loading={loading}
      handleSubmit={handleSubmit}
      onClose={props.onClose}
    />
  );
}

export default CustomerForm;