let books = []; // Initialize an empty list to store the book data

// Function to load each file
function loadFile(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

// Chain the file loads in sequence to maintain order
loadFile('data/part_0.json')
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_1.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_2.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_3.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_4.json');
  })
  .then(data => {
    books = books.concat(data);
    // All files have been loaded in order
    console.log(books[0]); // Now 'books' contains all the data in order
    console.log(books[6568])
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

// Rest of your code for the search function and display results function

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value.toLowerCase();
    const results = searchBooks(books, query);
    
    displayResults(results);
});

function searchBooks(books, query) {
    const resultIndices = [];
    const resultBooks = [];
  
    books.forEach(book => {
      if (book.title.toLowerCase().includes(query) || book.isbns.some(isbn => isbn.includes(query))) {
        resultIndices.push(...book.nearest_indices);
      }
    });
  
    // Filter out duplicate indices
    const uniqueIndices = [...new Set(resultIndices)];
  
    // Get the books using the unique indices
    uniqueIndices.forEach(index => {
      resultBooks.push(books[index]);
    });
  
    return resultBooks;
  }
  

function displayResults(results) {
    const featuredBookElement = document.getElementById('featuredBook');
    const booksGridElement = document.getElementById('booksGrid');
    const noResultsElement = document.getElementById('noResults');
    
    // Clear previous results
    booksGridElement.innerHTML = '';
    
    if (results.length > 0) {
        // Display the first result as featured book
        featuredBookElement.querySelector('h3').textContent = results[0].title;
        featuredBookElement.querySelector('p').textContent = results[0].text;
        featuredBookElement.style.display = '';

        // Display other results
        results.slice(1).forEach(book => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h3>${book.title}</h3><p>${book.text}</p>`;
            booksGridElement.appendChild(card);
        });
        
        booksGridElement.style.display = '';
        noResultsElement.style.display = 'none';
    } else {
        // No results found
        featuredBookElement.style.display = 'none';
        booksGridElement.style.display = 'none';
        noResultsElement.style.display = '';
    }
}
