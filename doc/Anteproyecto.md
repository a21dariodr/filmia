# Filmia

Filmia permite llevar un registro de las películas vistas por un usuario, así como de las que tiene pendientes. Incluye funciones para la ordenación y filtrado de las películas, y facilita la inclusión de nuevas entradas mediante autocompletado.

## Características

La interfaz de usuario presenta una galería de las películas, mostrando para cada una de ellas su título junto su carátula y algunos datos relevantes. Dicha galería es personalizable, puediendo mostrar sólo las películas deseadas o en un orden concreto.

Implementa una gestión de usuarios con acceso seguro, de forma que cada usuario gestiona de forma privada su propia colección de películas.

## Diseño y tecnologías

La arquitectura de la aplicación consta fundamentalmente de 2 partes: front-end y back-end.

La parte de front-end se implementa básicamente con la librería React, haciendo uso de su sintaxis JSX y sus nuevos componentes basados en programación funcional. Se empleará una librería de componentes open source como Material UI o Mantine (o incluso el framework React Bootstrap) para aprovechar la reutilización de componentes siempre que sea posible al tiempo que se desarrolla una interfaz de usuario responsiva.

Por otro lado, se hará uso de la plataforma de desarrollo Firebase para implementar la funcionalidad del back-end. Se aprovecharán las características de dicha plataforma para implementar la gestión de usuarios y su autenticación segura, así como para almacenar el listado de películas vistas por cada uno de ellos. Finalmente, se hará uso Firebase para desplegar la aplicación.

A la hora de inicializar el proyecto, además de su posterior construcción y empaquetado, y para disponer de un servidor de desarrollo para la programación del front-end se hará uso de la herramienta Vite, junto con el gestor de paquetes NPM.

La obtención de la información de cada película, así como la provisión de la funcionalidad de autocompletado al añadir nuevos registros, se harán a través de llamadas a la API de The Movie Database.
