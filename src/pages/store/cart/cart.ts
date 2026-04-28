import type { Product } from '../../../types/product.ts';

interface CartItem extends Product {
    cantidad: number;
}

const contenedorCarrito = document.querySelector(".productos-actuales")!;
const contenedorResumen = document.querySelector(".productos-resumen")!;

let carrito: CartItem[] = [];

const actualizarBadge = () => {
    const badge = document.getElementById("badge-carrito");
    if (badge) {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
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

const guardarCarrito = () => {
    localStorage.setItem('cart_items', JSON.stringify(carrito));
}

const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('cart_items');
    if (carritoGuardado) {
        const itemsCrudos: (CartItem)[] = JSON.parse(carritoGuardado);
        carrito = [];
        
        itemsCrudos.forEach((producto) => {
            const existente = carrito.find(p => p.id === producto.id);
            if (existente) {
                existente.cantidad += 1;
            } else {
                carrito.push({
                    ...producto, //Uso ... para no escribir cada atributo del producto
                    cantidad: producto.cantidad || 1
                });
            }
        });
    } else {
        carrito = [];
    }
}

const renderizarProductos = () => {
    actualizarBadge();
    contenedorCarrito.innerHTML = ''; 
    
    if (carrito.length > 0) {
        (contenedorResumen as HTMLElement).style.display = "block";
        (contenedorCarrito as HTMLElement).style.flex = "1";
        
        carrito.forEach(producto => {
            const subtotalProducto = producto.precio * producto.cantidad;
            contenedorCarrito.innerHTML += `
                <div class="articulo-producto" data-id="${producto.id}">
                    <img class="img-carrito" src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="info-producto">
                        <h3>${producto.nombre}</h3>
                        <p class="categoria-producto">${producto.categorias[0]?.nombre}</p>
                        <p class="subtotal-producto">Subtotal: ${formatearPrecio(subtotalProducto)}</p>
                    </div>
                    <div class="controles-producto">
                        <div class="cantidad-control">
                            <button class="btn-cantidad btn-restar">-</button>
                            <span>${producto.cantidad}</span>
                            <button class="btn-cantidad btn-sumar">+</button>
                        </div>
                        <button class="btn-eliminar">Eliminar</button>
                    </div>
                </div>`;
        });
        renderizarResumen();
    } else {
        (contenedorResumen as HTMLElement).style.display = "none";
        (contenedorCarrito as HTMLElement).style.flex = "none";
        (contenedorCarrito as HTMLElement).style.width = "100%";
        contenedorCarrito.innerHTML = `
            <div class="carrito-vacio">
                <span class="material-symbols-outlined icono-vacio">shopping_cart</span>
                <p>Tu carrito está vacío.</p>
                <a href="../home/home.html" class="btn-ver-catalogo">Ver catálogo</a>
            </div>
        `;
    }
    
    agregarEventListenersProductos();
}

const renderizarResumen = () => {
    const subtotal = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const total = subtotal;

    contenedorResumen.innerHTML = `
        <div class="resumen-card">
            <h3>Resumen</h3>
            <div class="resumen-linea">
                <span>Subtotal</span>
                <span>${formatearPrecio(subtotal)}</span>
            </div>
            <div class="resumen-linea total-linea">
                <span>Total</span>
                <span>${formatearPrecio(total)}</span>
            </div>
            <button class="btn-finalizar">Finalizar compra</button>
            <p class="checkout-aviso">⚠️ El checkout no está disponible en esta versión.</p>
            <button class="btn-vaciar">Vaciar carrito</button>
        </div>
    `;
    agregarEventListenersResumen();
}

const cambiarCantidad = (id: number, cambio: number) => {
    const itemIndex = carrito.findIndex(producto => producto.id === id);
    if (itemIndex > -1) {
        const cantidadActual = carrito[itemIndex].cantidad;
        const nuevaCantidad = cantidadActual + cambio;
        if (nuevaCantidad > 0) {
            carrito[itemIndex].cantidad = nuevaCantidad;
        } else {
            carrito.splice(itemIndex, 1);
        }
        guardarCarrito();
        renderizarProductos();
    }
}

const eliminarProducto = (id: number) => {
    carrito = carrito.filter(producto => producto.id !== id);
    guardarCarrito();
    renderizarProductos();
}

const vaciarCarrito = () => {
    carrito = [];
    guardarCarrito();
    renderizarProductos();
}

const agregarEventListenersProductos = () => {
    document.querySelectorAll('.articulo-producto').forEach(elem => {
        const id = Number((elem as HTMLElement).dataset.id);
        elem.querySelector('.btn-sumar')?.addEventListener('click', () => cambiarCantidad(id, +1));
        elem.querySelector('.btn-restar')?.addEventListener('click', () => cambiarCantidad(id, -1));
        elem.querySelector('.btn-eliminar')?.addEventListener('click', () => eliminarProducto(id));
    });
}

const agregarEventListenersResumen = () => {
    document.querySelector('.btn-vaciar')?.addEventListener('click', vaciarCarrito);
}

cargarCarrito();
renderizarProductos();
