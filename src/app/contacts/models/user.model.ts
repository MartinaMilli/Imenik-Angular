export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpDate: Date
    ) {}

    // create a new user object when a user logs in
    get token() {
        if (!this._tokenExpDate || new Date() > this._tokenExpDate) {
            return null;
        }
        return this._token;
    }
}
