import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookCount = 0;
  loading = true;
  error = false;
  
  // Featured books colors
  bookColors: string[] = [
    '#4361ee', '#3a0ca3', '#7209b7', '#f72585',
    '#4cc9f0', '#4895ef', '#560bad', '#480ca8'
  ];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBookStats();
  }

  loadBookStats(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.bookCount = books.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading book stats', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  // Get a random color for featured book section
  getRandomColor(): string {
    return this.bookColors[Math.floor(Math.random() * this.bookColors.length)];
  }
}
