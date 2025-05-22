import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  errorMessage = '';  viewMode = 'grid'; // Default view mode: 'grid' or 'list'
  
  // Colors for the book cover displays
  private bookColors: string[] = [
    '#4361ee', '#3a0ca3', '#7209b7', '#f72585',
    '#4cc9f0', '#4895ef', '#560bad', '#480ca8',
    '#3f37c9', '#4361ee', '#4cc9f0', '#457b9d'
  ];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
    // Try to get saved view preference from localStorage
    const savedViewMode = localStorage.getItem('bookViewMode');
    if (savedViewMode && (savedViewMode === 'grid' || savedViewMode === 'list')) {
      this.viewMode = savedViewMode;
    }
  }
    // Method to generate consistent colors for book cards based on book title
  getBookColor(book: Book): string {    
    // Generate a simple hash from the book title to select a color
    const hash = book.title.split('').reduce((acc: number, char: string) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return this.bookColors[hash % this.bookColors.length];
  }
  
  // Save view mode preference
  setViewMode(mode: string): void {
    this.viewMode = mode;
    localStorage.setItem('bookViewMode', mode);
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks()
      .subscribe({
        next: (data) => {
          this.books = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load books. Please try again later.';
          console.error('There was an error fetching the books!', error);
          this.loading = false;
        }
      });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id)
        .subscribe({
          next: () => {
            this.books = this.books.filter(book => book.id !== id);
          },
          error: (error) => {
            this.errorMessage = 'Failed to delete book. Please try again later.';
            console.error('There was an error deleting the book!', error);
          }
        });
    }
  }
}
