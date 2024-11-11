export interface Response {
  message: string;
  alert: "A" | "S";
  mode: "info" | "success" | "alert" | "error";
}

export function showNotification(response: Response) {
  if (response.alert === "A") {
    // Crear el alert
    const alertContainer = document.createElement("div");
    alertContainer.className = "flex p-4 mb-4 rounded-xl text-sm bg-amber-50";
    alertContainer.setAttribute("role", "alert");
    // Estilo fijo para el alert
    alertContainer.style.position = "fixed";
    alertContainer.style.top = "20px";
    alertContainer.style.right = "20px";
    alertContainer.style.zIndex = "9999";

    let icon, textColor, title;

    switch (response.mode) {
      case "success":
        icon = `<svg class="shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                    </svg>`;
        textColor = "text-teal-500";
        title = "Éxito";
        break;
      case "error":
        icon = `<svg class="shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                    </svg>`;
        textColor = "text-red-500";
        title = "Error";
        break;
      case "alert":
        icon = `<svg class="shrink-0 size-4 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                    </svg>`;
        textColor = "text-yellow-500";
        title = "Alerta";
        break;
      case "info":
      default:
        icon = `<svg class="shrink-0 size-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                    </svg>`;
        textColor = "text-blue-500";
        title = "Información";
        break;
    }

    alertContainer.innerHTML = `
         <div class="mr-2">${icon}</div>
         <div class="block">
             <h3 class="${textColor} font-normal">
                 <span class="font-semibold mr-1">${title}</span> ${response.message}
             </h3>
             <div class="flex items-center gap-6 mt-4">
                 <button id="closeAlertButton" class="font-semibold text-gray-900 transition-all duration-500 hover:text-[#142f62]">Confirmar</button>
             </div>
         </div>`;

    document.body.appendChild(alertContainer);

    // Add event listener to close the alert on button click
    document
      .getElementById("closeAlertButton")
      ?.addEventListener("click", () => {
        alertContainer.remove();
      });

    document.body.appendChild(alertContainer);
  } else if (response.alert === "S") {
    // Crear el toast
    const toastContainer = document.createElement("div");
    toastContainer.className =
      "max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700";
    toastContainer.setAttribute("role", "alert");
    toastContainer.setAttribute("tabindex", "-1");

    // Estilo fijo para el toast
    toastContainer.style.position = "fixed";
    toastContainer.style.top = "20px";
    toastContainer.style.right = "20px";
    toastContainer.style.zIndex = "9999";

    let icon, textColor;

    switch (response.mode) {
      case "success":
        icon = `<svg class="shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                    </svg>`;
        textColor = "text-teal-500";
        break;
      case "error":
        icon = `<svg class="shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                    </svg>`;
        textColor = "text-red-500";
        break;
      case "alert":
        icon = `<svg class="shrink-0 size-4 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                    </svg>`;
        textColor = "text-yellow-500";
        break;
      case "info":
      default:
        icon = `<svg class="shrink-0 size-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                    </svg>`;
        textColor = "text-blue-500";
        break;
    }

    toastContainer.style.position = "fixed";
    toastContainer.style.top = "20px";
    toastContainer.style.right = "20px";
    toastContainer.style.zIndex = "9999";
    toastContainer.innerHTML = `
        <div class="flex p-4">
            <div class="shrink-0">${icon}</div>
            <div class="ms-3">
                <p class="text-sm ${textColor} dark:text-neutral-400">${response.message}</p>
            </div>
        </div>
    `;

    document.body.appendChild(toastContainer);

    // Opcional: eliminar el toast después de un tiempo
    setTimeout(() => {
      toastContainer.remove();
    }, 4000);
  }
}
