import { createResource, For } from 'solid-js';

function CustomerList() {
  const fetchCustomers = async () => {
    const response = await fetch('/api/getCustomers');
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch customers');
      return [];
    }
  };

  const [customers] = createResource(fetchCustomers);

  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Customer List</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <For each={customers()}>
              {(customer) => (
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button class="text-blue-600 hover:text-blue-900 cursor-pointer">Edit</button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;