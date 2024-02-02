using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restore.API.Data;
using Restore.API.DTO;
using Restore.API.Entities;
using Restore.API.Entities.OrderAggregate;
using Restore.API.Extensions;

namespace Restore.API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext context;

        public OrdersController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await context.Orders.ProjectOrderToOrderDTO().Where(o => o.BuyerId == User.Identity.Name).ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            return await context.Orders.ProjectOrderToOrderDTO().Where(o => o.BuyerId == User.Identity.Name && o.Id == id).FirstOrDefaultAsync();

        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDTO orderDTO)
        {
            var basket = await context.Baskets.RetrieveBasketWithItems(User.Identity.Name).FirstOrDefaultAsync();

            if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });

            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    ImageUrl = productItem.ImageUrl,
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity,
                };
                items.Add(orderItem);
                productItem.Quantity = item.Quantity;
            }

            var subTotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subTotal > 100 ? 0 : 5;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDTO.ShippingAddress,
                Subtotal = subTotal,
                DeliveryFee = deliveryFee,
            };

            await context.Orders.AddAsync(order);
            context.Baskets.Remove(basket);

            if(orderDTO.SaveAddress)
            {
                var user = await context.Users.Include(a => a.Address).FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

                var address = new UserAddress
                {
                    FullName = orderDTO.ShippingAddress.FullName,
                    Address1 = orderDTO.ShippingAddress.Address1,
                    Address2 = orderDTO.ShippingAddress.Address2,
                    City = orderDTO.ShippingAddress.City,
                    State = orderDTO.ShippingAddress.State,
                    Zip = orderDTO.ShippingAddress.Zip,
                    Region = orderDTO.ShippingAddress.Region,
                };
                user.Address = address;
            }

            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Problem creating order.");
        }
    }
}
