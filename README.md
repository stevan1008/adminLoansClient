# Registro y Login de Clientes y Administradores

El sistema permite que tanto clientes como administradores se registren y accedan a sus respectivas interfaces mediante un proceso de login. A continuación, detallaré los pasos:

## Registro de Cliente:

- Un usuario puede registrarse como cliente llenando un formulario con su nombre, correo electrónico y una contraseña.
- Posteriormente, se le dará un ID único que se utilizará junto con su contraseña para acceder a su cuenta. Ese id debe de almacenarlo en algún lugar seguro.

## Registro de Administrador:

- Un administrador puede registrarse proporcionando un nombre, un rol (como "General", "Manager", "Director") y una contraseña.
- Después del registro, el administrador recibe su ID único para el login. Ese id debe de almacenarlo en algún lugar seguro.

## Login de Cliente y Administrador:

- Los usuarios (tanto clientes como administradores) pueden iniciar sesión usando su ID y contraseña.
- Dependiendo de si el usuario es cliente o administrador, el sistema los redirigirá a su respectiva interfaz para realizar las acciones disponibles.

![Interfaz Login y Sign Up para clientes](https://github.com/stevan1008/adminLoansClient/blob/master/assets/loginclientes.png)
![Interfaz Login y Sign Up para Admins](https://github.com/stevan1008/adminLoansClient/blob/master/assets/loginAdmins.png)

---

# Solicitud de Préstamos por Clientes

Una vez que un cliente se ha logueado e iniciado sesión, tiene la opción de solicitar un préstamo. Este proceso consiste en:

- Ingresar el monto del préstamo y el plazo (en meses).
- Enviar la solicitud de préstamo.

**Condición Importante:** Si el cliente no tiene un puntaje de crédito (creditScore), la solicitud no podrá ser enviada y se mostrará un mensaje de error indicando que no puede acceder a un crédito hasta tener un creditScore asignado por un administrador.

![Interfaz Prestamos para Clientes](https://github.com/stevan1008/adminLoansClient/blob/master/assets/prestamosclientes.png)

---

# Aumento de Credit Score por el Administrador

Los administradores pueden visualizar una lista de clientes registrados y aumentar el puntaje de crédito (creditScore) de aquellos clientes que lo requieran, permitiéndoles acceder a ese cliente a préstamos.

El flujo para aumentar el creditScore es:

1. El administrador inicia sesión.
2. Puede ver una lista de clientes y modificar el creditScore de los clientes que lo necesiten.
3. Una vez que el cliente tiene un creditScore suficiente, podrá solicitar préstamos sin problemas.

![Interfaz aumentar credito para un cliente desde el menú de Admin](https://github.com/stevan1008/adminLoansClient/blob/master/assets/aumentocredito.png)

---

# Solicitud de Préstamos con Credit Score Aprobado

Ahora que el cliente tiene un creditScore asignado, puede volver a realizar la solicitud de préstamo:

1. El cliente ingresa el monto del préstamo y selecciona el plazo, que por default es 12 pero él podrá cambiarlo a conveniencia.
2. La solicitud es enviada exitosamente y el sistema genera un préstamo en estado pendiente que es el default en el backend.

![Interfaz cuando se pidió el prestamo](https://github.com/stevan1008/adminLoansClient/blob/master/assets/prestamoenviado.png)

---

# Aprobación o Rechazo de Préstamos por el Administrador

Los administradores tienen acceso a un listado de préstamos pendientes que han sido solicitados por los clientes. El administrador puede:

- Aprobar el préstamo, genernado una fecha de aprobación desde el servidor y permitiendo al cliente iniciar el pago del préstamo.
- Rechazar el préstamo, dejándolo en un estado rechazado.

Una vez que un préstamo es aprobado o rechazado, el cliente es notificado y puede proceder con el siguiente paso si es aprobado.

![Aprobación de prestamo de un cliente desde el menú de admin](https://github.com/stevan1008/adminLoansClient/blob/master/assets/aprobarprestamo.png)

---

# Pago de Préstamos por Clientes

Después de que un préstamo es aprobado, el cliente podrá iniciar el proceso de pago:

1. El cliente verá los detalles del préstamo, incluyendo el monto restante por pagar.
2. Podrá ingresar el monto a abonar y realizar un pago parcial o total del préstamo.
3. Cada vez que el cliente realiza un pago, el sistema actualiza el saldo restante.
4. Una vez que el préstamo ha sido pagado en su totalidad, se le notificará al cliente que el préstamo ha sido completamente pagado.

![Pago de prestamos desde la interfaz de un cliente](https://github.com/stevan1008/adminLoansClient/blob/master/assets/oagodeprestamo.png)


---

## Docker

1. **Construir la imagen de Docker:**
   ```bash
   docker build -t loan-management-system-frontend .
   ```
2. **Ejecutar la imagen de Docker:**
   ```bash
   docker run -p 3000:80 loan-management-system-frontend
   ```

## Usar Docker Compose

1. **Levantar el contenedor con Docker Compose:**
   ```bash
   docker-compose up -d
   ```
2. **Detener el contenedor:**
   ```bash
   docker-compose stop
   ```
