import React, {useRef} from 'react';
import styled from 'styled-components/native';
import Svg, {Line, Path, G, Circle, Text} from 'react-native-svg';
import Theme from '~/components/styles/theme';
import {ScrollView} from 'react-native';
import {SvgUri} from 'react-native-svg';

type LineGraphProps = {
  values: [
    {
      data: number;
      code: string;
      temperature: number;
      time: string;
    },
  ];
  label: {
    temperature: {
      max: number;
      min: number;
    };
  };
  isToday: boolean;
};

const LineGraph = ({values, label, isToday}: LineGraphProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <SvgWrapper>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        onContentSizeChange={() => {
          if (isToday) {
            scrollViewRef.current?.scrollToEnd({animated: false});
          }
        }}>
        <Svg height={Theme.height(155)} width={Theme.width(68) * values.length}>
          {values.map((e, idx, arr) => {
            let d = '';
            let x = Theme.width(68) * (idx + 1) - Theme.width(34);
            if (idx + 1 < arr.length) {
              d = `M ${x} ${
                Theme.height(104) -
                (Theme.height(97) * (e.temperature - label.temperature.min)) /
                  (label.temperature.max - label.temperature.min)
              } ${Theme.width(68) * (idx + 2) - Theme.width(34)} ${
                Theme.height(104) -
                (Theme.height(97) *
                  (arr[idx + 1].temperature - label.temperature.min)) /
                  (label.temperature.max - label.temperature.min)
              }`;
            }
            return (
              <G
                key={idx}
                stroke={Theme.colors.mainColor}
                fill={Theme.colors.mainColor}
                strokeWidth="3">
                <Line
                  x1={x}
                  y1={Theme.height(7)}
                  x2={x}
                  y2={Theme.height(104)}
                  stroke="#E0E0E0"
                  strokeDasharray="5, 2"
                  strokeWidth="1"
                />
                <Path
                  d={d}
                  stroke={Theme.colors.mainColor}
                  strokeWidth="2"
                  fill="none"
                />
                <Circle
                  cx={x}
                  cy={
                    Theme.height(104) -
                    (Theme.height(97) *
                      (e.temperature - label.temperature.min)) /
                      (label.temperature.max - label.temperature.min)
                  }
                  r="3"
                />
                <Text
                  fontSize={Theme.fontSize(14)}
                  fill={Theme.colors.mainColor}
                  stroke="none"
                  x={
                    e.temperature < 10 && e.temperature >= 0
                      ? x - Theme.fontSize(6)
                      : x - Theme.fontSize(8)
                  }
                  y={
                    e.temperature < label.temperature.max - 4
                      ? Theme.height(104) -
                        (Theme.height(97) *
                          (e.temperature - label.temperature.min)) /
                          (label.temperature.max - label.temperature.min) -
                        Theme.height(15)
                      : Theme.height(104) -
                        (Theme.height(97) *
                          (e.temperature - label.temperature.min)) /
                          (label.temperature.max - label.temperature.min) +
                        Theme.height(27)
                  }>
                  {`${e.temperature}°`}
                </Text>
                {isToday && (
                  <G x={x - Theme.width(12)} y={Theme.height(108)}>
                    <SvgUri
                      width={Theme.width(24)}
                      height={Theme.width(24)}
                      uri={'../../../assets/images/placeholder.svg.svg'}
                    />
                  </G>
                )}
                <Text
                  fontSize={Theme.fontSize(14)}
                  fill="#6E6F70"
                  stroke="none"
                  x={
                    idx === arr.length - 1
                      ? x - Theme.fontSize(12)
                      : x - Theme.fontSize(9)
                  }
                  y={Theme.height(151)}>
                  {e.time}
                </Text>
              </G>
            );
          })}
        </Svg>
      </ScrollView>
    </SvgWrapper>
  );
};

const SvgWrapper = styled.View`
  height: ${Theme.height(155)}px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`;

export default LineGraph;
