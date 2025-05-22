import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  loading = false;
  errorMessage = '';
  
  // Colors for the book cover
  private bookColors: string[] = [
    '#4361ee', '#3a0ca3', '#7209b7', '#f72585',
    '#4cc9f0', '#4895ef', '#560bad', '#480ca8',
    '#3f37c9', '#4361ee', '#4cc9f0', '#457b9d'
  ];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.bookService.getBook(id).subscribe({
      next: (data) => {
        this.book = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load book details. Please try again later.';
        console.error('There was an error fetching the book!', error);
        this.loading = false;
      }
    });
  }
  // Generate a consistent color for book cover based on the book title
  getBookColor(): string {
    if (!this.book || !this.book.title) {
      return this.bookColors[0];
    }
    
    // Generate a simple hash from the book title
    const hash = this.book.title.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return this.bookColors[hash % this.bookColors.length];
  }
  
  deleteBook(): void {
    if (this.book && this.book.id && confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(this.book.id).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete book. Please try again later.';
          console.error('There was an error deleting the book!', error);
        }
      });
    }
  }
}
