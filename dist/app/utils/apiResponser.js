class ApiResponser {
    static success(res, props) {
        var _a;
        return res.status((_a = props.code) !== null && _a !== void 0 ? _a : 200).json({
            meta: {
                code: props.code || 200,
                status: 'success',
                message: props.message
            },
            data: props.data
        });
    }
    static error(res, props) {
        return res.status(props.code || 400).json({
            meta: {
                code: props.code || 400,
                status: 'error',
                message: props.message
            },
            data: props.data
        });
    }
    static validation(res, data) {
        return this.error(res, {
            code: 422,
            message: 'Validation error',
            data
        });
    }
}
export default ApiResponser;
