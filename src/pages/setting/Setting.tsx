import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingMedium } from "baseui/typography";
import Layout from "../../layouts/Default";
import { Block } from "baseui/block";

export default function Setting() {
  return (
    <Layout hasHeader={true}>
      <HeadingMedium>Setting</HeadingMedium>
    </Layout>
  );
}
