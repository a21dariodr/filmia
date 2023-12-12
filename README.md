# Proyecto fin de ciclo

- [1. Descripción](#1-descripción)
- [2. Requisitos](#2-requisitos)
  - [2.1. Requisitos funcionales](#21-requisitos-funcionales)
  - [2.2. Requisitos no funcionales](#22-requisitos-no-funcionales)
- [3. Arquitectura](#3-arquitectura)
  - [3.1. Base de datos](#31-base-de-datos)
- [4. Tecnologías](#4-tecnologías)
- [5. Despliegue](#5-despliegue)
- [6. Uso](#6-uso)
- [7. Roadmap](#7-roadmap)
- [8. Sobre el autor](#8-sobre-el-autor)
- [9. Licencia](#9-licencia)
- [10. Guía de contribución](#10-guía-de-contribución)
- [11. Otra documentación](#11-otra-documentación)

## 1. Descripción

[Filmia](https://filmia-ee910.web.app/) es una aplicación que permite llevar un registro de las películas vistas por un usuario, así como de las que tiene pendientes. Incluye funcionalidad para la búsqueda, ordenación y filtrado de las películas en la galería principal, y facilita la inclusión de nuevas entradas en el listado de películas mediante autocompletado a partir de la información obtenida de la API de [The Movie Database](https://www.themoviedb.org/). Todas las páginas de la aplicación se han implementado de forma responsiva, de forma que se muestren de forma adecuada tanto en pantallas grandes como en dispositivos móviles. A continuación se muestra la apariencia de la galería principal de películas en ambos tipos de dispositivo:

![Galería principal de películas de un usuario](/doc/img/film_gallery.png){width=80%}

Asimismo, muestra información detallada y actualizada acerca de cada película incluyendo las plataformas donde puede visualizarse desde España, gracias a la integración de The Movie Database con [Just Watch](https://www.justwatch.com/es). El diseño de esta vista detalla, dada su relevancia en la aplicación, se muestra a continuación tanto para dispositivos móviles como en pantallas de mayor tamaño como ordenadores de sobremesa o portátiles:

![Vista detallada de una película con su información completa](/doc/img/film_details.png){width=80%}

## 2. Requisitos

### 2.1. Requisitos funcionales

- **Autenticación y gestión de usuarios**
  - El usuario debe poder registrarse e iniciar sesión tanto con usuario y contraseña como empleando una cuenta de Google.
  - Deberá ser posible recuperar la contraseña en caso de pérdida.
  - El usuario debe poder decidir al iniciar sesión si quiere mantener la sesión iniciada o no.
- **Internacionalización**
  - La interfaz de usuario debe poder mostrarse en 3 idiomas: castellano, gallego o inglés.
  - Debe emplearse un sistema de detección del lenguaje del navegador para configurar el idioma durante la carga inicial.
- **Gestión de colecciones de películas**
  - El formulario de adición de nuevas películas a la colección de un usuario debe funcionar mediante autocompletado en tiempo real a partir de los datos obtenidos de la API de [The Movie Database](https://www.themoviedb.org/), pudiendo el usuario modificar únicamente los campos de título (que debe funcionar como campo de búsqueda), puntuación personal y visionado.
    - Dicho formulario debe comprobar que el valor de puntuación, en caso de introducirse, sea válido, impidiendo el guardado en caso contrario.
  - La página principal debe mostrar una galería con la colección de películas de un usuario, siempre y cuando el usuario haya iniciado sesión, redirigiendo a la página de login y registro en caso contrario.
  - La galería de la página principal debe mostrar una tarjeta por cada película de la colección, produciendo un efecto 3D al pasar el ratón por encima o arrastrar horizontalmente en pantallas táctiles, además de mostrar información acerca del título, año, duración, visionado y puntuación personal.
  - La galería de la página principal debe proporcionar la siguiente funcionalidad:
    - Activación/desactivación del efecto 3D para compatibilidad con navegadores antiguos.
    - Botón de navegación a la ruta de adición de nuevas películas.
    - Cambio de tamaño de las tarjetas para elegir entre tamaño grande y tamaño pequeño.
    - Búsqueda de películas por título o título original.
    - Ordenación por título, título original, duración, año, puntuación media en [The Movie Database](https://www.themoviedb.org/) o puntuación personal, tanto de forma ascendente como descendente.
    - Filtrado por género o por visionado, pudiendo activar y descativar dichos filtros para que actúen juntos, por separado o no actúen en absoluto.
  - La página de información detallada de cada película debe mostrar la información completa, obtenida de la API de [The Movie Database](https://www.themoviedb.org/) en el momento de acceder a la ruta asociada la página.
  - La página de información detallada de cada película debe permitir modificar la puntuación personal de dicha película y el estado de visionado (película vista/no vista), así como eliminar la película de la colección.
  - La página de información detallada de cada película debe estructurarse de forma que se presente de forma adecuada la información obtenida a partir de la API en todos los casos (puesto que no todas las películas disponen de la misma información).
- **Responsividad**
  - Todas las páginas de la aplicación deben mostarse y funcionar de forma adecuada con independencia de si se emplea un ordenador portátil o de sobremesa o un dispositivo móvil.
- **Enrutamiento**
  - Al tratarse de una aplicación de tipo *single page application* (en adelante SPA, por sus siglas en inglés), debe emplearse un sistema de enrutamiento del lado del cliente que permita acceder a la página deseada mediante su url correspondiente.

### 2.2. Requisitos no funcionales

- Debe asegurarse una alta disponibilidad para la aplicación.
- Las conexiones deben ser seguras y estar adecuadamente cifradas mediante el empleo del protocolo https junto con un certificado válido.
- Debe asegurarse un almacenamiento adecuado y seguro de la información de los usuarios.
- El tiempo de respuesta y velocidad de carga, tanto inicial como durante operaciones tales como el filtrado o las búsquedas a tiempo real deben ser lo más rápidos posibles, garantizando una adecuada usabilidad y experiencia de usuario en la aplicación.
- Todas las funcionalidades del sistema deben ser intuitivas y fáciles de usar, empleando patrones de diseño y elementos comunes a la mayoría de aplicaciones informáticas que les resulten lo más familiares posible a los usuarios.
- La aplicación debe controlar posibles errores lanzados en tiempo de ejecución, mostrando una página de error adecuada y permitiendo la recuperación de los mismos mediante redirección a la página principal.
- La interfaz gráfica de la aplicación debe respetar un diseño común empleando los mismos componentes y colores a lo largo de todas las páginas que la componen.

## 3. Arquitectura

La aplicación presenta una arquitectura de dos capas: frontend y backend.

- Para implementar el backend se hace uso de Firebase, un producto de Google que se encuadra dentro de la categoría de backend como servicio (BaaS). Proporciona diversas funcionalidades, dentro de las cuales en este proyecto se hace uso de tres: hosting, autenticación y base de datos.
  En el caso de la base de datos, se hace uso de Firestore, del tipo noSQL.

- El frontend es la parte más importante de la aplicación y la que proporciona la mayor parte de funcionalidad. Está implementado con el framework de JavaScript React en conjunción con otras tecnologías como React Router o Typescript.
  Puesto que se emplea la versión funcional moderna de los componentes de React en detrimento de los componentes antiguos con orientación a objetos, el paradigma de programación funcional es el predominante en la aplicación, aunque se emplea asimismo programación orientada a objetos para encapsular la información de las películas así como para implementar los servicios (conexión con APIs, Firebase, etc.).

El flujo de ejecución de la aplicación se apoya en dos tecnologías principales: los componentes de React y el enrutamiento de React Router. Cuando la página de la aplicación es cargada en el navegador se ejecuta el script *main.tsx*, el cual se encarga de inicializar el sistema de enrutamiento junto con otros aspectos como la traducción de la interfaz o la librería de componentes Material Tailwind, además de cargar las hojas de estilos generales para toda la aplicación.

Cada una de las rutas de la apliación tiene asociado su componente componente de React, el cual es cargado al acceder a dicha ruta. Existen cuatro rutas principales, puesto que las funcionalidades de login, registro de usuarios y recuperación de contraseña disponen de ruta propia. El resto de las fucionalidades de la aplicación se muestran en la ruta principal, asociada al componente *Home*, y que a su vez renderiza un componente de cabecera (*Header*), otro de pie de página (*Footer*) y un *Outlet* en el que se renderizan las demás subrutas de la aplicación. Por defecto y una vez que el usuario ha iniciado sesión, se renderiza el componente *Gallery* que muestra la galería de películas del usuario. Es en este mismo espacio donde se muestran el componente de información detallada de cada película y el formulario de adición de nuevas películas a la colección, una vez que el usuario accede a sus rutas correspondientes.

Además de todas estas rutas y componentes principales, existen una serie de clases que tienen un papel primordial en la aplicación. Por una parte, la clase *Film* sirve para modelar objetos de tipo película y se emplea a lo largo de todo el proyecto para manejar la información proveniente o enviada a la base de datos o recibida de la API de películas.

Por otra parte, existen una serie de servicios implementados con orientación a objetos que se encargan de la comunicación con servicios externos:

- *Servicio de Firebase*: contiene la configuración principal de Firebase y se encarga de inicializar los servicios empleados (autenticación y base de datos), proporcionando acceso a los mismos desde cualquier parte de la aplicación a través de la exportación de variables que apuntan a dichos servicios.
- *Servicio de Firestore*: se encarga de la lectura y escritura de la información guardada en la base de datos.
- *Servicio de Firebase Authentication*: contiene los métodos correspondientes a todas las funcionalidades del sistema de autenticación, desde el registro de nuevos usuarios hasta la recuperación de contraseñas.
- *Servicio de comunicación con la API de The Movie Database*: su labor principal es la comunicación con la API de [The Movie Database](https://www.themoviedb.org/), para buscar películas a partir de su título o para obtener su información detallada a partir de su ID. Asimismo, se encarga de mapear la información obtenida devolviendo objetos *Film*.

Una visión esquemática de la arquitectura de la apliación puede verse en la imagen que se muestra a contiunuación:

![Esquematización de la arquitectura de la aplicación](/doc/img/architecture_diagram.png){width=60%}

### 3.1. Base de datos

Firestore es una base de datos de tiupo noSQL, que almacena los datos en colecciones de documentos. En este caso se ha planteado una estructura de datos consistente en una colección llamada usuarios que almacena documentos que representan a cada usuario usando el id del usuario como nombre del documento. Cada uno de estos documentos de usuario almacena a su vez una colección de películas, siendo cada película un documento cuyo nombre se corresponde con el id asignado en la API de [The Movie Database](https://www.themoviedb.org/). Es en cada uno de estos documentos donde se almacena la información básica de cada película (título, año, duración, ruta a su imágen de carátula, etc), almacenando únicamente la información esencial para mostrar en la galería y para implementar las funcionalidades de búsqueda, ordenación y filtrado, y obteniendo la información completa de cada película (reparto, plataformas de visualización y demás) únicamente al acceder a la ficha ampliada de cada una de las películas. A continuación se muestra una esquematización de la estructura de datos empleada:

![Representación de la estructura de los datos almacenados en la base de datos Firestore](/doc/img/firestore_structure.png)

## 4. Tecnologías

En este apartado se detallan la totalidad de las tecnologías empleadas en el proyecto, tanto durante el desarollo como durante la etapa de producción:

- **Firebase**: se hace uso de este servicio de tipo BaaS para almacenar y desplegar el proyecto (**Firebase Hosting**), registrar y autentificar usuarios (**Firebase Authentication**) y almacenar el listado de películas de los usuarios (**Firebase Firestore**)
- **Gitlab**: se emplea para almacenar el proyecto versionado mediante el sistema de control de versiones git, así como para la automatización del despliegue en Firebase Hosting mediante un pipeline que se ejecuta cada vez que se suben cambios al repositorio.
- **HTML**, **CSS** y **Javascript**: mediante HTML se genera el documento base posteriormente modificado mediante React, mientras que el CSS se emplea para aplicar aquellos estilos que no pueden aplicarse de forma directa haciendo uso de Tailwind CSS y Javascript es empleado para dotar de funcionalidad los componentes de React.
- **React**: se emplea esta librería de Javascript para implementar los componentes que dotan de funcionalidad a la parte del cliente de la aplicación.
- **Tailwind CSS**: se hace uso de este framework CSS durante el desarrollo para asignar estilos a la interfaz directamente en la definición de los componentes de React.
- **Material Tailwind**: esta librería de componentes de React se emplea para implementar componentes como la barra de navegación, switches o campos de selección. Se ha optado por esta librería por emplear Tailwind CSS para dar estilos a sus componentes y ser 100% compatible con dicha librería.
- **Typescript**: añade seguridad y confiabilidad al código al añadir tipado a las variables de los componentes durante el desarrollo y en la construcción del proyecto.
- **React Router**: proporciona enrutamiento del lado del cliente, necesario al tratarse de una aplicación de una sola página (SPA)
- **Redux**: este gestor de estado se emplea como almacén central de información, principalmente para guardar el listado de películas de un usuario con el fin de hacerlo accesible en todas las rutas de la aplicación sin necesidad de realizar llamadas recurrentes a la base de datos.
- **Atropos**: hace posible la adición de efectos parallax 3D sobre las imágenes, tanto al pasar el ratón por encima como al moverlos mediante gestos en dispositivos móviles.
- **Animate**: se trata de una librería ligera que ayuda a implementar rápidamente animaciones CSS.
- **Axios**: se emplea para hacer peticiones a la API de [The Movie Database](https://www.themoviedb.org/) con el fin de obtener información de las películas y proporcionar funcionalidad de búsqueda para añadir nuevas películas a la colección de un usuario.
- **Vite**, **Rollup** y **Terser**: se emplea **Vite** durante el desarrollo con el fin de disponer de un servidor que permita la ejecución del proyecto y la visualización de cambios en tiempo real gracias a su funcionalidad de reemplazo de módulos en caliente (*HMR*, por sus siglas en inglés). Asimismo, permite la construcción del proyecto para su depsliegue, haciendo uso del bundler **Rollup**. Además, se emplea **Terser** con el fin de eliminar los mensajes de consola empleados durante el desarrollo para la etapa de producción.
- **NPM**: se emplea el gestor de paquetes de **NodeJS**, **NPM**, para añadir las dependencias necesarias al proyecto. También se hace uso de su sistema de ejecución de scrips para lanzar el servidor de desarrollo de Vite, para construir el proyecto y para desplegarlo en Firebase.
- **ESLint**: se emplea este analizador estático para encontrar posibles problemas en el código durante el desarrollo y en la construcción del proyecto.
- **Prettier**: se emplea para formatear el código de forma uniforme a lo largo de todo el proyecto, efectuando dicho formateo cada vez que se guardan los cambios en un fichero.
- **Dotenv**: carga las variables de entorno definidas en el fichero .env y se emplea para almcenar la token de la API de [The Movie Database](https://www.themoviedb.org/), así como ciertas variables empleadas para la configuración de Firebase.
- **i18next**: esta librería proporciona la funcionalidad necesaria para traducir la interfaz y poder mostrarla en castellano, gallego o inglés a elección del usuario.
- **Google Material Icons**: estos iconos modernos se emplean a lo largo de toda la aplicación para ayudar a la identificación visual de la información mostrada.
- **Flicking**: se trata de un carrusel avanzado y altamente personalizable que se emplea para mostrar de forma visual el listado de actores y actrices de una película.
- **FlagIcons**: proporciona la bandera de cada país de mundo, y es utilizada para asignar la bandera correspondiente a los países de producción de las películas.

![Collage de logos de las tecnologías empleadas en el proyecto](/doc/img/technologies_collage.png){width=40%}

## 5. Despliegue

El proyecto se construye mediante Vite, el cual emplea internamente Rollup como empaquetador (*bundler*). Dicha construcción se realiza mediante el script **build** ejecutando por consola la instrucción `npm run build`, la cual realiza primeramente una compilación del código tipado con Typescript a Javascript que pueda ser ejecutado por el navegador. A continuación se realiza la construcción del proyecto propiamente dicha, generando en la carpeta *dist* la versión del proyecto lista para desplegar en producción.

Asimismo, existe un script **preview** que puede ejecutarse mediante la instrucción `npm run preview` y que inicia un servidor de pruebas para poder probar y testear el proyecto una vez construido antes de desplegarlo.

La aplicación es desplegada en el servicio de hosting de Firebase. Para ello se ha configurado el script **deploy**, el cual se ejecuta mediante la instrucción `npm run deploy` y despliega en Firebase el proyecto construido en la carpeta *dist*.

Por otra parte, se ha configurado un pipeline para Gitlab en el fichero [.gitlab-ci.yml](.gitlab-ci.yml), que contruye y despliega el proyecto de forma automática cada vez que se suben cambios al repositorio.

En el caso de que otro desarrollador desee clonar y ejecutar el proyecto, debe modificar la configuración de Firebase para poder desplegar su propia instancia de la aplicación. Para ello, es necesario registrarse en Firebase y crear un nuevo proyecto, habilitando en el nuevo proyecto los servicios de Hosting, Authentication y Firestore Database. A continuación es necesario modificar los parámetros de configuración de Firebase en el proyecto, cambiando los valores de las variables de los ficheros [.env](.env) y [firebase.ts](src/services/firebase/firebase.ts). Finalmente, es necesario añadir algunos valores de variables de entorno a Gitlab (*Settings->CI/CD->Variables*), puesto que por privacidad el fichero [.env](.env) no se sube al repositorio de Gitlab. En concreto, es necesario añadir las variables *FIREBASE_TOKEN* y *VITE_TMD_ACCESS_TOKEN*, empleadas durante la construcción del proyecto mediante el pipeline y en las llamadas a la API de [The Movie Database](https://www.themoviedb.org/), respectivamente.

![Configuración de variables de entorno en Gitlab](/doc/img/gitlab_environment_variables.png)

## 6. Uso

Desde el punto de vista de los usuarios, el uso de la aplicación es muy sencillo. Al iniciar la aplicación por primera vez o si el usuario no tiene una sesión iniciada, es automáticamente redirigido a la página de inicio de sesión, donde puede loguearse empleando usuario y contraseña o una cuenta de Google, así como registrarse o recuperar su contraseña.

Una vez que un usuario ha iniciado sesión, es redirigido a la página principal que muestra una galería con la totalidad de su colección de películas. Esta página dispone de funcionalidad para activar o desactivar un efecto parallax 3D en las carátulas de las películas, para aumentar o disminuir su tamaño y para realizar un filtrado, ordenación o búsqueda por título en la colección.

En esta misma página de galería el usuario dispone de un botón para la adición de nuevas películas a su colección, que le redirige al formulario correspondiente. Este formulario funciona mediante autocompletado a partir del título en cuestión, mostrando un listado de películas encontradas durante la búsqueda. Al clicar en una de ellas, la información de la película se autorrellena en el formulario, permitiendo al usuario marcar la película como vista, asignarle una puntuación entre 0 y 10 y guardarla para añadirla a su colección.

Por otra parte, al clicar sobre una película cualquiera de la galería se redirige a la página de información completa de la misma, donde se mestra desde un carrusel con el reparto hasta las plataformas donde puede visualizarse en España. Asimismo, desde esta página el susuario puede marcar pa película como vista o no vista, asigar o modificar su puntuación o eliminar la película de la colección.

Por otra parte, los administradores pueden configurar y administrar los parámetros, usuarios y colecciones de películas directamente desde la consola de Firebase. De este modo, pueden modificarse las formas de autenticación de usuarios o añadir nuevos método (como el empleo de cuentas de Facebook o Github), o incluso manipularse de forma directa los datos almacenados en la base de datos Firestore o modificar las reglas de seguridad aplicadas. Asimismo, esta consola proporciona métricas relacionadas con el número de visitas a la página del proyecto o a la soperaciones de lectura y escritura realizadas en la base de datos.

![Consola de Firebase](/doc/img/firebase_console.png)

## 7. Roadmap

Puesto que el tiempo de desarrollo antes de la presentación del proyecto ha sido limitado, algunas de las funcionalidades inicialmente ideadas no han podido llegar a implementarse, aunque quedan pendientes para su implementación en futuras iteraciones. A continuación se muestra un listado con dichas funcionalidades:

- Soporte para series.
- Barra de navegación lateral para acceder a las directamente a galería con películas, series, películas o series pendientes o nuevas funcionalidades.
- Vista de grid o tabla en la galería principal.
- Gráficos con estadísticas de totales de películas y series, totales pendientes/vistas, totales y porcentajes por géneros, etc.
- Nuevos filtros en la galería: duración, año, etc.
- Importación de películas desde CSV y exportación a CSV o PDF.
- Modo oscuro.

## 8. Sobre el autor

Mi nombre es Darío de la Iglesia Rodríguez y soy un un doctor en química circunstacial pero informático de vocación que a raíz de la pandemia decidió dar un giro a su vida profesional iniciando una formación reglada en campo del desarrollo de software. Siempre busco aprender nuevas cosas y aumentar mis habilidades y además aprendo rápidamente, por lo que puedo desenvolverme en diferentes áreas y adaptarme a los cambios, incluso disfrutando con ello.

Dentro del mundo del desarrollo de software me atrae el desarrollo web y todas las tecnologías surgidas durante los últimos años, tanto del lado del front end como del back end, me gusta comprender todo el proceso desde el servidor hasta el usuario final. En este sentido, actualmente estoy comenzando mi camino aprendiendo tecnologías tan ampliamente usadas como React o Angular en el frontend y Express o Spring para el backend.

Además y debido a mi formación científica previa, estoy acostumbrado y además me gusta el trabajo con datos, desde su obtención hasta su procesamiento y visualización, por lo que procuro nunca dejar de lado el lenguaje Python y sus utilísimas librerías.

Quien desee contactar conmigo puede hacerlo a través de mi [perfil de LinkedIn](https://www.linkedin.com/in/dar%C3%ADo-de-la-iglesia-rodr%C3%ADguez-81279bb4/).

## 9. Licencia

Este proyecto está licenciado bajo la [licencia MIT](LICENSE).

## 10. Guía de contribución

Cualquiera que desee contribuir con el presente proyecto aportando su granito de arena es bienvenido. Para ello, debe hacer un *fork* de [este repositorio](https://gitlab.iessanclemente.net/dawd/a21dariodr) y crear una nueva rama *develop* sobre la que trabajar. Una vez realizados los cambios pertinentes o añadida la nueva funcionalidad, debe realizar un *merge request* para poder integrar los cambios en el proyecto.

En este sentido, cualquiera que desee formar parte del proyecto puede desarrollar cualquiera de las funcionalidades listadas en el apartado [Roadmap](#7-roadmap), las cuales están listadas en orden de prioridad de desarrollo, o incluso optimizar alguna de las funcionalidades ya existentes, desarrollar tests unitarios o *end-to-end* o corregir algún posible *bug* que pueda encontrarse.

## 11. Otra documentación

- [Anteproyecto](Anteproyecto.md)
