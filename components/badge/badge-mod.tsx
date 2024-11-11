import React from "react";

interface BadgeProps {
  codmenu: string;
}

const BadgeModule: React.FC<BadgeProps> = ({ codmenu }) => {
  const getTooltip = (codmenu: string) => {
    switch (codmenu) {
      case "ALM":
      case "ALMA":
        return "ALMACEN";
      case "BIEN":
        return "BIENES NACIONALES";
      case "CINT":
        return "CONTROL INTERNO";
      case "COMP":
        return "ADQUISICIONES";
      case "CONT":
        return "CONTABILIDAD";
      case "CTTO":
        return "CONTRATOS";
      case "FDEL":
        return "FONDOS DELEGADOS";
      case "FIAN":
        return "FIANZAS";
      case "FIN":
        return "FIN DEL PROCESO";
      case "FTER":
        return "FONDOS DE TERCERO";
      case "GMED":
        return "GERENCIA MEDICA";
      case "IGES":
      case "IGESTOR":
        return "INTERFAZ";
      case "IMPTO":
        return "MODULO DE IMPUESTO";
      case "INGR":
        return "INGRESO";
      case "INOM":
        return "INTERFAZ NOMINA";
      case "INV":
        return "INVERSIONES";
      case "INVF":
        return "INVERSIONES FONPIME";
      case "KNOM":
        return "NÓMINA";
      case "LICI":
        return "CONTRATACIONES";
      case "LOG":
      case "LOGI":
        return "LOGISTICA";
      case "MNTO":
      case "MTTO":
        return "MANTENIMIENTO";
      case "OPA":
        return "GENERADO POR TXT IPASME";
      case "ORPA":
        return "ORDENES DE PAGO";
      case "PNOM":
        return "NOMINA";
      case "PPTO":
        return "PRESUPUESTO";
      case "PROV":
        return "PROVEEDORES";
      case "SASC":
        return "SISTEMA DE ATENCION SOCIAL Y CIUDADANA";
      case "TESO":
        return "TESORERÍA";
      case "VEH":
        return "VEHICULOS";
      case "VENT":
        return "VENTAS";
      case "VIAT":
        return "VIATICOS";
      default:
        return "UNKNOWN";
    }
  };

  const getIcon = (codmenu: string) => {
    switch (codmenu) {
      case "ALM":
      case "ALMA":
        return "📚"; // Estantería
      case "BIEN":
        return "🛡️"; // Escudo
      case "CINT":
        return "🔒"; // Candado
      case "COMP":
        return "🛒"; // Carrito de compras
      case "CONT":
        return "📖"; // Libro mayor
      case "CTTO":
        return "📜"; // Contrato
      case "FDEL":
        return "💰"; // Bolsa de dinero
      case "FIAN":
        return "🛡️"; // Escudo
      case "FIN":
        return "🏁"; // Bandera a cuadros
      case "FTER":
        return "💰❓"; // Bolsa de dinero con signo de interrogación
      case "GMED":
        return "➕"; // Cruz médica
      case "IGES":
      case "IGESTOR":
        return "⚙️"; // Engranaje
      case "IMPTO":
        return "💵"; // Moneda con signo de dólar
      case "INGR":
        return "⬆️"; // Flecha hacia arriba
      case "INOM":
        return "👤"; // Persona
      case "INV":
        return "📈"; // Gráfico de bolsa
      case "INVF":
        return "💰"; // Bolsa de dinero
      case "KNOM":
        return "👤"; // Persona
      case "LICI":
        return "📜"; // Contrato
      case "LOG":
      case "LOGI":
        return "🚚"; // Camión
      case "MNTO":
      case "MTTO":
        return "🔧"; // Llave inglesa
      case "OPA":
        return "📄"; // Documento
      case "ORPA":
        return "💳"; // Cheque
      case "PNOM":
        return "👤"; // Persona
      case "PPTO":
        return "📊"; // Gráfico de pastel
      case "PROV":
        return "🚚"; // Camión
      case "SASC":
        return "👤"; // Persona
      case "TESO":
        return "🔒"; // Caja fuerte
      case "VEH":
        return "🚗"; // Coche
      case "VENT":
        return "🛒"; // Carrito de compras
      case "VIAT":
        return "✈️"; // Boleto de avión
      default:
        return "❓"; // Desconocido
    }
  };

  const getColor = (codmenu: string) => {
    switch (codmenu) {
      case "ALM":
      case "ALMA":
        return "#66BB6A"; // Verde claro
      case "BIEN":
        return "#2196F3"; // Azul
      case "CINT":
        return "#FFC107"; // Amarillo
      case "COMP":
        return "#9C27B0"; // Púrpura
      case "CONT":
        return "#FF5722"; // Naranja
      case "CTTO":
        return "#4CAF50"; // Verde
      case "FDEL":
        return "#009688"; // Verde azulado
      case "FIAN":
        return "#FF9800"; // Naranja oscuro
      case "FIN":
        return "#9E9E9E"; // Gris
      case "FTER":
        return "#FFEB3B"; // Amarillo claro
      case "GMED":
        return "#F44336"; // Rojo
      case "IGES":
      case "IGESTOR":
        return "#673AB7"; // Púrpura oscuro
      case "IMPTO":
        return "#795548"; // Marrón
      case "INGR":
        return "#2196F3"; // Azul
      case "INOM":
        return "#00BCD4"; // Azul cielo
      case "INV":
        return "#4CAF50"; // Verde
      case "INVF":
        return "#FFEB3B"; // Amarillo claro
      case "KNOM":
        return "#00BCD4"; // Azul cielo
      case "LICI":
        return "#4CAF50"; // Verde
      case "LOG":
      case "LOGI":
        return "#FF9800"; // Naranja oscuro
      case "MNTO":
      case "MTTO":
        return "#9E9E9E"; // Gris
      case "OPA":
        return "#673AB7"; // Púrpura oscuro
      case "ORPA":
        return "#FF5722"; // Naranja
      case "PNOM":
        return "#00BCD4"; // Azul cielo
      case "PPTO":
        return "#FFC107"; // Amarillo
      case "PROV":
        return "#FF9800"; // Naranja oscuro
      case "SASC":
        return "#009688"; // Verde azulado
      case "TESO":
        return "#795548"; // Marrón
      case "VEH":
        return "#FF9800"; // Naranja oscuro
      case "VENT":
        return "#9C27B0"; // Púrpura
      case "VIAT":
        return "#2196F3"; // Azul
      default:
        return "#000000"; // Desconocido
    }
  };

  return (
    <div className="relative inline-block">
      <button
      type="button"
      className="bg-primary inline-flex rounded text-base font-semibold text-black size-[46px] justify-center items-center group"
      style={{ backgroundColor: getColor(codmenu) }}
      >
      <div className="shrink-0 size-5 relative group">
        {getIcon(codmenu)}
        <div
          className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
          role="tooltip"
        >
          {getTooltip(codmenu)}
        </div>
      </div>
      
      </button>
    </div>
  
  );
};

export default BadgeModule;
