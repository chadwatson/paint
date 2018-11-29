import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Rect from "@reach/rect";
import { clamp } from "ramda";
import useCursor from "../../hooks/useCursor";

const percentage = (min, max, x) => (x - min) / (max - min);

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 2em;
  border-radius: 3px;
  color: lightgray;
  cursor: ${({ dragging }) => (dragging ? "grabbing" : "grab")};

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 1em;
    border-radius: inherit;
    border: 1px solid;
    background: white;
  }
`;
const TrackHandle = styled.div`
  position: absolute;
  top: 0;
  height: inherit;
  border-radius: 3px;
  border: 1px solid;
  background: white;
  pointer-events: none;
  z-index: 1;
`;

export default function Range({ min, max, value, minIcon, maxIcon, onChange }) {
  const [mouseDown, setMouseDown] = useState(false);
  const cursor = useCursor(mouseDown);
  const width = useRef(0);
  const left = useRef(0);
  const clampValue = clamp(min, max);
  const trackHandleWidth = 16;
  const getNextValue = x =>
    clampValue(
      percentage(
        0,
        width.current - trackHandleWidth,
        x - (left.current + trackHandleWidth / 2)
      ) *
        (max - min) +
        min
    );
  const handleMouseUp = () => {
    setMouseDown(false);
  };

  useEffect(
    () => {
      onChange(getNextValue(cursor.x));
    },
    [cursor.x]
  );

  useEffect(
    () => {
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
      };
    },
    [mouseDown]
  );

  return (
    <Rect>
      {({ ref, rect }) => {
        width.current = rect ? rect.width : width.current;
        left.current = rect ? rect.left : left.current;

        return (
          <Track
            dragging={mouseDown}
            ref={ref}
            onMouseDown={({ pageX }) => {
              if (rect.current) {
                onChange(getNextValue(pageX));
              }
              setMouseDown(true);
            }}
            onMouseUp={handleMouseUp}
          >
            {!!rect && (
              <TrackHandle
                style={{
                  left: `${percentage(min, max, value) *
                    (rect.width - trackHandleWidth)}px`,
                  width: `${trackHandleWidth}px`
                }}
                width={trackHandleWidth}
              />
            )}
          </Track>
        );
      }}
    </Rect>
  );
}
