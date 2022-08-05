import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button, KIND, SIZE } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import {
  HeadingLarge,
  HeadingMedium,
  ParagraphLarge,
  ParagraphSmall,
} from "baseui/typography";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CoverLanding, Logo } from "../constants/icon.const";

const Landing: NextPage = () => {
  const route = useRouter();
  const { status } = useSession();
  const [css, theme] = useStyletron();
  return (
    <main>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          margin: "100px 20px 0 20px",
        })}
      >
        <Image src={Logo} height={45} width={45} objectFit={"contain"} />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          })}
        >
          <HeadingLarge
            margin={0}
            className={css({
              textAlign: "center",
            })}
          >
            Find a house repairman with ease
          </HeadingLarge>
          <ParagraphLarge
            margin={0}
            className={css({
              textAlign: "center",
            })}
          >
            Find a house repairman with ease
          </ParagraphLarge>
        </div>
        {status === "authenticated" ? (
          <Button type="submit" onClick={() => route.push("/browse/Browse")}>
            Open App
          </Button>
        ) : (
          <div
            className={css({
              display: "flex",
            })}
          >
            <Button
              type="submit"
              kind={KIND.tertiary}
              size={SIZE.large}
              onClick={() => route.push("/authentication/Login")}
            >
              Log in
            </Button>
            <Button
              type="submit"
              size={SIZE.large}
              onClick={() => route.push("/authentication/Signup")}
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
      <Block position={"absolute"} bottom={"0"} left={"46%"} className={css({
        transform: "translate(0%, -46%)"
      })}>
        <ParagraphSmall>Made by noname</ParagraphSmall>
      </Block>
    </main>
  );
};

export default Landing;
