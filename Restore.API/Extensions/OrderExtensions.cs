using Microsoft.EntityFrameworkCore;
using Restore.API.DTO;
using Restore.API.Entities.OrderAggregate;

namespace Restore.API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> ProjectOrderToOrderDTO(this IQueryable<Order> query)
        {
            return query.Select(order => new OrderDTO
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                DeliveryFee = order.DeliveryFee,
                Subtotal = order.Subtotal,
                OrderStatus = order.OrderStatus.ToString(),
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(item => new OrderItemDTO
                {
                    ProductId = item.ItemOrdered.ProductId,
                    Name = item.ItemOrdered.Name,
                    ImageUrl = item.ItemOrdered.ImageUrl,
                    Price = item.Price,
                    Quantity = item.Quantity,
                }).ToList()
            }).AsNoTracking();
        }
    }
}
