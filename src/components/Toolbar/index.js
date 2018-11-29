import React from "react";
import styled from "styled-components";
import Ul from "../Ul";
import Button from "../Button";
import Range from "../Range";
import UndoIcon from "../UndoIcon";
import RedoIcon from "../RedoIcon";

const Root = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  flex-shrink: 0;
`;
const Space = styled.div`
  width: 30px;
  height: 1px;
`;
const List = styled(Ul)`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  width: 1em;
  height: 1em;
  margin: 0 0.1em;
  font-size: 30px;
  transform: scale(${({ selected }) => (selected ? 1 : 0.6)});
  transition: 0.25s transform;

  &:hover {
    transform: scale(${({ selected }) => (selected ? 1 : 0.7)});
  }
`;
const ItemButton = styled(Button)`
  display: block;
`;
const Swatch = styled.i`
  display: inline-block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;
const Label = styled.span`
  margin-right: 0.35em;
  font-size: 0.8em;
`;
const BrushSettings = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const BrushSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 200px;
`;
const HistoryButtons = styled.div`
  display: flex;
  align-items: center;
`;
const HistoryButton = styled(Button)`
  margin: 0 5px;
  font-size: 50px;

  &[disabled] {
    opacity: 0.25;
  }
`;

const Toolbar = ({
  colors,
  selectedColor,
  strokeWidth,
  setColor,
  setStrokeWidth,
  undo,
  redo
}: Props) => {
  const strokeMin = 5;
  const strokeMax = 40;

  return (
    <Root>
      <BrushSettings>
        <List>
          {colors.map(color => (
            <Item key={color} selected={color === selectedColor}>
              <ItemButton onClick={() => setColor(color)}>
                <Swatch color={color} title={color} />
              </ItemButton>
            </Item>
          ))}
        </List>
        <Space />
        <BrushSizeWrapper>
          <Label>Size</Label>
          <Range
            min={strokeMin}
            max={strokeMax}
            onChange={setStrokeWidth}
            value={strokeWidth}
          />
        </BrushSizeWrapper>
      </BrushSettings>
      <Space />
      <HistoryButtons>
        <HistoryButton disabled={!undo} onClick={undo}>
          <UndoIcon />
        </HistoryButton>
        <HistoryButton disabled={!redo} onClick={redo}>
          <RedoIcon />
        </HistoryButton>
      </HistoryButtons>
    </Root>
  );
};

export default Toolbar;
