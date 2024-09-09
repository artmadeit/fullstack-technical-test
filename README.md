# FULLSTACK TECHNICAL TEST
## Creación de un API REST con Django Rest Framework y un client web con React

La prueba consiste en crear un API REST para un único recurso, la cual será consumida desde un cliente web. La generación de todos los archivos necesarios y el manejo de una óptima estructura de archivos debe ser realizado por el/la postulante. Genere un fork de este repositorio. Utilice versiones con soporte de Python, Django y React.

# Objetivos de la prueba
* Evaluar el pensamiento computacional y el enfoque empleado al resolver problemas.
* Evaluar el conocimiento general del lenguaje Python y de React.
* Evaluar el conocimiento en arquitecturas web (MVC, REST).
* Evaluar buenas prácticas en el código.
* Evaluar el conocimiento de buenas prácticas de seguridad.
  
## Requerimientos generales

1. El API REST debe ser desarrollado con Django Rest Framework.
2. El cliente web debe ser desarrollado con React + Typescript.
3. El cliente web debe consumir el API REST.
4. Se debe utilizar el ORM de Django para el modelo de la base de datos.
5. Se debe crear un archivo `requirements.txt` con las dependencias necesarias para ejecutar el proyecto.
6. Se debe crear un archivo `README.md` en el cual se explique el funcionamiento del proyecto, así como las instrucciones para ejecutarlo.
7. Se debe crear un archivo `.env` que contenga las variables de entorno necesarias para la ejecución del proyecto.

## Requerimientos backend
1. Generar un API para administrar un albergue de animales rescatados (perros y gatos). Se debe poder llevar un control de los animales en albergue: nombre, edad, raza, tipo (perro o gato), estado (adoptado, en adopción, en espera de adopción, etc). Se debe poder llevar un control de los voluntarios que trabajan en el albergue: nombre, apellido, correo electrónico, contraseña, estado (activo, inactivo, etc). Se debe poder llevar un control de las personas que adoptan animales: nombre, apellido, correo electrónico, contraseña, estado (activo, inactivo, etc). Se debe poder llevar un control de las adopciones, es decir, el registro de cuándo y a quién se le entregó un animal: fecha, animal, voluntario, persona que adopta, estado (finalizado, en proceso, etc).

    **Nota:** El endpoint debe permitir realizar las siguientes operaciones:
    * Listar todos los animales en albergue. [GET]
    * Listar todos los voluntarios. [GET]
    * Listar todos los adoptantes. [GET]
    * Listar todas las adopciones. [GET]
    * Crear un animal en albergue. [POST]
    * Crear un voluntario. [POST]
    * Crear un adoptante. [POST]
    * Crear una adopción. [POST]
    * Obtener un animal en albergue. [GET by ID]
    * Obtener una adopción. [GET by ID]
    * Actualizar un animal en albergue. [POST/PATCH]
    * Actualizar un voluntario. [POST/PATCH]
    * Actualizar un adoptante. [POST/PATCH]
    * Actualizar una adopción. [POST/PATCH]
    * Eliminar un animal en albergue. [DELETE]
    * Eliminar un voluntario. [DELETE]
    * Eliminar un adoptante. [DELETE]
    * Eliminar una adopción. [DELETE]

2. El modelo de la base de datos queda a elección del postulante; sin embargo, esta debe tener todo lo necesario para plasmar lo explicado en el requerimiento anterior.

3. Se desea validar que los requests cumplan las restricciones establecidas en el modelo de la base de datos. Los errores deben mostrarse al usuario en el response en caso de haberlos.

4. Se desea que el API sea restringido mediante algún método de autenticación. Queda a elección del postulante el approach de autenticación a seguir. El nivel de seguridad será evaluado.

5. Se desea que el usuario se autentifique mediante json web tokens, para ello se utilizará la librería Simple JWT para Django rest framework. (ACCESS + REFRESH TOKEN)

## Requerimientos frontend

1. Debe utilizar React + Typescript junto al framework [Mantine UI](https://mantine.dev/).

2. Debe contar con un solo registro  para los voluntarios y adoptantes. Los administradores (superusers) solo pueden ser creados desde Django admin. Para terminos prácticos puede asumir que los roles son excluyentes.

3. Debe contar con un Login unificado para los voluntarios, adoptantes y administradores.

4. Los administradores pueden acceder al CRUD de los animales en albergue, de los voluntarios, de los adoptantes y de las adopciones.

5. Los adoptantes solo pueden visualizar los animales disponibles para adopción y solicitar la adopción de un animal.
   
7. Los voluntarios pueden visualizar los animales del albergue, los adoptantes y las adopciones. Además, pueden cambiar el estado de un animal en albergue a "adoptado" o "en adopción".


## Adicionales
1. Deployar el cliente web y servidor backend en la capa gratuita de algún servicio cloud.
2. Realizar un esquema de testing para el backend, basado en probar los endpoints, y todo lo que ello implica.
