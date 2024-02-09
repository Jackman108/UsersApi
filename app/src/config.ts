export enum HttpModule {
    Users = 'users'
}

interface IEnvironmentSetting {
    apiUrl: { [index: string]: string };
}

const devSettings: IEnvironmentSetting = {
    apiUrl: {
        [HttpModule.Users]: 'http://localhost:5001/api/users'
    }
};

const settings: IEnvironmentSetting = {
    apiUrl: {
        [HttpModule.Users]: 'http://localhost:5001/api/users'
    }
};

const isDev = process.env.ENV_CONFIGURATION === 'dev';

let _instance = null;

class Config {
    private _settings: IEnvironmentSetting;
    constructor() {
        if (!_instance) {
            this._settings = isDev ? devSettings : settings;
            _instance = this;
        }
        return _instance;
    }

    get settings() {
        return this._settings;
    }
    get apiUrl() {
        return this._settings.apiUrl;
    }
    get isDev() {
        return process.env.ENV_CONFIGURATION === 'dev';
    }
}

export default new Config();
