import { PRODUCTS } from '../../../data/data.ts';
import type { Product } from '../../../types/product.ts';

let carrito: Product[] = []

const actualizarBadge = () => {
    const badge = document.getElementById("badge-carrito");
    if (badge) {
        const totalItems = carrito.length;
        if (totalItems > 0) {
            badge.textContent = totalItems.toString();
            badge.style.display = "inline-block";
        } else {
            badge.style.display = "none";
        }
    }
}

const formatearPrecio = (precio: number) => {
    return `$${precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const carritoGuardado = localStorage.getItem("cart_items");
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}
actualizarBadge();

let categoriaActual = "Todos los productos"

const busqueda = document.getElementById("buscar-producto") as HTMLInputElement
const productos = document.querySelector(".grilla-productos") as HTMLElement;

busqueda!.addEventListener("input", () => {
    const salida = busqueda.value.toLowerCase()
    productos.innerHTML = ""

    let filtrados = PRODUCTS.filter((producto) => producto.nombre.toLowerCase().includes(salida))
    
    if (categoriaActual !== "Todos los productos") {
        filtrados = filtrados.filter((producto) => producto.categorias[0]?.nombre === categoriaActual)
    }

    filtrados.forEach((producto) => {
        productos.innerHTML += `
        <article class="producto-art">
        <div class="producto-top">
            <img class="producto-img" src="${producto.imagen}" alt="${producto.categorias[0]?.nombre}">
            <p class="producto-cat">${producto.categorias[0]?.nombre}</p>
            <h3 class="producto-nombre">${producto.nombre}</h3>
            <p class="producto-desc">${producto.descripcion}</p>
        </div>
        <div class="producto-bottom">
            <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
            <button type="submit" class="btn-agregar" data-nombre="${producto.nombre}">+ Agregar</button>
        </div>
        </article>`
    })
})



PRODUCTS.forEach(producto => {
    productos.innerHTML += `
    <article class="producto-art">
    <div class="producto-top">
        <img class="producto-img" src="${producto.imagen}" alt="${producto.categorias[0]?.nombre}">
        <p class="producto-cat">${producto.categorias[0]?.nombre}</p>
        <h3 class="producto-nombre">${producto.nombre}</h3>
        <p class="producto-desc">${producto.descripcion}</p>
    </div>
    <div class="producto-bottom">
        <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
        <button type="submit" class="btn-agregar" data-nombre="${producto.nombre}">+ Agregar</button>
    </div>
    </article>
    `
    
});

productos.addEventListener("click", (e) => {
    const clickAgregar = e.target as HTMLButtonElement

    if (clickAgregar.classList.contains("btn-agregar")) {
        clickAgregar.innerHTML = "✓ Agregado"
        clickAgregar.classList.add("btn-agregado")

        const nombreProducto = clickAgregar.dataset.nombre

        const productoEncontrado = PRODUCTS.find(
            producto => producto.nombre === nombreProducto
        )

        if (productoEncontrado) {
            carrito.push(productoEncontrado)
            actualizarBadge();
        }

        localStorage.setItem("cart_items", JSON.stringify(carrito))

        setTimeout(() => {
            clickAgregar.classList.remove("btn-agregado")
            clickAgregar.innerHTML = "+ Agregar"
        }, 1000);

    }
})

const botonesCategorias = document.querySelectorAll(".btn-categoria");
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", () => {
        
        botonesCategorias.forEach(botonLimpiar => {
            botonLimpiar.classList.remove("btn-cat-selected")
        });

        boton.classList.add("btn-cat-selected")

        categoriaActual = boton.textContent
        productos.innerHTML = ""

        if (categoriaActual === "Todos los productos") {
            PRODUCTS.forEach(producto => {
                productos.innerHTML += `
                <article class="producto-art">
                <div class="producto-top">
                    <img class="producto-img" src="${producto.imagen}" alt="${producto.categorias[0]?.nombre}">
                    <p class="producto-cat">${producto.categorias[0]?.nombre}</p>
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <p class="producto-desc">${producto.descripcion}</p>
            </div>
            <div class="producto-bottom">
                <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
                <button type="submit" class="btn-agregar" data-nombre="${producto.nombre}">+ Agregar</button>
            </div>
            </article>
            `
        });
        } else {
            const productosFiltrados = PRODUCTS.filter(
                producto => producto.categorias[0]?.nombre === categoriaActual
            );

            productosFiltrados.forEach(producto => {
                productos.innerHTML += `
                <article class="producto-art">
                <div class="producto-top">
                     <img class="producto-img" src="${producto.imagen}" alt="${producto.categorias[0]?.nombre}">
                     <p class="producto-cat">${producto.categorias[0]?.nombre}</p>
                     <h3 class="producto-nombre">${producto.nombre}</h3>
                     <p class="producto-desc">${producto.descripcion}</p>
                 </div>
                 <div class="producto-bottom">
                     <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
                     <button type="submit" class="btn-agregar" data-nombre="${producto.nombre}">+ Agregar</button>
                </div>
                 </article>
             `
            });
        }
    });
});