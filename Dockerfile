# Usa una imagen de Node.js 18 con Alpine para una base ligera
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto del código fuente
COPY . .

# Instala React y sus dependencias (si aún no están en package.json)
RUN npm install react react-dom @astrojs/react

# Construye la aplicación Astro
RUN npm run build

# ----------------------------------------
# Fase final para servir la aplicación
# ----------------------------------------
FROM node:18-alpine

WORKDIR /app

# Copia los archivos generados en la fase de construcción
COPY --from=builder /app ./

# Expone el puerto 4321 (Astro preview usa este puerto por defecto)
EXPOSE 4321

# Comando para ejecutar Astro en modo preview
CMD ["npm", "run", "preview"]