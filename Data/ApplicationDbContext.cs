﻿using BookOnlineShop.Models;
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
        }

        public DbSet<Categories> Categories { get; set; }
        public DbSet<Authors> Authors { get; set; }
        public DbSet<Publishers> Publishers { get; set; }
        public DbSet <Products> Products { get; set; }
        public DbSet <Orders> Orders { get; set; }
        public DbSet <OrderProducts> OrderProducts { get; set; }
    }
}