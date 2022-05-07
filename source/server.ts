import http from 'http';
import express, { Express } from 'express';
import morgan from "morgan";
import routes from './routes/posts';
import "./models/status";
import "./models/datafeed";
import { pullFeed } from "./vatsim";

const router: Express = express();

/** Logger */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** Create the datafeed variable */
let feed: DataFeed;

/** Load the datafeed on startup and update it every 15 seconds */
(async () => {
    await pullFeed().then(d => feed = d);
    setInterval(async () => await pullFeed().then(d => feed = d), 15 * 1000);
})();

/** RULES OF THE API */
router.use((req, res, next) => {
    // Set CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // Set the CORS headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // Set the CORS methods
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Middleware, passes datafeed into res.locals */
router.use(async (req, res, next) => {
    res.locals.dataFeed = feed;
    next();
});

/** ROUTES */
router.use('/', routes);

/** Error handler */
router.use((req, res, next) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
