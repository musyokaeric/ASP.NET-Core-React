using Restore.API.Entities;

namespace Restore.API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name) // Default
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string search)
        {
            if (string.IsNullOrEmpty(search)) return query;

            var lowerCaseSearch = search.Trim().ToLower();

            return query.Where(p=>p.Name.ToLower().Contains(lowerCaseSearch));
        }
    }
}
