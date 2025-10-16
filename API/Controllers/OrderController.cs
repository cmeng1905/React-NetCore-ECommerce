using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;
        public OrderController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetOrders")]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders.Include(s => s.OrderItems)
                .Where(s => s.CustomerId == User.Identity!.Name).OrderToDto().ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto?>> GetOrder(int id)
        {
            return await _context.Orders.Include(s => s.OrderItems).OrderToDto()
                .FirstOrDefaultAsync(s => s.CustomerId == User.Identity!.Name && s.Id == id);
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var cart = await _context.Carts.Include(s => s.CartItems)
                .ThenInclude(s => s.Product)
                .Where(s => s.CustomerId == User.Identity!.Name).FirstOrDefaultAsync();
            if (cart == null)
                return BadRequest(new ProblemDetails
                {
                    Title = "Sepetiniz boş",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = "Sipariş oluşturmak için önce sepete ürün ekleyin",
                    Instance = HttpContext.Request.Path
                });

            if (!cart.CartItems.Any())
                return BadRequest(new ProblemDetails
                {
                    Title = "Sepetiniz boş",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = "Sipariş oluşturmak için önce sepete ürün ekleyin",
                    Instance = HttpContext.Request.Path
                });

            var items = new List<OrderItem>();
            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                var orderItem = new OrderItem
                {
                    ProductId = product!.Id,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };

                items.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var total = items.Sum(s => s.Price * s.Quantity);
            var deliveryFree = 0;
            var order = new Order
            {
                OrderItems=items,
                CustomerId=User.Identity!.Name,
                FirstName=orderDto.FirstName,
                LastName = orderDto.LastName,
                Phone = orderDto.Phone,
                City = orderDto.City,
                AddressLine = orderDto.AddressLine,
                SubTotal = total,
                DeliveryFree = deliveryFree,
                OrderStatus = OrderStatus.Pending,
                OrderDate = DateTime.Now
            };

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);
            var result=await _context.SaveChangesAsync()>0;
            if(result)
                return CreatedAtRoute(nameof(GetOrder), new {id=order.Id});
            return BadRequest(new ProblemDetails
            {
                Title="Problem getting order"
            });
        }
    }
}
