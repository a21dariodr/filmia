# Proyecto fin de ciclo

[Filmia](https://filmia-ee910.web.app/) es una aplicación que permite llevar un registro de las películas vistas por un usuario, así como de las que tiene pendientes. Incluye funcionalidad para la búsqueda, ordenación y filtrado de las películas en la galería principal, y facilita la inclusión de nuevas entradas en el listado de películas mediante autocompletado a partir de la información obtenida de la API de [The Movie Database](https://www.themoviedb.org/). Asimismo, muestra información detallada y actualizada acerca de cada película incluyendo las plataformas donde puede visualizarse desde España, gracias a la integración de The Movie Database con [Just Watch](https://www.justwatch.com/es).

## Índice

> *TODO*: Simplemente indexa ordenadamente todo tu proyecto.

1. Anteproyecto
    * 1.1. [Idea](doc/templates/1_idea.md)
    * 1.2. [Necesidades](doc/templates/2_necesidades.md)
2. [Análisis](doc/templates/3_analise.md)
3. [Planificación](doc/templates/4_planificacion.md)
4. [Diseño](doc/templates/5_deseño.md)
5. [Implantación](doc/templates/6_implantacion.md)

## Arquitectura

La aplicación presenta una arquitectura de dos capas: frontend y backend.

* Para implementar el backend se hace uso de Firebase, un producto de Google que se encuadra dentro de la categoría de backend como servicio (BaaS). Proporciona diversas funcionalidades, dentro de las cuales en este proyecto se hace uso de tres: hosting, autenticación y base de datos.
  En el caso de la base de datos, se hace uso de Firestore, del tipo noSQL.

* El frontend es la parte más importante de la aplicación y la que proporciona la mayor parte de funcionalidad. Está implementado con el framework de JavaScript React en conjunción con otras tecnologías como React Router o Typescript.

## Tecnologías

En este apartado se detallan la totalidad de las tecnologías empleadas en el proyecto, tanto durante el desarollo como durante la etapa de producción:

## Instalación / Puesta en marcha

> *TODO*: En este apartado describe con toda precisión y a poder ser con la mayor simplicidad/facilidad posible, cómo poner en marcha tu aplicación para probarla (en un ambiente local). Se valorará muy positivamente que este proceso sea lo más fácil posible, con una simple instrucción (p. e. un script de instalación).
> Si tu proyecto es documental, realiza una especificación de cómo va a ser este proceso. En otras palabras, realiza este apartado independientemente que no haya implementación.

## Uso

> *TODO*: Es este apartado describe brevemente cómo se usará el software que proyectas. Si tiene una interfaz de terminal, describe aquí su sintaxis. Si tiene una interfaz gráfica de usuario, describe aquí **sólo el uso** (a modo de sumario) **de los aspectos más relevantes de su funcionamiento** (máxima brevedad, como si fuese un anuncio reclamo o comercial).
> Si tu proyecto es documental, realiza una especificación de cómo planteas estas interfaces, con ejemplos incluso o esquemas de diseño. En otras palabras, realiza este apartado independientemente que no haya implementación.

## Sobre el autor

> *TODO*: Realiza una breve descripción de quien eres (perfil profesional), tus puntos fuertes, o tecnologías que más dominas... y porqué te has decantado por este proyecto. **No más de 200 palabras**. Indica la forma fiable de contactar contigo en el presente y en el futuro.

## Licencia

Este proyecto está licenciado bajo la [licencia MIT](LICENSE).

## Guía de contribución

> *TODO*: Tratándose de un proyecto de software libre, es muy importante que expongas cómo se puede contribuir con tu proyecto. Algunos ejemplos de esto son realizar nuevas funcionalidades, corrección y/u optimización del código, realización de tests automatizados, nuevas interfaces de integración, desarrollo de plugins, etc. etc. Sé lo más conciso que puedas.

## Links

> *TODO*: Enlaces externos y descipciones de estos enlaces que creas conveniente indicar aquí. Generalmente ya van a estar integrados con tu documentación, pero si requieres realizar un listado de ellos, este es el lugar.
