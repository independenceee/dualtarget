import { Axios } from "axios";

class Koios extends Axios {
    constructor(url: string) {
        super({
            baseURL: url,
        });
    }
}

export default Koios;
