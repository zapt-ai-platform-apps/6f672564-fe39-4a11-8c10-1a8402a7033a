import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import Footer from './Footer';

function Dashboard(props) {
  const user = props.user;
  const [showCustomerForm, setShowCustomerForm] = createSignal(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">CRM Dashboard</h1>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>

        <div class="mb-4">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={() => setShowCustomerForm(true)}
          >
            Add New Customer
          </button>
        </div>

        <CustomerList />

        <Show when={showCustomerForm()}>
          <CustomerForm onClose={() => setShowCustomerForm(false)} />
        </Show>

        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;