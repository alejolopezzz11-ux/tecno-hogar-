# AGENTS.md

## Propósito
Este documento establece las reglas y lineamientos para la construcción de la tienda online básica utilizando HTML, CSS, JavaScript y Bootstrap 5.  
El objetivo es guiar las modificaciones de cada archivo del frontend, asegurando que se cumplan los requisitos del curso y se mantenga la estructura del proyecto.

---

## Reglas generales
- No cambiar la estructura del proyecto.
- No modificar el backend.
- No usar React, Angular ni Vue.
- Usar Bootstrap 5 mediante CDN.
- No agregar todavía `productos.html`.
- No modificar todavía archivos CSS ni JavaScript externos.
- El diseño debe ser sencillo y adecuado para aprendices principiantes.
- Mantener enlaces de navegación entre `index.html`, `ayuda.html` y `contacto.html`.
- Explicar brevemente qué cambios se realizaron.
- Indicar cómo probar la página con **Live Server**.

---

## Reglas para `index.html`
- No modificar `ayuda.html` ni `contacto.html`.
- La página debe incluir:
  1. Estructura HTML5 correcta.
  2. Enlace a Bootstrap 5 por CDN.
  3. Barra de navegación con enlaces a Inicio, Ayuda y Contacto.
  4. Sección principal tipo *hero* para presentar la tienda.
  5. Descripción breve de la tienda.
  6. Sección de categorías o servicios.
  7. Tres tarjetas informativas de ejemplo (sin crear todavía una página de productos).
  8. Botón de acción.
  9. Pie de página básico.

---

## Reglas para `ayuda.html`
- No modificar `index.html` ni `contacto.html`.
- La página debe incluir:
  1. Estructura HTML5 correcta.
  2. Enlace a Bootstrap 5 por CDN.
  3. Barra de navegación con enlaces a Inicio, Ayuda y Contacto.
  4. Título principal: **Centro de ayuda**.
  5. Una sección breve que explique el propósito de la página.
  6. Un acordeón de Bootstrap con preguntas frecuentes, por ejemplo:
     - ¿Cómo comprar en la tienda?
     - ¿Qué métodos de pago se aceptan?
     - ¿Cuánto tarda el envío?
     - ¿Cómo contactar soporte?
  7. Una sección de recomendaciones para el usuario.
  8. Pie de página básico.

---

## Reglas para `contacto.html`
- No modificar `index.html` ni `ayuda.html`.
- El formulario no debe conectarse todavía al backend.
- La página debe incluir:
  1. Estructura HTML5 correcta.
  2. Enlace a Bootstrap 5 por CDN.
  3. Barra de navegación con enlaces a Inicio, Ayuda y Contacto.
  4. Título principal: **Contacto**.
  5. Una sección breve que explique el propósito de la página.
  6. Un formulario de contacto con los siguientes campos:
     - Nombre completo.
     - Correo electrónico.
     - Asunto.
     - Mensaje.
     - Botón **Enviar**.
  7. Validaciones básicas de HTML5 usando `required` y `type="email"`.
  8. Una sección con información de contacto ficticia:
     - Correo de soporte.
     - Teléfono.
     - Ciudad.
     - Horario de atención.
  9. Pie de página básico.

---

## Cómo probar con Live Server
1. Abrir el proyecto en **Visual Studio Code**.  
2. Instalar la extensión **Live Server** si no está instalada.  
3. Hacer clic derecho sobre el archivo `index.html`.  
4. Seleccionar **Open with Live Server**.  
5. El navegador mostrará la tienda online básica con navegación hacia `ayuda.html` y `contacto.html`.

---
