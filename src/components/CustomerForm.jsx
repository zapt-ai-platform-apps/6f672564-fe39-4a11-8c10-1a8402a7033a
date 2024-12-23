import { createSignal } from 'solid-js';
import CustomerFormContent from './CustomerFormContent';
import { supabase } from '../supabaseClient';

function CustomerForm(props) {
  const [customer, setCustomer] = createSignal({
    name: '',
    firstname: '',
    lastname: '',
    phone: '',
    phone2: '',
    email: '',
    email2: '',
    // Add other fields here if necessary
  });

  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/saveCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
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