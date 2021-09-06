# Proyecto Final Back End

Iniciar : npm run dev

Routes Productos

POST:
/api/productos "Crea un nuevo producto, solo "admin" users (necesita recibir "user":"admin")
PUT:
/api/productos/:id "Modifica un producto por ID, solo "admin" users"
DELETE:
/api/productos/:id "Borra un producto por ID, solo "admin" users"
GET:
/api/productos "Trae Todos los productos disponibles"
GET:
/api/productos/:id "Busca un producto por ID"

Routes Carrito

POST:
/api/carrito "Crea un nuevo carrito"
DELETE:
/api/carrito/:id "Borra un carrito por ID"
GET:
/api/carrito/:id/productos "Muestra carrito por iD"
POST:
/api/carrito/:id/productos "Inserta producto en carrito(necesita el id del producto Ej: "id":1 (agrega el producto 1))"
