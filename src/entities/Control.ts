import { STORAGE_PREFIX } from "@/constants";
import type {
    BaseControlOptions,
    ControlOptions,
    ControlPrimitive,
} from "@/types/chore";

export class Control<T extends ControlPrimitive> {
    private options!: ControlOptions<T>;
    public control: T;

    private key!: string;

    constructor(control: T, options: BaseControlOptions = {}) {
        this.control = control;
        this.options = options;
    }

    public normalize(folderOptions: BaseControlOptions, key: string) {
        this.options = { ...folderOptions, ...this.options };
        this.key = key;

        if (this.options.store) {
            const value = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
            if (value) {
                this.control = JSON.parse(value);
            }
        }
    }

    public getKey() {
        return this.key;
    }
}
