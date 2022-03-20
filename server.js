const app = require('./config/app')
const apiRoutes = require('./routes/api')
const responser = require('./app/utils/api-responser')

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
