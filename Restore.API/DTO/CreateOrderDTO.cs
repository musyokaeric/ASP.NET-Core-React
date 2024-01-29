using Restore.API.Entities.OrderAggregate;

namespace Restore.API.DTO
{
    public class CreateOrderDTO
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}
