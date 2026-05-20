import { WHATSAPP_NUMBER } from '../data/products';

const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
  >
    <path
      d="M16 2C8.268 2 2 8.268 2 16c0 2.922.861 5.635 2.343 7.938L2 30l6.889-1.787A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm4.759 18.39c-.227.643-.93 1.303-1.262 1.38-.294.066-.67.097-1.112-.034-1.233-.289-2.444-.92-3.493-1.706a9.88 9.88 0 01-2.97-3.532c-.44-.81-.94-1.394-.9-1.939.05-.553.357-.879.822-1.119.356-.189.82-.307 1.193-.307.374 0 .751.01 1.076.01.338 0 .809-.094 1.152.72.357.84 1.2 2.503 1.293 2.72.095.22.07.467-.04.686-.108.22-.28.446-.46.644a3.52 3.52 0 00-.405.476c-.137.18-.265.376-.176.641.09.266.49.91.87 1.34.61.73 1.108.98 1.353 1.21.25.23.48.37.72.44.24.06.47.05.65.03.2-.02.6-.25.823-.45.25-.21.612-.55.882-.82.27-.27.503-.38.7-.34.2.05.74.29 1.04.38.31.1.52.19.62.29.1.1.1.6-.14 1.1z"
      fill="currentColor"
    />
  </svg>
);

export default function WhatsAppButton() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20%F0%9F%98%8A%20quiero%20hacer%20un%20pedido`;

  return (
    <>
      {/* Floating circular FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatea por WhatsApp"
          title="Chatea por WhatsApp"
          className="whatsapp-fab-circle group relative inline-flex items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_20px_40px_rgba(37,211,102,0.20)] transition-all duration-300 hover:scale-105 focus:outline-none"
        >
          <span className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16">
            <WhatsAppIcon />
          </span>
        </a>

        {/* Side tab indicator */}
        <div className="hidden md:flex items-center pl-3">
          <div className="whatsapp-tab flex items-center rounded-l-full rounded-r-full bg-[#25d366]/95 text-white px-3 py-2 ml-3 shadow-md cursor-default">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-2">
              <path d="M21 15a2 2 0 0 1-2 2h-1l-3 3v-3H9a6 6 0 0 1-6-6V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8z" fill="white" opacity="0.95"/>
            </svg>
            <span className="text-xs font-semibold">Escríbenos</span>
          </div>
        </div>
      </div>
    </>
  );
}
