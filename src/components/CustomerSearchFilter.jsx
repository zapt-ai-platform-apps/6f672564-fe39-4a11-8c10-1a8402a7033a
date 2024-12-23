function CustomerSearchFilter(props) {
  const handleSearchInput = (e) => {
    props.setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    props.setFilterOption(e.target.value);
  };

  return (
    <div class="flex flex-col md:flex-row md:space-x-4 mb-6">
      <input
        type="text"
        placeholder="Search by name, email, or phone"
        value={props.searchTerm()}
        onInput={handleSearchInput}
        class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-700"
      />
      <select
        value={props.filterOption()}
        onChange={handleFilterChange}
        class="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent mt-4 md:mt-0 box-border text-gray-700"
      >
        <option value="">Filter By</option>
        <option value="recent">Recently Added</option>
      </select>
    </div>
  );
}

export default CustomerSearchFilter;