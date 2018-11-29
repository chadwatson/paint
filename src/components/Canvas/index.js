import React, { useState } from "react";
import styled from "styled-components";
import Rect from "@reach/rect";

const Svg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`;

export const Line = ({ d, stroke, strokeWidth }) => (
  <path
    d={d}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />
);

const renderNewElement = ({ Component, props }) => <Component {...props} />;

const createBrushIndicatorSvg = ({ color, strokeWidth }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${strokeWidth}px" height="${strokeWidth}px" viewBox="0 0 64 64" fill="${encodeURIComponent(
    color
  )}"><circle cx="32" cy="32" r="32" /></svg>`;

export default function Canvas({ elements, addElement, color, strokeWidth }) {
  const [newElement, setNewElement] = useState(null);
  return (
    <Rect>
      {({ ref, rect = { width: 0, height: 0 } }) => (
        <Svg
          style={{
            cursor: `url('data:image/svg+xml;utf8,${createBrushIndicatorSvg({
              color,
              strokeWidth
            })}') ${strokeWidth / 2} ${strokeWidth / 2}, auto`
          }}
          onMouseDown={({ clientX, clientY }) => {
            setNewElement({
              Component: Line,
              props: {
                d: `M${clientX - rect.left} ${clientY - rect.top}`,
                strokeWidth,
                stroke: color
              }
            });
          }}
          onMouseMove={({ clientX, clientY }) => {
            if (newElement) {
              setNewElement({
                ...newElement,
                props: {
                  ...newElement.props,
                  d: `${newElement.props.d} L${clientX - rect.left} ${clientY -
                    rect.top}`
                }
              });
            }
          }}
          onMouseUp={() => {
            if (newElement) {
              const { Component, props } = newElement;
              addElement(<Component {...props} key={elements.length} />);
              setNewElement(null);
            }
          }}
          ref={ref}
          viewBox={`0 0 ${rect.width} ${rect.height}`}
        >
          {elements}
          {!!newElement && renderNewElement(newElement)}
        </Svg>
      )}
    </Rect>
  );
}
