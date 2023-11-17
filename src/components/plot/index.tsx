import { Input, Space } from "antd";
import functionPlot from "function-plot";
import React, { useEffect, useRef, useState } from "react";
import { SliderInput } from "./slider/index";

interface Props {}

export const Plot: React.FC<Props> = () => {
  const chart = useRef<HTMLDivElement>(null);
  const chartForCheck = useRef<HTMLDivElement>(null);

  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(1);

  const [functionA, setFunctionA] = useState<string>("x^3");
  const [functionB, setFunctionB] = useState<string>("1 / x");

  const functions: { fn: string; color?: string }[] = [
    {
      fn: "0",
      color: "#00000000",
    },
    {
      fn: "0",
      color: "#00000000",
    },
    {
      fn: "0",
      color: "#00000000",
    },
  ];
  useEffect(() => {
    if (chart.current && chartForCheck.current) {
      try {
        if (functionA) {
          const fnA = `${paramA} * (${functionA})`;
          functionPlot({ target: chartForCheck.current, data: [{ fn: fnA }] });
          functions[0].fn = fnA;
          functions[0].color = "#b5b5b596";
        }
      } catch (error) {}
      try {
        if (functionB) {
          const fnB = `${paramB} * (${functionB})`;
          functionPlot({ target: chartForCheck.current, data: [{ fn: fnB }] });
          functions[1].fn = fnB;
          functions[1].color = "#b5b5b596";
        }
      } catch (error) {}
      try {
        if (functionA && functionB) {
          const fn = `${paramA} * (${functionA}) + ${paramB} * (${functionB})`;
          functionPlot({ target: chartForCheck.current, data: [{ fn: fn }] });
          functions[2].fn = fn;
          functions[2].color = undefined;
        }
      } catch (error) {}
      functionPlot({
        title: `a * (${functionA}) + b * (${functionB})`,
        target: chart.current,
        grid: true,
        data: functions,
      });
    }
  }, [chart, paramA, paramB, functionA, functionB, functions]);

  return (
    <div>
      <div style={{ marginTop: 20 }} ref={chart} />
      <div style={{ display: "none" }} ref={chartForCheck} />
      <div>
        <Space style={{ marginBottom: 10 }}>
          <Input
            allowClear
            width={120}
            value={functionA}
            onChange={(e) => setFunctionA(e.target.value)}
          />
          +
          <Input
            allowClear
            width={120}
            value={functionB}
            onChange={(e) => setFunctionB(e.target.value)}
          />
        </Space>
        <SliderInput name={"Factor a"} value={paramA} onChange={setParamA} />
        <SliderInput name={"Factor b"} value={paramB} onChange={setParamB} />
      </div>
    </div>
  );
};
