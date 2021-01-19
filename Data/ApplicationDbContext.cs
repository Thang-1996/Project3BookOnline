using BookOnlineShop.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<OrderProducts>()
                .HasKey(op => new { op.OrderID, op.ProductID });
            modelBuilder.Entity<OrderProducts>()
                .HasOne(op => op.Orders)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderID);
            modelBuilder.Entity<OrderProducts>()
                .HasOne(op => op.Products)
                .WithMany(p => p.OrderProducts)
                .HasForeignKey(op => op.ProductID);

            modelBuilder.Entity<ReviewProduct>()
                  .HasKey(op => new { op.ReviewID, op.ProductID });
            modelBuilder.Entity<ReviewProduct>()
                .HasOne(op => op.Review)
                .WithMany(o => o.ReviewProducts)
                .HasForeignKey(op => op.ReviewID);
            modelBuilder.Entity<ReviewProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.ReviewProducts)
                .HasForeignKey(op => op.ProductID);

            modelBuilder.Entity<ReviewAnswer>()
            .HasKey(op => new { op.ReviewID, op.AnswerID });
            modelBuilder.Entity<ReviewAnswer>()
                .HasOne(op => op.Review)
                .WithMany(o => o.ReviewAnswers)
                .HasForeignKey(op => op.ReviewID);
            modelBuilder.Entity<ReviewAnswer>()
                .HasOne(op => op.Answer)
                .WithMany(p => p.ReviewAnswers)
                .HasForeignKey(op => op.AnswerID);
        }

        public DbSet<Categories> Categories { get; set; }
        public DbSet<Authors> Authors { get; set; }
        public DbSet<Publishers> Publishers { get; set; }
        public DbSet <Products> Products { get; set; }
        public DbSet <Orders> Orders { get; set; }
        public DbSet <OrderProducts> OrderProducts { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ReviewProduct> ReviewProducts { get; set; }
        public DbSet<ReviewAnswer> ReviewAnswers { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<WishList> WishLists { get; set; }
    }
}
