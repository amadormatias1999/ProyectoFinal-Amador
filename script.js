fetch("../datos.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const combos = jsonData.combos;
    const calzados = jsonData.calzados;

    const contenedor1 = document.getElementById("contenedor1");
    const contenedor2 = document.getElementById("contenedor2");

    combos.forEach(function (combo) {
      let elemento = document.createElement("div");
      elemento.innerHTML = `
        <div class="productos">
          <div class="card border-white mb-3" style="max-width: 20rem;">
            <div class="card-body">
              <img src="${combo.Imagen}" class="card-img-top" alt="..." />
              <div><h4>${combo.Nombre}</h4></div>
              <p class="card-text">${combo.Info}</p>
              <p class="card-text">$ ${combo.Precio}</p>
              <button onclick="carrito('${combo.Nombre}', ${combo.Precio});cartelProductoAgregado()" class="btn btn-outline-info">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;

      contenedor1.appendChild(elemento);
    });
    calzados.forEach(function (calzado) {
      let elemento = document.createElement("div");
      elemento.innerHTML = `
            <div class="productos">
              <div class="card border-white mb-3" style="max-width: 20rem;">
                <div class="card-body">
                  <img src="${calzado.Imagen}" class="card-img-top" alt="..." />
                  <div><h4>${calzado.Nombre}</h4></div>
                  <p class="card-text">${calzado.Info}</p>
                  <p class="card-text">$ ${calzado.Precio}</p>
                  <button onclick="carrito('${calzado.Nombre}', ${calzado.Precio}); cartelProductoAgregado()" class="btn btn-outline-info">Agregar al carrito</button>
                </div>
              </div>
            </div>
          `;

      contenedor2.appendChild(elemento);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

let articulosCarrito = [];
let total = 0;

function carrito(nombre, precio) {
  const item = {
    nombre: nombre,
    precio: precio,
  };
  articulosCarrito.push(item);

  // GUARDANDO LOS DATOS  EN EL LOCALSTORAGE
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));

  const carrito = document.createElement("div");
  const cantidadCarrito = document.getElementById("cantidadCarrito");

  carrito.textContent = ` ${item.nombre}  - $${item.precio.toFixed()}`;
  cantidadCarrito.textContent = articulosCarrito.length;

  document.getElementById("productosAgregados").appendChild(carrito);

  total += item.precio;
  document.getElementById("total").textContent = `Total: $${total.toFixed()}`;
}

// VACIAR CARRITO

const btnVaciar = document.getElementById("vaciarCarrito");
btnVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  articulosCarrito = [];

  const productosCarrito = document.getElementById("productosAgregados");
  while (productosCarrito.firstChild) {
    productosCarrito.removeChild(productosCarrito.firstChild);
  }

  total = 0;
  document.getElementById("total").textContent = `Total: $${total.toFixed()}`;
  cantidadCarrito.textContent = [];

  // ELIMINAR LOS PRODUCTOS DEL LOCALSTORAGE
  localStorage.removeItem("carrito");
}

// BOTON COMPRAR
const btnComprar = document.getElementById("comprarCarrito");
btnComprar.addEventListener("click", comprar);

function comprar() {
  if (articulosCarrito.length === 0) {
    Swal.fire({
      title: "Debe agregar un producto al carrito",
      icon: "error",
      confirmButtonText: "Volver a la tienda",
    });
  } else {
    Swal.fire({
      title: "Gracias por comprar en Minimal Store!",
      icon: "success",
      confirmButtonText: "Volver a la tienda",
    });
  }

  vaciarCarrito();
}

// FUNCION PRODUCTOS AGREGADOS

function cartelProductoAgregado() {
  Swal.fire({
    position: "top",
    title: "Producto agregado",
    icon: "success",
    showConfirmButton: false,
    timer: 700,
  });
}

// OBTENER LOS DATOS DEL LOCALSTORAGE Y MOSTRARLOS EN EL CARRITO DE COMPRAS

window.addEventListener("DOMContentLoaded", traerdatosLocalStorage);

function traerdatosLocalStorage() {
  const datosLocal = localStorage.getItem("carrito");
  const localAJson = JSON.parse(datosLocal);

  // VERIFICA SI HAY DATOS EN EL LOCAL STORAGE
  if (localAJson && localAJson.length > 0) {
    articulosCarrito = localAJson;
    total = 0;
    for (let i = 0; i < localAJson.length; i++) {
      const producto = localAJson[i];
      const productoNombre = producto.nombre;
      const productoPrecio = producto.precio;

      const carrito = document.createElement("div");
      const cantidadCarrito = document.getElementById("cantidadCarrito");

      carrito.textContent = ` ${productoNombre}  - $${productoPrecio.toFixed()}`;
      cantidadCarrito.textContent = localAJson.length;

      document.getElementById("productosAgregados").appendChild(carrito);

      total += productoPrecio;
      document.getElementById(
        "total"
      ).textContent = `Total: $${total.toFixed()}`;
    }
  }
}
