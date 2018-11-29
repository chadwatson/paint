import styled from "styled-components";

const SvgIcon = styled.svg`
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: ${({ valign }) => valign};
  fill: currentColor;
  font-size: 1em;
  line-height: 0;
  overflow: visible;
`;

SvgIcon.defaultProps = {
  valign: "middle"
};

export default SvgIcon;
