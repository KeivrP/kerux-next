FROM node:18-alpine

WORKDIR /app

# Habilitar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copiar aplicación y construir
COPY . .

# Argumentos de compilación para las variables de entorno
ARG NEXT_PUBLIC_API_URL_PROSEG
ARG NEXT_PUBLIC_API_URL_DOC
ARG NEXT_PUBLIC_API_URL_LOG
ARG NEXT_PUBLIC_API_URL_COMP

# Variables de entorno durante el build
ENV NEXT_PUBLIC_API_URL_PROSEG=$NEXT_PUBLIC_API_URL_PROSEG
ENV NEXT_PUBLIC_API_URL_DOC=$NEXT_PUBLIC_API_URL_DOC
ENV NEXT_PUBLIC_API_URL_LOG=$NEXT_PUBLIC_API_URL_LOG
ENV NEXT_PUBLIC_API_URL_COMP=$NEXT_PUBLIC_API_URL_COMP

RUN pnpm run build

# Variables de entorno para el runtime
ENV PORT 80
ENV AUTH_SECRET="lD/BGsdlCgoN1FGonf3gD8ngXmjAWBQ7+VdRxw9VqFQ="

EXPOSE 80

CMD ["pnpm", "start"]