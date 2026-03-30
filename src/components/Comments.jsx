import React from 'react';
import Giscus from '@giscus/react';

/**
 * Componente de comentarios usando Giscus (GitHub Discussions).
 * 
 * Instrucciones para configurar (¡Sigue estos pasos en GitHub!):
 * 1. Asegúrate de que tu repositorio sea público.
 * 2. Ve a las "Settings" de tu repositorio y activa "Discussions".
 * 3. Instala la app de Giscus en tu cuenta de GitHub (https://giscus.app/).
 * 4. Ve a https://giscus.app/es, ingresa el nombre de tu repositorio (por ejemplo: edgarmancilla/personal-brand)
 * 5. La página generará los IDs que debes sustituir abajo.
 */
export default function Comments() {
  return (
    <section className="blog-comments" style={{ marginTop: '4rem', width: '100%' }}>
      <h2 style={{ marginBottom: '2rem' }}>Comentarios</h2>
      <Giscus
        id="comments"
        repo="Delkoman88/personal-brand"
        repoId="R_kgDOR0SROg"
        category="Announcements"
        categoryId="DIC_kwDOR0SROs4C5k-U"
        mapping="pathname"         // Vincula los comentarios usando la ruta de la página (/blog/mi-articulo)
        strict="0"                 // Usa coincidencias no estrictas de búsqueda
        reactionsEnabled="1"       // Activa las reacciones (👍, 👎, 🚀)
        emitMetadata="0"           // Opcional, para emitir metadatos vía postMessage
        inputPosition="top"        // Coloca la caja de entrada arriba o "bottom"
        theme="preferred_color_scheme" // Adapta al tema del sistema operativo o usa "light" / "dark" / "transparent_dark"
        lang="es"                  // Idioma de la interfaz de la caja de comentarios
        loading="lazy"             // Carga perezosa para mejorar el performance
      />
    </section>
  );
}
