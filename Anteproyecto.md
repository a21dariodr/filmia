# Filmia

Filmia permite llevar un registro de las películas vistas por un usuario, así como de las que tiene pendientes. Incluye funciones para la ordenación y filtrado de las películas, y facilita la inclusión de nuevas entradas mediante autocompletado.

## Características

La interfaz de usuario presenta una galería de las películas, mostrando para cada una de ellas su título junto su carátula y algunos datos relevantes. Dicha galería es personalizable, puediendo mostrar sólo las películas deseadas o en un orden concreto.

Implementa una gestión de usuarios con acceso seguro, de forma que cada usuario gestiona de forma privada su propia colección de películas.

## Diseño y tecnologías

La arquitectura de la aplicación consta de 3 partes: front-end, back-end y base de datos.

La parte de front-end se implementa básicamente con HTML, CSS y JavaScript. Se utiliza el framework CSS Bootstrap junto con sus componentes para facilitar el desarrollo de la interfaz gráfica, empleando el preprocesador CSS Sass para personalizar un poco Bootstrap modificando la paleta de colores y otros aspectos.

Para guardar la información de las películas y los usuarios se emplea la base de datos MySQL. El autocompletado de nuevos registros se realiza a través de llamadas a la API de The Movie Database, guardando la información obtenida en la base de datos únicamente si no ha sido guardada previamente. En el caso de las imágenes de portada de las películas, se almacenan directamente en una carpeta del servidor, guardando en la base de datos únicamente su ruta con el fin de potenciar el rendimiento. Para administrar la base de datos se utiliza la herramienta PHPMyAdmin.

En lo que respecta a la parte de back-end, se utiliza el servidor web Apache junto con PHP y el framework Symfony, aprovechando funcionalidades de este como el ORM Doctrine o el motor de plantillas de Twig. Para la instalación y gestión de paquetes en el proyecto se emplea el gestor Composer.

Puesto que ha optado por el uso de Symfony en el servidor, el back-end lleva a cabo la mayor parte del procesamiento de la aplicación con el fin de aprovechar sus funcionalidades. No obstante, se emplea JavsScript junto con sus funcionalidades de asincronismo en el lado del cliente para realizar cambios en la interfaz de forma dinámica.

Con el fin de facilitar tanto el desarrollo como el despliegue, se emplea Docker para containerizar la aplicación. Al emplear base de datos se hace necesario el uso de Docker Compose, generando un contenededor para MySQL, otro para el gestor PHPMyAdmin y otro para el servidor web Apache junto con PHP, Symfony y todos los demás ficheros del proyecto.

Para su utilización, la aplicación web se despliega a través de Render.
