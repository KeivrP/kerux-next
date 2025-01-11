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
        return (<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.75239 16.1581C2.28069 16.1581 1.87675 15.99 1.54055 15.6538C1.20436 15.3176 1.03684 14.9139 1.03798 14.4428V7.62464C0.709223 7.32447 0.45565 6.93854 0.277262 6.46684C0.0988747 5.99514 0.0951583 5.48056 0.266113 4.9231L1.16663 2.00715C1.28098 1.63551 1.48481 1.32819 1.77812 1.0852C2.07143 0.842201 2.41019 0.720703 2.79441 0.720703H14.7155C15.1014 0.720703 15.4373 0.838771 15.7232 1.07491C16.0091 1.31104 16.2164 1.62179 16.345 2.00715L17.2455 4.9231C17.417 5.48056 17.4136 5.98799 17.2352 6.4454C17.0568 6.9028 16.803 7.29588 16.4736 7.62464V14.4428C16.4736 14.9145 16.3058 15.3185 15.9702 15.6547C15.6346 15.9908 15.2309 16.1587 14.7592 16.1581H2.75239ZM10.6426 6.72413C11.0285 6.72413 11.3216 6.59177 11.5217 6.32704C11.7218 6.06232 11.8004 5.76587 11.7575 5.43768L11.2858 2.43597H9.61345V5.60921C9.61345 5.90938 9.71351 6.17038 9.91362 6.39222C10.1137 6.61407 10.3567 6.7247 10.6426 6.72413ZM6.78326 6.72413C7.11202 6.72413 7.38017 6.61321 7.58772 6.39137C7.79527 6.16953 7.89875 5.90881 7.89818 5.60921V2.43597H6.2258L5.7541 5.43768C5.69693 5.78073 5.77183 6.0809 5.9788 6.33819C6.18578 6.59548 6.45393 6.72413 6.78326 6.72413ZM2.9668 6.72413C3.22409 6.72413 3.44936 6.63122 3.64261 6.4454C3.83586 6.25958 3.95365 6.02373 3.99596 5.73785L4.46765 2.43597H2.79527L1.93764 5.30904C1.85188 5.59491 1.89847 5.90223 2.07743 6.23099C2.25639 6.55975 2.55285 6.72413 2.9668 6.72413ZM14.5448 6.72413C14.9594 6.72413 15.2595 6.55975 15.4453 6.23099C15.6312 5.90223 15.674 5.59491 15.574 5.30904L14.6735 2.43597H13.044L13.5157 5.73785C13.5586 6.02373 13.6766 6.25958 13.8699 6.4454C14.0631 6.63122 14.2881 6.72413 14.5448 6.72413Z" fill="white" />
        </svg>
        );
      case "BIEN":
        return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M4 5a1 1 0 0 1 .3-.714a6 6 0 0 1 8.213-.176l.351.328a4 4 0 0 0 5.272 0l.249-.227c.61-.483 1.527-.097 1.61.676L20 5v9a1 1 0 0 1-.3.714a6 6 0 0 1-8.213.176l-.351-.328A4 4 0 0 0 6 14.448V21a1 1 0 0 1-1.993.117L4 21z" /></svg>); // Escudo
      case "CINT":
        return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M8.95 4a2.5 2.5 0 0 0-4.9 0H2v1h2.05a2.5 2.5 0 0 0 4.9 0H14V4zm-1.9 7H2v1h5.05a2.5 2.5 0 0 0 4.9 0H14v-1h-2.05a2.5 2.5 0 0 0-4.9 0" clip-rule="evenodd" /></svg>); // Candado
      case "COMP":
        return (<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.431 8.87232L10.2809 0.718679C9.93944 0.37702 9.46871 0.183105 8.97952 0.183105H2.36162C1.34632 0.183105 0.515625 1.01417 0.515625 2.02991V8.65071C0.515625 9.14011 0.709455 9.61105 1.06019 9.95271L9.21027 18.1064C9.93021 18.8266 11.1024 18.8266 11.8224 18.1064L18.4403 11.4856C19.1602 10.7653 19.1602 9.60181 18.431 8.87232ZM4.66912 5.72352C3.90303 5.72352 3.28462 5.10484 3.28462 4.33842C3.28462 3.57199 3.90303 2.95331 4.66912 2.95331C5.43521 2.95331 6.05362 3.57199 6.05362 4.33842C6.05362 5.10484 5.43521 5.72352 4.66912 5.72352Z" fill="#FEFEFE" />
        </svg>
        );
      case "CONT":
        return (<svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.0898438 4.08182C0.0898438 3.14766 0.460937 2.25176 1.12149 1.59121C1.78204 0.930664 2.67794 0.55957 3.6121 0.55957H13.9079C14.8421 0.55957 15.738 0.930664 16.3985 1.59121C17.0591 2.25176 17.4302 3.14766 17.4302 4.08182V18.7127C17.4302 19.1753 17.3391 19.6333 17.162 20.0606C16.985 20.488 16.7256 20.8763 16.3985 21.2033C16.0714 21.5304 15.6832 21.7898 15.2558 21.9669C14.8285 22.1439 14.3705 22.235 13.9079 22.235H3.6121C3.14955 22.235 2.69153 22.1439 2.26419 21.9669C1.83685 21.7898 1.44856 21.5304 1.12149 21.2033C0.794416 20.8763 0.534969 20.488 0.357959 20.0606C0.18095 19.6333 0.0898437 19.1753 0.0898438 18.7127V4.08182ZM5.50869 3.81088C4.93383 3.81088 4.3825 4.03925 3.97601 4.44574C3.56952 4.85223 3.34115 5.40355 3.34115 5.97842V7.06219C3.34115 7.63706 3.56952 8.18838 3.97601 8.59487C4.3825 9.00136 4.93383 9.22973 5.50869 9.22973H12.0113C12.5862 9.22973 13.1375 9.00136 13.544 8.59487C13.9505 8.18838 14.1789 7.63706 14.1789 7.06219V5.97842C14.1789 5.40355 13.9505 4.85223 13.544 4.44574C13.1375 4.03925 12.5862 3.81088 12.0113 3.81088H5.50869ZM6.05058 12.752C6.05058 12.3927 5.90785 12.0481 5.65379 11.7941C5.39973 11.54 5.05516 11.3973 4.69587 11.3973C4.33657 11.3973 3.992 11.54 3.73794 11.7941C3.48388 12.0481 3.34115 12.3927 3.34115 12.752C3.34115 13.1113 3.48388 13.4559 3.73794 13.7099C3.992 13.964 4.33657 14.1067 4.69587 14.1067C5.05516 14.1067 5.39973 13.964 5.65379 13.7099C5.90785 13.4559 6.05058 13.1113 6.05058 12.752ZM4.69587 18.4418C5.05516 18.4418 5.39973 18.299 5.65379 18.045C5.90785 17.7909 6.05058 17.4464 6.05058 17.0871C6.05058 16.7278 5.90785 16.3832 5.65379 16.1291C5.39973 15.8751 5.05516 15.7323 4.69587 15.7323C4.33657 15.7323 3.992 15.8751 3.73794 16.1291C3.48388 16.3832 3.34115 16.7278 3.34115 17.0871C3.34115 17.4464 3.48388 17.7909 3.73794 18.045C3.992 18.299 4.33657 18.4418 4.69587 18.4418ZM14.1789 12.752C14.1789 12.3927 14.0361 12.0481 13.7821 11.7941C13.528 11.54 13.1834 11.3973 12.8241 11.3973C12.4648 11.3973 12.1203 11.54 11.8662 11.7941C11.6122 12.0481 11.4694 12.3927 11.4694 12.752C11.4694 13.1113 11.6122 13.4559 11.8662 13.7099C12.1203 13.964 12.4648 14.1067 12.8241 14.1067C13.1834 14.1067 13.528 13.964 13.7821 13.7099C14.0361 13.4559 14.1789 13.1113 14.1789 12.752ZM12.8241 18.4418C13.1834 18.4418 13.528 18.299 13.7821 18.045C14.0361 17.7909 14.1789 17.4464 14.1789 17.0871C14.1789 16.7278 14.0361 16.3832 13.7821 16.1291C13.528 15.8751 13.1834 15.7323 12.8241 15.7323C12.4648 15.7323 12.1203 15.8751 11.8662 16.1291C11.6122 16.3832 11.4694 16.7278 11.4694 17.0871C11.4694 17.4464 11.6122 17.7909 11.8662 18.045C12.1203 18.299 12.4648 18.4418 12.8241 18.4418ZM10.1147 12.752C10.1147 12.3927 9.97199 12.0481 9.71793 11.7941C9.46387 11.54 9.1193 11.3973 8.76 11.3973C8.40071 11.3973 8.05613 11.54 7.80208 11.7941C7.54802 12.0481 7.40529 12.3927 7.40529 12.752C7.40529 13.1113 7.54802 13.4559 7.80208 13.7099C8.05613 13.964 8.40071 14.1067 8.76 14.1067C9.1193 14.1067 9.46387 13.964 9.71793 13.7099C9.97199 13.4559 10.1147 13.1113 10.1147 12.752ZM8.76 18.4418C9.1193 18.4418 9.46387 18.299 9.71793 18.045C9.97199 17.7909 10.1147 17.4464 10.1147 17.0871C10.1147 16.7278 9.97199 16.3832 9.71793 16.1291C9.46387 15.8751 9.1193 15.7323 8.76 15.7323C8.40071 15.7323 8.05613 15.8751 7.80208 16.1291C7.54802 16.3832 7.40529 16.7278 7.40529 17.0871C7.40529 17.4464 7.54802 17.7909 7.80208 18.045C8.05613 18.299 8.40071 18.4418 8.76 18.4418Z" fill="#FEFEFE" />
        </svg>
        );
      case "CTTO":
        return (<svg width="24" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.376953 1.76588C0.376953 1.31412 0.556416 0.880855 0.875862 0.561409C1.19531 0.241963 1.62857 0.0625 2.08033 0.0625L11.4001 0.0625L15.1396 3.80199V15.3929C15.1396 15.8447 14.9601 16.278 14.6407 16.5974C14.3212 16.9169 13.888 17.0963 13.4362 17.0963H2.08033C1.62857 17.0963 1.19531 16.9169 0.875862 16.5974C0.556416 16.278 0.376953 15.8447 0.376953 15.3929V1.76588ZM7.19048 4.60485H3.78372V5.74044H7.19048V4.60485ZM11.7328 8.01161H3.78372V9.1472H11.7328V8.01161ZM6.40125 12.4495C5.94247 12.5721 5.58362 12.923 5.45871 13.3012L4.3799 12.9423C4.63314 12.1849 5.29632 11.5705 6.10599 11.3525C6.90885 11.1368 7.82527 11.3184 8.61791 12.0464C8.84791 11.9789 9.08492 11.9381 9.32425 11.9248C9.93747 11.8919 10.486 12.0464 10.9572 12.2428C11.3036 12.387 11.6386 12.5687 11.9225 12.722C12.011 12.772 12.0962 12.8174 12.1746 12.8583C12.5414 13.0514 12.7424 13.1218 12.8684 13.1218V14.2573C12.4255 14.2573 11.9895 14.0439 11.6465 13.8644C11.5432 13.8099 11.4402 13.7546 11.3376 13.6986C11.0724 13.5486 10.7995 13.4125 10.52 13.291C10.1407 13.132 9.76713 13.0389 9.38557 13.0593C9.32858 13.0621 9.27175 13.0674 9.21523 13.0752L9.21637 13.0911C9.24703 13.459 9.09486 13.7622 8.8984 13.9803C8.53729 14.3823 7.94792 14.5935 7.50504 14.673C7.27555 14.719 7.04025 14.7286 6.80779 14.7014C6.67594 14.6845 6.54865 14.6421 6.43304 14.5764C6.34315 14.5247 6.26574 14.4539 6.20628 14.3689C6.14682 14.2839 6.10677 14.1869 6.08896 14.0847C6.06103 13.8937 6.10603 13.6991 6.21501 13.5397C6.29747 13.4185 6.39778 13.3106 6.51253 13.2194C6.72829 13.0411 7.04058 12.8481 7.45961 12.6369L7.49027 12.6142C7.32924 12.5142 7.14955 12.448 6.96213 12.4197C6.77471 12.3914 6.58462 12.4015 6.40125 12.4495Z" fill="white" />
        </svg>
        );
      case "FDEL":
        return (<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.65284 16.3411L6.56182 12.4321L9.38936 15.2587L13.958 10.69L15.7501 12.4821V7.48467H10.7527L12.5447 9.27674L9.38936 12.4321L6.56182 9.60457L1.61938 14.548C1.0496 13.2687 0.756026 11.8836 0.757821 10.4831C0.757821 4.96297 5.23251 0.488281 10.7527 0.488281C16.2728 0.488281 20.7475 4.96297 20.7475 10.4831C20.7475 16.0033 16.2728 20.478 10.7527 20.478C9.17131 20.4792 7.6123 20.1046 6.20406 19.3852C4.79583 18.6658 3.57866 17.6231 2.65284 16.3411Z" fill="white" />
        </svg>
        );
      case "FIAN":
        return <svg id="FIAN" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7v4c0 5 3.5 9.5 10 11 6.5-1.5 10-6 10-11V7L12 2zm0 18c-3.9-1.3-7-4.9-7-9V8.2L12 4.8l7 3.4V11c0 4.1-3.1 7.7-7 9z" />
        </svg>; // Escudo
      case "FIN":
        return (<svg id="FIN" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
        </svg>
        ); // Bandera a cuadros
      case "FTER":
        return (<svg id="FTER" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 15h2v2h-2v-2zm1-12a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3z" />
        </svg>); // Bolsa de dinero con signo de interrogación
      case "GMED":
        return (<svg id="GMED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm-2 5h4v2h2v4h-2v2h-4v-2H8v-4h2V9z" />
        </svg>); // Cruz médica
      case "IGES":
      case "IGESTOR":
        return (<svg id="IGES" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-2 11h4v4h-4v-4zm2-7.8c.66 0 1.2.54 1.2 1.2v1.6h-2.4V6.4c0-.66.54-1.2 1.2-1.2z" />
        </svg>); // Engranaje
      case "IMPTO":
        return (<svg id="IMPTO" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-9.46 13.2l9.46-5.8 9.46 5.8A10 10 0 0 0 12 2zm-9 11.8v.2l9-5.5 9 5.5v-.2L12 7l-9 6.8z" />
        </svg>); // Moneda con signo de dólar
      case "INGR":
        return (<svg id="INGR" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2l3.5 3.5h-2v12h-3v-12h-2L12 2z" />
        </svg>); // Flecha hacia arriba
      case "INOM":
        return (<svg id="INOM" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
        </svg>); // Persona
      case "INV":
        return (<svg id="INV" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 21h2v-6h4v6h6v-6h4v6h2v-8h-4v-4h-4v4H9v-4H5v4H3v8z" />
        </svg>); // Gráfico de bolsa
      case "INVF":
        return (<svg id="INVF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 15a5 5 0 0 1 0-10 5 5 0 0 1 0 10z" />
        </svg>); // Bolsa de dinero
      case "KNOM":
        return (<svg id="KNOM" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
        </svg>); // Persona
      case "LICI":
        return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M16 3a3 3 0 0 1 2.995 2.824L19 6v10h.75c.647 0 1.18.492 1.244 1.122l.006.128V19a3 3 0 0 1-2.824 2.995L18 22H8a3 3 0 0 1-2.995-2.824L5 19V9H3.25a1.25 1.25 0 0 1-1.244-1.122L2 7.75V6a3 3 0 0 1 2.824-2.995L5 3zm3 15h-9v1c0 .35-.06.687-.17 1H18a1 1 0 0 0 1-1zm-7-6h-2a1 1 0 0 0-.117 1.993L10 14h2a1 1 0 0 0 .117-1.993zm2-4h-4a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2M5 5a1 1 0 0 0-1 1v1h1z"/></g></svg>); // Contrato
      case "LOG":
      case "LOGI":
        return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M11.25 11.83L3 8.36v7.73a1.69 1.69 0 0 0 1 1.52L11.19 21h.06ZM12 10.5l8.51-3.57a1.6 1.6 0 0 0-.51-.38l-7.2-3.37a1.87 1.87 0 0 0-1.6 0L4 6.55a1.6 1.6 0 0 0-.51.38Zm.75 1.33V21h.05l7.2-3.39a1.69 1.69 0 0 0 1-1.51V8.36Z"/></svg>); // Camión
      case "MNTO":
      case "MTTO":
        return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="#fff" d="M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675l-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617l.968.968l-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96l2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46L4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242l.529.026l.287.445l.445.287l.026.529L5 13l-.242.471l-.026.529l-.445.287l-.287.445l-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471l.026-.529l.445-.287l.287-.445l.529-.026z"/></svg>); // Llave inglesa
      case "OPA":
        return (<svg id="OPA" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 4h8v2H8V8z" />
        </svg>); // Documento
      case "ORPA":
        return (<svg id="ORPA" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M4 7v6a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V7H4z" />
        </svg>); // Cheque
      case "PNOM":
        return (<svg id="PNOM" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
        </svg>); // Persona
      case "PPTO":
        return (<svg id="PPTO" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-5 11h3v4H7v-4zm5-6h3v10h-3V7zm5 4h3v6h-3v-6z" />
        </svg>); // Gráfico de pastel
      case "PROV":
        return (<svg id="PROV" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 10v10h1v-6h4v6h10V10H3zm5-4h4v2H8V6zm8 0h4v2h-4V6z" />
        </svg>); // Camión
      case "SASC":
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#fff" d="M17 24c3.867 0 7-3.133 7-7s-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7m22-3.5c0 3.039-2.461 5.5-5.5 5.5a5.5 5.5 0 0 1-5.5-5.5c0-3.039 2.461-5.5 5.5-5.5s5.5 2.461 5.5 5.5M17 26c2.734 0 7.183.851 10.101 2.545C28.293 29.758 29 31.081 29 32.4V38H4v-5.6c0-4.256 8.661-6.4 13-6.4m27 12H31v-5.6c0-1.416-.511-2.72-1.324-3.883c1.541-.344 3.058-.517 4.217-.517C37.62 28 44 29.787 44 33.333z"/></svg>; // Persona
      case "TESO":
        return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M13.5 16a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/><path fill="#fff" d="m14.347.66l3.18 4.456l2.097-.715L21.538 10h.962v12h-21V10h.51v-.01l.648.006zM9.397 10h10.028l-1.037-3.033l-1.522.487zM7.839 8.417L15.55 5.79l-1.604-2.25zM5.5 12h-2v2a2 2 0 0 0 2-2m10 4a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0m5 4v-2a2 2 0 0 0-2 2zm-2-8a2 2 0 0 0 2 2v-2zm-15 8h2a2 2 0 0 0-2-2z"/></svg>); // Caja fuerte
      case "VEH":
        return (<svg id="VEH" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5 13h14v7H5z" />
        </svg>); // Coche
      case "VENT":
        return <svg id="VENT" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M4 4h16v6H4z" />
        </svg>; // Carrito de compras
      case "VIAT":
        return (<svg id="VIAT" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2v20m0-20 10 10m-10-10L2 12" />
        </svg>); // Boleto de avión
      default:
        return (<svg id="DEFAULT" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
        </svg>); // Desconocido
    }
  };

  const getColor = (codmenu: string) => {
    switch (codmenu) {
      case "ALM":
      case "ALMA":
        return "#6A88E3";
      case "BIEN":
        return "#1E6676"; // Azul
      case "CINT":
        return "#07B18E"; // Amarillo
      case "COMP":
        return "#3A1195"; // Púrpura
      case "CONT":
        return "#831212"; // Naranja
      case "CTTO":
        return "#6F1616"; // Verde
      case "FDEL":
        return "#651629"; // Verde azulado
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
        return "#E99815"; // Azul
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
        return "#1F6357"; // Naranja oscuro
      case "MNTO":
      case "MTTO":
        return "#9E9E9E"; // Gris
      case "OPA":
        return "#673AB7"; // Púrpura oscuro
      case "ORPA":
        return "#108732"; // Naranja
      case "PNOM":
        return "#00BCD4"; // Azul cielo
      case "PPTO":
        return "#C05100"; // Amarillo
      case "PROV":
        return "#FF9800"; // Naranja oscuro
      case "SASC":
        return "#009688"; // Verde azulado
      case "TESO":
        return "#A04E1F"; // Marrón
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
        className="bg-primary inline-flex rounded text-base font-semibold text-black size-[32px] justify-center items-center group"
        style={{ backgroundColor: getColor(codmenu) }}
      >
        <div >
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
