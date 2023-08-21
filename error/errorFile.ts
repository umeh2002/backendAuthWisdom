export enum STATUS {
    OK = 200,
    CREATED = 201,
    BAD = 404
}

export interface iError {
    errorName: string;
    errorMessage: string;
    errorStatus: STATUS;
    errorSuccess: boolean;
}

export class errorFile extends Error {
    public readonly errorName: string;
    public readonly errorMessage: string;
    public readonly errorStatus: STATUS;
    public readonly errorSuccess: boolean = false;
    constructor(arrgs: iError){
        super(arrgs.errorMessage)

        Object.setPrototypeOf(this, new.target.prototype)
        this.errorMessage = arrgs.errorMessage;
        this.errorName = arrgs.errorName;
        this.errorStatus = arrgs.errorStatus;

        if(this.errorSuccess !== undefined){
            this.errorSuccess = this.errorSuccess
        }
        Error.captureStackTrace(this)
    }
}