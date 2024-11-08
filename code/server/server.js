const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const history = require('connect-history-api-fallback');
const fs = require('fs').promises;
const configurationManager = require('./modules/configurationManager');

const DEBUG_ENVIRONMENT_NAME = process.env.DEBUG_ENVIRONMENT_NAME ?? 'debug';
const ENVIRONMENT_NAME_PREFIX = process.env.ENVIRONMENT_NAME_PREFIX ?? '';
const RELEASE_PATH = process.env.CLIENT_RELEASE_PATH ?? '/app/client';
const CONFIG_PATH = process.env.CLIENT_CONFIG_PATH ?? '/app/client/configurations/settings.json';
const PORT = process.env.SERVER_PORT ?? 80;
const HOST = process.env.SERVER_HOST ?? '0.0.0.0';
const releasePath = join(RELEASE_PATH);

async function main() {
  try {
    const app = express();
    app.use(history({
      index: '/' //whatever your home/index path is default is /index.html
    }));
    app.use(morgan("dev"));
    app.get('/configurations',  (req, res) => {
      const getConfigOptions= { 
        debugEnvironmentName:DEBUG_ENVIRONMENT_NAME,
        configPropertyEnvironmentVariablePrefix:ENVIRONMENT_NAME_PREFIX,
         showOverrides:false,
         ignoreDebugEnvironment:true 
        };
      const config =  configurationManager.getConfig(CONFIG_PATH, getConfigOptions);
      res.send(JSON.stringify(config));
    });
    app.use(express.static(releasePath));
    
    app.use((_, res) => {
      res.sendFile(join(releasePath, "index.html"));
    });


    app.listen(PORT, () => console.log(`App running on: http://${HOST}:${PORT}`));
  } catch (error) {
    console.error(error);
  }
}

main();