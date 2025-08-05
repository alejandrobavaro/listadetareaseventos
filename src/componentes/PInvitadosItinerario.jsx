import React, { useState } from "react";
import "../assets/scss/_03-Componentes/_PInvitadosItinerario.scss";

/**
 * Componente PInvitadosItinerario
 * Muestra el itinerario completo de la boda con línea de tiempo interactiva
 * Permite a los invitados ver los detalles de cada evento
 */
const PInvitadosItinerario = () => {
  // Estado para controlar qué evento está seleccionado
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Datos actualizados del itinerario según el guión proporcionado
  const timelineItems = [
    {
      time: "14:00",
      title: "Preparativos de la Novia",
      description: "Fabi se prepara con maquillaje y peinado profesional.",
      icon: "💄",
      images: [
        "/img/PInvitadoItinerario/preparativos-1.jpg",
        "/img/PInvitadoItinerario/preparativos-2.jpg",
      ],
      details: [
        "Ubicación: Salón de belleza",
        "Duración: 3 horas",
        "Incluye vestido y accesorios"
      ],
    },
    {
      time: "19:00",
      title: "Recepción de Invitados",
      description: "Llegada de invitados con comida y bebidas en el parque.",
      icon: "🍸",
      images: [
        "/img/PInvitadoItinerario/recepcion-1.jpg",
        "/img/PInvitadoItinerario/recepcion-2.jpg",
      ],
      details: [
        "Estación de cócteles clásicos",
        "Comidas calientes y miniaturas gourmet",
        "Ambiente musical de bienvenida"
      ],
    },
    {
      time: "19:30",
      title: "Ceremonia Civil",
      description: "Boda civil con 4 testigos y firma de acta.",
      icon: "💍",
      images: [
        "/img/PInvitadoItinerario/ceremonia-1.jpg",
        "/img/PInvitadoItinerario/ceremonia-2.jpg",
      ],
      details: [
        "Ubicación: Jardín principal",
        "Entrada especial de los novios",
        "Cierre con lluvia de arroz/pétalos"
      ],
    },
    {
      time: "20:30",
      title: "Saludos con Invitados",
      description: "Momento para compartir con los invitados post ceremonia.",
      icon: "👋",
      images: [
        "/img/PInvitadoItinerario/saludos-1.jpg",
        "/img/PInvitadoItinerario/saludos-2.jpg",
      ],
      details: [
        "Ubicación: Área de recepción",
        "Servicio continuo de comida y bebidas",
        "Transición al salón principal"
      ],
    },
    {
      time: "20:45",
      title: "Fotos Grupales",
      description: "Sesión de fotos con los novios organizada por mesas.",
      icon: "📷",
      images: [
        "/img/PInvitadoItinerario/fotos-1.jpg",
        "/img/PInvitadoItinerario/fotos-2.jpg",
      ],
      details: [
        "Organización por mesas",
        "Fondo: Mesa principal de los novios",
        "Fotógrafos profesionales coordinando"
      ],
    },
    {
      time: "21:15",
      title: "Show de Mozos",
      description: "Entrada espectacular del plato principal.",
      icon: "🎭",
      images: [
        "/img/PInvitadoItinerario/show-mozos-1.jpg",
        "/img/PInvitadoItinerario/show-mozos-2.jpg",
      ],
      details: [
        "Plato principal: Pernil con salsas",
        "Presentación teatralizada",
        "Servicio coordinado por catering"
      ],
    },
    {
      time: "22:15",
      title: "Brindis Formal",
      description: "Momento especial para brindar por los novios.",
      icon: "🥂",
      images: [
        "/img/PInvitadoItinerario/brindis-1.jpg",
        "/img/PInvitadoItinerario/brindis-2.jpg",
      ],
      details: [
        "Copas preparadas para todos",
        "Discurso de los novios",
        "Momento fotográfico especial"
      ],
    },
    {
      time: "22:45",
      title: "Coreografía y Vals",
      description: "Baile de los novios seguido del vals familiar.",
      icon: "💃",
      images: [
        "/img/PInvitadoItinerario/coreo-1.jpg",
        "/img/PInvitadoItinerario/coreo-2.jpg",
      ],
      details: [
        "Canción: 'Colgado en tus manos'",
        "Participación familiar en el vals",
        "Primer bloque de baile general"
      ],
    },
    {
      time: "00:00",
      title: "Banda en Vivo - Almango Covers",
      description: "Presentación musical con participación especial de Alejandro.",
      icon: "🎸",
      images: [
        "/img/PInvitadoItinerario/banda-1.jpg",
        "/img/PInvitadoItinerario/banda-2.jpg",
      ],
      details: [
        "Duración: 30 minutos",
        "Alejandro toca con la banda",
        "Cierre con 'Vuela Vuela' cantado por Fabiola"
      ],
    },
    {
      time: "01:00",
      title: "Juegos: Ramo y Whisky",
      description: "Divertidos juegos para solteros y no solteros.",
      icon: "🎯",
      images: [
        "/img/PInvitadoItinerario/juegos-1.jpg",
        "/img/PInvitadoItinerario/juegos-2.jpg",
      ],
      details: [
        "Lanzamiento del ramo por Alejandro",
        "Juego del whisky por Fabiola",
        "Premios especiales para ganadores"
      ],
    },
    {
      time: "01:20",
      title: "Corte de Torta y Mesa Dulce",
      description: "Momento dulce con torta nupcial y variedad de postres.",
      icon: "🍰",
      images: [
        "/img/PInvitadoItinerario/torta-1.jpg",
        "/img/PInvitadoItinerario/torta-2.jpg",
      ],
      details: [
        "Foto grupal de todos los invitados",
        "Variedad de postres y dulces",
        "Mesa decorada temáticamente"
      ],
    },
    {
      time: "02:00",
      title: "Hora Loca",
      description: "Fiesta con cotillón y efectos especiales.",
      icon: "🎉",
      images: [
        "/img/PInvitadoItinerario/horaloca-1.jpg",
        "/img/PInvitadoItinerario/horaloca-2.jpg",
      ],
      details: [
        "Luces, confetti y efectos LED",
        "Bolsas de cotillón en las mesas",
        "Cabina fotográfica disponible"
      ],
    },
    {
      time: "04:00",
      title: "Despedida",
      description: "Entrega de souvenirs y agradecimientos finales.",
      icon: "🎁",
      images: [
        "/img/PInvitadoItinerario/despedida-1.jpg",
        "/img/PInvitadoItinerario/despedida-2.jpg",
      ],
      details: [
        "Souvenirs: Velitas personalizadas",
        "Ubicación: Cerca de la salida",
        "Agradecimientos especiales"
      ],
    }
  ];

  /**
   * Maneja el clic en un evento de la línea de tiempo
   * @param {number} index - Índice del evento seleccionado
   */
  const handleEventClick = (index) => {
    setSelectedEvent(selectedEvent === index ? null : index);
  };

  return (
    <div className="wedding-itinerary">
      {/* Cabecera con información principal */}
      <header className="itinerary-header">
        <h1>
          Itinerario Completo <i className="bi bi-calendar-heart"></i>
        </h1>
        <h2>Alejandro & Fabiola</h2>
        <p>23 de Noviembre 2025 - Casa del Mar</p>
      </header>

      {/* Línea de tiempo interactiva */}
      <div className="timeline">
        <div className="timeline-line">
          <div className="timeline-airplane-icon">✈️</div>
        </div>
        
        {/* Mapeo de todos los eventos del itinerario */}
        {timelineItems.map((item, index) => (
          <div key={index} className="timeline-item-container">
            <div
              className={`timeline-item ${
                selectedEvent === index ? "selected" : ""
              }`}
              onClick={() => handleEventClick(index)}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-title">{item.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Panel de detalles del evento seleccionado */}
      {selectedEvent !== null && (
        <div className="event-details">
          <div className="event-detail-content">
            <h3>{timelineItems[selectedEvent].title}</h3>
            <p>{timelineItems[selectedEvent].description}</p>
            <div className="event-icon">
              {timelineItems[selectedEvent].icon}
            </div>

            {/* Galería de imágenes del evento */}
            <div className="event-images">
              {timelineItems[selectedEvent].images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${timelineItems[selectedEvent].title} ${i + 1}`}
                />
              ))}
            </div>

            {/* Lista de detalles específicos */}
            <div className="event-details-list">
              <h4>Detalles Exclusivos:</h4>
              <ul>
                {timelineItems[selectedEvent].details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sección informativa adicional */}
      <div className="itinerary-info">
        <section className="info-section">
          <h3>
            <i className="bi bi-info-circle"></i> Información Importante
          </h3>
          <p>
            Cada momento ha sido cuidadosamente planificado para crear una experiencia inolvidable.
          </p>
        </section>

        <section className="info-section countdown">
          <h3>
            <i className="bi bi-clock"></i> Cuenta Regresiva
          </h3>
          <div className="countdown-time">
            <span>XX</span> días <span>XX</span> horas <span>XX</span> minutos
          </div>
        </section>

        <section className="info-section hashtag">
          <p>Compartí tus momentos usando</p>
          <h3>#BodaAlejandroYFabiola</h3>
        </section>
      </div>
    </div>
  );
};

export default PInvitadosItinerario;