//Search Client
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();

        if (!query) {
            Swal.fire({
                icon: 'warning',
                title: 'Empty Search',
                text: 'Please enter a search term',
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/client/search?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                displayResults(data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Search Failed',
                    text: data.message || 'Failed to search clients'
                });
            }
        } catch (error) {
            console.error('Error searching clients:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to connect to the server'
            });
        }
    });

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="text-center text-gray-500 py-4">No results found</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'min-w-full bg-white rounded-lg overflow-hidden shadow-md';
        
        table.innerHTML = `
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                ${results.map(client => `
                    <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${client.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${client.first_name} ${client.last_name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${client.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${client.phone}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button 
                                onclick="viewClient(${client.id})"
                                class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                View
                            </button>
                            <button 
                                onclick="editClient(${client.id})"
                                class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        resultsContainer.appendChild(table);
    }
});