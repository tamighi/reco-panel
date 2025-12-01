import { STORAGE_PREFIX } from "@/constants";
import type {
    ControlOptions,
    ControlPrimitive,
    ControlType,
} from "@/types/chore";
import { isControlType } from "@/utils";

type ControlInput = ControlPrimitive | ControlType;

export class Control<T extends ControlInput = ControlInput> {
    private control!: ControlType;

    private controlInput: ControlInput;
    private optionsInput: ControlOptions;

    constructor(control: T, options: ControlOptions = {}) {
        this.controlInput = control;
        this.optionsInput = options;
    }

    private fillControlOptions(options: ControlOptions) {
        (Object.keys(options) as Array<keyof ControlOptions>).forEach((key) => {
            this.control[key] =
                this.control[key] !== undefined
                    ? this.control[key]
                    : options[key];
        });
    }

    public normalizeControl(key: string, folderOptions: ControlOptions) {
        const value = this.controlInput;
        const options = { ...folderOptions, ...this.optionsInput };

        let control = {} as ControlType;

        if (isControlType(value)) {
            control = structuredClone(value);
        } else {
            control = { value };
        }

        control.label = control.label ?? key.split("/").pop();

        this.fillControlOptions(options);

        if (control.store) {
            const value = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
            if (value) {
                control.value = JSON.parse(value);
            }
        }

        return control;
    }
}
