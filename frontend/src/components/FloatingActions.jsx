import { Phone } from "lucide-react";

const PHONE_NUMBER = "+919004630950";
const WHATSAPP_NUMBER = "919004630950";

const WHATSAPP_MESSAGE =
  "Hello KAS Foundation, I would like to know more about your foundation.";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="whatsapp-svg">
      <path
        fill="currentColor"
        d="M19.11 17.16c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.47-1.83-.15-.27-.02-.42.11-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.59-.65 1.81-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z"
      />

      <path
        fill="currentColor"
        d="M16.02 3.2a12.77 12.77 0 0 0-10.9 19.43L3.2 28.8l6.34-1.87a12.77 12.77 0 1 0 6.48-23.73Zm0 23.26c-1.9 0-3.75-.51-5.38-1.48l-.39-.23-3.76 1.11 1.1-3.66-.25-.4a10.45 10.45 0 1 1 8.68 4.66Z"
      />
    </svg>
  );
}

function FloatingActions() {
  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="floating-actions">
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="floating-call"
        aria-label="Call KAS Foundation"
      >
        <Phone size={22} strokeWidth={2.5} />
      </a>

      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="WhatsApp KAS Foundation"
      >
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

export default FloatingActions;