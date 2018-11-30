import React, { useState, useRef } from "react";
import Helmet from "react-helmet";
import { createGlobalStyle } from "styled-components";
import Toolbar from "../../components/Toolbar";
import Root from "../../components/Root";
import Canvas from "../../components/Canvas";
import useHistoricalState from "../../hooks/useHistoricalState";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const serializer = new XMLSerializer();

export default function App({ colors, defaultColor }) {
  const [color, setColor] = useState(defaultColor);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [elements, setElements, undo, redo] = useHistoricalState([]);
  const svgRef = useRef(document.createElement("svg"));

  return (
    <>
      <GlobalStyle />
      <Root>
        <Helmet>
          <title>Paint</title>
        </Helmet>
        <Toolbar
          colors={colors}
          redo={redo}
          selectedColor={color}
          setColor={setColor}
          setStrokeWidth={setStrokeWidth}
          strokeWidth={strokeWidth}
          svgContents={
            svgRef.current ? serializer.serializeToString(svgRef.current) : ""
          }
          undo={undo}
        />
        <Canvas
          addElement={element => {
            setElements(elements.concat([element]));
          }}
          color={color}
          elements={elements}
          svgRef={ref => {
            svgRef.current = ref;
          }}
          strokeWidth={strokeWidth}
        />
      </Root>
    </>
  );
}
