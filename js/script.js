document.addEventListener('DOMContentLoaded', () => {

  const baseDeDatos = [
    {
      id:0,
      nombre:"Adidas - Streetcheck Court Low",
      precio: 31.999,
      imagen: './img/adidas1.webp'
    },
    {
      id:1,
      nombre:"Adidas - Response",
      precio: 41.999,
      imagen: './img/adidas2.webp',
    },
    {
      id:2,
      nombre:"New Balance - CM997 Urbana",
      precio: 38.792,
      imagen: './img/Newbalance1.webp',
    },
    {
      id:3,
      nombre:"New Balance - Marisg V3 Running",
      precio: 30.693,
      imagen: './img/Newbalance2.webp',
    },
    {
      id:4,
      nombre:"Nike Air Presto Prm 0566",
      precio: 61.998,
      imagen: './img/nike1.webp',
    },
  {
    id:5,
    nombre:"Nike Air Max Systm",
    precio: 51.733,
    imagen: './img/nike2.webp',
  },
  {
    id:6,
    nombre:"Puma x Pokemon Slipstream Lo Charmander",
    precio: 32.314,
    imagen: './img/puma3.webp',
  },
  {
    id:7,
    nombre:"Puma x Pokemon Suede Squirtle",
    precio: 24.999,
    imagen: './img/puma4.webp',
  },
  
  ];

  let carrito = [];
  const divisa = '$';
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = 
  document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');
  const miLocalStorage = window.localStorage;
  const DOMbotonFinalizar = document.querySelector('#boton-finalizar');

  //Dibuja todos los productos*/

  function renderizarProductos() {
      baseDeDatos.forEach((info) => {
          const miNodo = document.createElement('div');
          miNodo.classList.add('card', 'col-sm-4');
          const miNodoCardBody = document.createElement('div');
          miNodoCardBody.classList.add('card-body');
          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('img-fluid');
          miNodoImagen.setAttribute('src', info.imagen);
          const miNodoPrecio = document.createElement('p');
          miNodoPrecio.classList.add('card-text');
          miNodoPrecio.textContent = `${divisa}${info.precio}`; 
          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn', 'btn-primary');
          miNodoBoton.textContent = '+';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
          miNodoCardBody.appendChild(miNodoImagen);
          miNodoCardBody.appendChild(miNodoTitle);
          miNodoCardBody.appendChild(miNodoPrecio);
          miNodoCardBody.appendChild(miNodoBoton);
          miNodo.appendChild(miNodoCardBody);
          DOMitems.appendChild(miNodo);
      });
  }

  function anyadirProductoAlCarrito(evento) {
      carrito.push(evento.target.getAttribute('marcador'))
      renderizarCarrito();
      guardarCarritoEnLocalStorage();
  }


  function renderizarCarrito() {
      DOMcarrito.textContent = '';
      const carritoSinDuplicados = [...new Set(carrito)];
      carritoSinDuplicados.forEach((item) => {
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          const numeroUnidadesItem = carrito.reduce((total, itemId) => {
              return itemId === item ? total += 1 : total;
          }, 0);
          const miNodo = document.createElement('li');
          miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
          miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;
          const miBoton = document.createElement('button');
          miBoton.classList.add('btn', 'btn-danger', 'mx-5');
          miBoton.textContent = 'X';
          miBoton.style.marginLeft = '1rem';
          miBoton.dataset.item = item;
          miBoton.addEventListener('click', borrarItemCarrito);
          miNodo.appendChild(miBoton);
          DOMcarrito.appendChild(miNodo);
      });
      DOMtotal.textContent = calcularTotal();
  }

  function borrarItemCarrito(evento) {
      const id = evento.target.dataset.item;
      carrito = carrito.filter((carritoId) => {
          return carritoId !== id;
      });
      renderizarCarrito();
      guardarCarritoEnLocalStorage();

  }

  function calcularTotal() {
      return carrito.reduce((total, item) => {
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          return total + miItem[0].precio;
      }, 0).toFixed(2);
  }

  function vaciarCarrito() {
      carrito = [];
      renderizarCarrito();
      localStorage.clear();
  }

  function guardarCarritoEnLocalStorage () {
      miLocalStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function cargarCarritoDeLocalStorage () {
      if (miLocalStorage.getItem('carrito') !== null) {
          carrito = JSON.parse(miLocalStorage.getItem('carrito'));
      }
  }

  function finalizarComprar(){
      alert("MUCHAS GRACIAS POR SU COMPRA");
  }

  // Eventos
  DOMbotonVaciar.addEventListener('click', vaciarCarrito);
  DOMbotonFinalizar.addEventListener('click', finalizarComprar);

  // Inicio
  cargarCarritoDeLocalStorage();
  renderizarProductos();
  renderizarCarrito();
});