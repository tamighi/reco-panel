import useControlsInternal from "@/hooks/useControlsInternal";
import Control from "./Control";

const ControlPanel = () => {
  const { settings } = useControlsInternal();

  return (
    <div className="fixed top-20 right-20 bg-white z-50 p-2 rounded-sm">
      <div className="flex flex-col">
        {Object.entries(settings).map(([key, control]) => (
          <Control key={key} controlKey={key} control={control} />
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
