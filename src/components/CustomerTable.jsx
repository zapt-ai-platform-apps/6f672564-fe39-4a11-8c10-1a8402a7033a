import { For } from 'solid-js';

function CustomerTable(props) {
  return (
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
          <For each={props.customers()}>
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
  );
}

export default CustomerTable;