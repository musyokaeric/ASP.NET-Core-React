using Restore.API.Entities.OrderAggregate;
using System.ComponentModel.DataAnnotations;

namespace Restore.API.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        [Required]
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }
        public double Subtotal { get; set; }
        public double DeliveryFee { get; set; }
        public string OrderStatus { get; set; }
        public double Total { get; set; }
    }
}
