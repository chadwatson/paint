import React, { useState } from "react";
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

export default function App({ colors, defaultColor }) {
  const [color, setColor] = useState(defaultColor);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [elements, setElements, undo, redo] = useHistoricalState([]);

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
          undo={undo}
        />
        <Canvas
          color={color}
          elements={elements}
          addElement={element => {
            setElements(elements.concat([element]));
          }}
          strokeWidth={strokeWidth}
        />
      </Root>
    </>
  );
}
