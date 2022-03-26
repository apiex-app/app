const success = (res, props = {}) => {
    return res.status(props.code ?? 200).json({
        meta: {
            code: props.code ?? 200,
            status: 'success',
            message: props.message ?? ''
        },
        data: props.data ?? null
    });
}

const error = (res, props = {}) => {
    return res.status(props.code ?? 200).json({
        meta: {
            code: props.code ?? 200,
            status: 'error',
            message: props.message ?? ''
        },
        data: props.data ?? null
    });
}

const validation = (res, data) => {
    return error(res, {
        code: 422,
        message: 'Validation Errors',
        data
    });
}

export default {success, error, validation};
