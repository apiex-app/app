import app from "./config/app.js";
import apiRoutes from "./routes/api.js";
import responser from "./app/utils/apiResponser.js";
import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/', (req, res) => {
    return responser.error(res, {
        code: 404,
        message: 'Not Found'
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.info(`App started on port ${port}`);
});
