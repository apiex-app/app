import app from './config/app.js';
import apiRoutes from './routes/api.js';
import responser from './app/utils/api-responser.js';

app.use('/api', apiRoutes)
app.use('/', (req, res) => {
    return responser.error(res, {
        code: 404,
        message: 'Not Found'
    });
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`App started on http://localhost:${port}`)
})
