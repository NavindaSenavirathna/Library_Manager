import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  bookId?: number;
  loading = false;
  errorMessage = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      isbn: ['', [Validators.required, Validators.pattern(/^[0-9-]{10,17}$/)]],
      publicationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookId = +params['id'];
        this.loadBook(this.bookId);
      }
    });
  }

  loadBook(id: number): void {
    this.loading = true;
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publicationDate: book.publicationDate ? new Date(book.publicationDate).toISOString().split('T')[0] : ''
        });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load book. Please try again.';
        console.error('There was an error loading the book!', error);
        this.loading = false;
      }
    });
  }

  // Getter for easy access to form fields
  get f() { return this.bookForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.bookForm.invalid) {
      return;
    }

    this.loading = true;
    const bookData: Book = {
      ...this.bookForm.value
    };

    if (this.isEditMode && this.bookId) {
      bookData.id = this.bookId;
      this.bookService.updateBook(this.bookId, bookData).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update book. Please try again.';
          console.error('There was an error updating the book!', error);
          this.loading = false;
        }
      });
    } else {
      this.bookService.createBook(bookData).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to create book. Please try again.';
          console.error('There was an error creating the book!', error);
          this.loading = false;
        }
      });
    }
  }
}
