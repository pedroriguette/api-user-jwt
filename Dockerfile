# install node:22 
FROM node:22

# set working directory
WORKDIR /app

# copy all files to working directory
COPY . .

# install dependencies
RUN npm install

# set environment variable for port
EXPOSE 3000

# set entrypoint for the container
CMD ["npm", "run", "start"]