FROM node

COPY package.json .
RUN npm install
COPY webpack.config.js .
COPY .babelrc .
COPY ant-theme-vars.less .
COPY fileTransformer.js .
COPY src/ .

CMD [ "npm", "run", "startup" ]