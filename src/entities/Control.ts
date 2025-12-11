import { STORAGE_PREFIX } from "@/constants";
import type { ControlOptions, ControlPrimitive } from "@/types/chore";

export class Control<T extends ControlPrimitive = ControlPrimitive> {
    private options!: ControlOptions<T>;
    private control: T;
    private path!: string;

    constructor(control: T, options: ControlOptions<T> = {}) {
        this.control = control;
        this.options = options;
    }

    public fillOptions(options: ControlOptions<T>) {
        this.options = { ...options, ...this.options };
    }

    public setPath(path: string) {
        this.path = path;
    }

    public init(parentOptions: ControlOptions<T>, path: string) {
        this.fillOptions(parentOptions);
        this.setPath(path);

        if (this.options.store) {
            const value = localStorage.getItem(`${STORAGE_PREFIX}${path}`);
            if (value) {
                this.control = JSON.parse(value);
            }
        }
    }
}
