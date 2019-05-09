const fs = require('fs');

const dir = 'videos/';

const getFileDir = (req, file) => 'http://' + req.headers.host + '/' + dir + file;

const appRouter = function (app) {
    app.get("/video", async function (req, res) {
        try {
            const files = await fs.readdirSync(dir);

            const fileList = files
                .map(f => {
                    return {
                        name: f,
                        time: fs.statSync(dir + '/' + f).mtime.getTime()
                    };
                })
                .sort((a, b) =>  b.time - a.time)
                .map(f => getFileDir(req, f.name));

            res.status(200).send(JSON.stringify(fileList));
        } catch (e) {
            res.status(500).send(JSON.stringify({error: e}));
        }
    });
};

module.exports = appRouter;
