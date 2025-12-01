import { STORAGE_PREFIX } from "@/constants";
import type {
    ControlOptions,
    ControlPrimitive,
    ControlType,
} from "@/types/chore";
import { isControlType } from "@/utils";

type ControlInput<T extends ControlPrimitive = ControlPrimitive> =
    | T
    | ControlType<T>;

export class Control<
    T extends ControlInput = ControlInput,
    P extends ControlPrimitive = T extends ControlPrimitive
        ? T
        : T extends ControlType<infer I>
          ? I
          : never,
> {
    private control!: ControlType<P>;

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

    public normalize(folderOptions: ControlOptions, key: string) {
        const value = this.controlInput;
        const options = { ...folderOptions, ...this.optionsInput };

        let control = {} as ControlType;

        if (isControlType(value)) {
            control = structuredClone(value);
        } else {
            control = { value };
        }

        control.label = control.label ?? key;

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
