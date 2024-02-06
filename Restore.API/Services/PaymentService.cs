using Restore.API.Entities;
using Stripe;

namespace Restore.API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration config;

        public PaymentService(IConfiguration config)
        {
            this.config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
            
            var service = new PaymentIntentService();
            var intent = new PaymentIntent();
            
            var subTotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
            var deliveryFee = subTotal > 100 ? 0 : 5;

            if(string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)Convert.ToDouble(subTotal + deliveryFee) * 100,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)Convert.ToDouble(subTotal + deliveryFee),
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            return intent;
        }
    }
}
