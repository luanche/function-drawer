import React from "react";
import { Slider, Space, InputNumber, Button } from "antd";

interface Props {
  name: string;
  value: number;
  onChange: (value: number) => void;
}

export const SliderInput: React.FC<Props> = ({ name, value, onChange }) => {
  return (
    <div>
      <Space>
        <span style={{ alignSelf: "center" }}>{name}: </span>
        <Slider
          style={{ width: 100 }}
          min={-1}
          max={1}
          step={0.01}
          value={value}
          onChange={onChange}
        />

        <Button type="primary" onClick={() => onChange(0)}>
          Set to 0
        </Button>
        <Button type="primary" onClick={() => onChange(1)}>
          Set to 1
        </Button>
      </Space>
    </div>
  );
};
