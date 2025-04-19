import {Dispatch, SetStateAction} from "react";

export default class LBConfigProps {
    lb_config: IConfig;
    setConfig: Dispatch<SetStateAction<IConfig>>;

    constructor(lb_config: IConfig, setConfig: Dispatch<SetStateAction<IConfig>>) {
        this.lb_config = lb_config;
        this.setConfig = setConfig;
    }
}