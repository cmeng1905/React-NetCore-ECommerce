using API.DTO;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> OrderToDto(this IQueryable<Order> order)
        {
            return order.Select(s => new OrderDto
            {
                Id = s.Id,
                OrderDate = s.OrderDate,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Phone = s.Phone,
                City = s.City,
                AddressLine = s.AddressLine,
                CustomerId = s.CustomerId,
                OrderStatus = s.OrderStatus,
                OrderItems = s.OrderItems.Select(i => new OrderItemDto
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    ProductImage = i.ProductImage,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList(),
                SubTotal = s.SubTotal,
                DeliveryFree = s.DeliveryFree
            });
        }
    }
}
