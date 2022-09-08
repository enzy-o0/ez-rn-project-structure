import React, {useRef} from 'react';
import styled from 'styled-components/native';
import Svg, {Line, G, Text, Rect} from 'react-native-svg';
import Theme from '~/components/styles/theme';
import {ScrollView} from 'react-native';

type BarGraphProps = {
  values: [
    {
      data: number;
      code: string;
      temperature: number;
      time: string;
    },
  ];
  isToday: boolean;
};

const BarGraph = ({values, isToday}: BarGraphProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  return values ? (
    <Layout>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        onContentSizeChange={() => {
          if (isToday) {
            scrollViewRef.current?.scrollToEnd({animated: false});
          }
        }}>
        <Svg
          height={Theme.height(155)}
          width={Theme.width(64) + Theme.width(72) * values.length}>
          {values.map((e, idx) => {
            return (
              <G
                fill={Theme.colors.mainColor}
                stroke="none"
                key={`오늘 날짜 + ${e.time}`}>
                <Line
                  x1={
                    idx
                      ? Theme.width(32) + Theme.width(72) * idx
                      : Theme.width(32)
                  }
                  y1={Theme.height(7)}
                  x2={
                    idx
                      ? Theme.width(32) + Theme.width(72) * idx
                      : Theme.width(32)
                  }
                  y2={Theme.height(120)}
                  stroke={Theme.colors.line}
                  strokeDasharray="5, 2"
                  strokeWidth="1"
                />
                <Rect
                  x={Theme.width(32) + Theme.width(72) * idx}
                  y={Theme.height(7)}
                  width={Theme.width(72)}
                  height={Theme.height(120)}
                  fill={'rgba(0, 85, 0, 0.04)'}
                  stroke="none"
                />
                <Rect
                  x={Theme.width(32) + Theme.width(72) * idx}
                  y={Theme.height(1) * (120 - e.data)}
                  width={Theme.width(72)}
                  height={
                    e.data > 0
                      ? Theme.height(1) + Theme.height(1) * e.data
                      : Theme.height(1)
                  }
                  strokeWidth="3"
                  stroke="none"
                />
                <Text
                  fontSize={Theme.fontSize(14)}
                  fill={Theme.colors.mainColor}
                  textAnchor="middle"
                  x={
                    idx
                      ? Theme.width(68) + Theme.width(72) * idx
                      : Theme.width(68)
                  }
                  y={
                    e.data
                      ? Theme.height(1) * (120 - e.data) - Theme.height(10)
                      : Theme.height(120) - Theme.height(10)
                  }>
                  {e.data}
                </Text>
                <Text
                  fontSize={Theme.fontSize(14)}
                  fill={Theme.colors.subText}
                  x={
                    idx
                      ? Theme.width(32) +
                        Theme.width(72) * idx -
                        Theme.fontSize(9)
                      : Theme.width(32) - Theme.fontSize(9)
                  }
                  y={Theme.height(145)}>
                  {`${e.time}`}
                </Text>
              </G>
            );
          })}
          {isToday && (
            <Text
              fontSize={Theme.fontSize(14)}
              fill={Theme.colors.mainColor}
              textAnchor="middle"
              x={Theme.width(72) * values.length - Theme.fontSize(3)}
              y={Theme.height(145)}>
              현재
            </Text>
          )}
          <Text
            fontSize={Theme.fontSize(14)}
            fill={Theme.colors.subText}
            textAnchor="middle"
            x={Theme.width(32) + Theme.width(72) * values.length}
            y={Theme.height(145)}>
            {`${values.length}시`}
          </Text>
          <Line
            x1={Theme.width(32) + Theme.width(72) * values.length}
            y1={Theme.height(7)}
            x2={Theme.width(32) + Theme.width(72) * values.length}
            y2={Theme.height(120)}
            stroke={Theme.colors.line}
            strokeDasharray="5, 2"
            strokeWidth="1"
          />
        </Svg>
      </ScrollView>
    </Layout>
  ) : (
    <></>
  );
};

const Layout = styled.View`
  height: ${Theme.height(155)}px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`;

export default BarGraph;
