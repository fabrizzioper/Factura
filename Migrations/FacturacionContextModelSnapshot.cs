﻿// <auto-generated />
using System;
using FacturacionAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FacturacionAPI.Migrations
{
    [DbContext(typeof(FacturacionContext))]
    partial class FacturacionContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0-preview.4.23259.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FacturacionAPI.Models.Boleta", b =>
                {
                    b.Property<int>("BoletaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BoletaID"));

                    b.Property<int>("EmpresaID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nro")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BoletaID");

                    b.ToTable("Boletas");
                });

            modelBuilder.Entity("FacturacionAPI.Models.DetalleBoleta", b =>
                {
                    b.Property<int>("DetalleID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DetalleID"));

                    b.Property<int>("BoletaID")
                        .HasColumnType("int");

                    b.Property<int>("Cantidad")
                        .HasColumnType("int");

                    b.Property<decimal>("PrecioUnitario")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("ProductoID")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("DetalleID");

                    b.ToTable("DetalleBoletas");
                });

            modelBuilder.Entity("FacturacionAPI.Models.Empresa", b =>
                {
                    b.Property<int>("EmpresaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmpresaID"));

                    b.Property<string>("Direccion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RUC")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RazonSocial")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmpresaID");

                    b.ToTable("Empresas");
                });
#pragma warning restore 612, 618
        }
    }
}