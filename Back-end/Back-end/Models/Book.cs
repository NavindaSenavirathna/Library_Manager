using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Author { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[0-9-]{10,17}$", ErrorMessage = "ISBN must be a valid format (10-17 digits with optional hyphens)")]
        public string ISBN { get; set; } = string.Empty;

        [Required]
        public DateTime PublicationDate { get; set; }
    }
}
