﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using StudioManager.Database;

namespace StudioManager.Database.Migrations
{
    [DbContext(typeof(StudioContext))]
    [Migration("20181123205134_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("StudioManager.Database.Booking", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContactPhone");

                    b.Property<string>("Description");

                    b.Property<DateTime>("From");

                    b.Property<decimal>("Price");

                    b.Property<DateTime>("To");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("Bookings");
                });
#pragma warning restore 612, 618
        }
    }
}
