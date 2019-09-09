FROM node:8.11.4-alpine
# Create app directory
WORKDIR /web
# Copy project files into the docker image
COPY web /web
# !!!Start!!!
CMD ["npm", "start"]
