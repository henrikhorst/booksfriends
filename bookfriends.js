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
    return loadFile('data/part_5.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_6.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_7.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_8.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_9.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_10.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_11.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_12.json');
  })
  .then(data => {
    books = books.concat(data);
    return loadFile('data/part_13.json');
  })
  .then(data => {
    books = books.concat(data);
    // All files have been loaded in order
    // Enable the search field
    document.getElementById('query').disabled = false;
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

function searchBooks(books, targetISBN13) {
  const resultBooks = [];

  // Normalize the target ISBN13 by removing dashes
  const normalizedTargetISBN13 = targetISBN13.replace(/-/g, '');

  // Find the book with the matching ISBN13
  const book = books.find(item => item.ISBN13.replace(/-/g, '') === normalizedTargetISBN13);

  // If no book is found, return an empty array or a message
  if (!book) {
      return resultBooks; // or return 'No book found' if a message is preferred
  }

  // Get the nearest indices of the found book
  const resultIndices = book.nearest_indices;

  // Get the books using the result indices
  resultIndices.forEach(index => {
      resultBooks.push(books[index]);
  });

  return resultBooks;
}

  

function displayResults(results) {
    console.log(results)
    const featuredBookElement = document.getElementById('featuredBook');
    const booksGridElement = document.getElementById('booksGrid');
    const noResultsElement = document.getElementById('noResults');
    
    // Clear previous results
    booksGridElement.innerHTML = '';
    
    if (results.length > 0) {
        // Display the first result as featured book
        featuredBookElement.querySelector('h3').textContent = results[0].Titel;
        featuredBookElement.querySelector('p').textContent = results[0]["Weitere Informationen"];
        featuredBookElement.style.display = '';

        const featuredAuthor = results[0].Autor;
        console.log(featuredAuthor)

        // Display other results, filtering out books by the same author
        results.slice(1).forEach(book => {
          console.log(book.Autor)
          if (book.Autor !== featuredAuthor) {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `<h3>${book.Titel}</h3><p>${book["Weitere Informationen"]}</p>`;
              booksGridElement.appendChild(card);
          }
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
