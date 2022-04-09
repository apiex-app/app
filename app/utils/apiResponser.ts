import { Response } from "express";

type Props = {
    code?: number,
    message?: string,
    data?: object
}

class ApiResponser {
    static success(res: Response, props: Props) {
        return res.status(props.code ?? 200).json({
            meta: {
                code: props.code || 200,
                status: 'success',
                message: props.message
            },
            data: props.data
        });
    }

    static error(res: Response, props: Props) {
        return res.status(props.code || 400).json({
            meta: {
                code: props.code || 400,
                status: 'error',
                message: props.message
            },
            data: props.data
        });
    }

    static validation(res: Response, data: object) {
        return this.error(res, {
            code: 422,
            message: 'Validation error',
            data
        });
    }
}

export default ApiResponser;
