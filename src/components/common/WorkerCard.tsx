import * as React from "react";
import {
  ParagraphMedium,
  ParagraphXSmall,
} from "baseui/typography";
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import { Button, KIND } from "baseui/button";
import { IoStar } from "@react-icons/all-files/io5/IoStar";
import { useRouter } from "next/router";
import { useStyletron } from "baseui";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IWorker } from "../../constants/worker.const";

export default function WorkerCard({ data }: { data: IWorker }) {
  const [css, theme] = useStyletron();
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/browse/Profile?id=${data.id}`);
      }}
      kind={KIND.tertiary}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            width: "100%",
            display: "flex",
            alignItems: "start",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "5px",
            paddingBottom: "5px",
            // padding: '5px 20px'
          }),
        },
      }}
    >
      <Block width={"100%"} display={"flex"}>
        <Avatar name="leangsuor" size="scale1600" src={data.pfp} />
        <Block
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          marginLeft={"10px"}
        >
          <Block display={"flex"} alignItems={"center"}>
            <ParagraphMedium
              margin={'0 5px 0 0'}
              $style={{ textAlign: "start" }}
            >
              {data.username}
            </ParagraphMedium>
            {data.verify ? (
              <IoCheckmarkCircle size={"15px"} color={theme.colors.accent} />
            ) : (
              <></>
            )}
          </Block>
          <ParagraphXSmall margin={0}>{data.occupation}</ParagraphXSmall>
          <Block display={"flex"}>
            <Block marginRight={"5px"}>
              <IoStar size={"15px"} color={theme.colors.backgroundWarning} />
            </Block>
            <ParagraphXSmall margin={0}>
              {data.stats.rating} ({data.stats.reviewCount} review)
            </ParagraphXSmall>
          </Block>
        </Block>
      </Block>
    </Button>
  );
}
