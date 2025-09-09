namespace API.Entity
{
    public class Cart
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; } = null!;

        public List<CartItem> CartItems { get; set; } = [];

        public void AddItem(Product product, int quantity)
        {
            var existingItem = CartItems.FirstOrDefault(ci => ci.ProductId == product.Id);
            if (existingItem != null)
                existingItem.Quantity += quantity;
            else
            {
                CartItems.Add(new CartItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }
        }

        public void DeleteItem(int productId, int quantity)
        {
            var existingItem = CartItems.FirstOrDefault(ci => ci.ProductId == productId);
            if (existingItem == null) return;
            existingItem.Quantity -= quantity;
            if (existingItem.Quantity <= 0)
                CartItems.Remove(existingItem);
        }

    }

    public class CartItem
    {
        public int CartItemId { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; } = null!;

        public int Quantity { get; set; }

        public int CartId { get; set; }

    }
}
