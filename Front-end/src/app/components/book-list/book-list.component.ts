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
  errorMessage = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
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
