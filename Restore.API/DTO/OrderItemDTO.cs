namespace Restore.API.DTO
{
    public class OrderItemDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
