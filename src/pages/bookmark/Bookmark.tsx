import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingMedium } from "baseui/typography";
import Default from "../../layouts/Default";
import { Block } from "baseui/block";
import HeadingTitle from "../../components/shared/HeadingTitle";

export default function Bookmark() {
  return (
    <Default hasHeader={true}>
      <HeadingTitle title="Bookmark" />
    </Default>
  );
}
