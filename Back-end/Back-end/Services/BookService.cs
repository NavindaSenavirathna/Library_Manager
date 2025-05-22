using Back_end.Models;

namespace Back_end.Services
{
    public class BookService
    {
        // In-memory storage for books
        private static List<Book> _books = new List<Book>
        {
            new Book
            {
                Id = 1,
                Title = "To Kill a Mockingbird",
                Author = "Harper Lee",
                ISBN = "978-0446310789",
                PublicationDate = new DateTime(1960, 7, 11)
            },
            new Book
            {
                Id = 2,
                Title = "1984",
                Author = "George Orwell",
                ISBN = "978-0451524935",
                PublicationDate = new DateTime(1949, 6, 8)
            },
            new Book
            {
                Id = 3,
                Title = "The Great Gatsby",
                Author = "F. Scott Fitzgerald",
                ISBN = "978-0743273565",
                PublicationDate = new DateTime(1925, 4, 10)
            },
            new Book
            {
                Id = 4,
                Title = "The Catcher in the Rye",
                Author = "J.D. Salinger",
                ISBN = "978-0316769488",
                PublicationDate = new DateTime(1951, 7, 16)
            },
            new Book
            {
                Id = 5,
                Title = "Pride and Prejudice",
                Author = "Jane Austen",
                ISBN = "978-1503290563",
                PublicationDate = new DateTime(1813, 1, 28)
            },
            new Book
            {
                Id = 6,
                Title = "The Hobbit",
                Author = "J.R.R. Tolkien",
                ISBN = "978-0547928227",
                PublicationDate = new DateTime(1937, 9, 21)
            },
        };

        // Get all books
        public List<Book> GetAllBooks()
        {
            return _books;
        }

        // Get a book by ID
        public Book? GetBookById(int id)
        {
            return _books.FirstOrDefault(b => b.Id == id);
        }

        // Create a new book
        public Book AddBook(Book book)
        {
            // Generate a new ID (in a real app this would be handled by the database)
            int nextId = _books.Count > 0 ? _books.Max(b => b.Id) + 1 : 1;
            book.Id = nextId;

            _books.Add(book);
            return book;
        }

        // Update an existing book
        public Book? UpdateBook(int id, Book book)
        {
            var existingBook = _books.FirstOrDefault(b => b.Id == id);
            if (existingBook == null)
                return null;

            // Update properties
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.ISBN = book.ISBN;
            existingBook.PublicationDate = book.PublicationDate;

            return existingBook;
        }

        // Delete a book
        public bool DeleteBook(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return false;

            _books.Remove(book);
            return true;
        }
    }
}
