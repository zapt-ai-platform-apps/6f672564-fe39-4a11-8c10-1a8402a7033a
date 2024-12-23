import { createSignal, createResource } from 'solid-js';
import { supabase } from '../supabaseClient';
import CustomerSearchFilter from './CustomerSearchFilter';
import CustomerTable from './CustomerTable';

function CustomerList() {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [filterOption, setFilterOption] = createSignal('');

  const [customers] = createResource(
    () => [searchTerm(), filterOption()],
    async ([searchTerm, filterOption]) => {
      const { data: { session } } = await supabase.auth.getSession();
      let query = '';
      if (searchTerm) {
        query += `search=${encodeURIComponent(searchTerm)}&`;
      }
      if (filterOption) {
        query += `filter=${encodeURIComponent(filterOption)}&`;
      }
      const response = await fetch(`/api/getCustomers?${query}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch customers');
        return [];
      }
    }
  );

  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Customer List</h2>
      <CustomerSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      <CustomerTable customers={customers} />
    </div>
  );
}

export default CustomerList;