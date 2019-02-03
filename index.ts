import Server from "./classes/server";
import { SERVER_PORT } from './global/environment';
import { router } from './routes/router';
import bodyParser  from 'body-parser';
import cors from 'cors';

const server = new Server();

// Configuración de body-parser para mandar parametros
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({origin: true, credentials: true}));

// Rutas
server.app.use('/api', router);

server.start(()=>{
    console.log('Servidor corriendo ', SERVER_PORT);
});