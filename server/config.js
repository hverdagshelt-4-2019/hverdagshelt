import _ from "lodash"

let config =
{
    mysql: {
        connectionLimit: 2,
        host: 'mysql.stud.iie.ntnu.no',
        user: 'sindrtho',
        password: 'set password in private.config.js',
        database: 'sindrtho',
        debug: false
    },

    port: 3000,

    email: {
        user: "hverdagsheltene4@hotmail.com",
        pass: "set password in private.config.js"
    },

    test: {
        mysql: {
            connectionLimit: 20,
            multipleStatements: true,
            host: 'mysql.stud.iie.ntnu.no',
            user: 'aleksjoh',
            password: 'set password in private.config.js',
            database: 'aleksjoh',
            debug: false
        },

        port: 3001,

        email: {
            user: "hverdagsheltene4@hotmail.com",
            pass: "set password in private.config.js"
        },

    }

};

import privateconfig from "./private.config"

_.merge(config, privateconfig);
export default config;