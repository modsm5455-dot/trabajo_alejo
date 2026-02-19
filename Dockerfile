# Imagen ligera
FROM node:20-alpine

# Carpeta interna
WORKDIR /app

# Copiamos dependencias primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos TypeScript
RUN npm run build

# Exponemos el puerto (ajústalo si usas otro)
EXPOSE 3000

# Ejecutamos la app compilada
CMD ["node", "dist/server.js"]
