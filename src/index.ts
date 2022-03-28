// import logger from 'loglevel'
import server from "./server";

// const isTest = process.env.NODE_ENV !== "test";
// const logLevel = process.env.LOG_LEVEL || (isTest ? "warn" : "info");

// logger.setLevel(logLevel)

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
