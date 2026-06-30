FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass build-time variables (Cloud Run supports ARG/ENV during build)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Install serve to run the application statically
RUN npm install -g serve

# serve defaults to port 3000 or $PORT
EXPOSE 3000

CMD ["serve", "-s", "dist"]
